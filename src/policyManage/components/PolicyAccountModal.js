/**
 * Created by lzb on 2020-03-09.
 */
import React, { useEffect, useState } from 'react';
import { Table, Icon, Modal, Popconfirm, Popover } from "antd";

const data = {}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: '20%'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
    width: '20%'
  },
  {
    title: 'Email',
    dataIndex: 'email'
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
  };

  const fetch = (params = {}) => {
    //
  };


  return (
    <Modal visible title="政策包含账号" footer={null} width={800}>
      <div className="policy-account-modal-rules-container">
        规则1（120个号）：折扣固定扣减90元；返点固定比例20%（季结）
      </div>
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
