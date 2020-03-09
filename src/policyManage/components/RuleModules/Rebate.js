import React, { useState } from 'react';
import { Button, Radio, InputNumber, Form } from 'antd'
import { LadderRatioEdit, LadderRatioView } from './LadderRatio'
import {
  ruleRebate,
  Rule_Rebate_Ratio,
  Rule_Rebate_Numeric,
} from '../../constants/dataConfig'

const { _ } = window;

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

export const RebateEdit = (props) => {
  const { form, currentRule = {} } = props;
  const [rebateRule, setRebateRule] = useState(currentRule.rebateRule || {})
  const { rebateType, rebateStepRules = [] } = rebateRule;
  const { getFieldDecorator } = form;
  const [type, useType] = useState(rebateType || Rule_Rebate_Ratio)
  const isEdit = !_.isEmpty(rebateRule);
  const [visible, setVisible] = useState(isEdit);


  const rebateNumbers = rebateStepRules.length == 0 ? [0, 9999999999] : rebateStepRules.reduce((acc, cur) => {
    acc.push(cur.amountHighLimit);
    return acc;
  }, [0]);
  const percentage = rebateStepRules.map(item => item.rebateRatio)


  const onTypeChange = e => {
    useType(e.target.value)
  }

  const checkRebateStepRules = (rule, value, callback) => {
    const { rebateNumbers } = value;
    const isBetterZero = value.percentage.every(item => item <= 100);
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
  return <Form.Item label={'返点：'} className='platform-wrap' {...formItemLayout}>
    {(!visible) ? <Button type='link' onClick={() => setVisible(true)}>+添加折扣</Button> :
      <div className='item-wrap' style={{ background: '#f7fbff' }}>
        <Form.Item label='类型：' {...formItemLayout}>
          {
            getFieldDecorator("rebateRule.rebateType", {
              initialValue: rebateRule.rebateType, rules: [{ required: true, message: '类型必填' }]
            })(<Radio.Group options={ruleRebate} onChange={onTypeChange} />)
          }

        </Form.Item>
        <div>
          {type == Rule_Rebate_Ratio ?
            <Form.Item label='公式：' {...formItemLayout}>
              执行完成订单时博主收入，返点比例为：{
                getFieldDecorator("rebateRule.rebateFixedRatio", {
                  initialValue: rebateRule.rebateFixedRatio,
                  rules: [{ required: true, message: '返点比例必填' }]
                })(
                  <InputNumber
                    precision={0}
                    max={100} style={{ width: 120 }}
                  />
                )}%
            </Form.Item> : type == Rule_Rebate_Numeric ?
              <Form.Item label='公式：' {...formItemLayout}>
                执行完成订单时博主收入，返点金额为：{
                  getFieldDecorator("rebateRule.rebateFixedAmount", {
                    initialValue: rebateRule.rebateFixedAmount,
                    rules: [{ required: true, message: '返点金额必填' }]
                  })(
                    <InputNumber
                      style={{ width: 120 }}
                    />
                  )
                }元
              </Form.Item> :
              <Form.Item label="公式：" {...formItemLayout}>
                {getFieldDecorator("rebateRule.rebateStepRules", {
                  initialValue: { rebateNumbers, percentage },
                  rules: [{ validator: checkRebateStepRules }]
                })(<LadderRatioEdit />)}
              </Form.Item>
          }
        </div>
        <Form.Item label='结算周期：' {...formItemLayout}>
          {
            getFieldDecorator('rebateRule.rebateSettlementCycle', {
              initialValue: rebateRule.rebateSettlementCycle, rules: [{ required: true, message: '结算周期必填' }]
            })(
              <Radio.Group options={[{ label: '月', value: 1 }, { label: '季', value: 2 }, { label: '半年', value: 3 }, { label: '年', value: 4 }]} />
            )
          }
        </Form.Item>
        <Button onClick={() => { setVisible(false); setRebateRule({}) }} style={{ position: 'absolute', right: 0, top: 0 }} type="link" >删除</Button>
      </div>
    }

  </Form.Item>
}

export const RebateView = (props) => {
  const { data = {} } = props;
  const { rebateType, rebateFixedRatio, rebateFixedAmount, rebateStepRules = [] } = data;
  const rebateTypeName = rebateType == Rule_Rebate_Ratio ? '固定比例' : rebateType == Rule_Rebate_Numeric ? '固定扣减' : '阶梯比例';

  const rebateNumbers = rebateStepRules.reduce((acc, cur) => {
    acc.push(cur.amountHighLimit);
    return acc;
  }, [0]);
  const percentage = rebateStepRules.map(item => item.rebateRatio)

  return <Form.Item label={'返点：'} className='platform-wrap' {...formItemLayout}>
    <div className='item-wrap' style={{ background: '#f7fbff' }}>
      <Form.Item label='类型：' {...formItemLayout}>
        {rebateTypeName}
      </Form.Item>
      {<Form.Item label='公式：' {...formItemLayout}>
        {rebateType == Rule_Rebate_Ratio ?
          <span>执行完成订单时博主收入，返点比例为：{rebateFixedRatio}%</span> :
          rebateType == Rule_Rebate_Numeric ?
            <span>执行完成订单时博主收入，返点金额为：{rebateFixedAmount}元</span> :
            <LadderRatioView
              rebateNumbers={rebateNumbers}
              percentage={percentage}
            />
        }
      </Form.Item>}
    </div>
  </Form.Item>
}
