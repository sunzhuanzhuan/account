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
import { RULE_REBATE_LADDER } from "@/policyManage/constants/dataConfig";

const uuid = require('uuid/v1');


const formItemLayout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 23 }
};

const EditRuleForm = (props) => {
  const { form, editRuleModalClose, mcnId, current, actions, onUpdate } = props;

  const { getFieldDecorator } = form;


  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        if (!values.discountRule && !values.rebateRule) {
          message.warn('折扣与返点至少填一项')
          return
        }
        if(values.rebateRule && values.rebateRule.rebateType === RULE_REBATE_LADDER){
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
          uuid: current.ruleId ? null : uuid()
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
            initialValue: current.accountList || []
          })(
            <AccountListEdit
              getAccountInfoByIds={actions.getAccountInfoByIds}
              params={{
                mcnId,
                platformIds: [ 1, 2, 3 ],
                type: 1
              }}
            >
              <Button>添加账号</Button>
            </AccountListEdit>
          )}
        </Form.Item>
      </Form>
    </Modal>

  );
};

const RuleCard = props => {
  const { data, index, onEdit, onDel } = props

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
        <>
          <Button onClick={onEdit}>编辑</Button>
          <Button onClick={onDel}>删除</Button>
        </>
      }
      style={{ margin: "0 20px 20px 0" }}
    >
      <AccountListTable dataSource={data.accountList} />
    </Card>
  )
}


const EditRuleFormWrapped = Form.create()(EditRuleForm)

export default class SpecialRuleEdit extends Component {

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
    const { value } = this.props

    const allIds = []

    return <div>
      {
        value.length < 20 && <Button
          type="primary"
          style={{ marginBottom: 10 }}
          onClick={() => this.setState({ current: { type: 'add' } })}
        >
          添加特殊账号
        </Button>
      }
      {
        value.map((rule, index) =>
          <RuleCard key={rule.ruleId || rule.uuid} data={rule} index={index} onDel={this.onDelete} onEdit={() => {
            this.setState({ current: { type: 'update', ...rule } })
          }} />)
      }
      <EditRuleFormWrapped
        current={this.state.current}
        actions={this.props.actions}
        editRuleModalClose={() => this.setState({ current: {} })}
        onUpdate={this.onUpdate}
      />
    </div>
  }
}


