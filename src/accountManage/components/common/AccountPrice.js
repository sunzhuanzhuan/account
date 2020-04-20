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
import PriceInput from '../../base/PriceInput';
import { priceTitle } from '../../constants/price';
import moment from 'moment';
import { handleReason, date2moment, dateDisplay } from '../../util';
import FieldView from "@/accountManage/base/FeildView";
import debounce from "lodash/debounce";

const RadioGroup = Radio.Group;
const FormItem = Form.Item;


// 检查最少一项报价
const checkPrice = (onOff, otherCheck) => (rule, value = {}, callback) => {
  if (!onOff || value.some(item => item.nextCostPriceRaw || item.costPriceRaw)) {
    if (otherCheck) {
      return otherCheck(rule, value, callback);
    }
    return callback();
  }
  callback('报价项最少填写一项');
};
// 检查最少一项报价 new
const checkPriceList = (rule, value, callback) => {
  if (!rule.on || value.some(item => item.costPriceRaw)) {
    return callback();
  }
  callback('报价项最少填写一项');
};
// 处理审核状态
function approvalStatus(code = 1, desc = '') {
  code = parseInt(code);
  switch (code) {
    case 2:
      return '审核成功';
    case 3:
      return <div>
        <span style={{ color: 'red', marginRight: '20px' }}>审核失败</span>
        <Popover placement="topLeft" title='失败原因' content={
          <p style={{ maxWidth: '300px' }}>{desc}</p>} trigger="click">
          <a>显示失败原因</a>
        </Popover>
      </div>;
    default:
      return '待审核';
  }
}

// 处理有效期和禁用逻辑
function handleDatePeriod({ now_star, now_end, next_star, next_end, pass = false, right = false }) {
  now_star = date2moment(now_star);
  now_end = date2moment(now_end);
  next_star = date2moment(next_star);
  next_end = date2moment(next_end);


  // 最终数据
  let nowStar = now_star, // 本期开始时间
    nowEnd = now_end, // 本期结束时间
    nextStar = next_star, // 下期开始时间
    nextEnd = next_end, // 下期结束时间
    nowDate = moment(), // 当前时间
    require = true, // 是否必填
    canEditTime = true, // 是否可编辑时间
    canEditPrice = true, // 是否可编辑价格
    hasPass = false,
    disabledDate = moment().add(1, 'd'); // 禁用时间选择范围

  // 没有本期时间
  if (!now_star.isValid() || !now_end.isValid()) {
    nowStar = moment().subtract(1, 'days').startOf('d');
    nowEnd = moment().subtract(1, 'days').endOf('d');
  } else {
    nowStar = moment(now_star).startOf('d');
    nowEnd = moment(now_end).endOf('d');
  }

  if (!next_star.isValid() || !next_end.isValid()) {
    // 不存在下期时间(数据) & 没有审核信息
    if (nowDate < nowEnd) {
      // 本期时间未过期
      nextStar = moment(nowEnd).add(1, 'd').startOf('d');
      require = false;
      nextEnd = null;
    } else {
      // 本期时间已过期
      nextStar = moment(nowDate).startOf('d');
      require = true;
      nextEnd = null;
    }
    disabledDate = moment(nextStar).add(1, 'd');
    canEditTime = true;
    canEditPrice = true;
  } else {
    // 存在下期时间(数据) & 必有审核信息
    hasPass = true;
    if (nowDate < nowEnd) {
      // 本期时间未过期
      if (pass) {
        // 审核通过
        canEditTime = false;
        canEditPrice = right;
      } else {
        canEditTime = true;
        canEditPrice = true;
      }
      disabledDate = moment(nextStar).add(1, 'd');
      require = false;
    } else {
      // 本期时间已过期 & 审核没有通过
      nextStar = moment(nowDate).startOf('d');
      nextEnd = moment(nextEnd).isBefore(nowDate) ? moment(nextStar).add(1, 'd').endOf('m') : nextEnd;
      // nextEnd = moment(nextStar).add(30, 'd').endOf('d')
      disabledDate = moment(nextStar).add(1, 'd');
      require = true;
      canEditTime = true;
      canEditPrice = true;
    }
  }

  return {
    nowStar,
    nowEnd,
    nextStar,
    nextEnd,
    disabledDate,
    require,
    canEditTime,
    canEditPrice,
    hasPass
  };
}

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

