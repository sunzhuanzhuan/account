/**
 * Created by lzb on 2019-10-16.
 */
import React, { useState } from 'react';
import { Form, Input } from "antd";

const ContactExtend = (props) => {
  const { getFieldDecorator, getFieldValue, validateFields, getFieldError } = props.form;
  const triggerPhone = (key) => {
    let errors = getFieldError(key)
    if (errors && errors.includes("由于添加了联系人所以手机号码为必填项")) {
      setTimeout(() => {
        validateFields([key], { force: true })
      },20);
    }
  }

  const [first = {}, second = {}] = props.data || []
  return (
    <table className="contact-extend-table">
      <thead>
      <tr>
        <th width={80} align="center">序号</th>
        <th width={200}>联系人名称</th>
        <th width={200}>手机号码</th>
        <th>其他</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          1
          {getFieldDecorator('mcnContactInfoList[0].id', {
            initialValue: first.id,
          })(
            <Input type="hidden" />)}
        </td>
        <td>
          <Form.Item>
            {getFieldDecorator('mcnContactInfoList[0].realName', {
              validateFirst: true,
              initialValue: first.realName,
            })(
              <Input placeholder="请输入" onChange={() => triggerPhone('mcnContactInfoList[0].cellPhone')} />)}
          </Form.Item>
        </td>
        <td>
          <Form.Item>
            {getFieldDecorator('mcnContactInfoList[0].cellPhone', {
              validateFirst: true,
              initialValue: first.cellPhone,
              rules: [
                {
                  required: !!getFieldValue('mcnContactInfoList[0].realName'),
                  message: '由于添加了联系人所以手机号码为必填项'
                },
                {
                  pattern: /^[1]([3-9])[0-9]{9}$/,
                  message: '请输入正确的手机号码'
                }
              ]
            })(
              <Input addonBefore="+86" placeholder="请输入手机号码" />)}
          </Form.Item>
        </td>
        <td>
          <Form.Item>
            {getFieldDecorator('mcnContactInfoList[0].other', {
              validateFirst: true,
              initialValue: first.other,
            })(<Input placeholder="请输入" />)}
          </Form.Item>
        </td>
      </tr>
      <tr>
        <td>
          2
          {getFieldDecorator('mcnContactInfoList[1].id', {
            initialValue: second.id,
          })(
            <Input type="hidden" />)}
        </td>
        <td>
          <Form.Item>
            {getFieldDecorator('mcnContactInfoList[1].realName', {
              validateFirst: true,
              initialValue: second.realName,
            })(
              <Input placeholder="请输入" onChange={() => triggerPhone('mcnContactInfoList[1].cellPhone')} />)}
          </Form.Item>
        </td>
        <td>
          <Form.Item>
            {getFieldDecorator('mcnContactInfoList[1].cellPhone', {
              validateFirst: true,
              initialValue: second.cellPhone,
              rules: [
                {
                  required: !!getFieldValue('mcnContactInfoList[1].realName'),
                  message: '由于添加了联系人所以手机号码为必填项'
                },
                {
                  pattern: /^[1]([3-9])[0-9]{9}$/,
                  message: '请输入正确的手机号码'
                }
              ]
            })(
              <Input addonBefore="+86" placeholder="请输入手机号码" />)}
          </Form.Item>
        </td>
        <td>
          <Form.Item>
            {getFieldDecorator('mcnContactInfoList[1].other', {
              validateFirst: true,
              initialValue: second.other,
            })(<Input placeholder="请输入" />)}
          </Form.Item>
        </td>
      </tr>
      </tbody>
    </table>

  );
};

export default ContactExtend;
