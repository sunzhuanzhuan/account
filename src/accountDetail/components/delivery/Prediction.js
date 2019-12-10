
import React, { useState } from 'react'
import { Button, Form, Input, Select, Table } from 'antd';
import './PutPreview.less'
const Prediction = (props) => {
  const [preResult, setPreResult] = useState(0)
  const { getFieldDecorator, validateFields } = props.form
  function startPrediction() {
    validateFields((err, values) => {
      if (!err) {
        setPreResult(<PredicResult />)
      }
    });
  }
  return <Form layout='inline'>
    <Form.Item label="请输入你投放的品牌名称">
      {getFieldDecorator('bandName')(<Input />)}
    </Form.Item>
    <Form.Item label="品牌所属行业">
      {getFieldDecorator('industry', {
        initialValue: '0',
      })(<Select>
        {[{ name: '不限', id: '0' }].map(
          one => <Select.Option
            key={one.id} labelInValue={true}
          >
            {one.name}
          </Select.Option>)}
      </Select>)}
    </Form.Item>
    <Form.Item>
      <div className='prediction-icon' style={{ marginTop: 4 }} onClick={startPrediction}>开始预测</div>
    </Form.Item>
    {preResult ? <div>
      <h1>预测结果</h1>
      {preResult}
    </div> : null}
  </Form>
}
const PredictionForm = Form.create()(Prediction)

export default PredictionForm

const PredicResult = () => {
  const dataSource = [
    {
      key: '1',
      name: '雅诗兰黛',
      age: 32,
      address: '播放量：8989',
    },
  ];

  const columns = [
    {
      title: '品牌名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '成交价格',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '投放数据表现',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '投放效果',
      dataIndex: 'address1',
      key: 'address1',
    }
  ];

  return <div>
    <Table columns={columns} dataSource={dataSource} pagination={false} />
  </div>
}
