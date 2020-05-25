/**
 * Created by lzb on 2020-04-20.
 */
import React, { useState } from 'react';
import { Button, Radio, Form, Descriptions } from 'antd'

import {
  REBATE_SETTLEMENT_CYCLE, STEP_REBATE_SETTLEMENT_TYPES
} from '../../constants/dataConfig'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

export const Settlement = (props) => {
  const { data = {} } = props;

  const { getFieldDecorator } = props.form;
  const [ hasSettlement, setHasSettlement ] = useState(!!data.rebateSettlementCycle);

  return <Form.Item label='返点规则'>
    {
      hasSettlement ?
        <div style={{ position: "relative", width: 620 }}>
          <Form.Item label='返点结算周期：' {...formItemLayout}>
            {
              getFieldDecorator('rebateSettlementCycle', {
                initialValue: data.rebateSettlementCycle,
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
  const { stepRebateSettlementType, rebateSettlementCycle } = data;
  return (
    <Descriptions column={1}>
      <Descriptions.Item label="返点结算周期">
        {REBATE_SETTLEMENT_CYCLE[rebateSettlementCycle]}
      </Descriptions.Item>
      <Descriptions.Item label="阶梯返点结算">
        {STEP_REBATE_SETTLEMENT_TYPES[stepRebateSettlementType]}
      </Descriptions.Item>
    </Descriptions>
  )
}

