import React, { Component, useState } from 'react';
import { Alert, message, Card, Form, Icon, Modal, Popconfirm } from "antd";
import AccountListTable from "@/policyManage/components/AccountListTable";
import AddAccountModal from "@/policyManage/components/RuleModules/AddAccountModal";
import { SPECIAL_ACCOUNTS_LIMIT } from "@/policyManage/constants/dataConfig";

export default class AccountListEdit extends Component {
  state = {
    visible: false
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  onChange = (list) => {
    this.triggerChange(list)
  }

  delAccount = (accountId) => {
    const newValue = this.props.value.filter(item => item.accountId != accountId);
    this.onChange(newValue)
  }
  cleanAccount = () => {
    this.onChange([])
  }

  addAccount = (list) => {
    const newValue = [ ...list, ...this.props.value ]

    this.onChange(window._.uniqBy(newValue, 'accountId'))
  }

  setModal = (visible) => {
    this.setState({
      visible
    });
  }

  render() {
    const { value, getExcludeIds, params, limit = SPECIAL_ACCOUNTS_LIMIT}  = this.props
    const { visible } = this.state


    return <div style={this.props.style}>
      {value.length < limit && <span onClick={() => {
        if(params.platformIds.length === 0){
          return message.warn("请先选择平台")
        }
        this.setModal(true)
      }}>
        {this.props.children}
      </span>}
      {value.length > 0 && <>
        <Alert className="account-list-number-actions" style={{ margin: "6px 0 10px" }} message={<div>
          共{value.length}个账号
          <Popconfirm
            title="是否清空所有账号?"
            onConfirm={this.cleanAccount}
            arrowPointAtCenter
          >
            <a href="#" style={{ float: "right" }}><Icon type="rest" />清空</a>
          </Popconfirm>
        </div>} />
        <AccountListTable isEdit delAccount={this.delAccount} dataSource={value} />
      </>}
      <AddAccountModal
        excludeItems={value}
        getExcludeIds={getExcludeIds}
        params={params}
        getAccountInfoByIds={this.props.getAccountInfoByIds}
        visible={visible}
        setAddAccountModalVisible={this.setModal}
        updateAccountList={this.addAccount}
      />
    </div>
  }
}


