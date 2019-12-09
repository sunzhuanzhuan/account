import React, { useState, useEffect } from 'react'
import './OrderAssess.less'
import api from '@/api'
import { List, Rate, Radio } from 'antd'
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    data: (new Date()).toLocaleDateString(),
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      '如果有来生，要做一棵树， 站成永恒。没有悲欢的姿势， 一半在尘土里安详， 一半在风里飞扬； 一半洒落荫凉， 一半沐浴阳光。 非常沉默、非常骄傲。 从不依靠、从不寻找。',
  });
}
function OrderAssess() {
  const [orderList, setOrderList] = useState({})
  const [searchParam, setSearchParam] = useState({ evaluate_level: 0 })
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
          dataSource={listData}
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
      <div>{item.name}</div>
      <div>{item.value}
        <span className='unit'>{item.unit}</span>
      </div>
    </div>)}
  </div>
}
const Item = ({ item }) => {
  return <div key={item.id} className='common-item'>
    <div>
      <b>{item.title}</b>
      <span className='data-time'>{item.data}</span>
    </div>
    <div className='content'>
      <div className='more-common'>
        {item.content.length > 45 ? `${item.content.slice(0, 45)}……` : item.content}
      </div>
      <div className='rate-type-box'>
        <RateType title='响应速度' value={2} />
        <RateType title='配合度' value={2} />
        <RateType title='效果满意' value={2} />
      </div>
    </div>
  </div>
}
const RateType = ({ title, value }) => {
  return <div>{title} <Rate allowHalf={true} disabled defaultValue={value} className='comment-rate' /></div>
}
export default OrderAssess
