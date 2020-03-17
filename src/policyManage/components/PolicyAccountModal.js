/**
 * Created by lzb on 2020-03-09.
 */
import React, { useEffect, useState } from 'react';
import { Table, Icon, Modal, Popconfirm, Popover, Tabs } from "antd";

const { TabPane } = Tabs
const data = {}

const columns = [
  {
    title: '规则ID',
    dataIndex: 'id',
    sorter: true
  },
  {
    title: 'account_id',
    dataIndex: 'account_id',
    width: 100
  },
  {
    title: '全部平台',
    dataIndex: 'platform',
    filters: [{ text: '抖音', value: 'male' }, { text: '快手', value: 'female' }],
    align: 'right'
  },
  {
    title: '账号名称',
    dataIndex: 'email',
    align: 'center'

  },
  {
    title: '账号ID',
    dataIndex: 'email12'
  },
  {
    title: '粉丝数',
    dataIndex: 'followerCount'
  }
];

const PolicyAccountModal = (props) => {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch()
  }, [])

  const handleTableChange = (pagination, filters, sorter) => {
    //
    console.log(pagination, filters, sorter);
  };

  const fetch = (params = {}) => {
    //
  };


  return (
    <Modal visible={props.visible} title="政策包含账号" footer={null} width={900} bodyStyle={{padding: "8px 13px"}}>
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span>全局账号 <b>100</b></span>} key="1"/>
        <TabPane tab={<span>特殊账号 <b>8</b></span>} key="2"/>
        <TabPane tab={<span>白名单 <b>16</b></span>} key="3"/>
      </Tabs>
      <ul className="policy-account-modal-rules-container">
        <li>
          规则1（120个号）：折扣固定扣减90元；返点固定比例20%（季结）
          <a>查看</a>
        </li>
        <li>
          规则1（120个号）：折扣固定扣减90元；返点固定比例20%（季结）
        </li>
        <li>
          规则1（120个号）：折扣固定扣减90元；返点固定比例20%（季结）
          <a>查看</a>
        </li>
        <li>
          规则1（120个号）：折扣固定扣减90元；返点固定比例20%（季结）
          <a>查看</a>
        </li>
      </ul>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </Modal>
  );
};

export default PolicyAccountModal;
