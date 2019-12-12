import React, { useState, useEffect } from 'react'
import api from '@/api'
import { Select, Radio, Table } from 'antd'
import './OrderDetail.less'
import axios from 'axios'
import qs from 'qs'
import { withRouter } from 'react-router-dom'
import getDeliverConfig from '../../constants/deliveryConfig'
const { Option } = Select;
function OrderDetail(props) {
  const [param, setParam] = useState({})
  const [orderDetail, setOrderDetail] = useState({})
  const [brandList, setBrandList] = useState([])
  const baseSearch = qs.parse(props.location.search.substring(1))
  useEffect(() => {
    getDetail(param)
    getBrand()
  }, [])
  useEffect(() => {
    getDetail(param)
  }, [param])
  //详情信息
  async function getDetail(params) {
    //const { data } = api.post('/orderDetail', { ...params })
    //const { data } = await api.get('/orderlist')
    const { data } = await axios.post('http://yapi.ops.tst-weiboyi.com/mock/129/api/operator-gateway/accountDetail/v1/getRecentOrderList', { ...baseSearch, param })
    setOrderDetail(data.data)
  }
  //下拉框数据
  async function getBrand() {
    const { data = [] } = api.get('/getBrandList')
    setBrandList(data)
  }
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: '应约时间',
      dataIndex: 'acceptCreatedTime',
      key: 'acceptCreatedTime',
      sorter: true,
    },
    {
      title: '价格名称',
      dataIndex: 'priceLabel',
      key: 'priceLabel',
    },
    {
      title: '投放品牌',
      dataIndex: 'signedBrandName',
      key: 'signedBrandName',
    },
    {
      title: '所属行业',
      dataIndex: 'industryName',
      key: 'industryName',
    },
    {
      title: '成交价格',
      dataIndex: 'dealPrice',
      key: 'dealPrice',
      //sorter: true,
    },
    {
      title: '投放数据',
      dataIndex: 'DcOrderStatistic',
      key: 'DcOrderStatistic',
      width: '150px',
      render: (text) => <div>
        <a href={''}>投放数据</a>
        <div>
          {getDeliverConfig(baseSearch.platformId).map(one => <div key={one.name}>
            {one.name}:{text[one.key]}
          </div>)}
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
            onChange={value => setParam({ ...param, page: 1, signedBrandId: value })}>
            {brandList.map(item => <Option
              key={item.id} value={item.id}>
              {item.name}
            </Option>)}
          </Select>

          {/* <Radio.Group
            value={param.isFamous}
            onChange={e => setParam({ ...param, page: 1, isFamous: e.target.value })}>
            <Radio value={1}>预约</Radio>
            <Radio value={2}>派单</Radio>
          </Radio.Group> */}
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <Table dataSource={orderDetail.list} columns={columns}
          pagination={{
            pageSize: 2,
            onChange: num => setParam({ ...param, page: num })
          }}
          onChange={handleTableChange}
          rowKey='orderId' />
      </div>
    </div>
  </div >
}
export default withRouter(OrderDetail)

