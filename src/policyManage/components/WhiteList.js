import React from "react";
import { Input, Button } from 'antd';
import AccountListTable from './AccountListTable'
import AddAccountModal from './RuleModules/AddAccountModal'
class WhiteList extends React.Component {
	constructor(props) {
		super(props);
		const { whiteList = [] } = props;
		this.state = {
			whiteList: whiteList,
			// selectedIds: whiteList.map(item => item.accountId) || [],
			visible: false
		}
	}
	addAccountBtnClick = () => {
		this.setState({
			visible: true
		})
	}
	updateSelectedIds = () => {

	}
	setAddAccountModalVisible = () => {
		this.setState({
			visible: false
		})
	}

	updateAccountList = (newAccountList) => {
		console.log("new ", newAccountList)
		const { whiteList } = this.state;
		// debugger;
		this.setState({ whiteList: [...whiteList, ...newAccountList] });
	}
	delAccountFromList = (accountId) => {
		const { delWhiteListAccount } = this.props;
		const { whiteList } = this.state;
		// console.log("delAccountFromList", accountId, accountList)
		delWhiteListAccount({ accountId }).then(() => {
			const newAccountList = whiteList.filter(item => item.accountId != accountId);
			this.setState({ whiteList: newAccountList })
		})

	}
	updateSelectedIds = (ids) => {
		// const { selectedIds } = this.state;
		// const newIds = Array.from(new Set([...selectedIds, ...ids]));

		// this.setState({
		// 	selectedIds: newIds
		// })
	}

	render() {
		// console.log("=====", this.props.whiteList)
		const { visible, whiteList = [] } = this.state;
		// const { whiteList = [] } = this.props;
		console.log("====", whiteList)
		const allSelectedIds = whiteList.map(item => item.accountId)
		return <div className='white-list'>
			<div className='search-bar'>
				<span className='label' span={3}>account_id: </span>
				<Input />
				<span className='label' span={3}>账号名称:</span>
				<Input />
				<Button type='primary'>查询</Button>
				<Button>重置</Button>
				<Button onClick={this.addAccountBtnClick}>添加</Button>
			</div>
			<AccountListTable
				isEdit={true}
				dataSource={whiteList}
				delAccountFromList={this.delAccountFromList}
			></AccountListTable>
			<AddAccountModal
				allSelectedIds={allSelectedIds}
				visible={visible}
				updateSelectedIds={this.updateSelectedIds}
				setAddAccountModalVisible={this.setAddAccountModalVisible}
				updateAccountList={this.updateAccountList}
				getAccountInfoByIds={this.props.getAccountInfoByIds}
			></AddAccountModal>
		</div>
	}
}

export default WhiteList;
