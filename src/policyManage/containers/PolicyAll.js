import React, { useEffect, useRef, useState } from 'react';
import * as commonActions from '@/actions';
import { bindActionCreators } from "redux";
import actions from "../actions";
import { connect } from "react-redux";
import { Alert, Button, Checkbox, Form, Pagination, Tabs, Spin } from "antd";

import PolicyAllFilterForm from "../components/PolicyAllFilterForm";
import PolicyCard from "../components/PolicyCard";
import './PolicyAll.less'
import { policyStatusMap } from "@/policyManage/base/PolicyStatus";
import PolicyAccountModal from "@/policyManage/components/PolicyAccountModal";

const { TabPane } = Tabs;


const PolicyAll = (props) => {

  const { keys, source, total, pageNum, pageSize } = props.policyAll

  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [indeterminate, setIndeterminate] = useState(false)
  const [checkAll, setCheckAll] = useState(false)

  const search = useRef({
    page: {
      currentPage: 1,
      pageSize: 20
    },
    form: {}
  })

  const paginationProps = {
    total,
    pageSize,
    current: pageNum,
    onChange: (currentPage) => {
      this.getList({
        page: { currentPage }
      })
    }
  }

  useEffect(() => {
    getList()
  }, [])

  const getList = (filter) => {
    const { actions } = props
    search.current = Object.assign({}, search.current, filter)
    setLoading(true)
    actions.policyAllList(search.current).then(() => {
      setLoading(false)
      setSelectedRowKeys([])
    }).catch(() => setLoading(false))
  }

  const onChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys)
    setIndeterminate(!!selectedRowKeys.length && selectedRowKeys.length < keys.length)
    setCheckAll(selectedRowKeys.length === keys.length)
  };


  const onCheckAllChange = e => {
    setSelectedRowKeys(e.target.checked ? keys : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  };


  return (
    <Spin spinning={loading} tip="加载中...">
      <PolicyAllFilterForm actions={props.actions} />
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span>全部 <b>100</b></span>} key="0">
        </TabPane>
        {
          Object.entries(policyStatusMap).map(([key, { text }]) => <TabPane tab={text} key={key} />)
        }
      </Tabs>
      <Alert message={<div className='policy-list-statistics-container'>
        <span className='fields-item-'>
          政策数：400
        </span>
        <span className='fields-item-'>
          预约执行金额（元）：7000.00万
        </span>
        <span className='fields-item-'>
          预约执行订单数量：80024
        </span>
        <span className='fields-item-'>
          派单执行金额（元）：30.00万
        </span>
        <span className='fields-item-'>
          预约执行订单数量：20025
        </span>
      </div>} />
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        全选
      </Checkbox>
      <Button style={{ margin: 10 }} type="primary" ghost>批量下载政策</Button>
      <Checkbox.Group value={selectedRowKeys} style={{ display: 'block' }} onChange={onChange}>
        {
          keys.map(key => {
            return <PolicyCard key={key} data={source[key]} />
          })
        }
      </Checkbox.Group>
      <Pagination
        style={{ float: 'right' }}
        {...paginationProps}
      />
      <PolicyAccountModal />
    </Spin>
  );
};

const mapStateToProps = (state) => ({
  common: state.commonReducers,
  policyAll: state.pricePolicyReducer.policyAllList
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...commonActions,
    ...actions
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(PolicyAll))
