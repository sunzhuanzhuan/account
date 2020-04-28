import React, { useEffect, useRef, useState } from 'react';
import * as commonActions from '@/actions';
import { bindActionCreators } from "redux";
import actions from "../actions";
import { connect } from "react-redux";
import {
  Alert,
  Form,
  Tabs,
  Spin,
  PageHeader
} from "antd";
import PolicyTable from '../components/PolicyTable'
import PolicyAllFilterForm from "../components/PolicyAllFilterForm";
import {
  policyStatusMap
} from "../base/PolicyStatus";
import Yuan from "@/base/Yuan";


const { TabPane } = Tabs;


const PolicyList = (props) => {
  const { keys, source } = props.policyList
  const [ loading, setLoading ] = useState(false)
  const search = useRef({
    page: {
      currentPage: 1,
      pageSize: 20
    }
  })

  useEffect(() => {
    getList()
    props.actions.getGlobalRulePlatforms()
  }, [])

  const getList = ({ page, form } = {}) => {
    const { actions } = props
    search.current = {
      page: Object.assign({}, search.current.page, page),
      form: Object.assign({}, search.current.form, form)
    }
    setLoading(true)
    getStatistics(search.current.form)
    actions.policyAllList(search.current).then(() => {
      setLoading(false)

    }).catch(() => setLoading(false))
  }

  const getStatistics = (form) => {
    const body = form || search.current.form
    const { actions } = props

    actions.procurementPolicyStatistics(body).then(() => {
      setLoading(false)
    })
    actions.orderStatistics(body).then(() => {
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

  const { globalRulePlatforms, actions, policyList, platformListByPolicy, history, statistics } = props
  const dataSource = keys.map(key => source[key])
  const tableProps = {
    actions,
    getList,
    dataSource,
    globalRulePlatforms,
    isPolicy: true,
    policyList,
    platformListByPolicy,
    pageSizeOptions: [ '10', ' 20', ' 50', ' 100' ],
    history
  }

  return (
    <div className="policy-manage-list-container">
      <Spin spinning={loading}>
        <PageHeader
          onBack={false}
          title="采购政策列表"
          subTitle=" "
        />
        <PolicyAllFilterForm
          actions={props.actions}
          getList={getList}
          globalRulePlatforms={props.globalRulePlatforms}
          mediumsListForAuth={props.mediumsListForAuth}
        />
        <Tabs onChange={onTabChange} animated={false}>
          <TabPane tab={<span>全部 <span>{statistics.allCount}</span></span>} key="0" />
          {
            Object.entries(policyStatusMap).map(([ key, { text, field } ]) => <TabPane tab={
              <span>{text} <span>{statistics[field]}</span></span>} key={key} />)
          }
        </Tabs>
        <Alert message={<div className='policy-list-statistics-container'>
          <span className='fields-item-'>
            政策数：{policyList.total}
        </span>
          <span className='fields-item-'>
            预约执行金额（元）：
            <Yuan className='text-black' value={statistics.executionReservationOrderAmount} format='0,0' />
        </span>
          <span className='fields-item-'>
            预约执行订单数量：{statistics.executionReservationOrderCount || 0}
        </span>
          <span className='fields-item-'>
            派单执行金额（元）：
            <Yuan className='text-black' value={statistics.executionCampaignOrderAmount} format='0,0' />
        </span>
          <span className='fields-item-'>
            预约执行订单数量：{statistics.executionCampaignOrderCount || 0}
        </span>
        </div>} />
        <PolicyTable {...tableProps} />
      </Spin>
    </div>
  );
};

const mapStateToProps = (state) => ({
  mediumsListForAuth: state.commonReducers.mediumsListForAuth,
  policyList: state.pricePolicyReducer.policyAllList,
  statistics: state.pricePolicyReducer.policyAllStatistics,
  globalRulePlatforms: state.pricePolicyReducer.globalRulePlatforms,
  platformListByPolicy: state.pricePolicyReducer.platformListByPolicy
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
)(Form.create()(PolicyList))
