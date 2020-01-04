import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Tag, Modal, Checkbox, Radio, Input, Icon, InputNumber, Form, Select } from 'antd'
import { LadderRatioEdit, LadderRatioView } from './LadderRatio'
import {
  ruleDiscount,
  Rule_Discount_Ratio,
  Rule_Discount_Numeric,

  ruleRebate,
  Rule_Rebate_Ratio,
  Rule_Rebate_Numeric,
  Rule_Rebate_LadderRatio
} from '../../constants/dataConfig'

const { _ } = window;
const platformList = [
  { id: 1, name: '新浪微博' },
  { id: 2, name: '微信' },
  { id: 3, name: '秒拍' },
  { id: 4, name: '美拍' },
  { id: 5, name: '今日头条' },
  { id: 6, name: '小红书' }

];
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

export const RebateEdit = (props) => {
  const { form, currentRule = {} } = props;
  // const { rebateRule = {} } = currentRule;
  const [rebateRule, setRebateRule] = useState(currentRule.rebateRule || {})
  const { rebateType, rebateStepRules = [] } = rebateRule;
  const { getFieldDecorator } = form;
  const [type, useType] = useState(rebateType || Rule_Rebate_Ratio)
  const [ratio, useRatio] = useState();
  const [numeric, useNumeric] = useState();

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
  const onRatioChange = e => {
    // console.log('onRatioChange', e.target.value);
    // useRatio(e.target.value)
  };
  const onNumericChange = e => {
    // console.log('onNumericChange', e.target.value);
    // useNumeric(e.target.value)
  }
  // handleSubmit = e => {
  //     e.preventDefault();
  //     console.log("000011");
  //     this.props.form.validateFields((err, values) => {
  //       console.log(err);
  //       if (!err) {
  //         console.log("Received values of form: ", values);
  //       }
  //     });
  //   };

  const checkPrice = (rule, value, callback) => {
    // console.log("-----", rule, value);
    if (rule.field == 'rebateRule.rebateFixedRatio') {
      value
    }

    callback('报错');
  };
  const checkRebateStepRules = (rule, value, callback) => {
    const { rebateNumbers } = value;
    const isBetterZero = value.percentage.every(item => item <= 100);
    // console.log("isBetterZero", isBetterZero);
    if (!isBetterZero) {
      callback("返点比例必须大于0，小于等于100");
      return;
    }

    for (let i = rebateNumbers.length; i > 0; i--) {
      // console.log(i, rebateNumbers, rebateNumbers[i - 1], rebateNumbers[i]);
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
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                    max={100} style={{ width: 120 }} onChange={onRatioChange}
                  />
                )}
            </Form.Item> : type == Rule_Rebate_Numeric ?
              <Form.Item label='公式：' {...formItemLayout}>
                执行完成订单时博主收入，返点金额为：{
                  getFieldDecorator("rebateRule.rebateFixedAmount", {
                    initialValue: rebateRule.rebateFixedAmount,
                    rules: [{ required: true, message: '返点金额必填' }]
                  })(
                    <InputNumber
                      style={{ width: 120 }}
                      formatter={value => `${value}元`}
                      parser={value => value.replace('元', '')}
                      onChange={onNumericChange}
                    />
                  )
                }
              </Form.Item> :
              <Form.Item label="公式：" {...formItemLayout}>
                {getFieldDecorator("rebateRule.rebateStepRules", {
                  initialValue: { rebateNumbers, percentage },
                  rules: [{ validator: checkRebateStepRules }]
                })(<LadderRatioEdit />)}
              </Form.Item>
          }
        </div>
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
