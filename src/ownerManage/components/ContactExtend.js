/**
 * Created by lzb on 2019-10-16.
 */
import React, { useState } from 'react';
import { Form, Input } from "antd";

const ContactExtend = (props) => {
  const { getFieldDecorator, getFieldValue, getFieldError, setFields } = props.form;

  const validateRequired = function(field) {
    let parentField = field.split('.')[0]
    setTimeout(() => {
      let { realName, cellPhone, other } = getFieldValue(parentField) || {}
      let realNameField = parentField + '.realName'
      let cellPhoneField = parentField + '.cellPhone'
      // let otherField = parentField + '.other'
      if (realName) {
        // 名称存在
        if (cellPhone) {
          // 电话存在
          if (!getFieldError(cellPhoneField)) {
            // 电话格式正确
            // 清空电话错误
            setFields({
              [cellPhoneField]: {
                value: cellPhone
              }
            })
          }
          // 清空其他错误
          setFields({
            [realNameField]: {
              value: realName
            }
          })
        } else {
          // 电话不存在
          // 设置电话报错
          setFields({
            [cellPhoneField]: {
              value: "",
              errors: [new Error("由于添加了联系人所以手机号码为必填项")]
            }
          })
        }
      } else {
        // 名称不存在
        if (cellPhone || other) {
          // 电话或者其他信息存在
          setFields({
            [realNameField]: {
              value: "",
              errors: [new Error("由于添加了联系方式所以联系人为必填项")]
            }
          })
        } else {
          // 电话或者其他信息不存在
          // 清空错误
          setFields({
            [realNameField]: {value: ""},
            [cellPhoneField]: {value: ""}
          })
        }
      }
    }, 20);
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
            initialValue: first.id
          })(
            <Input type="hidden" />)}
        </td>
        <td>
          <Form.Item>
            {getFieldDecorator('mcnContactInfoList[0].realName', {
              validateFirst: true,
              initialValue: first.realName
            })(
              <Input placeholder="请输入" onChange={() => validateRequired("mcnContactInfoList[0].realName")} disabled={props.disabled} />)}
          </Form.Item>
        </td>
        <td>
          <Form.Item>
            {getFieldDecorator('mcnContactInfoList[0].cellPhone', {
              validateFirst: true,
              initialValue: first.cellPhone,
              rules: [
                {
                  pattern: /^[1]([3-9])[0-9]{9}$/,
                  message: '请输入正确的手机号码'
                }
              ]
            })(
              <Input addonBefore="+86" placeholder="请输入手机号码" onChange={() => validateRequired("mcnContactInfoList[0].cellPhone")} disabled={props.disabled} />)}
          </Form.Item>
        </td>
        <td>
          <Form.Item>
            {getFieldDecorator('mcnContactInfoList[0].other', {
              validateFirst: true,
              initialValue: first.other
            })(
              <Input placeholder="请输入" onChange={() => validateRequired("mcnContactInfoList[0].other")} disabled={props.disabled} />)}
          </Form.Item>
        </td>
      </tr>
      <tr>
        <td>
          2
          {getFieldDecorator('mcnContactInfoList[1].id', {
            initialValue: second.id
          })(
            <Input type="hidden" />)}
        </td>
        <td>
          <Form.Item>
            {getFieldDecorator('mcnContactInfoList[1].realName', {
              validateFirst: true,
              initialValue: second.realName
            })(
              <Input placeholder="请输入" onChange={() => validateRequired("mcnContactInfoList[1].realName")} disabled={props.disabled}  />)}
          </Form.Item>
        </td>
        <td>
          <Form.Item>
            {getFieldDecorator('mcnContactInfoList[1].cellPhone', {
              validateFirst: true,
              initialValue: second.cellPhone,
              rules: [
                {
                  pattern: /^[1]([3-9])[0-9]{9}$/,
                  message: '请输入正确的手机号码'
                }
              ]
            })(
              <Input addonBefore="+86" placeholder="请输入手机号码" onChange={() => validateRequired("mcnContactInfoList[1].cellPhone")} disabled={props.disabled}  />)}
          </Form.Item>
        </td>
        <td>
          <Form.Item>
            {getFieldDecorator('mcnContactInfoList[1].other', {
              validateFirst: true,
              initialValue: second.other
            })(<Input placeholder="请输入" onChange={() => validateRequired("mcnContactInfoList[1].other")} disabled={props.disabled} />)}
          </Form.Item>
        </td>
      </tr>
      </tbody>
    </table>

  );
};

export default ContactExtend;
