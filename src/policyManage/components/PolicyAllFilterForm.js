import React, { Component } from 'react'
import { Form, Input, Row, Col, Select, Button, DatePicker } from 'antd'
import EmSpan from '@/base/EmSpan'
import SearchSelect from '@/base/SearchSelect'
import { batchText2Array, moment2dateStr } from '../utils'
import {
  FILTER_INCLUDE_RULE_TYPES,
  POLICY_LEVEL,
  REBATE_SETTLEMENT_CYCLE
} from "@/policyManage/constants/dataConfig";
import RangePickerForMonth from "@/base/RangePickerForMonth";
import moment from 'moment'

const { RangePicker } = DatePicker
const InputGroup = Input.Group
const Option = Select.Option

function handleValue(values) {
  let body = Object.assign({}, values)

  const createAt = moment2dateStr(body.createAt) || []
  const modifiedAt = moment2dateStr(body.modifiedAt) || []
  const validStartTime = moment2dateStr(body.validStartTime) || []
  const validEndTime = moment2dateStr(body.validEndTime) || []

  body.createAtStart = createAt[0] && createAt[0].slice(0, 11) + "00:00:00"
  body.createAtEnd = createAt[1] && createAt[1].slice(0, 11) + "23:59:59"
  body.modifiedAtStart = modifiedAt[0] && modifiedAt[0].slice(0, 11) + "00:00:00"
  body.modifiedAtEnd = modifiedAt[1] && modifiedAt[1].slice(0, 11) + "23:59:59"

  body.validStartTimeStart = validStartTime[0]
  body.validStartTimeEnd = validStartTime[1]

  body.validEndTimeStart = validEndTime[0]
  body.validEndTimeEnd = validEndTime[1]


  body.idList = body.idList && [body.idList]

  delete body.createAt
  delete body.modifiedAt
  delete body.validTime
  delete body.validStartTime
  delete body.validEndTime


  // values.company_id = values.company_id && values.company_id.key
  return body
}

