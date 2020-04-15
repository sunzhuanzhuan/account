import React, { useEffect, useRef, useState } from 'react';
import * as commonActions from '@/actions';
import { bindActionCreators } from "redux";
import actions from "../actions";
import { connect } from "react-redux";
import { Alert, Button, Checkbox, Form, Pagination, Tabs, Spin, message, PageHeader } from "antd";

import PolicyCard from "../components/PolicyCard";
import { policyStatusMap } from "@/policyManage/base/PolicyStatus";
import PolicyAccountModal from "@/policyManage/components/PolicyAccountModal";
import _merge from 'lodash/merge'
import StopReasonModal from "@/policyManage/components/StopReasonModal";
import OwnerInfos from "@/policyManage/components/OwnerInfos";


const { TabPane } = Tabs;


const PolicyListByOwner = (props) => {


  const { keys, source, total, pageNum, pageSize } = props.policyList

  const [ loading, setLoading ] = useState(false)
  const [ selectedRowKeys, setSelectedRowKeys ] = useState([])
  const [ indeterminate, setIndeterminate ] = useState(false)
  const [ checkAll, setCheckAll ] = useState(false)

  const search = useRef({
    page: {
      currentPage: 1,
      pageSize: 20
    }
  })

  const paginationProps = {
    total,
    pageSize,
    current: pageNum,
    onChange: (currentPage) => {
      getList({
        page: { currentPage }
      })
    }
  }

  useEffect(() => {
    getList()
    getStatistics()

  }, [])

  const getList = ({ page, form } = {}) => {
    const { actions } = props
    search.current = {
      page: Object.assign({}, search.current.page, page),
      form: Object.assign({}, search.current.form, form)
    }
    setLoading(true)
    actions.policyListByOwner(search.current).then(() => {
      setLoading(false)
      setSelectedRowKeys([])
    }).catch(() => setLoading(false))
  }

  const getStatistics = (form) => {
    const { actions } = props
    actions.procurementPolicyStatisticsByOwner(form).then(() => {
      setLoading(false)
    })
  }

  const onTabChange = active => {
    getList({
      form: {
        policyStatus: active === "0" ? undefined : active
      }
    })
  };


  return (
    <div className="policy-manage-owner-list-container">
      <PageHeader
        onBack={false}
        title="主账号政策列表"
        subTitle="This is a subtitle"
      >
        <OwnerInfos actions={props.actions} list={props.contractList}/>
      </PageHeader>
      <Button type="primary">添加政策</Button>
      <Tabs onChange={onTabChange} animated={false}>
        <TabPane tab={<span>全部 <span>{props.statistics.allCount}</span></span>} key="0" />
        {
          Object.entries(policyStatusMap).map(([ key, { text, field } ]) => <TabPane tab={
            <span>{text} <span>{props.statistics[field]}</span></span>} key={key} />)
        }
      </Tabs>
      <PolicyAccountModal />
    </div>
  );
};

const mapStateToProps = (state) => ({
  common: state.commonReducers,
  policyList: state.pricePolicyReducer.policyListByOwner,
  statistics: state.pricePolicyReducer.policyOwnerStatistics,
  contractList: state.pricePolicyReducer.contractListByOwner
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
)(Form.create()(PolicyListByOwner))
