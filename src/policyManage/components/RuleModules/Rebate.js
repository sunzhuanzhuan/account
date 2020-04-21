import React, { useEffect, useState } from 'react';
import { Button, Radio, InputNumber, Form, Switch, Input } from 'antd'
import { LadderRatioEdit, LadderRatioView } from './LadderRatio'
import {
  ruleRebate,
  RULE_REBATE_RATIO,
  RULE_REBATE_NUMERIC, REBATE_SETTLEMENT_CYCLE, RULE_REBATE_LADDER
} from '../../constants/dataConfig'


const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

export const RebateEdit = (props) => {
  const { rule, fieldKeyPrefix = "" } = props;
  const { rebateType, rebateStepRules = [] } = rule || {};

  const { getFieldDecorator, getFieldValue } = props.form;
  const [hasRebate, setHasRebate] = useState(!!rebateType);


  const rebateNumbers = rebateStepRules.length === 0 ? [0, 9999999999] : rebateStepRules.reduce((acc, cur) => {
    acc.push(cur.amountHighLimit);
    return acc;
  }, [0]);
  const percentage = rebateStepRules.map(item => item.rebateRatio)


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
  return <Form.Item label="返点" labelCol={{ span: 1 }}>
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
                initialValue: null,
                rules: [ { required: true, message: '返点比例必填' } ]
              })(
                <InputNumber
                  precision={0}
                  max={100} style={{ width: 120 }}
                />
              )}%
            </Form.Item>
          }
          {
            getFieldValue(fieldKeyPrefix + "rebateRule.rebateType") === RULE_REBATE_NUMERIC &&
            <Form.Item label='公式：' {...formItemLayout}>
              执行完成订单时博主收入，返点金额为：{
              getFieldDecorator(fieldKeyPrefix + "rebateRule.rebateFixedAmount", {
                initialValue: null,
                rules: [ { required: true, message: '返点金额必填' } ]
              })(
                <InputNumber
                  style={{ width: 120 }}
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
        <Button type='link' onClick={() => setHasRebate(true)}>+添加折扣</Button>
    }
  </Form.Item>
}

export const RebateView = (props) => {
  const { data = {} } = props;
  const { rebateType, rebateFixedRatio, rebateFixedAmount, rebateStepRules = [] } = data;
  const rebateTypeName = rebateType == RULE_REBATE_RATIO ? '固定比例' : rebateType == RULE_REBATE_NUMERIC ? '固定扣减' : '阶梯比例';

  const rebateNumbers = rebateStepRules.reduce((acc, cur) => {
    acc.push(cur.amountHighLimit);
    return acc;
  }, [0]);
  const percentage = rebateStepRules.map(item => item.rebateRatio)

  const isGuaranteedBool = data.isGuaranteed === 1

  return <Form.Item label={'返点：'} className='platform-wrap' labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
    <div className='item-wrap' style={{ background: '#f7fbff' }}>
      <Form.Item label='类型：' {...formItemLayout}>
        {rebateTypeName}
      </Form.Item>
      <Form.Item label='公式：' {...formItemLayout}>
        {rebateType == RULE_REBATE_RATIO ?
          <span>执行完成订单时博主收入，返点比例为：{rebateFixedRatio}%</span> :
          rebateType == RULE_REBATE_NUMERIC ?
            <span>执行完成订单时博主收入，返点金额为：{rebateFixedAmount}元</span> :
            <LadderRatioView
              rebateNumbers={rebateNumbers}
              percentage={percentage}
            />
        }
      </Form.Item>
      {
        props.type === "global" && <div>
          <Form.Item label='返点结算周期' {...formItemLayout}>
            {
              REBATE_SETTLEMENT_CYCLE[data.rebateSettlementCycle]
            }

          </Form.Item>
          <Form.Item label='阶梯返点结算' {...formItemLayout}>
            {data.stepRebateSettlementType == 1 ? '阶梯收入计算' : '全量收入计算'}
            <cite className='eg-explain'>例：0-100返点3%，100及以上返点5%，博主总收入150<br />
              阶梯收入计算=（100*3%）+（50*5%）<br />
              全量收入计算=150*5%
            </cite>
          </Form.Item>
          <Form.Item label='保底政策' {...formItemLayout}>
            {isGuaranteedBool ? '开' : '关'}
          </Form.Item>
          {isGuaranteedBool && <Form.Item label='保底金额' {...formItemLayout}>
            {data.guaranteedMinAmount}元
          </Form.Item>}
          {isGuaranteedBool && <Form.Item label='保底备注' {...formItemLayout}>
            {data.guaranteedRemark}
          </Form.Item>}
          <Form.Item label='合同附件' {...formItemLayout}>
            <a href={data.contractFileUrl}>{data.contractFileName}</a>
          </Form.Item>
        </div>
      }
    </div>
  </Form.Item>
}
