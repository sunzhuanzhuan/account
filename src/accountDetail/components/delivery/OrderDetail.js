import React, { useState, useEffect } from 'react'
import api from '@/api'
import { Select, Radio, Table } from 'antd'
import './OrderDetail.less'
import qs from 'qs'
import numeral from 'numeral'
import { withRouter } from 'react-router-dom'
import getDeliverConfig from '../../constants/deliveryConfig'
const { Option } = Select;
function OrderDetail(props) {
  const [param, setParam] = useState({})
  const [orderDetail, setOrderDetail] = useState({})
  const [brandList, setBrandList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const baseSearch = qs.parse(props.location.search.substring(1))
  useEffect(() => {
    getBrand()
  }, [])
  useEffect(() => {
    getDetail(param)
  }, [param])
  //详情信息
  async function getDetail(params) {
    setIsLoading(true)
    const { data } = await api.post('/operator-gateway/accountDetail/v1/getRecentOrderList', {
      form: {
        ...baseSearch,
        signedBrandId: params.signedBrandId,
        acceptCreatedTime: params.acceptCreatedTime
      }, page: {
        currentPage: params.currentPage || 1
      }
    })
    setOrderDetail(data)
    setIsLoading(false)
  }
  //下拉框数据
  async function getBrand() {
    const { data = [] } = await api.get('/operator-gateway/accountDetail/v1/getBrandListInAccountDealOrder' + props.location.search)
    setBrandList(data)
  }
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      width: '100px'
    },
    {
      title: '应约时间',
      dataIndex: 'acceptCreatedTime',
      key: 'acceptCreatedTime',
      sorter: true,
      align: 'center'
    },
    {
      title: '价格名称',
      dataIndex: 'priceLabel',
      key: 'priceLabel',
      align: 'center'
    },
    {
      title: '投放品牌',
      dataIndex: 'signedBrandName',
      key: 'signedBrandName',
      align: 'center'
    },
    {
      title: '所属行业',
      dataIndex: 'industryName',
      key: 'industryName',
      align: 'center'
    },
    {
      title: '成交价格',
      dataIndex: 'dealPrice',
      key: 'dealPrice',
      align: 'center',
      render: text => `${numeral(text).format('0,0')}元`
    },
    {
      title: '投放数据',
      dataIndex: 'DcOrderStatistic',
      key: 'DcOrderStatistic',
      width: '150px',
      render: (text = {}) => <div>
        <a href={text.mediaUrl}>{text.mediaCaption}</a>
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
    //此处截取是因为后台参数为asc
    setParam({ ...param, currentPage: pagination.current, [sorter.columnKey]: sorter.order && sorter.order.substring(0, 3) })
  }
  return <div>
    <div className='title-big'>订单详情</div>
    <div className='container'>
      <div className='flex-between'>
        <div >
          {brandList.length > 0 ? <>投放品牌： <Select style={{ width: 120, margin: '0px 20px 0px 0px' }}
            onChange={value => setParam({ ...param, currentPage: 1, signedBrandId: value })} allowClear>
            {brandList.map(item => <Option
              key={item.signedBrandId} value={item.signedBrandId}>
              {item.signedBrandName}
            </Option>)}
          </Select></> : null}
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <Table dataSource={orderDetail.list} columns={columns}
          pagination={{
            pageSize: 10,
            current: param.currentPage,
          }}
          loading={isLoading}
          onChange={handleTableChange}
          rowKey='orderId' />
      </div>
    </div>
  </div >
}
export default withRouter(OrderDetail)

