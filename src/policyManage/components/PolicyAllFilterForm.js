import React, { Component } from 'react'
import { Form, Input, Row, Col, Select, Button, DatePicker } from 'antd'
import EmSpan from '@/base/EmSpan'
import SearchSelect from '@/base/SearchSelect'
import { batchText2Array, moment2dateStr } from '../utils'
import { POLICY_LEVEL, REBATE_SETTLEMENT_CYCLE } from "@/policyManage/constants/dataConfig";

const { RangePicker } = DatePicker
const InputGroup = Input.Group
const Option = Select.Option

function handleValue(values) {
  let body = Object.assign({}, values)

  const createAt = moment2dateStr(body.createAt) || []
  const modifiedAt = moment2dateStr(body.modifiedAt) || []
  const validTime = moment2dateStr(body.validTime) || []

  body.createStartAt = createAt[0]
  body.createEndAt = createAt[1]
  body.modifiedStartAt = modifiedAt[0]
  body.modifiedEndAt = modifiedAt[1]
  body.validStartTime = validTime[0]
  body.validEndTime = validTime[1]

  delete body.createAt
  delete body.modifiedAt
  delete body.validTime


  // values.company_id = values.company_id && values.company_id.key
  return body
}

@Form.create()
export default class PolicyAllFilterForm extends Component {
  state = {
    timeType: 'createAt'
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
        this.props.getStatistics(values)
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

  componentDidMount() {
    this.props.actions.policyAllList()
  }


  render() {
    const { source, loading, actions, globalRulePlatforms, queryMediumsList } = this.props
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
                <Option key={1}>折扣固定扣减</Option>
                <Option key={2}>折扣固定比例</Option>
                <Option key={3}>返点固定扣减</Option>
                <Option key={4}>返点固定比例</Option>
                <Option key={5}>返点阶梯比例</Option>
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
                  Object.entries(POLICY_LEVEL).map(([key, item]) =>
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
                  Object.entries(REBATE_SETTLEMENT_CYCLE).map(([key, text]) =>
                    <Option key={key}>{text}</Option>)
                }
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="资源媒介">
            {getFieldDecorator('ownerAdminIdList', {})(
              <Select
                allowClear
                showSearch
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择"
                optionFilterProp='children'
              >
                {
                  queryMediumsList.map(item => <Option key={item.mediumId}>{item.mediumName}</Option>)
                }
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='平台'>
            {getFieldDecorator('platformIdList', {})(
              <Select
                allowClear
                showSearch
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择"
                optionFilterProp='children'
              >
                {
                  globalRulePlatforms.map(item => <Option key={item.id}>{item.platformName}</Option>)

                }
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="政策有效期">
            {getFieldDecorator("validTime", {})(
              <RangePicker style={{ width: '100%' }} />
            )}
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
                <RangePicker showTime style={{ width: 'calc(100% - 130px)' }} />
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
