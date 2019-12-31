import React, { useState, useEffect } from "react";
import { Input, Button } from 'antd';
import AccountListTable from './AccountListTable'
import AddAccountModal from './RuleModules/AddAccountModal'
const WhiteList = (props) => {
	const { delWhiteListAccount } = props;
	const [whiteList, setWhiteList] = useState(props.whiteList || [])
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setWhiteList(props.whiteList || [])
	}, [])

	const addAccountBtnClick = () => {
		setVisible(true)
	}
	const setAddAccountModalVisible = () => {
		setVisible(false)
	}

	const updateAccountList = (newAccountList) => {
		setWhiteList([...whiteList, ...newAccountList])
	}
	function delAccountFromList(accountId) {
		delWhiteListAccount({ accountId }).then(() => {
			const newAccountList = whiteList.filter(item => item.accountId != accountId);
			setWhiteList(newAccountList)
		})
	}
	const updateSelectedIds = (ids) => {
		// const { selectedIds } = this.state;
		// const newIds = Array.from(new Set([...selectedIds, ...ids]));

		// this.setState({
		// 	selectedIds: newIds
		// })
	}

	const allSelectedIds = whiteList.map(item => item.accountId)
	return <div className='white-list'>
		<div className='search-bar'>
			<span className='label' span={3}>account_id: </span>
			<Input />
			<span className='label' span={3}>账号名称:</span>
			<Input />
			<Button type='primary'>查询</Button>
			<Button>重置</Button>
			<Button onClick={addAccountBtnClick}>添加</Button>
		</div>
		<AccountListTable
			isEdit={true}
			dataSource={whiteList}
			delAccountFromList={delAccountFromList}
		></AccountListTable>
		<AddAccountModal
			allSelectedIds={allSelectedIds}
			visible={visible}
			updateSelectedIds={updateSelectedIds}
			setAddAccountModalVisible={setAddAccountModalVisible}
			updateAccountList={updateAccountList}
			getAccountInfoByIds={props.getAccountInfoByIds}
		></AddAccountModal>
	</div>
	// }
}

export default WhiteList;

