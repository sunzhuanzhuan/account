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
      <div className='active-order container'>

        <DataActive />
        <div className='order-statistics '>
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
    { name: '总订单数（预约|派单）', sum: '14', remark: `(${9}|{${5})` },
    { name: '品牌数（订单品牌）', sum: '14', remark: `({${5})` },
    { name: '覆盖行业', sum: '14', remark: `` },
  ]
  return <div className='data-active'>
    {data.map(one => one.name)}
    <WordCloud />
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
  return <Table dataSource={dataSource} columns={columns} pagination={false} />
}
