
import React, { useState } from 'react'
import { Button, Form, Input, Select, Table } from 'antd';
import './PutPreview.less'
import axios from 'axios'
import api from '@/api'
import { formatW, formatWNumber } from '../../util'
import qs from 'qs'
import { withRouter } from 'react-router-dom'
import getDeliverConfig from '../../constants/deliveryConfig'

const Prediction = (props) => {
  const [preResult, setPreResult] = useState(false)
  const { getFieldDecorator, validateFields } = props.form
  const search = qs.parse(props.location.search.substring(1))
  function startPrediction() {
    validateFields((err, values) => {
      if (!err) {
        getForecast(values)
      }
    });
  }
  async function getForecast(values) {
    const params = qs.stringify({ ...values, accountId: search.accountId })
    const { data } = await api.get(`/operator-gateway/accountDetail/v1/getForecast?${params}`)
    setPreResult(data)
  }
  return <Form layout='inline'>
    <Form.Item label="请输入你投放的品牌名称">
      {getFieldDecorator('brandName')(<Input />)}
    </Form.Item>
    <Form.Item label="品牌所属行业">
      {getFieldDecorator('industryCode', {
        initialValue: 'D00',
      })(<Select style={{ width: 150 }}>
        {(props.brandList || []).map(
          one => <Select.Option
            key={one.itemKey}
            value={one.itemKey}
          >
            {one.itemValue}
          </Select.Option>)}
      </Select>)}
    </Form.Item>
    <Form.Item>
      <div className='prediction-icon' style={{ marginTop: 4 }} onClick={startPrediction}>开始预测</div>
    </Form.Item>
    {preResult ? <div>
      <h2>预测结果</h2>
      <PredicResult dataSource={preResult} search={search} />
    </div> : null}
  </Form>
}
const PredictionForm = Form.create()(Prediction)

export default withRouter(PredictionForm)

const PredicResult = ({ dataSource = [], search }) => {
  const columns = [
    {
      title: '品牌名称',
      dataIndex: 'brandName',
      key: 'brandName',
      render: text => text ? text : '-'

    },
    {
      title: '成交价格',
      dataIndex: 'dealPriceAvg',
      key: 'dealPriceAvg',
      render: text => text ? `￥${formatWNumber(text)}左右` : '-'
    },
    {
      title: '投放数据表现',
      dataIndex: 'address',
      key: 'address',
      render: (text = {}, record) => <div>
        {getDeliverConfig(search.platformId).map(one => {
          const value = record[one.key]
          return <div key={one.name}>
            {one.name}：{value > 0 || value == 0 ? formatWNumber(value) : '-'}
          </div>
        })}
      </div>
    }, {
      title: '投放效果',
      dataIndex: 'address1',
      key: 'address1',
      render: (text, record) => {
        const { cpm, cpe } = record
        return <div>
          <div>CPM：{cpm > 0 || cpm > 0 ? `${formatWNumber(cpm)}元` : '-'}</div>
          <div>CPE：{cpe > 0 || cpe == 0 ? `${formatWNumber(cpe)}元` : '-'}</div>
        </div>
      }
    }
  ];

  return <div>
    <Table columns={columns}
      dataSource={dataSource}
      pagination={false}
      rowKey='dealPriceAvg' />
  </div>
}
