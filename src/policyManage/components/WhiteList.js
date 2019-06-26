import React from "react";
import { Table } from 'antd';

class WhiteList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1
		};
		this.columns = [
			{
				title: 'account_id',
				dataIndex: 'account_id',
				key: 'account_id',
				width: 100,
				align: 'center',
			},
			{
				title: '平台',
				dataIndex: 'platform',
				key: 'platform',
				width: 100,
				align: 'center',
			},
			{
				title: '账号名称',
				dataIndex: 'account_name',
				key: 'account_name',
				width: 100,
				align: 'center',
			},
			{
				title: '账号ID',
				dataIndex: 'id',
				key: 'id',
				width: 100,
				align: 'center',
			},
			{
				title: '粉丝数',
				dataIndex: 'count',
				key: 'count',
				width: 100,
				align: 'center',
			},
			{
				title: '操作',
				key: 'operate',
				width: 100,
				align: 'center',
				render: (_, record) => {
					return <span className='operateText'>删除</span>
				}
			},
		];
	}
	
	render() {
		const { currentPage } = this.state;
		const pagination = {
            onChange: (currentPage) => {
                this.setState({currentPage})
            },
            total: 100,
            pageSize: 20,
            current: currentPage,
        };

		return [
			<Table
				key='list'
				columns={this.columns}
				dataSource={[]}
				rowKey={record => record.id}
				pagination={pagination}
				scroll={{ x: 1300 }}
			/>

		]
	}
}



export default WhiteList;
