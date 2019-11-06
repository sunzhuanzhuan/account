/**
 * Created by lzb on 2019-11-04.
 */
import React, { useState } from 'react';
import { Button, Form, Input, Select, Radio, Modal, Icon, message } from 'antd';
import QuestionTip from "@/base/QuestionTip";
import ContactTypesLeastOne from "@/ownerManage/components/ContactTypesLeastOne";
import ContactExtend from "@/ownerManage/components/ContactExtend";

const Option = Select.Option
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  }
};

const AddOwnerForm = (props) => {
  const { getFieldDecorator } = props.form;
  const [loading, setLoading] = useState(false);

  const InfoPay = <QuestionTip title="支付信息" content={
    <div>
      1.增值税专用发票，主要区分增值税普通发票，需要提供两联（记账联+抵扣联）
      <br />
      2.综合税费：指增值税及附加+个人所得税
      <br />
      3.提现需要提供身份证号、对应银行卡号及手机号等相关信息
    </div>
  } />

  // 提交
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setLoading(true)
        props.action(values).then(() => {
          setLoading(false)
          Modal.confirm({
            title: '已添加成功！您可以继续添加，也可返回到主账号列表。',
            icon: <Icon type="check-circle" style={{ color: '#52c41a' }} />,
            cancelText: '继续添加',
            okText: '返回主账号列表',
            onOk: () => {
              // TODO: 跳转地址
              window.location.href = "/#/"
            },
            onCancel: () => {
              props.form.resetFields()
            }
          })
        }).catch(() => {
          setLoading(false)
        })
      }
    });
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} className="" colon={false}>
      <Form.Item label="资源媒介">
        {getFieldDecorator('ownerAdminId', {
          validateFirst: true,
          initialValue: props.defaultMediums && parseInt(props.defaultMediums),
          rules: [
            { required: true }
          ]
        })(
          <Select placeholder="请选择">
            {
              props.mediumsOptions.map((item) => {
                return <Option key={item.mediumId} value={item.mediumId}>{item.mediumName}</Option>

              })
            }
          </Select>
        )}
      </Form.Item>
      <Form.Item label="渠道登录名">
        {getFieldDecorator('username', {
          validateFirst: true,
          rules: [
            { required: true, message: '渠道登录名不能为空' },
            {
              pattern: /^[a-zA-Z][0-9a-zA-Z_]{3,21}$/,
              message: '请输入4-22位字母、数字或下划线组合，首字符必须为字母'
            }
          ]
        })(<Input placeholder='请输入渠道登录名' />)}
      </Form.Item>
      <Form.Item label="主账号类型">
        {getFieldDecorator('userType', {
          validateFirst: true,
          initialValue: '1',
          rules: [
            { required: true }
          ]
        })(
          <Select placeholder="请选择">
            <Option value="1">个人号</Option>
            <Option value="2">账号集团</Option>
            <Option value="3">中介</Option>
            <Option value="4">未知</Option>
            <Option value="5">工作室</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="主账号名称">
        {getFieldDecorator('identityName', {
          validateFirst: true,
          rules: [
            { required: true, message: '主账号名称不能为空' },
            {
              pattern: /^[_0-9A-Za-z\u4e00-\u9fa5]{4,60}$/,
              message: '请输入字母、数字、汉字、下划线,长度为4-60字符'
            }
          ]
        })(<Input placeholder='请输入主账号名称' />)}
      </Form.Item>
      <Form.Item label={<span>支付信息{InfoPay}</span>}>
        {getFieldDecorator('partnerType', {
          validateFirst: true,
          rules: [
            { required: true, message: '请选择支付信息！' }
          ]
        })(<RadioGroup>
          <Radio value={1}>报价<span style={{ color: "#f00" }}>含税</span>，后期须提供增值税专用发票后方可提现</Radio>
          <br />
          <Radio value={2}>报价<span style={{ color: "#f00" }}>不含税</span>，提现须授权微播易相关通道平台代扣代缴综合税费</Radio>
        </RadioGroup>)}
      </Form.Item>
      <Form.Item label="真实姓名">
        {getFieldDecorator('realName', {
          validateFirst: true,
          initialValue: "",
          rules: [
            {
              pattern: /^([a-zA-Z0-9\u4e00-\u9fa5《》]{2,15})?$/,
              message: '真实姓名应为2-15个字符或者数字'
            }
          ]
        })(<Input placeholder='真实姓名' />)}
      </Form.Item>
      <Form.Item label="公司名称">
        {getFieldDecorator('company', {
          validateFirst: true,
          initialValue: "",
          rules: [
            {
              pattern: /^([a-zA-Z0-9\u4e00-\u9fa5]{3,30})?$/,
              message: '公司名称应为3-30位字符或者数字，不包含空格'
            }
          ]
        })(<Input placeholder='公司名称' />)}
      </Form.Item>
      <Form.Item label="联系电话">
        {getFieldDecorator('contactPhone', {
          initialValue: "",
          rules: [{
            pattern: /^\d{3,4}-\d{7,8}-\d{3,6}$/,
            message: '联系电话应为区号-电话号码-分机号'
          }]
        })(<Input placeholder="请输入您的联系电话" />)}
      </Form.Item>
      <Form.Item label="手机号码" key="cellPhone">
        {getFieldDecorator('cellPhone', {
          validateFirst: true,
          initialValue: "",
          rules: [
            {
              required: true,
              pattern: /^[1]([3-9])[0-9]{9}$/,
              message: '请输入正确的手机号码'
            }
          ]
        })(
          <Input addonBefore="+86" placeholder="请输入手机号码" />)}
      </Form.Item>
      <ContactTypesLeastOne form={props.form} />
      <Form.Item label="是否提前打款">
        {getFieldDecorator('isPrepayment', {
          validateFirst: true,
          initialValue: '2'
        })(
          <Select placeholder="请选择">
            <Option value="2">否</Option>
            <Option value="1">是</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="其他联系人" wrapperCol={{ xs: { span: 24 }, sm: { span: 20 } }}>
        <ContactExtend form={props.form} />
      </Form.Item>
      <div style={{ textAlign: 'center', padding: 20 }}>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ width: "20%" }}
        >
          下一步
        </Button>
      </div>
    </Form>
  );
};

export default Form.create()(AddOwnerForm);
