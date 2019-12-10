import React, { useState, useEffect } from 'react'
import api from '@/api'
import { Select, Radio, Table } from 'antd'
import './OrderDetail.less'
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
  const [param, setParam] = useState({ brand: 0, isFamous: 1, isTime: false, isPrice: false })
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
      dataIndex: 'isTime',
      key: 'isTime',
      sorter: true,
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
      dataIndex: 'isPrice',
      key: 'isPrice',
      sorter: true,
    },
    {
      title: '投放数据',
      dataIndex: '投放数据name',
      key: '投放数据name',
      render: () => <div>
        <a href={''}>{99}</a>
        <div>
          播放数：
          评论数：
          点赞数：
        </div>
      </div>
    },

  ];
  //表格排序
  function handleTableChange(pagination, filters, sorter) {
    setParam({ ...param, [sorter.columnKey]: sorter.order })
  }
  return <div>
    <div className='title-big'>订单详情</div>
    <div className='container'>
      <div className='flex-between'>
        <div >
          <Select defaultValue="lucy" style={{ width: 120, margin: '0px 20px 0px 0px' }}
            onChange={value => setParam({ ...param, page: 1, brand: value })}>
            {brandList.map(item => <Option
              key={item.id} value={item.id}>
              {item.name}
            </Option>)}
          </Select>

          <Radio.Group
            value={param.isFamous}
            onChange={e => setParam({ ...param, page: 1, isFamous: e.target.value })}>
            <Radio value={1}>预约</Radio>
            <Radio value={2}>派单</Radio>
          </Radio.Group>
        </div>
        {/* <div>
          <span className={`chilkbox ${param.isTime ? 'active' : ''}`} onClick={() => setParam({ ...param, isTime: (!param.isTime) })}>时间降序</span>
          <span className={`chilkbox ${param.isPrice ? 'active' : ''}`}
            onClick={() => setParam({ ...param, isPrice: (!param.isPrice) })}>价格降序
          </span>
        </div> */}
      </div>
      <div style={{ marginTop: 20 }}>
        <Table dataSource={dataSource} columns={columns}
          pagination={{
            pageSize: 2,
            onChange: num => setParam({ ...param, page: num })
          }}
          onChange={handleTableChange} />
      </div>
    </div>
  </div >
}
