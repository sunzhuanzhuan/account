/**
 * Created by lzb on 2019-10-16.
 */
import React, { useState } from 'react';
import { Form, Input, Popover } from "antd";

const ContactTypesLeastOne = (props) => {
  const { getFieldDecorator } = props.form;

  // 联系方式至少输入一项
  const contactLeastOne = (rule, value, callback) => {
    const { form } = props;
    const allKeys = ["qq", "weixinId", "email"]
    let otherkeys = allKeys.filter(key => key !== rule.field)
    const values = form.getFieldsValue(allKeys)

    if (Object.values(values).filter(Boolean).length > 0) {
      let result = otherkeys.reduce((obj, key) => {
        if (!/格式不正确/.test(form.getFieldError(key))) {
          obj[key] = { value: values[key] }
        }
        return obj
      }, {})
      form.setFields(result);
      callback()
    } else {
      let result = otherkeys.reduce((obj, key) => {
        obj[key] = { errors: [new Error('QQ、微信号和邮箱请至少填写一个')] }
        return obj
      }, {})
      form.setFields(result);
      callback("QQ、微信号和邮箱请至少填写一个")
    }
  };

  return ([
    <Form.Item label="QQ" key="qq">
      {getFieldDecorator('qq', {
        validateFirst: true,
        initialValue: props.qq,
        rules: [
          { validator: contactLeastOne },
          {
            pattern: /^[1-9]([0-9]{4,10})$/,
            message: '请填写正确的QQ号码，以便我们及时与您取得联系'
          }
        ]
      })(<Input placeholder="请输入你的QQ号码" disabled={props.disabled} />)}
    </Form.Item>,
    <Form.Item label="微信号" key="weixinId">
      {getFieldDecorator('weixinId', {
        validateFirst: true,
        initialValue: props.weixinId,
        rules: [
          { validator: contactLeastOne },
          {
            pattern: /^[a-zA-Z0-9][a-zA-Z0-9_-]{5,19}$/,
            message: '请输入6~20个字母、数字、下划线和减号，必须以字母或数字开头'
          }
        ]
      })(<Input placeholder="请输入你的微信号码" disabled={props.disabled} />)}
    </Form.Item>,
    <Form.Item label="邮箱" key="email">
      {getFieldDecorator('email', {
        validateFirst: true,
        initialValue: props.email,
        rules: [
          { validator: contactLeastOne },
          {
            type: "email",
            message: '邮箱格式不正确'
          }
        ]
      })(<Input placeholder='邮箱' disabled={props.disabled} />)}
    </Form.Item>
  ]);
};

export default ContactTypesLeastOne;
