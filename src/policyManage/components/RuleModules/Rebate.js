import React, { useEffect, useState } from 'react';
import { Button, Radio, InputNumber, Form, Switch, Input } from 'antd'
import { LadderRatioEdit, LadderRatioView } from './LadderRatio'
import {
  ruleRebate,
  Rule_Rebate_Ratio,
  Rule_Rebate_Numeric, transBool, REBATE_SETTLEMENT_CYCLE
} from '../../constants/dataConfig'
import { OssUpload } from "wbyui";
import { ModuleHeader } from "@/components/ModuleHeader";
const { TextArea } = Input

const { _ } = window;

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 },
};

export const RebateEdit = (props) => {
  const { form, currentRule = {} } = props;
  const [rebateRule, setRebateRule] = useState(currentRule.rebateRule || {})
  const { rebateType, rebateStepRules = [] } = rebateRule;
  const { getFieldDecorator, getFieldValue } = form;
  const [type, useType] = useState(rebateType || Rule_Rebate_Ratio)
  const isEdit = !_.isEmpty(rebateRule);
  const [visible, setVisible] = useState(isEdit);
  const [authToken, setAuthToken] = useState("")


  useEffect(() => {
    props.getNewToken().then(({ data: authToken }) => {
      setAuthToken(authToken);
    });
  }, []);

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
  return <Form.Item label={'返点：'} className='platform-wrap' labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
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
        {props.type === "global" && <div>
          <Form.Item label='返点结算周期：' {...formItemLayout}>
            {
              getFieldDecorator('rebateRule.rebateSettlementCycle', {
                initialValue: rebateRule.rebateSettlementCycle, rules: [{ required: true, message: '结算周期必填' }]
              })(
                <Radio.Group options={[{ label: '月', value: 1 }, { label: '季', value: 2 }, { label: '半年', value: 3 }, { label: '年', value: 4 }]} />
              )
            }
          </Form.Item>
          <Form.Item label='阶梯返点结算' {...formItemLayout}>
            {
              getFieldDecorator('rebateRule.stepRebateSettlementType', {
                initialValue: rebateRule.stepRebateSettlementType
              })(<Radio.Group options={[{ label: '阶梯收入计算', value: 1 }, { label: '全量收入计算', value: 2 }]} />)
            }
            <cite className='eg-explain'>例：0-100返点3%，100及以上返点5%，博主总收入150<br />
              阶梯收入计算=（100*3%）+（50*5%）<br />
              全量收入计算=150*5%
            </cite>

          </Form.Item>
          <Form.Item label='保底政策' {...formItemLayout}>
            {
              getFieldDecorator('rebateRule.isGuaranteed', {
                initialValue: rebateRule.isGuaranteed === 1,
                valuePropName: 'checked'
              })(
                <Switch checkedChildren="开" unCheckedChildren="关" />
              )
            }
          </Form.Item>
          {getFieldValue('rebateRule.isGuaranteed') && <Form.Item label='保底金额' {...formItemLayout}>
            {
              getFieldDecorator('rebateRule.guaranteedMinAmount', { initialValue: rebateRule.guaranteedMinAmount })(
                <InputNumber style={{ width: 400 }} max={9999999999} suffix="元" />
              )
            }
          </Form.Item>}
          {getFieldValue('rebateRule.isGuaranteed') && <Form.Item label='保底备注' {...formItemLayout}>
            {
              getFieldDecorator('rebateRule.guaranteedRemark', { initialValue: rebateRule.guaranteedRemark })(
                <Input.TextArea rows={4} style={{ width: 400 }} suffix="元" />
              )
            }
          </Form.Item>}
          <Form.Item label='合同附件' {...formItemLayout}>
            {getFieldDecorator('rebateRule.contractFile', {
              valuePropName: 'fileList',
              getValueFromEvent: e => e && e.fileList,
              initialValue: rebateRule.contractFileUrl ?
                [{
                  uid: '-1',
                  name: rebateRule.contractFileName,
                  status: 'done',
                  url: rebateRule.contractFileUrl,
                }] : null
            })(
              <OssUpload
                authToken={authToken}
                rule={{
                  bizzCode: 'MCN_PROCUREMENT_POLICY_CONTRACT',
                  max: 50,
                  suffix: 'pdf,docx,doc,dot,dotx'
                }}
                len={1}//可以上传几个
                tipContent={() => '支持pdf,docx,doc,dot,dotx格式,小于50M的文件上传'}
              />
            )}
          </Form.Item>
          <Form.Item label="备注"  {...formItemLayout}>
            {getFieldDecorator('rebateRule.remark', { initialValue: rebateRule.remark })(
              <TextArea className='remarksText' max={1000} />
            )}
          </Form.Item>
        </div>}
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

  const isGuaranteedBool = data.isGuaranteed === 1

  return <Form.Item label={'返点：'} className='platform-wrap' labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
    <div className='item-wrap' style={{ background: '#f7fbff' }}>
      <Form.Item label='类型：' {...formItemLayout}>
        {rebateTypeName}
      </Form.Item>
      <Form.Item label='公式：' {...formItemLayout}>
        {rebateType == Rule_Rebate_Ratio ?
          <span>执行完成订单时博主收入，返点比例为：{rebateFixedRatio}%</span> :
          rebateType == Rule_Rebate_Numeric ?
            <span>执行完成订单时博主收入，返点金额为：{rebateFixedAmount}元</span> :
            <LadderRatioView
              rebateNumbers={rebateNumbers}
              percentage={percentage}
            />
        }
      </Form.Item>
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
      <Form.Item label="备注"  {...formItemLayout}>
        {data.remark}
      </Form.Item>
    </div>
  </Form.Item>
}
