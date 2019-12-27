
import React, { useState } from 'react'
import { Button, Form, Input, Select, Table } from 'antd';
import './PutPreview.less'
import axios from 'axios'
import api from '@/api'
import { formatW } from '../../util'
import qs from 'qs'
import { withRouter } from 'react-router-dom'
const Prediction = (props) => {
  const [preResult, setPreResult] = useState(false)
  const { getFieldDecorator, validateFields } = props.form
  function startPrediction() {
    validateFields((err, values) => {
      if (!err) {
        getForecast(values)
      }
    });
  }
  async function getForecast(values) {
    const search = qs.parse(props.location.search.substring(1))
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
      <PredicResult dataSource={preResult} />
    </div> : null}
  </Form>
}
const PredictionForm = Form.create()(Prediction)

export default withRouter(PredictionForm)

const PredicResult = ({ dataSource = [] }) => {
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
      render: text => text ? `￥${text}左右` : '-'
    },
    {
      title: '投放数据表现',
      dataIndex: 'address',
      key: 'address',
      render: (text, record) => <div>
        <p>播放量：{formatW(record.mediaPlayNum)}</p>
        <p>评论数：{formatW(record.mediaCommentNum)}</p>
        <p>点赞数：{formatW(record.mediaLikeNum)}</p>
        <p>转发数：{formatW(record.mediaRepostNum)}</p>
      </div>
    }, {
      title: '投放效果',
      dataIndex: 'address1',
      key: 'address1',
      render: (text, record) => <div>
        <p>CPM：{record.cpm || '-'}元</p>
        <p>CPE：{record.cpe || '-'}元</p>
      </div>
    }
  ];

  return <div>
    <Table columns={columns}
      dataSource={dataSource}
      pagination={false}
      rowKey='dealPriceAvg' />
  </div>
}
