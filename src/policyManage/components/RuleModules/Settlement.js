/**
 * Created by lzb on 2020-04-20.
 */
import React, { useState } from 'react';
import { Button, Radio, InputNumber, Form, Switch, Input, Descriptions } from 'antd'

import {
  ruleDiscount,
  RULE_DISCOUNT_RATIO, RULE_DISCOUNT_NUMERIC, REBATE_SETTLEMENT_CYCLE, STEP_REBATE_SETTLEMENT_TYPES
} from '../../constants/dataConfig'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

export const Settlement = (props) => {
  const { data = {} } = props;

  const { getFieldDecorator, getFieldValue } = props.form;
  const [ hasSettlement, setHasSettlement ] = useState(!!data.rebateSettlementCycle);

  return <Form.Item label='返点规则'>
    {
      hasSettlement ?
        <div style={{ position: "relative", width: 620 }}>
          <Form.Item label='返点结算周期：' {...formItemLayout}>
            {
              getFieldDecorator('rebateSettlementCycle', {
                initialValue: data.rebateSettlementCycle,
                rules: [ { required: true, message: '结算周期必填' } ]
              })(
                <Radio.Group options={
                  Object.entries(REBATE_SETTLEMENT_CYCLE).map(([ value, label ]) => ({
                    label,
                    value: parseInt(value)
                  }))}
                />
              )
            }
          </Form.Item>
          <Form.Item label='阶梯返点结算' {...formItemLayout}>
            {
              getFieldDecorator('stepRebateSettlementType', {
                initialValue: data.stepRebateSettlementType,
                rules: [ { required: true, message: '阶梯返点结算必填' } ]
              })(
                <Radio.Group options={
                  Object.entries(STEP_REBATE_SETTLEMENT_TYPES).map(([ value, label ]) => ({
                    label,
                    value: parseInt(value)
                  }))
                }
                />
              )
            }
            <cite className='eg-explain'>例：0-100返点3%，100及以上返点5%，博主总收入150<br />
              阶梯收入计算=（100*3%）+（50*5%）<br />
              全量收入计算=150*5%
            </cite>
          </Form.Item>
          <Form.Item label='保底政策' {...formItemLayout}>
            {
              getFieldDecorator('isGuaranteed', {
                initialValue: data.isGuaranteed === 1,
                valuePropName: 'checked'
              })(
                <Switch checkedChildren="开" unCheckedChildren="关" />
              )
            }
          </Form.Item>
          {getFieldValue('isGuaranteed') && <Form.Item label='保底金额' {...formItemLayout}>
            {
              getFieldDecorator('guaranteedMinAmount', { initialValue: data.guaranteedMinAmount })(
                <InputNumber style={{ width: 400 }} max={9999999999} suffix="元" />
              )
            }
          </Form.Item>}
          {getFieldValue('isGuaranteed') && <Form.Item label='保底备注' {...formItemLayout}>
            {
              getFieldDecorator('remark', { initialValue: data.remark })(
                <Input.TextArea rows={4} style={{ width: 400 }} suffix="元" />
              )
            }
          </Form.Item>}
          <Button onClick={() => setHasSettlement(false)} style={{
            position: 'absolute',
            right: 0,
            top: 0
          }} type="link">删除</Button>
        </div> :
        <Button icon="plus" type='link' onClick={() => setHasSettlement(true)}>添加规则</Button>}
  </Form.Item>
}

export const SettlementView = (props) => {
  const { data = {} } = props;
  const { remark, guaranteedMinAmount, isGuaranteed, stepRebateSettlementType, rebateSettlementCycle } = data;
  return (
    <Descriptions column={2}>
      <Descriptions.Item label="返点结算周期">
        {REBATE_SETTLEMENT_CYCLE[rebateSettlementCycle]}
      </Descriptions.Item>
      <Descriptions.Item label="阶梯返点结算">
        {STEP_REBATE_SETTLEMENT_TYPES[stepRebateSettlementType]}
      </Descriptions.Item>
      {
        isGuaranteed === 1 && <>
          <Descriptions.Item label="保底金额">
            {guaranteedMinAmount}
          </Descriptions.Item>
          <Descriptions.Item label="保底备注">
            {remark}
          </Descriptions.Item>
        </>
      }
    </Descriptions>
  )
}

