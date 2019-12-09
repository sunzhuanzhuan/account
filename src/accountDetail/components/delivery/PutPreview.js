import React, { useState, useEffect } from 'react';
import api from '@/api'
import { Button, Table, } from 'antd';
import Prediction from './Prediction'
import { WordCloud } from '../chart'
import './PutPreview.less'
export default function PutPreview({ setShowModal }) {
  const [data, setData] = useState({})
  useEffect(() => {
    getDate()
  }, [])
  async function getDate() {
    const { data } = api.get('/data')
    setData(data)
  }
  return (
    <div className='put-preview'>
      <div className='title-big'>投放预览</div>
      <div className='active-order '>
        <DataActive />
        <div className='order-statistics container'>
          <div className='header'>
            <p>投放广告数据表现</p>
            <Button type='primary'

              onClick={() => setShowModal(true, {
                content: <Prediction setShowModal={setShowModal} />,
                title: '投放预测',
                width: '800px'
              })}>投放预测</Button>
          </div>
          <OrderStatistics />
        </div>
      </div>
    </div>
  );
}

const DataActive = () => {
  const data = [
    { title: '总订单数', subtitle: '（预约|派单）', sum: '14', remark: `(${9}|${5})` },
    { title: '品牌数', subtitle: '（订单品牌）', sum: '14', remark: `(${5})` },
    { title: '覆盖行业', sum: '14', remark: `` },
  ]
  return <div className='data-active container'>
    <div className='statistics'>
      {data.map(item => <NumberItem item={item} key={item.title} />)}
    </div>
    <WordCloud />
    <LineType />
  </div>
}
const NumberItem = ({ item }) => {
  return <div className='item'>
    <div className='title'>
      <b>{item.title}</b>
      <span>{item.subtitle}</span>
    </div>
    <div className='number'>
      <span className='big'>{item.sum}</span>
      <span>{item.remark}</span>
    </div>
  </div>
}

const LineType = ({ list = [{ name: '母婴', value: "30%" }, { name: '音乐', value: "20%" }, { name: '其他', value: "50%" }] }) => {
  const color = { 0: '#8544E0', 1: 'green', 2: 'pink' }
  return <div className='line-type-box'>
    <div className='line-type'>
      {list.map((item, index) => <div key={item.name}
        style={{ width: item.value, background: color[index] }}>
        {item.value}
      </div>)}
    </div>
    <div>
      <div className='line-text'>
        {list.map((item, index) => <div key={item.name} className='circle-text'>
          <div className='circle' style={{ background: color[index] }}></div>
          <div className='text'>{item.name}</div>
        </div>)}
      </div>
    </div>
  </div>
}
const OrderStatistics = () => {
  const dataSource = [
    {
      key: '1',
      name: '平均播放',
      age: 32,
      address: '播放量：8989',
    },
    {
      key: '2',
      name: '平均订单',
      age: 32,
      address: '播放量：8989',
    },
    {
      key: '3',
      name: '平均点赞',
      age: 32,
      address: '播放量：8989',
    },
  ];

  const columns = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '投放数据',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'KOL整体数据',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '差异比',
      dataIndex: 'address1',
      key: 'address1',
    }
  ];
  return <Table
    className='put-pre-table table-no-background-add-odd '
    dataSource={dataSource} columns={columns} pagination={false} />
}
