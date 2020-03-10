import React, { Component } from 'react'
import { Form, Input, Row, Col, Select, Button, DatePicker } from 'antd'
import EmSpan from '@/base/EmSpan'
import SearchSelect from '@/base/SearchSelect'
import { batchText2Array, moment2dateStr } from '../utils'

const { RangePicker } = DatePicker
const InputGroup = Input.Group
const Option = Select.Option

function handleValue(values) {
  values['order_id'] = batchText2Array(values['order_id'])
  values['execution_evidence_code'] = batchText2Array(values['execution_evidence_code'], true)
  values['summary_id'] = batchText2Array(values['summary_id'])
  values['requirement_id'] = batchText2Array(values['requirement_id'])
  values.company_id = values.company_id && values.company_id.key
  values.external_check_at = moment2dateStr(values.external_check_at)
  values.internal_check_at = moment2dateStr(values.internal_check_at)
  values.submitter_at = moment2dateStr(values.submitter_at)
  return values
}

@Form.create()
export default class PolicyAllFilterForm extends Component {
  state = {
    timeType: 'create_at'
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 处理params
        values = handleValue(values)
        this.props.getList({ ...values, page: 1 })
      }
    })
  }
  handleReset = () => {
    this.props.form.resetFields()
  }
  validatorBatchId = (rule, value, callback) => {
    if (value && value.trim().split(/\s+/g).length > 200) {
      return callback('不能超过200个')
    }
    callback()
  }

  render() {
    const { source, loading, actions } = this.props
    const { getFieldDecorator } = this.props.form
    return <Form onSubmit={this.handleSubmit} className="flex-form-layout" layout="inline" autoComplete="off">
      <Row>
        <Col span={6}>
          <Form.Item label="主账号名称">
            {getFieldDecorator('user_name', {
              initialValue: undefined
            })(
              <SearchSelect placeholder="请输入并从下拉框选择" action={actions.geta} wordKey='name'
                mapResultItemToOption={({ name } = {}) => ({
                  value: name,
                  label: name
                })}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="主账号ID">
            {getFieldDecorator('user_id', {})(
              <Input placeholder="请输入主账号ID" style={{ width: '100%' }} />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="包含规则类型">
            {getFieldDecorator('ruleType', {})(
              <Select
                allowClear
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择规则类型"
                maxTagCount={0}
                optionFilterProp='children'
                maxTagPlaceholder={(omittedValues) => {
                  return `已选${omittedValues.length}项`
                }}
              >
                <Option key={1}>{"返点固定比例、返点固定扣减、返点阶梯比例、折扣固定比例、折扣固定返点"}</Option>
                <Option key={2}>{2}</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={<EmSpan length={4}>政策ID</EmSpan>}>
            {getFieldDecorator('PId', {})(
              <Input placeholder="请输入政策ID" style={{ width: '100%' }} />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={<EmSpan length={5}>政策级别</EmSpan>}>
            {getFieldDecorator('brand_id', {})(
              <Select
                allowClear
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择"
                maxTagCount={0}
                optionFilterProp='children'
                maxTagPlaceholder={(omittedValues) => {
                  return `已选${omittedValues.length}项`
                }}
              >
                <Option key={1}>{"S：独家（1家）A：小圈（≤3家）B：大圈（≤6家）C：平价（≥6家）"}</Option>
                <Option key={2}>{2}</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="账号名称">
            {getFieldDecorator('project_name', {})(
              <SearchSelect placeholder="请输入并从下拉框选择" action={actions.geta} wordKey='name'
                mapResultItemToOption={({ name } = {}) => ({
                  value: name,
                  label: name
                })}
              />
            )}
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label='返点结算周期'>
            {getFieldDecorator('sale_manager_id', {})(
              <Select
                allowClear
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择"
                optionFilterProp='children'
              >
                <Option key={1}>{1}</Option>
                <Option key={2}>{2}</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="资源媒介">
            {getFieldDecorator('executor_admin_id', {})(
              <Select
                allowClear
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择"
                optionFilterProp='children'
              >
                <Option key={1}>{1}</Option>
                <Option key={2}>{2}</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item label="政策有效期">
            {getFieldDecorator("this.state.timeType", {})(
              <RangePicker style={{ width: '100%' }}/>
            )}
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item >
            <InputGroup compact>
              <Select
                style={{ width: '130px' }}
                value={this.state.timeType}
                onChange={(key) => this.setState({ timeType: key })}
              >
                <Option value="create_at">创建时间</Option>
                <Option value="update_at">最后修改时间</Option>
              </Select>
              {getFieldDecorator(this.state.timeType, {})(
                <RangePicker showTime style={{ width: 'calc(100% - 130px)' }} />
              )}
            </InputGroup>
          </Form.Item>
        </Col>
        <Col span={6}>
          <div style={{ lineHeight: '40px', textAlign: 'right' }}>
            <Button type='primary' htmlType='submit' loading={loading}>查询</Button>
            <Button style={{ margin: '0 16px 0 10px' }} onClick={this.handleReset}>重置</Button>
          </div>
        </Col>
      </Row>
    </Form>
  }
}
