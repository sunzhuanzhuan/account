import React from 'react';
import { Table, Modal, Form, Select, Button, Icon, message } from 'antd'
const { confirm } = Modal
import AccountListTable from '../AccountListTable'
// import {
//     ruleDiscount,
//     Rule_Discount_Ratio,
//     Rule_Discount_Numeric,

//     ruleRebate,
//     Rule_Rebate_Ratio,
//     Rule_Rebate_Numeric,
//     Rule_Rebate_LadderRatio
// } from '../../constants/dataConfig'
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 21 },
};
// const { Option } = Select;

export const AccountEdit = (props) => {
  const { onButtonClick, accountList = [], delWhiteListAccount, cleanWhiteListAccount } = props;
  // const { getFieldDecorator } = props.form;
  const { defaultCheckedList = [1, 2], setDefaultCheckedList } = props;

  const onClose = (e) => {
    const checkeList = defaultCheckedList.filter(item => item !== e);
    setDefaultCheckedList(checkeList);
  }
  return <>
    <Form.Item label="账号" {...formItemLayout}>
      <Button onClick={onButtonClick}>添加账号</Button>
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
        //message.success('清空账号成功')
        cleanWhiteListAccount()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  return <Form.Item label={labelName} {...formItemLayout}>
    <p>已选择{accountList.length}个账号 {isEdit ? <a onClick={showConfirm} style={{ float: "right" }}><Icon type="rest" />清空</a> : null}</p>
    <AccountListTable isEdit={isEdit} delWhiteListAccount={delWhiteListAccount} dataSource={accountList} />
  </Form.Item>
}
