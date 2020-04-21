import React, { Component, useState } from 'react';
import { Alert, Button, Card, Form, Icon, Modal, Popconfirm } from "antd";
import AccountListTable from "@/policyManage/components/AccountListTable";
import AddAccountModal from "@/policyManage/components/RuleModules/AddAccountModal";

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
    const newValue = [ ...this.props.value, ...list ]

    this.onChange(window._.uniqBy(newValue, 'accountId'))
  }

  setModal = (visible) => {
    this.setState({
      visible
    });
  }

  render() {
    const { value, excludeIds = [], params } = this.props
    const { visible } = this.state


    return <div>
      {value.length < 200 && <span onClick={() => this.setModal(true)}>
        {this.props.children}
      </span>}
      {value.length > 0 && <>
        <Alert style={{ margin: "6px 0 10px" }} message={<div>
          已选择{value.length}个账号
          <Popconfirm
            title="是否清空所有账号?"
            onConfirm={this.cleanAccount}
          >
            <a href="#" style={{ float: "right" }}><Icon type="rest" />清空</a>
          </Popconfirm>
        </div>} />
        <AccountListTable isEdit delAccount={this.delAccount} dataSource={value} />
      </>}
      <AddAccountModal
        excludeIds={[ ...excludeIds, ...value ]}
        params={params}
        getAccountInfoByIds={this.props.getAccountInfoByIds}
        visible={visible}
        setAddAccountModalVisible={this.setModal}
        updateAccountList={this.addAccount}
      />
    </div>
  }
}


