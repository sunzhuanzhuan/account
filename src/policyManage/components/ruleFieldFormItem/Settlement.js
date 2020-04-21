/**
 * Created by lzb on 2020-04-20.
 */
import React, { useState } from 'react';
import { Button, Radio, InputNumber, Form, Switch, Input } from 'antd'

import {
  ruleDiscount,
  RULE_DISCOUNT_RATIO, RULE_DISCOUNT_NUMERIC
} from '../../constants/dataConfig'

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 }
};

export const Settlement = (props) => {
  const { rebateRule = {} } = props;
  const { discountType, discountFixedRatio, discountFixedAmount } = rebateRule || {};

  const { getFieldDecorator, getFieldValue } = props.form;
  const [ hasDiscount, setHasDiscount ] = useState(!!discountType);

  return <div>
    <Form.Item label='返点结算周期：' {...formItemLayout}>
      {
        getFieldDecorator('rebateSettlementCycle', {
          initialValue: rebateRule.rebateSettlementCycle,
          rules: [ { required: true, message: '结算周期必填' } ]
        })(
          <Radio.Group options={[ { label: '月', value: 1 }, { label: '季', value: 2 }, {
            label: '半年',
            value: 3
          }, { label: '年', value: 4 } ]} />
        )
      }
    </Form.Item>
    <Form.Item label='阶梯返点结算' {...formItemLayout}>
      {
        getFieldDecorator('stepRebateSettlementType', {
          initialValue: rebateRule.stepRebateSettlementType
        })(<Radio.Group options={[ { label: '阶梯收入计算', value: 1 }, {
          label: '全量收入计算',
          value: 2
        } ]} />)
      }
      <cite className='eg-explain'>例：0-100返点3%，100及以上返点5%，博主总收入150<br />
        阶梯收入计算=（100*3%）+（50*5%）<br />
        全量收入计算=150*5%
      </cite>
    </Form.Item>
    <Form.Item label='保底政策' {...formItemLayout}>
      {
        getFieldDecorator('isGuaranteed', {
          initialValue: rebateRule.isGuaranteed === 1,
          valuePropName: 'checked'
        })(
          <Switch checkedChildren="开" unCheckedChildren="关" />
        )
      }
    </Form.Item>
    {getFieldValue('isGuaranteed') && <Form.Item label='保底金额' {...formItemLayout}>
      {
        getFieldDecorator('guaranteedMinAmount', { initialValue: rebateRule.guaranteedMinAmount })(
          <InputNumber style={{ width: 400 }} max={9999999999} suffix="元" />
        )
      }
    </Form.Item>}
    {getFieldValue('isGuaranteed') && <Form.Item label='保底备注' {...formItemLayout}>
      {
        getFieldDecorator('guaranteedRemark', { initialValue: rebateRule.guaranteedRemark })(
          <Input.TextArea rows={4} style={{ width: 400 }} suffix="元" />
        )
      }
    </Form.Item>}
  </div>
}

export const DiscountView = (props) => {
  const { data = {} } = props;
  const { discountType, discountFixedRatio, discountFixedAmount } = data;
  return <Form.Item label={'折扣：'} className='platform-wrap' {...formItemLayout}>
    {
      <div className='item-wrap' style={{ background: '#f7fbff' }}>
        <Form.Item label="类型：" {...formItemLayout}>
          {discountType == RULE_DISCOUNT_RATIO ? '固定比例' : '固定扣减'}
        </Form.Item>
        <Form.Item label='公式：' {...formItemLayout}>
          {discountType == RULE_DISCOUNT_RATIO ?
            <span>刊例价 X {discountFixedRatio}% = 账号报价</span> :
            <span>刊例价 - {discountFixedAmount}元 = 账号报价</span>
          }
        </Form.Item>
      </div>
    }
  </Form.Item>
}

