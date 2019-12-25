import React from "react";
import { Table, Button } from 'antd';

class AccountListTable extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     currentPage: 1
        // };
        const { delAccountFromList } = this.props;
        this.columns = [
            {
                title: 'accountId',
                dataIndex: 'accountId',
                key: 'accountId',
                width: 180,
                align: 'center',
            },
            {
                title: '平台',
                dataIndex: 'platformName',
                key: 'platformName',
                width: 100,
                align: 'center',
            },
            {
                title: '账号名称',
                dataIndex: 'snsName',
                key: 'snsName',
                width: 160,
                align: 'center',
            },
            {
                title: '账号ID',
                dataIndex: 'snsId',
                key: 'snsId',
                width: 160,
                align: 'center',
            },
            {
                title: '粉丝数11',
                dataIndex: 'followerCount',
                key: 'followerCount',
                width: 100,
                align: 'center',
            },
            {
                title: '操作',
                key: 'operate',
                // width: 100,
                align: 'center',
                render: (_, record) => {
                    console.log(_, record, '========')
                    return <Button type='link' className='operateText' onClick={() => delAccountFromList(record.accountId)}>删除</Button>
                }
            },
        ];
    }

    render() {
        const { dataSource = [] } = this.props;
        // const { currentPage } = this.state;
        // const pagination = {
        //     onChange: (currentPage) => {
        //         this.setState({ currentPage })
        //     },
        //     total: 100,
        //     pageSize: 20,
        //     current: currentPage,
        // };

        return <Table
            key='list'
            columns={this.columns}
            dataSource={dataSource}
            rowKey={record => record.accountId}
            // pagination={pagination}
            pagination={false}
            // scroll={{ x: 1300 }}
            scroll={{ y: 220 }}
        />
    }
}



export default AccountListTable;
