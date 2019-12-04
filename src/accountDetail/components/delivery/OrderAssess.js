import React, { useState, useEffect } from 'react'
import './OrderAssess.less'
import api from '@/api'
function OrderAssess() {
  const [orderList, setOrderList] = useState({})
  useEffect(() => {
    getOrderlist()
  }, [])
  async function getOrderlist() {
    const { data } = api.get('/orderlist')
    setOrderList(data)
  }
  return (
    <div>
      <div className='title-big'>订单评价</div>
      <div className='container'>
        <Statistics />
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
      <div>{item.name}</div>
      <div>{item.value}
        <span className='unit'>{item.unit}</span>
      </div>
    </div>)}
  </div>
}
export default OrderAssess
