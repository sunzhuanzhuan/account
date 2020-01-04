import React, { useState, useEffect } from "react";
import { Input, Button } from 'antd';
import AccountListTable from './AccountListTable'
import AddAccountModal from './RuleModules/AddAccountModal'
const WhiteList = (props) => {
  const { delWhiteListAccount, mcnId, whiteList = {}, disable } = props;
  const whiteAccountList = whiteList.accountList || []
  const [visible, setVisible] = useState(false);

  const addAccountBtnClick = () => {
    setVisible(true)
  }
  const setAddAccountModalVisible = () => {
    setVisible(false)
  }

  const updateAccountList = (newAccountList = []) => {
    console.log("updateAccountList:", newAccountList)
    // setWhiteList([...whiteList, ...newAccountList])
    const ids = newAccountList.map(item => item.accountId)
    props.saveWhiteAccount(ids)
  }
  const isEdit = !disable;
  const allSelectedIds = whiteAccountList.map(item => item.accountId)
  return <div className='white-list'>
    <div className='search-bar'>
      {isEdit && whiteAccountList.length < 20 ? <Button type='primary' onClick={addAccountBtnClick} style={{ marginBottom: 10 }}>添加</Button> : null}
    </div>
    <AccountListTable
      isEdit={isEdit}
      dataSource={whiteAccountList}
      delWhiteListAccount={delWhiteListAccount}
    ></AccountListTable>
    <AddAccountModal
      mcnId={mcnId}
      allSelectedIds={allSelectedIds}
      visible={visible}
      setAddAccountModalVisible={setAddAccountModalVisible}
      updateAccountList={updateAccountList}
      getAccountInfoByIds={props.getAccountInfoByIds}
    ></AddAccountModal>
  </div>
}

export default WhiteList;

