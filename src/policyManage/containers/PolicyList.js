import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Table, Form, Input, Button

} from 'antd';

import actions from '../actions';
import './PolicyManage.less';
import qs from 'qs';

const viewDetail = (id) => {
  console.log("item.id", id)
}

const getColumns = () => {
  return [
    {
      title: '政策Id',
      dataIndex: 'id',
      width: '20%',
    },
    {
      title: '状态',
      dataIndex: 'policyStatus',
      width: '20%',
    },
    {
      title: '政策有效期',
      // dataIndex: 'policyStatus',
      render: item => `${item.validEndTime}~${item.validEndTime}`,
      width: '20%',
    },
    {
      title: '执行订单',
      dataIndex: 'executionOrderCount',
      width: '20%',
    },
    {
      title: '执行金额',
      dataIndex: 'executionAmount',
      width: '20%',
    },
    {
      title: '修订人',
      dataIndex: 'modifiedByName',
      width: '20%',
    },
    {
      title: '修订时间',
      dataIndex: 'modifiedAt',
      width: '20%',
    },
    {
      title: '操作',
      key: 'action',
      render: item => <Button onClick={viewDetail(item.id)}></Button>
    },
  ];
}

class PolicyManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
    const search = this.props.location.search.substring(1);
    this.mcnId = qs.parse(search)['userId'];
    this.policyPeriodIdentity = qs.parse(search)['policyPeriodIdentity'] || 3
  }

  componentDidMount() {
    this.getPastPolicyListByMcnId();
  }
  _getPastPolicyListByMcnId = async (values = {}) => {
    const { mcnId } = this;
    this.setState({ loading: true })
    await this.props.getPolicyInfoByMcnId({ mcnId, ...values })
    this.setState({ loading: false })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.getPastPolicyListByMcnId(values)
      }
    });
  }
  handleTableChange = (pagination) => {
    console.log("pagination", pagination)
    this._getPolicyInfoByMcnId(pagination);
  }
  render() {

    function hasErrors(fieldsError) {
      return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    const { pastPolicyList, form } = this.props;
    const { pageNum, pageSize, size, pages, total, list } = pastPolicyList;
    const pagination = {
      current: pageNum,
      pageSize,
      total
    }

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;
    const columns = getColumns();
    return <div>
      <h1>往期政策</h1>
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('id', {
            rules: [{ required: true, message: '请输入政策ID' }],
          })(
            <Input placeholder="请输入政策ID" />,
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            搜索
          </Button>
        </Form.Item>
      </Form>

      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={list}
        pagination={pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    </div>
  }
}

const mapStateToProps = (state) => {
  const { pastPolicyList = {} } = state;
  return pastPolicyList;
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    ...actions
  }, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(PolicyManage))
