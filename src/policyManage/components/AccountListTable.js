import React from "react";
import { Table, Button } from 'antd';
import numeral from 'numeral'
import { OnShelfStatus } from "@/policyManage/components/accountModalList/Global";

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
        align: 'center'
      },
      {
        title: '平台',
        dataIndex: 'platformName',
        key: 'platformName',
        align: 'center'
      },
      {
        title: '账号名称',
        ellipsis: true,
        dataIndex: 'snsName',
        key: 'snsName',
        align: 'center'
      },
      {
        title: '账号ID',
        dataIndex: 'snsId',
        key: 'snsId',
        align: 'center'
      },
      {
        title: '粉丝数',
        dataIndex: 'followerCount',
        key: 'followerCount',
        align: 'center',
        render: text => this.getFollowerCount(text)
      },
      {
        title: '上下架状态',
        dataIndex: 'onShelfStatus',
        align: 'center',
        render: (status) => {
          return status ? <>
            <OnShelfStatus status={status.aOnShelfStatus} text='A' />
            <OnShelfStatus status={status.bOnShelfStatus} text='B' />
            </>: '-'
        }
      },
      {
        title: '主页链接',
        dataIndex: 'url',
        align: 'center',
        render: (url) => {
          return url && <a href={url} target="_blank" >主页链接</a>
        }
      },
    ];
    if (isEdit) {
      columns.push({
        title: '操作',
        key: 'operate',
        width: 80,
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
      style={{marginBottom: 8}}
    />
  }
}

export default AccountListTable;