// // 报价提示信息
// function handlePriceTitle(tax, type) {
//   let key = '1';
//   if (!tax) {
//     key = type == 1 ? '2' : '3';
//   }
//   return priceTitle[key].desc;
// }

// 账号报价帮助信息
const AccountPriceHelp = () => {
  const content = <div className='account-price-help-tips'>
    <img src={require('../../images/help.jpg')} />
  </div>;
  return <div>
    {/* <Popover getPopupContainer={() => document.querySelector('.price_scroll_container') || document.querySelector('#account-manage-container')} placement="topLeft" title={null} content={content} trigger="click">
      <a>查看订单成本, 收入计算规则</a>
    </Popover> */}
  </div>;
};

// 派单报价
export class NamelessPrice extends Component {
  render() {
    const {
      form: { getFieldDecorator },
      layout,
      children, isUpdate, priceList,
      data: { accountInfo, priceInfo }
    } = this.props;
    const {
      skuList,
      partnerType,
      taxInPrice,
      invoiceType,
      taxRate
    } = priceInfo;
    let val = {};
    skuList && skuList.forEach(({ skuTypeId, costPriceRaw }) => {
      val[skuTypeId] = costPriceRaw;
    });
    return <div className='price_scroll_container'>
      <FormItem {...layout.full} label='账号报价'>
        {priceList.length > 0 ? getFieldDecorator('price_now', {
          initialValue: priceList,
          rules: [
            { required: true, message: '最少需填写一个报价项' },
            { validator: checkPriceList, on: true }
          ]
        })(
          <PriceTable
            // desc={handlePriceTitle(taxInPrice == 1, partnerType)}
            partnerType={partnerType}
            invoiceType={invoiceType}
            taxRate={taxRate}
            data={this.props.data}
            isEdit
            priceKeys={['costPriceRaw', 'channelPrice', 'publicationPrice']}
            action={this.props.actions.calculatePrice}
            pid={this.props.pid}
          />
        ) : null}
        <AccountPriceHelp />
      </FormItem>
      {isUpdate ? <NamelessStatus {...{
        getFieldDecorator,
        layout,
        accountInfo,
        priceInfo
      }} /> : null}
      {children}
    </div>;
  }
}

// 预约报价
export class FamousPrice extends Component {
  constructor(props) {
    super(props);
    const { data: { priceInfo } } = props;
    const { isAllowOrderStatus, saleStatus, forceSaleStatus, offShelfReason } = priceInfo;
    this.state = {
      isAllow: isAllowOrderStatus,// 是否可接单
      orderStatus: saleStatus === 1,// 下单状态
      forcedOrder: forceSaleStatus === 1, // 强制可下单
      orderStatusReason: offShelfReason // 强制可下单原因
    };
  }

  //

  // 价格有效期联动校验 -- 时间
  checkDateAndPrice = (rule, value, callback) => {
    const { getFieldValue, setFields } = this.props;
    let price = getFieldValue('price_next') || {};
    if (price.some(item => item.nextCostPriceRaw)) {
      if (!value) {
        return callback('请填写下期有效期结束时间');
      }
    } else {
      setFields({
        'price_next': value ? {
          'errors': [{
            'message': '报价项最少填写一项',
            'field': 'price_next'
          }]
        } : {}
      });
    }
    callback();
  };

  // 价格有效期联动校验 -- 价格
  checkPriceAndDate = (rule, value, callback) => {
    const { getFieldValue, setFields } = this.props;
    let date = getFieldValue('nextPriceValidTo');
    let flag = value.some(item => item.nextCostPriceRaw);
    if (date) {
      if (!flag) {
        return callback('报价项最少填写一项');
      }
    } else {
      setFields({
        'nextPriceValidTo': flag ? {
          value: null,
          'errors': [{
            'message': '请填写下期有效期结束时间',
            'field': 'nextPriceValidTo'
          }]
        } : { value: null }
      });
    }
    callback();
  };

  handleIsAllow = (e) => {
    this.setState({ isAllow: e.target.value });
  };

