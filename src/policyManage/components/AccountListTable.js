import React from "react";
import { Table, Button } from 'antd';
import numeral from 'numeral'

class AccountListTable extends React.Component {
  constructor(props) {
    super(props);
  }

  getFollowerCount = (value) => {
    if ((value < 10000 && value > 0) || value == 0) {
      return 9999
    } else if (value == 10000) {
      return '1w'
    } else if (value > 10000) {
      const isDecimal = value % 10000
      return `${isDecimal ? numeral(value / 10000).format('0.0') : numeral(value / 10000).format('0')}w`
    } else {
      return '--'
    }
  }

  render() {
    const { dataSource = [], delAccount, isEdit } = this.props;
    const columns = [
      {
        title: 'accountId',
        dataIndex: 'accountId',
        key: 'accountId',
        width: 180,
        align: 'center'
      },
      {
        title: '平台',
        dataIndex: 'platformName',
        key: 'platformName',
        width: 100,
        align: 'center'
      },
      {
        title: '账号名称',
        ellipsis: true,
        dataIndex: 'snsName',
        key: 'snsName',
        width: 160,
        align: 'center'
      },
      {
        title: '账号ID',
        dataIndex: 'snsId',
        key: 'snsId',
        width: 160,
        align: 'center'
      },
      {
        title: '粉丝数',
        dataIndex: 'followerCount',
        key: 'followerCount',
        width: 100,
        align: 'center',
        render: text => this.getFollowerCount(text)
      }
    ];
    if (isEdit) {
      columns.push({
        title: '操作',
        key: 'operate',
        width: 100,
        align: 'center',
        render: (_, record) => {
          return isEdit ?
            <Button type='link' className='operateText' onClick={() => delAccount(record.accountId)}>删除</Button> : null
        }
      })
    }
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
