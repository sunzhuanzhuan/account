import React, { Component, useState } from 'react';
import { Alert, Button, Card, Form, message, Modal, Popconfirm } from "antd";
import { AccountEdit } from "@/policyManage/components/RuleModules/Account";
import { DiscountEdit } from "@/policyManage/components/RuleModules/Discount";
import { RebateEdit } from "@/policyManage/components/RuleModules/Rebate";
import { PlatformEdit } from "@/policyManage/components/RuleModules/Platform";
import AddAccountModal from "@/policyManage/components/RuleModules/AddAccountModal";
import AccountListTable from "@/policyManage/components/AccountListTable";
import CheckTag from "@/accountManage/base/CheckTag";
import { ruleDisplay } from "@/policyManage/utils";
import AccountListEdit from "@/policyManage/components/RuleModules/AccountListEdit";
import {
  RULE_REBATE_LADDER, SPECIAL_ACCOUNTS_LIMIT,
  SPECIAL_RULES_LIMIT,
  WHITE_LIST_ACCOUNTS_LIMIT
} from "@/policyManage/constants/dataConfig";

const uuid = require('uuid/v1');


const formItemLayout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 23 }
};

const EditRuleForm = (props) => {
  const { form, getExcludeIds, editRuleModalClose, params, current, actions, onUpdate } = props;

  const { getFieldDecorator } = form;


  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        if (!values.discountRule && !values.rebateRule) {
          message.warn('折扣与返点至少填一项')
          return
        }
        if (values.rebateRule?.rebateType === RULE_REBATE_LADDER) {
          const { rebateNumbers = [], percentage = [] } = values.rebateRule.rebateStepRules;
          const _rebateStepRules = [];
          for (let index = 0; index < rebateNumbers.length - 1; index++) {
            _rebateStepRules.push({
              amountLowLimit: rebateNumbers[index],
              amountHighLimit: rebateNumbers[index + 1],
              rebateRatio: percentage[index]
            })
          }
          if (_rebateStepRules.length > 0) {
            values.rebateRule.rebateStepRules = _rebateStepRules;
          }
        }

        onUpdate({
          ...values,
          ruleId: current.ruleId,
          uuid: current.ruleId ? null : (current.uuid || uuid())
        })
        editRuleModalClose()
      }
    });
  };

  const title = current.type === 'add' ? '新增规则' : '编辑规则'
  return (
    !!current.type && <Modal
      visible
      title={title}
      width={1000}
      bodyStyle={{ maxHeight: 380, overflowY: "auto" }}
      onOk={handleSubmit}
      maskClosable
      mask={false}
      onCancel={editRuleModalClose}
      closable
    >
      <Form onSubmit={handleSubmit} {...formItemLayout}>
        <DiscountEdit form={form} rule={current.discountRule} />
        <RebateEdit form={form} rule={current.rebateRule} />
        <Form.Item label="账号">
          {getFieldDecorator('accountList', {
            initialValue: current.accountList || [],
            rules: [
              {
                type: "array",
                required: true,
                message: "请添加账号"
              },
              {
                type: "array",
                max: SPECIAL_ACCOUNTS_LIMIT,
                message: '最多可添加' + SPECIAL_ACCOUNTS_LIMIT + '个账号'
              }
            ]
          })(
            <AccountListEdit
              getAccountInfoByIds={actions.getAccountInfoByIds}
              getExcludeIds={getExcludeIds}
              params={params}
              limit={SPECIAL_ACCOUNTS_LIMIT}
            >
              <Button icon="plus" type="link">添加账号</Button>
            </AccountListEdit>
          )}
        </Form.Item>
      </Form>
    </Modal>

  );
};

const RuleCard = props => {
  const { data, index, onEdit, onDel, isEdit } = props

  const {
    discountRuleLabel,
    discountRuleValue,
    rebateRuleLabel,
    rebateRuleValue
  } = ruleDisplay(data)

  return (
    <Card
      size="small"
      title={
        <span>
          规则{index + 1}（{data.accountList.length}个号）：
          {
            discountRuleLabel && <>
              <span>{discountRuleLabel}</span><span>{discountRuleValue}</span>；
            </>
          }
          <span>{rebateRuleLabel}</span><span>{rebateRuleValue}</span>
        </span>
      }
      extra={
        isEdit && <>
          <Button onClick={onEdit} type="primary" style={{ marginRight: 8 }}>编辑</Button>
          <Popconfirm
            title="是否删除本规则?"
            onConfirm={onDel}
          >
            <Button>删除</Button>
          </Popconfirm>
        </>
      }
      style={{ margin: "0 20px 20px 0" }}
    >
      {data.accountList.length > 0 ? <AccountListTable dataSource={data.accountList} /> : <div>
        暂未添加账号
      </div>}
    </Card>
  )
}


const EditRuleFormWrapped = Form.create()(EditRuleForm)

export class SpecialRuleEdit extends Component {

  state = {
    current: {}
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  onUpdate = (rule) => {
    const { value } = this.props
    let newVal = [ ...value ]
    const index = newVal.findIndex(item => {
      const itemId = item.ruleId || item.uuid
      const ruleId = rule.ruleId || rule.uuid
      return itemId === ruleId

    })
    if (index >= 0) {
      newVal.splice(index, 1, rule)
    } else {
      newVal.push(rule)
    }

    this.onChange(newVal)
  }

  onDelete = (index) => {
    const { value } = this.props
    let newVal = [ ...value ]
    newVal.splice(index, 1)

    this.onChange(newVal)
  }

  onChange = (newValue) => {
    this.triggerChange(newValue)
  }

  render() {
    const { value, params } = this.props

    return <div>
      {
        value.length < SPECIAL_RULES_LIMIT && <Button
          icon="plus"
          type="primary"
          style={{ marginBottom: 10 }}
          onClick={() => this.setState({ current: { type: 'add' } })}
        >
          添加特殊账号
        </Button>
      }
      {
        value.map((rule, index) =>
          <RuleCard
            key={rule.ruleId || rule.uuid}
            isEdit
            data={rule}
            index={index}
            onDel={() => this.onDelete(index)}
            onEdit={() => {
              this.setState({ current: { type: 'update', ...rule } })
            }}
          />)
      }
      <EditRuleFormWrapped
        current={this.state.current}
        actions={this.props.actions}
        editRuleModalClose={() => this.setState({ current: {} })}
        onUpdate={this.onUpdate}
        getExcludeIds={this.props.getExcludeIds}
        params={params}
      />
    </div>
  }
}


export const SpecialRuleView = (props) => {
  const { rules = [] } = props

  return (
    <>
      {
        rules.length > 0 ? rules.map((rule, index) =>
            <RuleCard key={rule.ruleId} data={rule} index={index} />) :
          <span>无</span>
      }
    </>
  )
};

export default {
  SpecialRuleEdit,
  SpecialRuleView
};