  handleForcedOrder = (e) => {
    this.setState({ forcedOrder: e.target.checked });
  };
  setDefaultValue = (value) => () => {
    const { setFields, getFieldValue } = this.props;
    let date = getFieldValue('nextPriceValidTo');
    if (!date) {
      setFields({
        'nextPriceValidTo': { value: value }
      });
    }
  }

  componentDidMount() {
    const { validateFields } = this.props;
    if (!this.cNextEnd && !this.cRequire) {
      validateFields(['nextPriceValidTo', 'price_next']);
    }
  }

  render() {
    const {
      getFieldDecorator, layout, children, priceKeys, data: { accountInfo, priceInfo, auth = {} }
    } = this.props;
    const {
      priceValidFrom,
      priceValidTo,
      nextPriceValidFrom,
      nextPriceValidTo,
      reviewStatus,
      reviewFailReason,
      taxInPrice, // 在主帐号中有
      partnerType,
      invoiceType,
      taxRate,
      skuList
    } = priceInfo;
    /*const orderStatus = {
      isCheck: is_flowunit_off_shelf == 1, // 是否流单过多下架
      accept_order: isAllowOrderStatus == 1, // 是否接单
      refuse_order: is_reject_order_off_shelf == 1, // 是否拒单下架
      open: isOpen == 1 // 是否公开
    }*/
    const _data = {
      now_star: priceValidFrom,
      now_end: priceValidTo,
      next_star: nextPriceValidFrom,
      next_end: nextPriceValidTo,
      pass: reviewStatus == 2,
      right: auth['account.manage.update.price.edit']
    };
    const {
      nowStar, // 本期开始时间
      nowEnd, // 本期结束时间
      nextStar, // 下期开始时间
      nextEnd, // 下期结束时间
      require, // 是否必填
      canEditTime, // 是否可编辑时间
      canEditPrice, // 是否可编辑价格
      disabledDate, // 禁用时间选择范围
      hasPass // 是否有审核信息
    } = handleDatePeriod(_data);
    this.cNextEnd = nextEnd;
    this.cRequire = require;
    let nowVal = {}, nextVal = {};
    skuList && skuList.forEach(({ skuTypeId, costPriceRaw, nextCostPriceRaw }) => {
      nowVal[skuTypeId] = costPriceRaw;
      nextVal[skuTypeId] = nextCostPriceRaw;
    });
    const { isAllow, orderStatus, forcedOrder, orderStatusReason } = this.state;
    const viewStatus = (isAllow == 1 && (orderStatus || forcedOrder)) ? '销售AB端可下单' : '销售AB端不可下单';
    return <div className='price_scroll_container'>
      <FormItem {...layout.full} label='本期有效期'>
        <span>{nowStar.format('YYYY-MM-DD')}</span><span className='m10-e'>至</span>
        <span>{nowEnd.format('YYYY-MM-DD')}</span>
      </FormItem>
      <FormItem {...layout.full} label='账号报价'>
        {getFieldDecorator('price_now', {
          initialValue: skuList,
          rules: [{ validator: checkPriceList, on: _data.right }]
        })(<PriceTable
          isEdit={_data.right}
          priceKeys={['costPriceRaw', 'channelPrice', 'publicationPrice']}
          data={this.props.data}
          action={this.props.actions.calculatePrice}
        />)}
      </FormItem>
      <Divider dashed />
      <FormItem {...layout.full} label='下期有效期' style={{ display: 'none' }}>
        {getFieldDecorator('nextPriceValidFrom', {
          initialValue: nextStar
        })(
          <span>{nextStar.format('YYYY-MM-DD')}</span>)}
      </FormItem>
      <FormItem {...layout.full} label='下期有效期'>
        <span>{nextStar.format('YYYY-MM-DD')}</span><span className='m10-e'>至</span>
        {canEditTime ? getFieldDecorator('nextPriceValidTo', {
          validateFirst: true,
          initialValue: nextEnd,
          rules: [{
            type: 'object',
            required: require,
            message: '请选择结束时间'
          }, { validator: this.checkDateAndPrice }]
        })(
          <DatePicker
            onOpenChange={this.setDefaultValue(moment(disabledDate).endOf('M'))}
            getPopupContainer={() => document.querySelector('#account-manage-container')}
            disabledDate={current => {
              return current && (current < disabledDate || current.format('MM-DD') !== moment(current).endOf('M').format('MM-DD'))
            }}
          />) :
          <span>
            {getFieldDecorator('nextPriceValidTo', {
              initialValue: moment(nextEnd).endOf('day')
            })(<input type="hidden" />)}
            {nextEnd && nextEnd.format('YYYY-MM-DD')}
          </span>}
      </FormItem>
      <FormItem {...layout.full} label='账号报价'>
        {getFieldDecorator('price_next', {
          initialValue: skuList,
          validateFirst: true,
          rules: [{
            required: require,
            validator: checkPrice(require, this.checkPriceAndDate)
          }]

        })(<PriceTable
          // desc={handlePriceTitle(taxInPrice == 1, partnerType)}
          partnerType={partnerType}
          invoiceType={invoiceType}
          taxRate={taxRate}
          data={this.props.data}
          isEdit={canEditPrice}
          priceKeys={['nextCostPriceRaw', 'nextChannelPrice', 'nextPublicationPrice']}
          action={this.props.actions.calculatePrice}
        />)}
        <AccountPriceHelp />
      </FormItem>
      {hasPass ? <FormItem {...layout.full} label='审核状态'>
        {approvalStatus(reviewStatus, reviewFailReason)}
      </FormItem> : null}
      <Divider dashed />
      {/* TODO: 字段修改*/}
      <FormItem {...layout.full} label='是否可接单'>
        {getFieldDecorator('isAllowOrderStatus', {
          initialValue: isAllow || 1
        })(
          <RadioGroup onChange={this.handleIsAllow}>
            <Radio value={1}>是</Radio>
            <Radio value={2}>否</Radio>
          </RadioGroup>
        )}
      </FormItem>
      <FormItem {...layout.full} label='下单状态'>
        {orderStatusView(orderStatus, orderStatusReason)}
      </FormItem>
      <FormItem {...layout.full} label='选择账号状态'>
        {getFieldDecorator('forceSaleStatus', {
          valuePropName: 'checked',
          initialValue: forcedOrder
        })(
          <Checkbox onChange={this.handleForcedOrder}>强制可下单</Checkbox>)}
      </FormItem>
      <FormItem {...layout} label=' ' colon={false}>
        <Alert message={
          <span>保存后，<b>{viewStatus}</b></span>
        } type="info" showIcon />
      </FormItem>
      <Divider dashed />
      {/* 隐藏域提交 */}
      {getFieldDecorator('priceValidFrom', { initialValue: nowStar })(
        <input type="hidden" />)}
      {getFieldDecorator('priceValidTo', { initialValue: nowEnd })(
        <input type="hidden" />)}
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
    const { base: { platformId, userId } } = data.account
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
      publicationRate
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
    const { isEdit,
      partnerType,
      invoiceType,
      taxRate, priceKeys } = this.props;
    console.log('partnerType', partnerType && partnerType == 1 ? '报价含税（' : '报价不含税')
    console.log('invoiceType', invoiceType)
    console.log('taxRate', taxRate)
    const { value } = this.state;
    return <div>
      {partnerType ? <span>{partnerType == 1 ? '报价含税（' : '报价不含税'}
        {partnerType == 1 ? invoiceType == 1 ? '回票类型：增值税专用发票' : '回票类型：增值税普通发票）' : null}
        {partnerType == 1 && invoiceType == 1 ? '，发票税率：' + taxRate * 100 + '%)' : null}
      </span> : null}
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

// 派单账号接单状态
class NamelessStatus extends Component {
  constructor(props) {
    super(props);
    const { priceInfo } = props;
    const { isAllowOrderStatus, saleStatus, forceSaleStatus, offShelfReason } = priceInfo;
    this.state = {
      isAllow: isAllowOrderStatus,// 是否可接单
      orderStatus: saleStatus == 1,// 下单状态
      forcedOrder: forceSaleStatus == 1, // 强制可下单
      orderStatusReason: offShelfReason // 强制可下单原因
    };
  }

  handleIsAllow = (e) => {
    this.setState({ isAllow: e.target.value });
  };

  handleForcedOrder = (e) => {
    this.setState({ forcedOrder: e.target.checked });
  };

  render() {
    const {
      getFieldDecorator, layout
    } = this.props;
    const { isAllow, orderStatus, forcedOrder, orderStatusReason } = this.state;
    const viewStatus = (isAllow == 1 && (orderStatus || forcedOrder)) ? '销售AB端可下单' : '销售AB端不可下单';
    return <div>
      <FormItem {...layout.full} label='是否可接单'>
        {getFieldDecorator('isAllowOrderStatus', {
          initialValue: isAllow || 1
        })(
          <RadioGroup onChange={this.handleIsAllow}>
            <Radio value={1}>是</Radio>
            <Radio value={2}>否</Radio>
          </RadioGroup>
        )}
      </FormItem>
      <FormItem {...layout.full} label='下单状态'>
        {orderStatusView(orderStatus, orderStatusReason)}
      </FormItem>
      <FormItem {...layout.full} label='选择账号状态'>
        {getFieldDecorator('forceSaleStatus', {
          valuePropName: 'checked',
          initialValue: forcedOrder
        })(
          <Checkbox onChange={this.handleForcedOrder}>强制可下单</Checkbox>)}
      </FormItem>
      <FormItem {...layout.full} label=' ' colon={false}>
        <Alert message={
          <span>保存后，<b>{viewStatus}</b></span>
        } type="info" showIcon />
      </FormItem>
      <Divider dashed />
    </div>;
  }
}

// 预约报价展示态
export class FamousPriceView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const {
      children, priceKeys, data: { accountInfo, priceInfo }
    } = this.props;
    const {
      priceValidFrom,
      priceValidTo,
      nextPriceValidFrom,
      nextPriceValidTo,
      reviewStatus,
      reviewFailReason,
      skuList
    } = priceInfo;
    let nowVal = {}, nextVal = {};
    skuList && skuList.forEach(({ skuTypeId, costPriceRaw, nextCostPriceRaw }) => {
      nowVal[skuTypeId] = costPriceRaw;
      nextVal[skuTypeId] = nextCostPriceRaw;
    });
    return <div>
      <FieldView width={80} title="本期有效期" value={
        <div>
          <span>{dateDisplay(priceValidFrom, 10)}</span>
          <span className='m10-e'>至</span>
          <span>{dateDisplay(priceValidTo, 10)}</span>
        </div>
      } />
      <FieldView width={80} title="账号报价" value={
        <PriceTable style={{ lineHeight: '40px' }} isEdit={false} priceKeys={['costPriceRaw', 'channelPrice', 'publicationPrice']}
          value={skuList} />
      } />
      {nextPriceValidFrom ? <div>
        <FieldView width={80} title="下期有效期" value={
          <div>
            <span>{nextPriceValidFrom || '-'}</span>
            <span className='m10-e'>至</span>
            <span>{nextPriceValidTo || '-'}</span>
          </div>
        } />
        <FieldView width={80} title="下期报价" value={
          <PriceTable style={{ lineHeight: '40px' }} isEdit={false} priceKeys={['nextCostPriceRaw', 'nextChannelPrice', 'nextPublicationPrice']} value={skuList} />
        } />
        <FieldView width={80} title="审核状态" value={
          approvalStatus(reviewStatus, reviewFailReason)
        } />
      </div> : <FieldView width={80} title="下期报价" value={'无'} />}
      <Divider dashed />
      {children}
    </div>;
  }
}

// 派单报价展示态
export class NamelessPriceView extends Component {
  render() {
    const {
      children, priceList,
      data: { priceInfo }
    } = this.props;
    const {
      skuList,
      partnerType,
      invoiceType,
      taxRate,
    } = priceInfo;
    let val = {};
    skuList && skuList.forEach(({ skuTypeId, costPriceRaw }) => {
      val[skuTypeId] = costPriceRaw;
    });
    return <div>
      <FieldView width={80} title="账号报价" value={
        <PriceTable
          partnerType={partnerType}
          invoiceType={invoiceType}
          taxRate={taxRate}
          style={{ lineHeight: '40px' }}
          isEdit={false}
          priceKeys={['costPriceRaw', 'channelPrice', 'publicationPrice']}
          value={priceList}
        />
      } />
      <Divider dashed />
      {children}
    </div>
  }
}
