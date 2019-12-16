import React, { Component } from 'react';
import {
  Form,
  Radio,
  Checkbox,
  Popover,
  Row,
  Col,
  Divider,
  DatePicker,
  Alert,
  Tooltip, message
} from 'antd';
import PriceInput from '../base/PriceInput';
import { priceTitle } from '../constants/price';
import './AccountPriceForAddPage.less';
import moment from 'moment';
import { AccountPriceHelp } from './Unique';
import { handleReason, date2moment } from '../util';
import debounce from 'lodash/debounce';


const RadioGroup = Radio.Group;
const FormItem = Form.Item;

// 检查最少一项报价 new
const checkPriceList = (rule, value, callback) => {
  if (!rule.on || value.some(item => item.costPriceRaw)) {
    return callback();
  }
  callback('报价项最少填写一项');
};

// 处理下单状态显示
function orderStatusView(refuse_status, desc = '') {
  let _C = null;
  if (refuse_status) {
    _C = '是';
  } else {
    _C = <div>
      <span style={{ marginRight: '20px' }}>否</span>
      <Tooltip title={handleReason(desc || '未知原因')}>
        <a>显示原因</a>
      </Tooltip>
    </div>;
  }
  return _C;
}


// 报价提示信息
/*function handlePriceTitle(tax, type) {
  let key = '1';
  if (!tax) {
    key = type == 1 ? '2' : '3';
  }
  return priceTitle[key].desc;
}*/

// 派单报价
export class NamelessPrice extends Component {
  render() {
    const {
      getFieldDecorator, formItemLayout, children, isUpdate, priceList, data: { accountInfo, priceInfo }
    } = this.props;
    const {
      skuList,
      partnerType,
      taxInPrice
    } = priceInfo;
    let val = {};
    skuList && skuList.forEach(({ skuTypeId, costPriceRaw }) => {
      val[skuTypeId] = costPriceRaw;
    });
    return <div className=''>
      <FormItem {...formItemLayout} label='账号报价'>
        {priceList.length > 0 ? getFieldDecorator('price_now', {
          initialValue: priceList,
          rules: [
            { required: true, message: '最少需填写一个报价项' },
            { validator: checkPriceList, on: true }
          ]
        })(
          <PriceTable
            data={this.props.data}
            isEdit
            priceInfo={priceInfo}
            priceKeys={['costPriceRaw', 'channelPrice', 'publicationPrice']}
            action={this.props.actions.calculatePrice}
            pid={this.props.pid}
          />
        ) : null
        }
        <AccountPriceHelp />
      </FormItem>
      {children}
    </div>;
  }
}

// 报价table组
class PriceTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    }
    this.calculatePrice = debounce(this.calculatePrice, 300)
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      let value = nextProps.value || []
      return {
        value
      };
    }
    return null
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  calculatePrice = (value, index) => {
    const { priceKeys: [, channelPriceKey], action, data } = this.props;
    const { accountInfo: { platformId, userId } } = data
    if (!value) {
      return this.onChange(0, index, channelPriceKey)
    }
    const hide = message.loading('价格计算中...')
    let pid = this.props.pid
    action({
      platformId: platformId || pid,
      userId,
      publicationPrice: value
    }).then(({ data }) => {
      const { channelPrice } = data
      hide()
      this.onChange(Math.floor(channelPrice), index, channelPriceKey)
    })
  }

  onChange = (value, index, priceKey) => {
    const { priceKeys: [, , publicationPriceKey], data } = this.props;
    const {
      publicationRate,
    } = data.priceInfo;
    let newValue = this.state.value.map(item => ({ ...item }))
    // 调用价格项计算接口
    if (publicationRate && priceKey === publicationPriceKey) {
      this.calculatePrice(value, index)
    }
    newValue[index][priceKey] = Number(value)
    if (!('value' in this.props)) {
      this.setState({ value: newValue });
    }
    this.triggerChange(newValue)
  };

  render() {
    const { isEdit, priceKeys, priceInfo = {} } = this.props;
    const {
      partnerType,
      taxRate,
      invoiceType
    } = priceInfo;
    const { value } = this.state;
    return <div>
      <span>{partnerType == 1 ? '报价含税（' : '报价不含税'}
        {partnerType == 1 ? invoiceType == 1 ? '回票类型：增值税专用发票' : '回票类型：增值税普通发票）' : null}
        {partnerType == 1 && invoiceType == 1 ? '，税点:' + taxRate * 100 + '%)' : null}
      </span>
      <div className='price-table'>
        <div className='price-table-head'>
          <Row gutter={8}>
            <Col span={6}><p className='price-table-title'>服务项</p></Col>
            <Col span={6}><p className='price-table-title'>报价(元)</p></Col>
            <Col span={6}><p className='price-table-title'>渠道价(元)</p></Col>
            <Col span={6}><p className='price-table-title'>刊例价(元)</p></Col>
          </Row>
        </div>
        <div className='price-table-body'>
          {
            value.map((item, index) => {
              const { skuTypeId, skuTypeName } = item
              return <Row key={skuTypeId} gutter={8}>
                <Col span={6}>
                  <p className='price-table-title'>{skuTypeName}</p>
                </Col>
                <Col span={6}>
                  <div className='price-table-input'>
                    <PriceInput
                      isEdit={isEdit}
                      value={item[priceKeys[0]]}
                      onChange={(value) => this.onChange(value, index, priceKeys[0])}
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className='price-table-input no-error'>
                    <PriceInput
                      isEdit={isEdit}
                      value={item[priceKeys[1]]}
                      onChange={(value) => this.onChange(value, index, priceKeys[1])}
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className='price-table-input no-error'>
                    <PriceInput
                      isEdit={isEdit}
                      value={item[priceKeys[2]]}
                      onChange={(value) => this.onChange(value, index, priceKeys[2])}
                    />
                  </div>
                </Col>
              </Row>
            })
          }
        </div>
      </div>
    </div>;
  }
}
