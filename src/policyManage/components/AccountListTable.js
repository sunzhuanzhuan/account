import React from "react";
import { Table, Button } from 'antd';

class AccountListTable extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     currentPage: 1
        // };
        const { delAccountFromList, isEdit } = this.props;
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
                title: '粉丝数',
                dataIndex: 'followerCount',
                key: 'followerCount',
                width: 100,
                align: 'center',
            },

        ];
        if (isEdit) {
            this.columns.push({
                title: '操作',
                key: 'operate',
                // width: 100,
                align: 'center',
                render: (_, record) => {
                    return <Button type='link' className='operateText' onClick={() => delAccountFromList(record.accountId)}>删除</Button>
                }
            })
        }
    }


    render() {
        const { dataSource = [] } = this.props;
        return <Table
            key='list'
            columns={this.columns}
            dataSource={dataSource}
            rowKey={record => record.accountId}
            pagination={false}
            scroll={{ y: 220 }}
        />
    }
}



export default AccountListTable;
