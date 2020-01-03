import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Table, Form, Input, Button, Menu

} from 'antd';

import actions from '../actions';
import './PolicyManage.less';
import qs from 'qs';
import { REBATE_SETTLEMENT_CYCLE, POLICYSTATUS } from '../constants/dataConfig'
let mcnId = ''
const viewDetail = (props, id) => {
  props.history.push(`/account/PastPolicyDetail?id=${id}`)
}


const getColumns = (props) => {
  return [
    {
      title: '政策Id',
      dataIndex: 'id',
      // width: '20%',
    },
    {
      title: '状态',
      dataIndex: 'policyStatus',
      // width: '20%',
    },
    {
      title: '政策有效期',
      // dataIndex: 'policyStatus',
      render: item => `${item.validEndTime}~${item.validEndTime}`,
      // width: '20%',
    },
    {
      title: '执行订单',
      dataIndex: 'executionOrderCount',
      // width: '20%',
    },
    {
      title: '执行金额',
      dataIndex: 'executionAmount',
      // width: '20%',
    },
    {
      title: '修订人',
      dataIndex: 'modifiedByName',
      // width: '20%',
    },
    {
      title: '修订时间',
      dataIndex: 'modifiedAt',
      // width: '20%',
    },
    {
      title: '操作',
      key: 'action',
      render: item => <Button type="primary" onClick={() => viewDetail(props, item.id)}>查看详情</Button>
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
    mcnId = this.mcnId = qs.parse(search)['userId'];
    this.policyPeriodIdentity = qs.parse(search)['policyPeriodIdentity'] || 3
  }

  componentDidMount() {
    this._getPastPolicyListByMcnId();
  }
  _getPastPolicyListByMcnId = async (values = {}) => {
    const { mcnId } = this;
    this.setState({ loading: true })
    await this.props.getPastPolicyListByMcnId({ mcnId, pageNum: 1, pageSize: 10, ...values })
    this.setState({ loading: false })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this._getPastPolicyListByMcnId({ ...values, pageNum: 1 })
      }
    });
  }
  handleTableChange = (pagination) => {
    console.log("pagination", pagination)
    this._getPastPolicyListByMcnId(pagination);
  }
  onMenuClick = ({ key }) => {
    if (key == 3) {
      this.props.history.push(`/account/policyList?userId=${this.mcnId}`)
      return false;
    }
    this.props.history.replace(`/account/policy?userId=${this.mcnId}&policyPeriodIdentity=${key}`);
    window.location.reload();
  }
  render() {

    function hasErrors(fieldsError) {
      return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    const { pastPolicyList = {}, form } = this.props;
    const { pageNum, pageSize, size, pages, total, list } = pastPolicyList;
    const pagination = {
      current: pageNum,
      pageSize,
      total
    }
    console.log("list", this.props)
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;
    const columns = getColumns(this.props);
    const menuSelectedKeys = [String(this.policyPeriodIdentity)];

    return <div>
      <Menu key='policyMenu' mode="horizontal" onClick={this.onMenuClick} selectedKeys={menuSelectedKeys}>
        <Menu.Item key="1">本期政策</Menu.Item>
        <Menu.Item key="2">下期政策</Menu.Item>
        <Menu.Item key="3">往期政策</Menu.Item>
      </Menu>,
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
  const { pricePolicyReducer } = state;
  const { pastPolicyList } = pricePolicyReducer
  console.log("state", state)
  return { pastPolicyList };
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
