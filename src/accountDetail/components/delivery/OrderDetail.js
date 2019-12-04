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
  {
    key: '3',
    name: '胡彦祖',
  },
  {
    key: '4',
    name: '胡彦祖',
  },

];
export default function OrderDetail() {
  const [param, setParam] = useState({ brand: 0, type: 0 })
  const [orderDetail, setOrderDetail] = useState({})
  const [brandList, setBrandList] = useState([])
  useEffect(() => {
    getDetail(param)
    getBrand()
  }, [])
  useEffect(() => {
    getDetail(param)
  }, [param])
  //详情信息
  async function getDetail(params) {
    const { data } = api.post('/orderDetail', { ...params })
    setOrderDetail(data)
  }
  //下拉框数据
  async function getBrand() {
    const { data = [] } = api.get('/getBrandList')
    setBrandList(data)
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

  return <div>
    <div className='title-big'>订单详情</div>
    <div className='container'>
      <div >
        <Select defaultValue="lucy" style={{ width: 120, margin: '0px 20px' }}
          onChange={value => setParam({ ...param, page: 1, brand: value })}>
          {brandList.map(item => <Option
            key={item.id} value={item.id}>
            {item.name}
          </Option>)}
        </Select>

        <Radio.Group
          value={param.type}
          onChange={e => setParam({ ...param, page: 1, type: e.target.value })}>
          <Radio value={0}>全部订单</Radio>
          <Radio value={1}>预约</Radio>
          <Radio value={2}>派单</Radio>
        </Radio.Group>
      </div>
      <div>

      </div>
      <div>
        <Table dataSource={dataSource} columns={columns}
          pagination={{
            pageSize: 2,
            onChange: num => setParam({ ...param, page: num })
          }} />
      </div>
    </div>
  </div>
}
