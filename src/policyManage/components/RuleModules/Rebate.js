import React, { useEffect, useState } from 'react';
import { Button, Radio, InputNumber, Form, Switch, Input } from 'antd'
import { LadderRatioEdit, LadderRatioView } from './LadderRatio'
import {
  ruleRebate,
  RULE_REBATE_RATIO,
  RULE_REBATE_NUMERIC, REBATE_SETTLEMENT_CYCLE, RULE_REBATE_LADDER
} from '../../constants/dataConfig'
import numeral from "numeral";
import { discountRuleDisplay, rebateRuleDisplay } from "@/policyManage/utils";
import InputPercent from "@/base/InputPercent";
import InputAmount from "@/base/InputAmount";


const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

export const RebateEdit = (props) => {
  const { rule, fieldKeyPrefix = "" } = props;
  const { rebateType, rebateFixedRatio, rebateFixedAmount,  rebateStepRules = [] } = rule || {};

  const { getFieldDecorator, getFieldValue } = props.form;
  const [hasRebate, setHasRebate] = useState(!!rebateType);


  const rebateNumbers = rebateStepRules.length === 0 ? [0, 9999999999] : rebateStepRules.reduce((acc, cur) => {
    acc.push(cur.amountHighLimit);
    return acc;
  }, [0]);
  const percentage = rebateStepRules.map(item => item.rebateRatio)


  const checkRebateStepRules = (rule, value, callback) => {
    const { rebateNumbers } = value;
    const isBetterZero = value.percentage.every(item => item <= 1);
    if (!isBetterZero) {
      callback("返点比例必须大于等于0，小于等于100");
      return;
    }

    for (let i = rebateNumbers.length; i > 0; i--) {
      if (rebateNumbers[i - 1] > rebateNumbers[i]) {
        callback("后面的值必须大于前面的值");
      }
    }
    callback();
  }
  return <Form.Item label="返点" labelCol={{ span: 1 }}  wrapperCol={{span: 23}}>
    {
      hasRebate ?
        <div style={{ background: '#f7fbff', position: "relative" }}>
          <Form.Item label='类型：' {...formItemLayout}>
            {
              getFieldDecorator(fieldKeyPrefix + "rebateRule.rebateType", {
                initialValue: rebateType || RULE_REBATE_RATIO,
                rules: [ { required: true, message: '请选择返点类型' } ]
              })(
                <Radio.Group options={ruleRebate} />
              )}
          </Form.Item>
          {
            getFieldValue(fieldKeyPrefix + "rebateRule.rebateType") === RULE_REBATE_RATIO &&
            <Form.Item label='公式：' {...formItemLayout}>
              执行完成订单时博主收入，返点比例为：{
              getFieldDecorator(fieldKeyPrefix + "rebateRule.rebateFixedRatio", {
                initialValue: rebateFixedRatio,
                rules: [ { required: true, message: '返点比例必填' } ]
              })(
                <InputPercent
                  max={100}
                  min={0}
                  step={1}
                  precision={0}
                  style={{ width: 100 }}
                />
              )} %
            </Form.Item>
          }
          {
            getFieldValue(fieldKeyPrefix + "rebateRule.rebateType") === RULE_REBATE_NUMERIC &&
            <Form.Item label='公式：' {...formItemLayout}>
              执行完成订单时博主收入，返点金额为：{
              getFieldDecorator(fieldKeyPrefix + "rebateRule.rebateFixedAmount", {
                initialValue: rebateFixedAmount,
                rules: [ { required: true, message: '返点金额必填' } ]
              })(
                <InputAmount
                  style={{ width: 120 }}
                  min={0}
                  precision={0}
                  max={9999999}
                />
              )
            }元
            </Form.Item>
          }
          {
            getFieldValue(fieldKeyPrefix + "rebateRule.rebateType") === RULE_REBATE_LADDER &&
            <Form.Item label="公式：" {...formItemLayout}>
              {getFieldDecorator(fieldKeyPrefix + "rebateRule.rebateStepRules", {
                initialValue: { rebateNumbers, percentage },
                rules: [
                  { required: true, validator: checkRebateStepRules }
                ]
              })(<LadderRatioEdit />)}
            </Form.Item>
          }
          <Button onClick={() => setHasRebate(false)} style={{
            position: 'absolute',
            right: 0,
            top: 0
          }} type="link">删除</Button>
        </div> :
        <Button icon="plus" type='link' onClick={() => setHasRebate(true)}>添加返点</Button>
    }
  </Form.Item>
}

export const RebateView = (props) => {
  const { rule = {} } = props;
  const {
    rebateRuleLabel,
    rebateRuleValue
  } = rebateRuleDisplay(rule)

  return (
    rebateRuleLabel ? <>
      <span>{rebateRuleLabel}</span><span>{rebateRuleValue}</span>
    </> : <span/>
  )
}
