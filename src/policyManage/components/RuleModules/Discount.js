import React, { useState } from 'react';
import { Button, Radio, InputNumber, Form } from 'antd'

import {
  ruleDiscount,
  RULE_DISCOUNT_RATIO,
} from '../../constants/dataConfig'
const { _ } = window;
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

export const DiscountEdit = (props) => {
  const { currentRule = {} } = props;
  const [discountRule, setDiscountRule] = useState(currentRule.discountRule || {})
  const { discountType = RULE_DISCOUNT_RATIO, discountFixedRatio, discountFixedAmount } = discountRule;

  const isEdit = !_.isEmpty(discountRule);
  const { getFieldDecorator } = props.form;
  const [type, useType] = useState(discountType)
  const [visible, setVisible] = useState(isEdit);

  const onDiscountRatioChange = e => {
    useType(e.target.value)
  }
  return <Form.Item label={'折扣：'} className='platform-wrap' {...formItemLayout}>
    {(!visible) ? <Button type='link' onClick={() => setVisible(true)}>+添加折扣</Button> :
      <div className='item-wrap' style={{ background: '#f7fbff' }}>
        <Form.Item label="类型：" {...formItemLayout}>
          {getFieldDecorator('discountRule.discountType', {
            initialValue: discountType,
            rules: [{ required: true, message: '请选择折扣类型!' }],
          })(
            <Radio.Group options={ruleDiscount} onChange={onDiscountRatioChange} />
          )}
        </Form.Item>
        {
          type == RULE_DISCOUNT_RATIO ?
            <Form.Item label='公式：' {...formItemLayout}>
              <span>刊例价 X {getFieldDecorator(`discountRule.discountFixedRatio`, {
                initialValue: discountFixedRatio,
                rules: [{ required: true, message: '请输入固定比例值' }],
              })(
                <InputNumber
                  max={100}
                  precision={0}
                  style={{ width: 100 }}
                />)}% = 账号报价</span>
            </Form.Item> :
            <Form.Item label='公式：' {...formItemLayout}>
              <span>
                刊例价 -
                                {getFieldDecorator('discountRule.discountFixedAmount', {
                  initialValue: discountFixedAmount,
                  rules: [{ required: true, message: '请输入固定扣减值!' }],
                })(
                  <InputNumber
                    style={{ width: 100 }} />
                )}
                元 = 账号报价
                        </span>
            </Form.Item>
        }
        <Button onClick={() => { setVisible(false); setDiscountRule({}) }} style={{ position: 'absolute', right: 0, top: 0 }} type="link" >删除</Button>
      </div>
    }

  </Form.Item >
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

  </Form.Item >
}
