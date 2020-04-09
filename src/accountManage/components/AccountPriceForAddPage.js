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
import { checkPriceList, PriceTable } from "@/accountManage/components/common/AccountPrice";


const RadioGroup = Radio.Group;
const FormItem = Form.Item;

// 派单报价
export class NamelessPrice extends Component {
  render() {
    const {
      getFieldDecorator, formItemLayout, children, isUpdate, priceList, data: { accountInfo, priceInfo }
    } = this.props;
    const {
      partnerType,
      invoiceType,
      taxRate
    } = priceInfo;
    let val = {};

    const invoiceInfo = <div>
      {partnerType ? <span>{partnerType == 1 ? '报价含税（' : '报价不含税'}
        {partnerType == 1 ? invoiceType == 1 ? '回票类型：增值税专用发票' : '回票类型：增值税普通发票）' : null}
        {partnerType == 1 && invoiceType == 1 ? '，发票税率：' + taxRate * 100 + '%)' : null}
      </span> : null}
    </div>

    return <div className=''>
      <FormItem {...formItemLayout} label='账号报价'>
        {invoiceInfo}
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
      </FormItem>
      {children}
    </div>;
  }
}
