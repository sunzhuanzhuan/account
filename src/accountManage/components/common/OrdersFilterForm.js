/**
 * Created by lzb on 2019-09-19.
 */
import React, { Component } from 'react'
import { Form, Input, Row, Col, Select, Button, DatePicker } from 'antd'
import EmSpan from '../../base/EmSpan'
import SearchSelect from '@/base/SearchSelect'

const { RangePicker } = DatePicker
const InputGroup = Input.Group
const Option = Select.Option

@Form.create()
export default class OrderFilterForm extends Component {
  state = {
    timeType: 'created_time'
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 处理params
        this.props.getList({
          ...values,
          created_time: values.created_time,
          execution_completed_time: values.execution_completed_time,
          page: 1
        })
      }
    })
  }
  handleReset = () => {
    this.props.form.resetFields()
  }

  render() {
    const { options, loading, actions } = this.props
    const { getFieldDecorator } = this.props.form
    return <Form onSubmit={this.handleSubmit} layout="inline" autoComplete="off" className='flex-form-layout'>
      <Row>
        <Col span={12}>
          <Form.Item label={<EmSpan length={4}>时间</EmSpan>}>
            <InputGroup compact>
              <Select
                style={{ width: '130px' }}
                value={this.state.timeType}
                getPopupContainer={() => document.querySelector('.orders-filter-container')}
                onChange={(key) => this.setState({ timeType: key })}
              >
                <Option value="created_time">创建时间</Option>
                <Option value="execution_completed_time">回填执行链接时间</Option>
              </Select>
              {getFieldDecorator(this.state.timeType, {})(
                <RangePicker showTime style={{ width: 'calc(100% - 130px)' }} />
              )}
            </InputGroup>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="预约状态">
            {getFieldDecorator('reservation_status', {
              initialValue: ['2']
            })(
              <Select
                allowClear
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择"
                maxTagCount={0}
                getPopupContainer={() => document.querySelector('.orders-filter-container')}
                optionFilterProp='children'
                maxTagPlaceholder={(omittedValues) => {
                  return `已选${omittedValues.length}项`
                }}
              >
                {Object.entries(options.reservationStatus).map(([value, label]) =>
                  <Option key={value}>{label}</Option>)}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="客户确认状态">
            {getFieldDecorator('customer_confirmation_status', {})(
              <Select
                allowClear
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择"
                maxTagCount={0}
                getPopupContainer={() => document.querySelector('.orders-filter-container')}
                optionFilterProp='children'
                maxTagPlaceholder={(omittedValues) => {
                  return `已选${omittedValues.length}项`
                }}
              >
                {Object.entries(options.customerConfirmationStatus).map(([value, label]) =>
                  <Option key={value}>{label}</Option>)}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="执行状态">
            {getFieldDecorator('execution_status', {})(
              <Select
                allowClear
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择"
                maxTagCount={0}
                getPopupContainer={() => document.querySelector('.orders-filter-container')}
                optionFilterProp='children'
                maxTagPlaceholder={(omittedValues) => {
                  return `已选${omittedValues.length}项`
                }}
              >
                {Object.entries(options.executionStatus).map(([value, label]) =>
                  <Option key={value}>{label}</Option>)}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="公司简称">
            {getFieldDecorator('company_id', {
              initialValue: this.props.execution_status
            })(
              <SearchSelect
                placeholder="请输入并选择公司"
                action={actions.searchForCompanyByName}
                wordKey='company_name'
                isEmptySearch
                getPopupContainer={() => document.querySelector('.orders-filter-container')}
                mapResultItemToOption={({ company_id, name } = {}) => ({
                  value: company_id,
                  label: name
                })}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="所属品牌">
            {getFieldDecorator('brand_id', {})(
              <SearchSelect
                placeholder="请选择品牌名称"
                action={actions.searchForBrandByName}
                wordKey='brand_name'
                isEmptySearch
                getPopupContainer={() => document.querySelector('.orders-filter-container')}
                mapResultItemToOption={({ id, view_name } = {}) => ({
                  value: id,
                  label: view_name
                })}
              />
            )}
          </Form.Item>
        </Col>

        <Col span={6}>
          <div style={{ lineHeight: '40px', textAlign: 'left' }}>
            <Button type='primary' style={{ marginLeft: '20px' }} htmlType='submit' loading={loading}>查询</Button>
            {/*<Button style={{ margin: '0 20px 0 10px' }} onClick={this.handleReset}>重置</Button>*/}
          </div>
        </Col>
      </Row>
    </Form>
  }
}
