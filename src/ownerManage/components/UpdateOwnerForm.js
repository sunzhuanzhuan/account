/**
 * Created by lzb on 2019-11-04.
 */
import React, { useState } from 'react';
import { Button, Form, Input, Select, Radio, Modal, Icon, message } from 'antd';
import QuestionTip from "@/base/QuestionTip";
import ContactTypesLeastOne from "@/ownerManage/components/ContactTypesLeastOne";
import ContactExtend from "@/ownerManage/components/ContactExtend";
import { EMOJI_REGEX } from "@/constants/config";

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
  const { getFieldDecorator, getFieldValue } = props.form;
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

  const forceSaveConfirm = (result, values) => {
    Modal.confirm({
      title: "提示",
      content: result.map((text, n) => <p key={n}>{`${n + 1}.${text}`}</p>),
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
                let { allow, message: result } = data
                if (allow) {
                  save(values)
                } else {
                  forceSaveConfirm(result, values)
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
    <Form {...formItemLayout} onSubmit={props.disabled ? () => { } : handleSubmit} className="" colon={false}>
      <Form.Item label="资源媒介">
        {getFieldDecorator('ownerAdminId', {
          validateFirst: true,
          initialValue: props.ownerAdminId > 0 ? props.ownerAdminId : undefined,
          rules: [
            { required: true,  message: "请选择资源媒介"}
          ]
        })(
          <Select placeholder="请选择" onChange={handleDiffMcn} disabled={props.disabled}>
            {props.ownerAdminId > 0 && <Option key={props.ownerAdminId} value={props.ownerAdminId}>{props.ownerAdminName}</Option>}
            {
              props.mediumsOptions
                .filter(({ mediumId }) => mediumId !== props.ownerAdminId)
                .map((item) => {
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
        })(<Input placeholder='请输入渠道登录名' disabled />)}
      </Form.Item>
      <Form.Item label="主账号类型">
        {getFieldDecorator('userType', {
          validateFirst: true,
          initialValue: props.userType,
          rules: [
            { required: true, message: "主账号类型不能为空" }
          ]
        })(
          <Select placeholder="请选择" disabled={props.disabled}>
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
            {
              required: true,
              max: 60,
              min: 2,
              whitespace: true,
              message: '本项为必填项，可输入2-60个字符，不可输入表情符！'
            },
            {
              validator: (rule, value, callback) => {
                EMOJI_REGEX.lastIndex = 0
                if (EMOJI_REGEX.test(value)) {
                  callback('本项为必填项，可输入2-60个字符，不可输入表情符！')
                  return
                }
                callback()
              }
            }
          ]
        })(<Input placeholder='请输入主账号名称' disabled={props.disabled} />)}
      </Form.Item>
      <Form.Item label={<span>支付信息{InfoPay}</span>}>
        {getFieldDecorator('taxInPrice', {
          validateFirst: true,
          initialValue: props.taxInPrice || undefined,
          rules: [
            { required: true, message: '请选择支付信息！' }
          ]
        })(<RadioGroup disabled={props.disabled || props.paymentInfoIsComplete === 1}>
          <a className="form-suffix-action-70" style={{ marginRight: -50 }} onClick={() => props.setModal('payment')}>修改历史</a>
          <Radio value={1}>报价<span style={{ color: "#f00" }}>含税</span>，后期须提供增值税专用发票后方可提现</Radio>
          <br />
          <Radio value={2}>报价<span style={{ color: "#f00" }}>不含税</span>，提现须授权微播易相关通道平台代扣代缴综合税费</Radio>
        </RadioGroup>)}
      </Form.Item>
      {getFieldValue('taxInPrice') === 1 && <Form.Item label="回票类型">
        {getFieldDecorator('invoiceType', {
          initialValue: props.invoiceType || undefined,
          rules: [
            { required: true, message: '请选择回票类型！' }
          ]
        })(<RadioGroup disabled={props.disabled || props.paymentInfoIsComplete === 1}>
          <Radio value={2}>增值税普通发票</Radio>
          <Radio value={1}>增值税专用发票</Radio>
        </RadioGroup>)}
      </Form.Item>}
      {getFieldValue('invoiceType') === 1 && <Form.Item label="发票税率">
        {getFieldDecorator('taxRate', {
          initialValue: props.taxRate || undefined,
          rules: [
            { required: true, message: '请选择发票税率！' }
          ]
        })(<RadioGroup disabled={props.disabled || props.paymentInfoIsComplete === 1}>
          <Radio value={0.01}>1%</Radio>
          <Radio value={0.03}>3%</Radio>
          <Radio value={0.06}>6%</Radio>
        </RadioGroup>)}
      </Form.Item>}
      <Form.Item label="默认账期(天)">
        <span>{props.defaultCycle === 0 ? '0' : (props.defaultCycle || '-')}</span>
      </Form.Item>
      <Form.Item label={<span>实际账期{InfoCycle}</span>}>
        <span>{props.actualCycle === 0 ? '0' : (props.actualCycle || '-')}</span>
      </Form.Item>
      <Form.Item label="来源">
        <span>{props.createdFromName || '-'}</span>
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
        })(<Input placeholder='真实姓名' disabled={props.disabled} />)}
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
        })(<Input placeholder='公司名称' disabled={props.disabled} />)}
      </Form.Item>
      <Form.Item label="联系电话">
        {getFieldDecorator('contactPhone', {
          initialValue: props.contactPhone,
          rules: [{
            pattern: /^\d{3,4}-\d{7,8}-\d{3,6}$/,
            message: '联系电话应为区号-电话号码-分机号'
          }]
        })(<Input placeholder="请输入您的联系电话" disabled={props.disabled} />)}
      </Form.Item>
      <Form.Item label="手机号码">
        {props.auth["mcn.cellphone.edit"] ? getFieldDecorator('cellPhone', {
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
          <Input addonBefore="+86" placeholder="请输入手机号码" onChange={handleDiffPhone} disabled={props.disabled} />) :
          getFieldDecorator('cellPhone', {
            initialValue: props.cellPhone
          })(<span>{props.cellPhone}</span>)
        }
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
            <Input placeholder="请输入修改原因" disabled={props.disabled} />)}
        </Form.Item>
      }
      <ContactTypesLeastOne form={props.form} qq={props.qq} weixinId={props.weixinId} email={props.email} disabled={props.disabled} />
      <Form.Item label="是否提前打款">
        {getFieldDecorator('isPrepayment', {
          validateFirst: true,
          initialValue: props.isPrepayment
        })(
          <Select placeholder="请选择" disabled={props.disabled}>
            <Option value={2}>否</Option>
            <Option value={1}>是</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="其他联系人" wrapperCol={{ xs: { span: 24 }, sm: { span: 20 } }}>
        <ContactExtend form={props.form} data={props.mcnContactInfoList} disabled={props.disabled} />
      </Form.Item>
      {props.disabled ? null : <div style={{ textAlign: 'center', padding: 20 }}>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ width: "20%" }}
        >
          提交
        </Button>
      </div>}
    </Form>
  );
};

export default Form.create()(UpdateOwnerForm);
