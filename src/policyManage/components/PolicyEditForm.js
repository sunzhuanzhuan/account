/**
 * Created by lzb on 2020-04-23.
 */
import React, { forwardRef, useImperativeHandle } from 'react';
import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Icon,
  Input, InputNumber,
  message,
  Modal,
  Radio,
  Switch
} from "antd";
import {
  POLICY_LEVEL,
  RULE_REBATE_LADDER,
  WHITE_LIST_ACCOUNTS_LIMIT
} from "../constants/dataConfig";
import debounce from 'lodash/debounce';
import moment from 'moment'
import IconFont from "@/base/IconFont";
import SelectAllCheck from "./SelectAllCheck";
import { DiscountEdit } from "./RuleModules/Discount";
import { RebateEdit } from "./RuleModules/Rebate";
import { SpecialRuleEdit } from "./RuleModules/SpecialRules";
import AccountListEdit from "./RuleModules/AccountListEdit";
import { Settlement } from "./RuleModules/Settlement";


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const { RangePicker } = DatePicker;


const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 }
};

const debouncedCheckPolicyName = debounce((cb) => cb(), 800)

const PolicyEditForm = forwardRef((props, ref) => {

  useImperativeHandle(ref, () => ({
    form,
    handleSubmit
  }));

  // 判断策略名称是否存在
  const asyncValidatePolicyNameRepeat = (rule, value, callback) => {
    debouncedCheckPolicyName(() => {
      props.actions.existPolicyName({ username: value }).then(({ data }) => {
        if (data.isExist) {
          callback("该政策名称已存在，请重新输入")
        } else {
          callback()
        }
      }).catch(() => {
        callback("请求错误, 校验失败")
      })
    })
  }

  // 获取政策下的全部账号
  const getExcludeIds = (list = []) => {
    const {
      specialAccountRules,
      whiteList
    } = props.form.getFieldsValue([ 'specialAccountRules', 'whiteList.accountList' ])
    let result = specialAccountRules.reduce((result, item) => {
      return result.concat(item.accountList)
    }, [])

    result = result.concat(whiteList.accountList, list)

    return {
      ids: result.map(item => item.accountId),
      items: result
    }
  }

  // 判断政策下是否包含返点
  const hasRebate = (values) => {
    const {
      specialAccountRules,
      globalAccountRule
    } = values

    let index = [ ...specialAccountRules, globalAccountRule ].findIndex((rule) => {
      return rule.rebateRule?.rebateType
    })


    return index > -1
  }

  // 处理表单数据
  const handleValues = (values) => {
    let newValue = { ...values }
    const { globalAccountRule, specialAccountRules } = values

    // 处理全局折扣 阶梯设置
    if (globalAccountRule.rebateRule?.rebateType === RULE_REBATE_LADDER) {
      const { rebateNumbers = [], percentage = [] } = globalAccountRule.rebateRule.rebateStepRules;
      const _rebateStepRules = [];
      for (let index = 0; index < rebateNumbers.length - 1; index++) {
        _rebateStepRules.push({
          amountLowLimit: rebateNumbers[index],
          amountHighLimit: rebateNumbers[index + 1],
          rebateRatio: percentage[index]
        })
      }
      if (_rebateStepRules.length > 0) {
        newValue.globalAccountRule.rebateRule.rebateStepRules = _rebateStepRules;
      }
    }

    // 处理 accountList -> accountIds
    newValue.specialAccountRules = specialAccountRules.map((rule, index) => {
      let newRule = { ...rule }
      newRule.ruleId = index + 1
      newRule.accountIds = newRule.accountList.map(item => item.accountId)
      delete newRule.uuid
      delete newRule.accountList
      return newRule
    })
    newValue.whiteList.accountIds = newValue.whiteList.accountList.map(item => item.accountId)
    delete newValue.whiteList.accountList

    // 处理时间
    newValue.validStartTime = values.policyTime[0].format('YYYY-MM-DD 00:00:00');
    newValue.validEndTime = values.policyTime[1].format('YYYY-MM-DD 23:59:59');
    delete newValue.policyTime


    newValue.isGuaranteed = newValue.isGuaranteed ? 1 : 2

    newValue.mcnId = mcnId
    newValue.id = data.id

    return newValue
  }

  // 提交前置操作
  const handleSubmit = (submit) => {
    props.form.validateFields((err, values) => {
      if (err) return;

      if (!values.globalAccountRule.discountRule && !values.globalAccountRule.rebateRule) {
        message.warn('折扣与返点至少填一项')
        return
      }

      /*
      if (hasRebate(values) && !values.rebateSettlementCycle) {
        message.warn('当前全局或特殊规则中设置了返点, 请添加返点规则')
        return
      }
      */

      const body = handleValues(values)

      submit(body)

    })
  }

  // 删除平台触发删除关联账号
  const onDeselectPlatform = (key, clear, confirm) => {

    function hasDeleted() {
      const list = getExcludeIds().items
      if (list.length === 0) return

      return clear || list.find(account => account.platformId === key)
    }

    // 没有关联账号
    if (!hasDeleted()) {
      confirm()
      return
    }

    Modal.confirm({
      title: "特殊账号或白名单中设置了该平台的账号，若删除该平台，账号将一起删除，是否确认此操作？",
      onOk: () => {
        // 删除平台
        confirm()
        // 删除账号
        const {
          specialAccountRules,
          whiteList
        } = props.form.getFieldsValue([ 'specialAccountRules', 'whiteList.accountList' ])


        let r1 = specialAccountRules.map(rule => {
          let newRule = { ...rule }
          newRule.accountList = clear ? [] : newRule.accountList.filter(item => item.platformId !== key)
          return newRule
        })

        let r2 = clear ? [] : whiteList.accountList.filter(item => item.platformId !== key)

        setFieldsValue({
          'specialAccountRules': r1,
          'whiteList.accountList': r2
        })
      }
    })

  }


  const { form, data } = props;
  const { globalAccountRule = {}, mcnId, specialAccountRules = [], whiteList = {} } = data
  const { getFieldDecorator, getFieldValue, setFieldsValue } = form;


  return (
    <Form {...formItemLayout} className="policy-manage-details-container-scroll" id="scroll-box">
      <ConfigProvider getPopupContainer={() => document.getElementById('scroll-box')}>
        <FormItem label='主账号名称'>
          {data.identityName || '-'}
        </FormItem>
        <FormItem label='主账号ID'>
          {data.mcnId}
        </FormItem>
        <FormItem label='政策名称'>
          {getFieldDecorator('policyName', {
            initialValue: data.policyName,
            rules: [
              { required: true, message: '请填写政策名称' },
              {
                pattern: /^.{1,30}$/,
                message: '政策名称最多可输入30个字'
              }
              // { validator: asyncValidatePolicyNameRepeat }
            ]
          })(
            <Input placeholder='请输入' style={{ width: 330 }} />
          )}
        </FormItem>
        <FormItem label="政策有效期">
          {getFieldDecorator('policyTime', {
            initialValue: data.validStartTime ? [ moment(data.validStartTime), moment(data.validEndTime) ] : [],
            rules: [
              { type: 'array', required: true, message: '请添加政策有效期' },
              {
                validator: (rule, value, callback) => {
                  const [ start, end ] = value

                  const min = moment(start).add(30, 'd')
                  if (end < min) {
                    return callback(`结束日期与开始日期的间隔至少30天`)
                  }
                  callback()
                }
              }
            ]
          })(
            <RangePicker />
          )}
        </FormItem>
        <FormItem label="政策级别"  {...formItemLayout}>
          {getFieldDecorator('policyLevel', {
            initialValue: data.policyLevel,
            rules: [ { required: true, message: '该项为必填项，请选择!' } ]
          })(
            <RadioGroup>
              {
                Object.entries(POLICY_LEVEL).map(([ key, item ]) =>
                  <Radio key={key} value={parseInt(key)}>
                    <IconFont type={item.icon} /> {item.text}
                  </Radio>)
              }
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label='平台'>
          {getFieldDecorator(`globalAccountRule.platformIds`, {
            initialValue: (globalAccountRule.platformList || []).map(item => item.platformId),
            rules: [
              { required: true, message: '请选择平台' }
            ]
          })(
            <SelectAllCheck
              action={props.actions.getGlobalRulePlatforms}
              options={props.allPlatforms}
              onDeselect={onDeselectPlatform}
            />
          )}
        </FormItem>
        <FormItem label='设置全局规则' required>
          <Icon style={{ color: "#faad14" }} type="exclamation-circle" theme="filled" /> 折扣与返点至少填一项
          <DiscountEdit form={props.form} rule={globalAccountRule.discountRule} fieldKeyPrefix="globalAccountRule." />
          <RebateEdit form={props.form} rule={globalAccountRule.rebateRule} fieldKeyPrefix="globalAccountRule." />
        </FormItem>
        <FormItem label='特殊账号'>
          {getFieldDecorator(`specialAccountRules`, {
            initialValue: specialAccountRules
          })(
            <SpecialRuleEdit
              actions={props.actions}
              getExcludeIds={getExcludeIds}
              platforms={getFieldValue('globalAccountRule.platformIds')}
              params={{
                mcnId,
                platformIds: getFieldValue('globalAccountRule.platformIds').join(','),
                type: 1
              }}
            />
          )}
        </FormItem>
        <FormItem label='白名单账号'>
          {getFieldDecorator(`whiteList.accountList`, {
            initialValue: whiteList.accountList || [],
            rules: [
              {
                type: "array",
                max: WHITE_LIST_ACCOUNTS_LIMIT,
                message: '最多可添加' + WHITE_LIST_ACCOUNTS_LIMIT + '个账号'
              }
            ]
          })(
            <AccountListEdit
              getAccountInfoByIds={props.actions.getAccountInfoByIds}
              getExcludeIds={getExcludeIds}
              params={{
                mcnId,
                platformIds: getFieldValue('globalAccountRule.platformIds').join(','),
                type: 2
              }}
              style={{ marginRight: 20 }}
              limit={WHITE_LIST_ACCOUNTS_LIMIT}
            >
              <Button icon="plus" type="primary">添加白名单账号</Button>
            </AccountListEdit>
          )}
        </FormItem>
        <Settlement form={props.form} data={data} />
        <FormItem label='保底政策' {...formItemLayout}>
          {
            getFieldDecorator('isGuaranteed', {
              initialValue: data.isGuaranteed === 1,
              valuePropName: 'checked'
            })(
              <Switch checkedChildren="开" unCheckedChildren="关" />
            )
          }
        </FormItem>
        {getFieldValue('isGuaranteed') && <FormItem label='保底金额' {...formItemLayout}>
          {
            getFieldDecorator('guaranteedMinAmount', {
              initialValue: data.guaranteedMinAmount > 0 ? data.guaranteedMinAmount : undefined,
              rules: [
                { required: true, message: "保底金额不可为空"},
              ]
            })(
              <InputNumber precision={0} style={{ width: 400 }} min={1} max={9999999999} suffix="元" />
            )
          }
        </FormItem>}
        {getFieldValue('isGuaranteed') && <FormItem label='保底备注' {...formItemLayout}>
          {
            getFieldDecorator('guaranteedRemark', {
              initialValue: data.guaranteedRemark,
              rules: [
                {
                  pattern: /^.{0,1000}$/,
                  message: '保底备注最多可输入1000个字'
                }
              ]
            })(
              <TextArea autoSize={{ minRows: 4, maxRows: 4 }} style={{ width: 400 }} allowClear />
            )
          }
        </FormItem>}
        <FormItem label='政策备注' {...formItemLayout}>
          {
            getFieldDecorator('remark', {
              initialValue: data.remark,
              rules: [
                {
                  pattern: /^.{0,1000}$/,
                  message: '政策备注最多可输入1000个字'
                }
              ]
            })(
              <TextArea autoSize={{ minRows: 4, maxRows: 6 }} style={{ width: 400 }} allowClear />
            )
          }
        </FormItem>
      </ConfigProvider>
    </Form>
  );
});

export default Form.create()(PolicyEditForm);
