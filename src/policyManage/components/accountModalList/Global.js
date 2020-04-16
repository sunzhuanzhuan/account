/**
 * Created by lzb on 2020-04-15.
 */
import React, { useEffect, useState } from 'react';
import { Table } from "antd";

const Global = (props) => {
  const [ data, setData ] = useState({})
  const [ pagination, setPagination ] = useState({})
  const [ loading, setLoading ] = useState(false)

  const handleTableChange = (pagination, filters, sorter) => {
    let params = {
      currentPage: 1,
      pageSize: 10,
      policyId: 1,
      platformId: 1,
      onShelfStatus: 1

    }
    console.log(pagination, filters, sorter);
  };

  useEffect(() => {
    getList()
  }, [])


  const getList = (params = {}) => {
    props.action(params).then(({ data }) => {
      setData(data)
    })
  };


  const columns = [
    {
      title: 'account_id',
      dataIndex: 'accountId',
      width: 100
    },
    {
      title: '全部平台',
      dataIndex: 'platformId',
      filters: [ { text: '抖音', value: 'male' }, { text: '快手', value: 'female' } ],
      align: 'right'
    },
    {
      title: '账号名称',
      dataIndex: 'snsName',
      align: 'center'

    },
    {
      title: '账号ID',
      dataIndex: 'snsId'
    },
    {
      title: '粉丝数',
      dataIndex: 'followerCount'
    },
    {
      title: '上下架状态',
      dataIndex: 'onShelfStatus',
      filters: [ { text: 'A端上架', value: 1 }, { text: 'A端下架', value: 2 } ],
      filterMultiple: false,
      align: 'right'
    },
    {
      title: '主页链接',
      dataIndex: 'url',
      align: 'center',
      render: (url) => {
        return <a href={url} target="_blank">查看</a>
      }
    },
  ];

  const { accountList = {} } = data
  return (
    <div>
      <ul className="policy-account-modal-rules-container">
        {/* 使用 ruleDisplay 方法获取值 */}
        <li>
          全局规则：折扣-固定扣减90元；返点-固定比例20%
        </li>
        <li>
          返点规则：月结；全量收入计算；保底金额1200
        </li>
      </ul>
      <Table
        columns={columns}
        dataSource={accountList.list}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{y : 200}}
      />
    </div>
  );
};

export default Global;
