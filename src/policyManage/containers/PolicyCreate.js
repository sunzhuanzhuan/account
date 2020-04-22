import React, { useEffect, useRef, useState } from 'react';
import * as commonActions from '@/actions';
import { bindActionCreators } from "redux";
import actions from "../actions";
import { connect } from "react-redux";
import {
  Button,
  Checkbox,
  Form,
  PageHeader,
  Input,
  DatePicker, Select, Radio, Col, Modal, ConfigProvider, message, Icon
} from "antd";

import {
  POLICY_LEVEL,
  RULE_REBATE_LADDER,
  WHITE_LIST_ACCOUNTS_LIMIT
} from "@/policyManage/constants/dataConfig";
import IconFont from "@/base/IconFont";
import { Settlement } from "@/policyManage/components/RuleModules/Settlement";
import SpecialRuleEdit from "@/policyManage/components/RuleModules/SpecialRuleEdit";
import AccountListEdit from "@/policyManage/components/RuleModules/AccountListEdit";
import SelectAllCheck from "@/policyManage/components/SelectAllCheck";
import { DiscountEdit } from "@/policyManage/components/RuleModules/Discount";
import { RebateEdit } from "@/policyManage/components/RuleModules/Rebate";


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;


const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 }
};


const PolicyCreate = (props) => {

  const [ submitLoading, setSubmitLoading ] = useState()

  const mcnId = props.match.params.ownerId;


  useEffect(() => {
    // 获取平台列表
  }, [])

  const handleValues = (values) => {
    let newValue = { ...values }
    const { globalAccountRule, specialAccountRules } = values

    // 处理全局折扣 阶梯设置
    if (globalAccountRule.rebateRule && globalAccountRule.rebateRule.rebateType === RULE_REBATE_LADDER) {
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

    // 处理 accountList
    newValue.specialAccountRules = specialAccountRules.map(rule => {
      let newRule = { ...rule }
      newRule.accountList = newRule.accountList.map(item => item.platformId)
      delete newRule.uuid
      return newRule
    })

    // 处理时间
    newValue.validStartTime = values.policyTime[0].format('YYYY-MM-DD 00:00:00');
    newValue.validEndTime = values.policyTime[1].format('YYYY-MM-DD 23:59:59');

    newValue.whiteList.accountList = newValue.whiteList.accountList.map(item => item.platformId)

    newValue.mcnId = mcnId

    return newValue
  }

  const handleSubmit = () => {
    props.form.validateFields((err, values) => {
      if (err) return;

      if (!values.globalAccountRule.discountRule && !values.globalAccountRule.rebateRule) {
        message.warn('折扣与返点至少填一项')
        return
      }

      if (hasRebate(values) && !values.rebateSettlementCycle) {
        message.warn('当前全局或特殊规则中设置了返点, 请添加返点规则')
        return
      }

      const body = handleValues(values)

      setSubmitLoading(true)
      props.actions.addPolicy(body).then(() => {
        message.success('更新账号成功');
      }).finally(() => {
        setSubmitLoading(false)
      });

    })
  }

  const getExcludeIds = (list) => {
    const {
      specialAccountRules,
      whiteList
    } = props.form.getFieldsValue([ 'specialAccountRules', 'whiteList.accountList' ])
    let result = specialAccountRules.reduce((result, item) => {
      return result.concat(item.accountList)
    }, [])

    result = result.concat(whiteList.accountList, list)

    return result.map(item => item.accountId)
  }

  const hasRebate = (values) => {
    const {
      specialAccountRules,
      globalAccountRule
    } = values

    let index = [ ...specialAccountRules, globalAccountRule ].findIndex((rule) => {
      return rule.rebateRule && rule.rebateRule.rebateType
    })


    return index > -1
  }


  const { getFieldDecorator, getFieldValue, setFieldsValue } = props.form;


  const onDeselectPlatform = (key, isAll) => {
    // message.warn("删除账号")
    const {
      specialAccountRules,
      whiteList
    } = props.form.getFieldsValue([ 'specialAccountRules', 'whiteList.accountList' ])

    let r1 = specialAccountRules.map(rule => {
      let newRule = { ...rule }
      newRule.accountList = isAll ? [] : newRule.accountList.filter(item => item.platformId !== key)
      return newRule
    })

    let r2 = isAll ? [] : whiteList.accountList.filter(item => item.platformId !== key)

    setFieldsValue({
      'specialAccountRules': r1,
      'whiteList.accountList': r2
    })
  }


  return (
    <div className="policy-manage-create-container">
      <PageHeader
        onBack={() => {
          console.log('-----');
        }}
        title="添加政策"
        subTitle="This is a subtitle"
      />
      <Form {...formItemLayout} className="policy-manage-create-container-scroll" id="scroll-box">
        <ConfigProvider getPopupContainer={() => document.getElementById('scroll-box')}>
          <FormItem label='主账号名称'>
            2222
          </FormItem>
          <FormItem label='主账号ID'>
            2222
          </FormItem>
          <FormItem label='政策名称'>
            {getFieldDecorator('policyName', {
              rules: [
                { required: true, message: '政策名称必填' }
              ]
            })(
              <Input placeholder='请输入' style={{ width: 330 }} />
            )}
          </FormItem>
          <FormItem label="政策有效期">
            {getFieldDecorator('policyTime', {
              rules: [
                { type: 'array', required: true, message: '请添加政策有效期' }
              ],
              initialValue: []
            })(
              <RangePicker />
            )}
          </FormItem>
          <FormItem label="政策级别"  {...formItemLayout}>
            {getFieldDecorator('policyLevel', {
              rules: [ { required: true, message: '该项为必填项，请选择!' } ],
              initialValue: undefined
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
              initialValue: [],
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
            <DiscountEdit form={props.form} rule={{}} fieldKeyPrefix="globalAccountRule." />
            <RebateEdit form={props.form} rule={{}} fieldKeyPrefix="globalAccountRule." />
          </FormItem>
          <FormItem label='特殊账号'>
            {getFieldDecorator(`specialAccountRules`, {
              initialValue: []
            })(
              <SpecialRuleEdit
                actions={props.actions}
                getExcludeIds={getExcludeIds}
                platforms={getFieldValue('globalAccountRule.platformIds')}
                params={{
                  mcnId,
                  platformIds: getFieldValue('globalAccountRule.platformIds'),
                  type: 1
                }}
              />
            )}
          </FormItem>
          <FormItem label='白名单账号'>
            {getFieldDecorator(`whiteList.accountList`, {
              initialValue: [],
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
                  platformIds: getFieldValue('globalAccountRule.platformIds'),
                  type: 2
                }}
                style={{ marginRight: 20 }}
                limit={WHITE_LIST_ACCOUNTS_LIMIT}
              >
                <Button icon="plus" type="primary">添加白名单账号</Button>
              </AccountListEdit>
            )}
          </FormItem>
          <Settlement form={props.form} />
        </ConfigProvider>
      </Form>
      <div className="policy-manage-create-container-footer">
        <Button loading={submitLoading} type="primary" onClick={handleSubmit}>添加政策</Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  common: state.commonReducers,
  allPlatforms: state.pricePolicyReducer.globalRulePlatforms
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...commonActions,
    ...actions
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(PolicyCreate))
