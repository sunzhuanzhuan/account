import React, { useState, useEffect } from 'react';
import api from '@/api'
import { Button, Table, Tooltip, } from 'antd';
import Prediction from './Prediction'
import { WordCloud } from '../chart'
import './PutPreview.less'
import { withRouter } from 'react-router-dom'
import numeral from 'numeral'
import { formatWNumberDefult } from '../../util'
function PutPreview(props) {
  const [data, setData] = useState({})
  const [brandList, setBrandList] = useState({})
  useEffect(() => {
    getDate()
  }, [])
  function getDate() {
    api.get(`/operator-gateway/accountDetail/v1/getOverview${props.location.search}`).then(({ data }) => { setData(data) })
    api.get(`/operator-gateway/common/v1/queryDictionary?dicCode=order_industry`).then(({ data }) => {
      let list = data
      list.unshift({ 'itemKey': 'D00', 'itemValue': '不限' })
      setBrandList(list)
    })
  }
  return (
    <div className='put-preview'>
      <div className='title-big'>投放预览</div>
      <div className='active-order '>
        <DataActive data={data} />
        <div className='order-statistics container'>
          <div className='header'>
            <p>投放广告数据表现</p>
            <div className='prediction-icon'
              onClick={() => props.setShowModal(true, {
                content: <Prediction setShowModal={props.setShowModal} brandList={brandList} />,
                title: '投放预测',
                width: '800px'
              })}>投放预测</div>
          </div>
          <OrderStatistics dataSource={data.orderDataShowList} />
        </div>
      </div>
    </div>
  );
}

const DataActive = ({ data }) => {
  const sumList = [
    { title: '总订单数', subtitle: '（预约|派单）', sum: data.orderNum, remark: `（${data.reservationOrderNum || '-'}|${data.campaignOrderNum || '-'}）` },
    { title: '品牌数', subtitle: '（订单品牌）', sum: data.brandNum, remark: `（${data.orderBrandNum || '-'}）` },
    { title: '覆盖行业', sum: data.brandIndustryCategoryNum || '-', remark: `` },
  ]
  return <div className='data-active container'>
    <div className='statistics'>
      {sumList.map(item => <NumberItem item={item} key={item.title} />)}
    </div>
    <WordCloud data={data.brandList} />
    <LineType list={data.brandIndustryCategoryList} />
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

const LineType = ({ list = [] }) => {
  const color = { 0: '#FE6E67', 1: '#6091F9', 2: '#FAA051', 3: '#2DD8AA', 4: '#7E78FF', 5: '#E6354B' }
  return <div className='line-type-box'>
    <div className='line-type'>
      {list.map((item, index) => {
        const value = numeral(item.value).format('0%')
        return <Tooltip key={item.name} title={`${item.name}：${value}`}><div
          style={{ width: value, background: color[index] }}>
          {value}
        </div></Tooltip>
      })}
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
const OrderStatistics = ({ dataSource }) => {
  const columns = [
    {
      title: '',
      dataIndex: 'rowName',
      key: 'rowName',
    },
    {
      title: '投放数据',
      dataIndex: 'orderMediaAvg',
      key: 'orderMediaAvg',
      render: text => {
        const data = formatWNumberDefult(text)
        return text > 0 || text == 0 ? <div className='dark-big'>{data.value}<span className='dark-small'>{data.unit}</span></div> : '-'
      }
    },
    {
      title: 'KOL整体数据',
      dataIndex: 'kolMediaAvg',
      key: 'kolMediaAvg',
      render: text => {
        const data = formatWNumberDefult(text)
        return text > 0 || text == 0 ? <div className='dark-big'>{data.value}<span className='dark-small'>{data.unit}</span></div> : '-'
      }
    }, {
      title: '差异比',
      dataIndex: 'differRate',
      key: 'differRate',
      render: text => text > 0 || text == 0 ? <div className='light-big'>{numeral(text).format('0.0')}<span className='light-small'>%</span></div> : '-'
    }
  ];
  return <Table
    className='put-pre-table table-no-background-add-odd '
    dataSource={dataSource} columns={columns} pagination={false} rowKey='rowName' />
}
export default withRouter(PutPreview)
