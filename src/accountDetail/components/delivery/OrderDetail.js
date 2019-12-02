import React, { useState, useEffect } from 'react'
import api from '@/api'
import { Select, Radio, Table } from 'antd'
const { Option } = Select;
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
  },
  {
    key: '2',
    name: '胡彦祖',
  },
];
export default function OrderDetail() {
  const [orderDetail, setOrderDetail] = useState({})
  useEffect(() => {
    getDetail()
  }, [])
  async function getDetail(params) {
    const { data } = api.post('/orderDetail', { ...params })
    setOrderDetail(data)
  }


  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '应约时间',
      dataIndex: '应约时间name',
      key: '应约时间name',
    },
    {
      title: '价格名称',
      dataIndex: '价格名称name',
      key: '价格名称name',
    },
    {
      title: '投放品牌',
      dataIndex: '投放品牌name',
      key: '投放品牌name',
    },
    {
      title: '所属行业',
      dataIndex: '所属行业name',
      key: '所属行业name',
    },
    {
      title: '成交价格',
      dataIndex: '成交价格name',
      key: '成交价格name',
    },
    {
      title: '投放数据',
      dataIndex: '投放数据name',
      key: '投放数据name',
    },

  ];
  return (
    <div>
      <div className='title-big'>订单详情</div>
      <UseSearchForm func={getDetail} />
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}

function UseSearchForm({ func, brandList = [] }) {
  const [param, setParam] = useState({ brand: 0, type: 0 })
  useEffect(() => {
    func(param)
  }, [param])
  return <div>
    <div>
      <Select defaultValue="lucy" style={{ width: 120 }}
        onChange={value => setParam({ ...param, brand: value })}>
        {brandList.map(item => <Option
          key={item.id} value={item.id}>
          {item.name}
        </Option>)}
      </Select>

      <Radio.Group
        value={param.type}
        onChange={e => setParam({ ...param, type: e.target.value })}>
        <Radio value={0}>全部订单</Radio>
        <Radio value={1}>预约</Radio>
        <Radio value={2}>派单</Radio>
      </Radio.Group>
    </div>
    <div>

    </div>
  </div>
}
