/**
 * Created by lzb on 2020-04-17.
 */
import React, {} from 'react';
import { Button, Form, InputNumber, Radio } from "antd";
import {
  RULE_DISCOUNT_NUMERIC,
  RULE_DISCOUNT_RATIO,
  ruleDiscount
} from "@/policyManage/constants/dataConfig";

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 }
};

const Global = (props) => {

  const { getFieldDecorator, getFieldValue } = props.form;


  return (
    <div>
      折扣与返点至少填一项
      <Form.Item label="折扣" {...formItemLayout} labelCol={{}} style={{ position: '' }}>
        {/*<Button type='link' onClick={() => {}}>+添加折扣</Button>*/}
        <div style={{ background: '#f7fbff', position: "relative" }}>
          <Form.Item label="类型"  {...formItemLayout}>
            {getFieldDecorator('globalAccountRule.discountRule.discountType', {
              initialValue: RULE_DISCOUNT_RATIO,
              rules: [ { required: true, message: '请选择折扣类型!' } ]
            })(
              <Radio.Group options={ruleDiscount} />
            )}
          </Form.Item>
          {
            getFieldValue("globalAccountRule.discountRule.discountType") === RULE_DISCOUNT_RATIO &&
            <Form.Item label='公式' {...formItemLayout}>
              <span>刊例价 X {getFieldDecorator(`discountRule.discountFixedRatio`, {
                initialValue: null,
                rules: [ { required: true, message: '请输入固定比例值' } ]
              })(
                <InputNumber
                  max={100}
                  precision={0}
                  style={{ width: 100 }}
                />)}% = 账号报价</span>
            </Form.Item>}
          {
            getFieldValue("globalAccountRule.discountRule.discountType") === RULE_DISCOUNT_NUMERIC &&
            <Form.Item label='公式' {...formItemLayout}>
              <span>
                刊例价 -
                {getFieldDecorator('discountRule.discountFixedAmount', {
                  initialValue: null,
                  rules: [ { required: true, message: '请输入固定扣减值!' } ]
                })(
                  <InputNumber
                    style={{ width: 100 }} />
                )}
                元 = 账号报价
                        </span>
            </Form.Item>
          }
          <Button onClick={() => {}} style={{
            position: 'absolute',
            right: 0,
            top: 0
          }} type="link">删除</Button>
        </div>
      </Form.Item>
    </div>
  );
};

export default Global;
