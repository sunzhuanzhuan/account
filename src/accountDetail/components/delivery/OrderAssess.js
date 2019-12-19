import React, { useState, useEffect } from 'react'
import './OrderAssess.less'
import api from '@/api'
import { List, Rate, Radio, Spin } from 'antd'
import qs from 'qs'
import numeral from "numeral";
import { withRouter } from 'react-router-dom'
function OrderAssess(props) {
  const [orderList, setOrderList] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [searchParam, setSearchParam] = useState({ evaluate_level: 0, page_size: 10 })
  useEffect(() => {
    getOrderlist(searchParam)
  }, [searchParam])
  async function getOrderlist(param) {
    setIsLoading(true)
    const baseSearch = qs.parse(props.location.search.substring(1))
    const query = `?${qs.stringify({ account_id: baseSearch.accountId, ...param })}`
    const { data } = await api.get(`/export/account/getAccountDetailDegreeList${query}`)
    setOrderList(data)
    setIsLoading(false)
  }
  return (
    <div className='order-assess'>
      <div className='title-big'>订单评价</div>
      <div className='container'>
        <Statistics statistic={orderList.statistic} feature={props.feature} />
        <div style={{ margin: '20px 0px 10px' }}>
          <Radio.Group
            onChange={(e) => setSearchParam({ ...searchParam, evaluate_level: e.target.value, page: 1 })}
            value={searchParam.evaluate_level}>
            <Radio value={0}>全部</Radio>
            <Radio value={1}>好评</Radio>
            <Radio value={2}>中评</Radio>
            <Radio value={3}>差评</Radio>
          </Radio.Group>
        </div>
        <Spin spinning={isLoading}>
          <List itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => {
                setSearchParam({ ...searchParam, page: page })
              },
              pageSize: 10,
            }}
            dataSource={orderList.rows}
            renderItem={item => (
              <List.Item >
                <Item item={item} />
              </List.Item>
            )}
          />
        </Spin>
      </div>
    </div>
  )
}
// 统计模块
const Statistics = ({ statistic = {}, feature = {} }) => {
  function getNumber(value) {
    return numeral(value).format('0.0')
  }
  const list = [
    { name: '全部评价数', value: statistic.total },
    { name: '好评率', value: statistic.positiveRate * 100, unit: '%' },
    { name: '平均响应速度', value: getNumber(statistic.professionalDegreeAvg), unit: '分' },
    { name: '平均配合度', value: getNumber(statistic.coordinationDegreeAvg), unit: '分' },
    { name: '平均满意度', value: getNumber(statistic.appearanceDegreeAvg), unit: '分' },
    { name: '商业适应性指数', value: feature.commercialAdaptationIndex || '-' },]
  return <div className='statistics'>
    {list.map(item => <div key={item.name} className='item'>
      <div className='title'>{item.name}</div>
      <div className='value'>{item.value}
        <span className='unit'>{item.unit}</span>
      </div>
    </div>)}
  </div>
}
const Item = ({ item = {} }) => {

  return <div key={item.id} className='common-item'>
    <div>
      <span className='title'>{item.more_comment}</span>
    </div>
    <div className='content'>
      <span className='data-time'>{item.created_time}</span>
      <div className='rate-type-box'>
        <RateType title='响应速度' value={item.professional_degree} />
        <RateType title='配合度' value={item.coordination_degree} />
        <RateType title='效果满意' value={item.appearance_degree} />
      </div>
    </div>
  </div>
}
const RateType = ({ title, value }) => {
  return <div className='title'>{title} <Rate allowHalf={true} disabled defaultValue={value} className='comment-rate' /></div>
}
export default withRouter(OrderAssess)
