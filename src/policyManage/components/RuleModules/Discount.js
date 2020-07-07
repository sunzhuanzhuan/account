import React, { useState } from 'react';
import { Button, Radio, InputNumber, Form } from 'antd'
import {
  ruleDiscount,
  RULE_DISCOUNT_RATIO, RULE_DISCOUNT_NUMERIC
} from '../../constants/dataConfig'
import { discountRuleDisplay, ruleDisplay } from "@/policyManage/utils";
import InputPercent from "@/base/InputPercent";
import InputAmount from "@/base/InputAmount";

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 }
};

export const DiscountEdit = (props) => {
  const { rule, fieldKeyPrefix = "" } = props;
  const { discountType, discountFixedRatio, discountFixedAmount } = rule || {};

  const { getFieldDecorator, getFieldValue } = props.form;
  const [ hasDiscount, setHasDiscount ] = useState(!!discountType);

  return <Form.Item label="折扣" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
    {
      hasDiscount ?
        <div style={{ background: '#f7fbff', position: "relative" }}>
          <Form.Item label="类型"  {...formItemLayout}>
            {getFieldDecorator(fieldKeyPrefix + 'discountRule.discountType', {
              initialValue: discountType || RULE_DISCOUNT_RATIO,
              rules: [ { required: true, message: '请选择折扣类型!' } ]
            })(
              <Radio.Group options={ruleDiscount} />
            )}
          </Form.Item>
          {
            getFieldValue(fieldKeyPrefix + "discountRule.discountType") === RULE_DISCOUNT_RATIO &&
            <Form.Item label='公式' {...formItemLayout}>
              <span>刊例价 X {getFieldDecorator(fieldKeyPrefix + `discountRule.discountFixedRatio`, {
                initialValue: discountFixedRatio,
                rules: [ { required: true, message: '请输入固定比例值' } ]
              })(
                <InputPercent
                  max={100}
                  min={0}
                  step={1}
                  precision={0}
                  style={{ width: 100 }}
                />
              )} % = 账号报价</span>
            </Form.Item>
          }
          {
            getFieldValue(fieldKeyPrefix + "discountRule.discountType") === RULE_DISCOUNT_NUMERIC &&
            <Form.Item label='公式' {...formItemLayout}>
                  <span>刊例价 - {getFieldDecorator(fieldKeyPrefix + 'discountRule.discountFixedAmount', {
                    initialValue: discountFixedAmount,
                    rules: [ { required: true, message: '请输入固定扣减值!' } ]
                  })(
                    <InputAmount
                      style={{ width: 100 }}
                      min={1}
                      max={9999999}
                    />
                  )}元 = 账号报价</span>
            </Form.Item>
          }
          <Button onClick={() => setHasDiscount(false)} style={{
            position: 'absolute',
            right: 0,
            top: 0
          }} type="link">删除</Button>
        </div> :
        <Button type='link' icon="plus" onClick={() => setHasDiscount(true)}>添加折扣</Button>
    }
  </Form.Item>
}

export const DiscountView = (props) => {
  const { rule = {} } = props;
  const {
    discountRuleLabel,
    discountRuleValue
  } = discountRuleDisplay(rule)

  return (
    discountRuleLabel ? <>
      <span>{discountRuleLabel}</span><span>{discountRuleValue}</span>；
    </> : <span />
  )
}
