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

const UpdateOwnerForm = (props) => {
  const { getFieldDecorator } = props.form;
  const [loading, setLoading] = useState(false);
  const [diffPhone, setDiffPhone] = useState(false)
  const [diffMcn, setDiffMcn] = useState(false)

  const InfoPay = <QuestionTip title="支付信息" content={
    <div>
      1.增值税专用发票，主要区分增值税普通发票，需要提供两联（记账联+抵扣联）
      <br />
      2.综合税费：指增值税及附加+个人所得税
      <br />
      3.提现需要提供身份证号、对应银行卡号及手机号等相关信息
    </div>
  } />

  const InfoCycle = <QuestionTip title="实际账期时间" content={
    <div>
      根据主账号最近一年内订单打款时间和执行完成时间计算得出，具体算法如下：
      <br />
      1、筛选出主账号最近一年所有已打款的所有类型订单
      <br />
      2、计算所筛选订单“订单打款时间-订单执行完成时间”总和
      <br />
      3、计算实际账期时间，实际账期时间=上文时间总和/（24*订单数），数值以天为单位，保留整数，遇到小数向上取整
      <br />
      注：提前打款的订单计算出的实际账期为负数
    </div>
  } />

  // 保存信息
  const save = (values) => {
    setLoading(true)
    props.actions.ownerUpdate(handleValues(values)).then(() => {
      setLoading(false)
      message.success('主账号信息更新成功, 正在为您跳转到列表页')
      window.location.href = props.config.babysitterHost + "/default/user/index"
    }).catch(() => {
      setLoading(false)
    })
  }

  const forceSaveConfirm = (message, values) => {
    Modal.confirm({
      title: "提示",
      content: message.map((text,n) => <p key={n}>{`${n+1}.${text}`}</p>),
      okText: '确认转移',
      cancelText: '放弃转移',
      onOk: (hide) => {
        hide()
        save(values)
      }
    })
  }

  function handleValues(values) {
    values.userId = props.userId
    values.mcnContactInfoList = values.mcnContactInfoList.filter(item => {
      return item.id || item.realName
    })
    return values;
  }

  // 提交
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (diffMcn) {
          Modal.confirm({
            title: "提示",
            content: "此主账号所属pack分属多个媒介经理，pack将转移给此次转移主账号目标媒介经理，确认转移？",
            onOk: () => (
              props.actions.preCheckChangeOwnerAdmin({ mcnId: props.userId }).then(({ data }) => {
                let { allow, message } = data
                if (allow) {
                  save(values)
                } else {
                  forceSaveConfirm(message, values)
                }
              })
            )
          })
        } else {
          save(values)
        }
      }
    });
  };

  const handleDiffMcn = (id) => {
    setDiffMcn(props.ownerAdminId !== id)
  }

  const handleDiffPhone = (val) => {
    setDiffPhone(props.cellPhone !== val.target.value)
  }

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} className="" colon={false}>
      <Form.Item label="资源媒介">
        {getFieldDecorator('ownerAdminId', {
          validateFirst: true,
          initialValue: props.ownerAdminId,
          rules: [
            { required: true }
          ]
        })(
          <Select placeholder="请选择" onChange={handleDiffMcn}>
            {
              props.mediumsOptions.map((item) => {
                return <Option key={item.mediumId} value={item.mediumId}>{item.mediumName}</Option>

              })
            }
          </Select>
        )}
        <a className="form-suffix-action-70" onClick={() => props.setModal('media')}>修改历史</a>
      </Form.Item>
      <Form.Item label="渠道登录名">
        {getFieldDecorator('username', {
          validateFirst: true,
          initialValue: props.username,
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
          initialValue: props.userType,
          rules: [
            { required: true }
          ]
        })(
          <Select placeholder="请选择">
            <Option value={1}>个人号</Option>
            <Option value={2}>账号集团</Option>
            <Option value={3}>中介</Option>
            <Option value={4}>未知</Option>
            <Option value={5}>工作室</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="主账号名称">
        {getFieldDecorator('identityName', {
          validateFirst: true,
          initialValue: props.identityName,
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
          initialValue: props.partnerType,
          rules: [
            { required: true, message: '请选择支付信息！' }
          ]
        })(<RadioGroup>
          <Radio value={1}>报价<span style={{ color: "#f00" }}>含税</span>，后期须提供增值税专用发票后方可提现</Radio>
          <br />
          <Radio value={4}>报价<span style={{ color: "#f00" }}>不含税</span>，提现须授权微播易相关通道平台代扣代缴综合税费</Radio>
        </RadioGroup>)}
      </Form.Item>
      <Form.Item label="默认账期(天)">
        <span>{props.defaultCycle || '-'}</span>
      </Form.Item>
      <Form.Item label={<span>实际账期{InfoCycle}</span>}>
        <span>{props.actualCycle || '-'}</span>
      </Form.Item>
      <Form.Item label="真实姓名">
        {getFieldDecorator('realName', {
          validateFirst: true,
          initialValue: props.realName,
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
          initialValue: props.company,
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
          initialValue: props.contactPhone,
          rules: [{
            pattern: /^\d{3,4}-\d{7,8}-\d{3,6}$/,
            message: '联系电话应为区号-电话号码-分机号'
          }]
        })(<Input placeholder="请输入您的联系电话" />)}
      </Form.Item>
      <Form.Item label="手机号码">
        {getFieldDecorator('cellPhone', {
          validateFirst: true,
          initialValue: props.cellPhone,
          rules: [
            {
              required: true,
              pattern: /^[1]([3-9])[0-9]{9}$/,
              message: '请输入正确的手机号码'
            }
          ]
        })(
          <Input addonBefore="+86" placeholder="请输入手机号码" onChange={handleDiffPhone} />)}
        <a className="form-suffix-action-70" onClick={() => props.setModal('cellPhone')}>修改历史</a>
      </Form.Item>
      {diffPhone &&
      <Form.Item label="修改原因">
        {getFieldDecorator('updateCellPhoneReason', {
          rules: [
            {
              required: true,
              message: '请输入修改原因'
            }
          ]
        })(
          <Input placeholder="请输入修改原因" />)}
      </Form.Item>
      }
      <ContactTypesLeastOne form={props.form} qq={props.qq} weixinId={props.weixinId} email={props.email} />
      <Form.Item label="是否提前打款">
        {getFieldDecorator('isPrepayment', {
          validateFirst: true,
          initialValue: props.isPrepayment
        })(
          <Select placeholder="请选择">
            <Option value={2}>否</Option>
            <Option value={1}>是</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="其他联系人" wrapperCol={{ xs: { span: 24 }, sm: { span: 20 } }}>
        <ContactExtend form={props.form} data={props.mcnContactInfoList} />
      </Form.Item>
      <div style={{ textAlign: 'center', padding: 20 }}>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ width: "20%" }}
        >
          提交
        </Button>
      </div>
    </Form>
  );
};

export default Form.create()(UpdateOwnerForm);