@Form.create()
export default class PolicyAllFilterForm extends Component {
  state = {
    timeType: 'createAt',
    validType: 'validStartTime'
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 处理params
        values = handleValue(values)
        this.props.getList({
          form: values,
          page: {
            currentPage: 1
          }
        })
      }
    })
  }
  handleReset = () => {
    this.props.form.resetFields()
  }

  queryMcnByIdentityName = (params) =>
    this.props.actions.queryMcnByIdentityName({
      "page": {
        "currentPage": 1,
        "pageSize": 20
      },
      "form": {
        "identityName": params.name,
        "isDeleted": 2
      }
    }).then(({ data }) => ({ data: data.list }))

  queryAccountBySnsName = (params) =>
    this.props.actions.queryAccountBySnsName({
      "page": {
        "currentPage": 1,
        "pageSize": 20
      },
      "form": {
        "snsName": params.name,
        "isDeleted": 2
      }
    }).then(({ data }) => ({ data: data.list }))

  queryPolicySelectList = (params) =>
    this.props.actions.querySelectList({
      "page": {
        "currentPage": 1,
        "pageSize": 20
      },
      "form": {
        "policyName": params.name,
      }
    }).then(({ data }) => ({ data: data.list }))


  render() {
    const { source, loading, actions, globalRulePlatforms, mediumsListForAuth } = this.props
    const { getFieldDecorator } = this.props.form


    return <Form onSubmit={this.handleSubmit} className="flex-form-layout" layout="inline" autoComplete="off">
      <Row>
        <Col span={6}>
          <Form.Item label="主账号名称">
            {getFieldDecorator('identityName', {
              initialValue: undefined
            })(
              <SearchSelect
                placeholder="请输入并从下拉框选择"
                action={this.queryMcnByIdentityName}
                wordKey='name'
                filterOption={false}
                mapResultItemToOption={({ identityName } = {}) => ({
                  value: identityName,
                  label: identityName
                })}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="主账号ID">
            {getFieldDecorator('mcnId', {})(
              <Input placeholder="请输入主账号ID" style={{ width: '100%' }} />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="包含规则类型">
            {getFieldDecorator('includeRuleTypes', {})(
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
                {
                  Object.entries(FILTER_INCLUDE_RULE_TYPES).map(([ key, text ]) =>
                    <Option key={key}>{text}</Option>)
                }
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={<EmSpan length={4}>政策ID</EmSpan>}>
            {getFieldDecorator('id', {})(
              <Input placeholder="请输入政策ID" style={{ width: '100%' }} />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={<EmSpan length={5}>政策级别</EmSpan>}>
            {getFieldDecorator('policyLevel', {})(
              <Select
                allowClear
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择"
                optionFilterProp='children'
              >
                {
                  Object.entries(POLICY_LEVEL).map(([ key, item ]) =>
                    <Option key={key}>{item.text}</Option>)
                }
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="账号名称">
            {getFieldDecorator('accountId', {})(
              <SearchSelect
                placeholder="请输入并从下拉框选择"
                action={this.queryAccountBySnsName}
                wordKey='name'
                filterOption={false}
                mapResultItemToOption={({ accountId, snsName } = {}) => ({
                  value: accountId,
                  label: snsName
                })}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label='返点结算周期'>
            {getFieldDecorator('rebateSettlementCycle', {})(
              <Select
                allowClear
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择"
                optionFilterProp='children'
              >
                {
                  Object.entries(REBATE_SETTLEMENT_CYCLE).map(([ key, text ]) =>
                    <Option key={key}>{text}</Option>)
                }
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="资源媒介">
            {getFieldDecorator('ownerAdminIdList', {})(
              <Select
                allowClear
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择资源媒介"
                maxTagCount={0}
                optionFilterProp='children'
                maxTagPlaceholder={(omittedValues) => {
                  return `已选${omittedValues.length}项`
                }}
              >
                {
                  mediumsListForAuth.map(item =>
                    <Option key={item.userId}>{item.realName}</Option>)
                }
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={<EmSpan length={5}>平台</EmSpan>}>
            {getFieldDecorator('platformIdList', {})(
              <Select
                allowClear
                showSearch
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择"
                maxTagCount={0}
                optionFilterProp='children'
                maxTagPlaceholder={(omittedValues) => {
                  return `已选${omittedValues.length}项`
                }}
              >
                {
                  globalRulePlatforms.map(item =>
                    <Option key={item.id}>{item.platformName}</Option>)

                }
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="政策名称">
            {getFieldDecorator('idList', {})(
              <SearchSelect
                placeholder="请输入并从下拉框选择"
                action={this.queryPolicySelectList}
                wordKey='name'
                filterOption={false}
                mapResultItemToOption={({ id, policyName } = {}) => ({
                  value: id,
                  label: policyName
                })}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="">
            <InputGroup compact>
              <Select
                style={{ width: '130px' }}
                value={this.state.validType}
                onChange={(key) => this.setState({ validType: key })}
              >
                <Option value="validStartTime">政策开始</Option>
                <Option value="validEndTime">政策结束</Option>
              </Select>
              {getFieldDecorator(this.state.validType, {})(
                <RangePickerForMonth
                  style={{ width: 'calc(100% - 130px)' }}
                />
              )}
            </InputGroup>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <InputGroup compact>
              <Select
                style={{ width: '130px' }}
                value={this.state.timeType}
                onChange={(key) => this.setState({ timeType: key })}
              >
                <Option value="createAt">创建时间</Option>
                <Option value="modifiedAt">最后修改时间</Option>
              </Select>
              {getFieldDecorator(this.state.timeType, {})(
                <RangePicker
                  format='YYYY-MM-DD'
                  style={{ width: 'calc(100% - 130px)' }}
                />
              )}
            </InputGroup>
          </Form.Item>
        </Col>
        <Col span={4}>
          <div style={{ lineHeight: '40px', textAlign: 'left' }}>
            <Button type='primary' htmlType='submit' loading={loading}>查询</Button>
            <Button style={{ margin: '0 16px 0 10px' }} onClick={this.handleReset}>重置</Button>
          </div>
        </Col>
      </Row>
    </Form>
  }
}
