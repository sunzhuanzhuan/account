import React from "react";
import { Input, Button } from 'antd';
import AccountListTable from './AccountListTable'
class WhiteList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { whiteList = [] } = this.props;
		return <div className='white-list'>
			<div className='search-bar'>
				<span className='label' span={3}>account_id: </span>
				<Input />
				<span className='label' span={3}>账号名称:</span>
				<Input />
				<Button type='primary'>查询</Button><Button>重置</Button><Button>添加</Button>
			</div>
			<AccountListTable dataSource={whiteList}></AccountListTable>
		</div>
	}
}

export default WhiteList;
