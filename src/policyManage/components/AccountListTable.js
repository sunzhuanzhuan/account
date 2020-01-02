import React from "react";
import { Table, Button } from 'antd';

class AccountListTable extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     currentPage: 1
        // };

    }


    render() {
        const { dataSource = [], delWhiteListAccount, isEdit } = this.props;
        const columns = [
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
                title: '粉丝数',
                dataIndex: 'followerCount',
                key: 'followerCount',
                width: 100,
                align: 'center',
            },
            {
                title: '操作',
                key: 'operate',
                width: 100,
                align: 'center',
                render: (_, record) => {
                    return isEdit ? <Button type='link' className='operateText' onClick={() => delWhiteListAccount(record.accountId)}>删除</Button> : null
                }
            }
        ];
        return <Table
            key='list'
            columns={columns}
            dataSource={dataSource}
            rowKey={record => record.accountId}
            pagination={false}
            scroll={{ y: 220 }}
        />
    }
}



export default AccountListTable;
