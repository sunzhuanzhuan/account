import React from 'react';
import { Modal, Form, Button, Icon } from 'antd'
const { confirm } = Modal
import AccountListTable from '../AccountListTable'
const formItemLayout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 23 },
};

export const AccountEdit = (props) => {
  const { onButtonClick, accountList = [], delWhiteListAccount, cleanWhiteListAccount } = props;
  return <>
    <Form.Item label="账号" {...formItemLayout}>
      {accountList.length < 20 && <Button onClick={onButtonClick}>添加账号</Button>}
    </Form.Item>
    <AccountView isEdit={true} accountList={accountList} delWhiteListAccount={delWhiteListAccount} cleanWhiteListAccount={cleanWhiteListAccount} labelName=' '></AccountView>
  </>
}

export const AccountView = (props) => {
  const { accountList = [], delWhiteListAccount, cleanWhiteListAccount, isEdit } = props;
  const { labelName = '账号' } = props;
  function showConfirm() {
    confirm({
      title: '是否清空所有账号',
      onOk() {
        cleanWhiteListAccount()
      }
    });
  }

  return <Form.Item label={labelName} {...formItemLayout}>
    <p>已选择{accountList.length}个账号 {isEdit ? <a onClick={showConfirm} style={{ float: "right" }}><Icon type="rest" />清空</a> : null}</p>
    <AccountListTable isEdit={isEdit} delWhiteListAccount={delWhiteListAccount} dataSource={accountList} />
  </Form.Item>
}
