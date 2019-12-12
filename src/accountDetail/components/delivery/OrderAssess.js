import React, { useState, useEffect } from 'react'
import './OrderAssess.less'
import api from '@/api'
import { List, Rate, Radio } from 'antd'
import axios from 'axios'
import qs from 'qs'
import { withRouter } from 'react-router-dom'
function OrderAssess(props) {
  const [orderList, setOrderList] = useState({})
  const [searchParam, setSearchParam] = useState({ evaluate_level: 0 })

  useEffect(() => {
    getOrderlist()
  }, [])
  async function getOrderlist(param) {
    const baseSearch = qs.parse(props.location.search.substring(1))
    //const { data } = await api.get('/orderlist')
    const { data } = await axios.post('http://yapi.ops.tst-weiboyi.com/mock/129/api/operator-gateway/accountDetail/v1/getRecentOrderList', { ...baseSearch, param })
    setOrderList(data.data)
  }
  return (
    <div className='order-assess'>
      <div className='title-big'>订单评价</div>
      <div className='container'>
        <Statistics />
        <div style={{ margin: '20px 0px 10px' }}>
          <Radio.Group
            onChange={(e) => setSearchParam({ ...searchParam, evaluate_level: e.target.value })}
            value={searchParam.evaluate_level}>
            <Radio value={0}>全部</Radio>
            <Radio value={1}>好评</Radio>
            <Radio value={2}>中评</Radio>
            <Radio value={3}>差评</Radio>
          </Radio.Group>
        </div>
        <List itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={orderList.list}
          renderItem={item => (
            <List.Item >
              <Item item={item} />
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}
// 统计模块
const Statistics = () => {
  const list = [
    { name: '全部评价数', value: 30 },
    { name: '好评率', value: '20', unit: '%' },
    { name: '平均响应速度', value: '5', unit: '分' },
    { name: '平均配合度', value: 30 },
    { name: '平均满意度', value: 30 },
    { name: '商业适应性指数', value: 30 },]
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
      <span className='title'>{item.title}</span>
      <span className='data-time'>{item.data}</span>
    </div>
    <div className='content'>
      <div className='more-common'>
        {item.content && item.content.length > 40 ? `${item.content.slice(0, 40)}……` : item.content}
      </div>
      <div className='rate-type-box'>
        <RateType title='响应速度' value={2} />
        <RateType title='配合度' value={2} />
        <RateType title='效果满意' value={5} />
      </div>
    </div>
  </div>
}
const RateType = ({ title, value }) => {
  return <div className='title'>{title} <Rate allowHalf={true} disabled defaultValue={value} className='comment-rate' /></div>
}
export default withRouter(OrderAssess)
