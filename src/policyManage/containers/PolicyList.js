import React, { useEffect, useRef, useState } from 'react';
import * as commonActions from '@/actions';
import { bindActionCreators } from "redux";
import actions from "../actions";
import { connect } from "react-redux";
import {
  Alert,
  Button,
  Checkbox,
  Form,
  Pagination,
  Tabs,
  Spin,
  message,
  Table,
  Divider, PageHeader, Popover, Icon, List
} from "antd";
import PolicyTable from '../components/PolicyTable'
import PolicyAllFilterForm from "../components/PolicyAllFilterForm";
import PolicyCard from "../components/PolicyCard";
import PolicyStatus, {
  POLICY_STATUS_ACTIVE,
  POLICY_STATUS_INACTIVE, POLICY_STATUS_STOP,
  policyStatusMap
} from "../base/PolicyStatus";
import PolicyAccountModal from "../components/PolicyAccountModal";
import _merge from 'lodash/merge'
import StopReasonModal from "../components/StopReasonModal";
import { dateFormat, ruleDisplay, settlementDisplay } from "../utils";
import OwnerInfos from "@/policyManage/components/OwnerInfos";
import { POLICY_LEVEL } from "@/policyManage/constants/dataConfig";
import IconFont from "@/base/IconFont";
import QuestionTip from "@/base/QuestionTip";
import Yuan from "@/base/Yuan";


const { TabPane } = Tabs;


const PolicyList = (props) => {
  const { keys, source, } = props.policyList
  const [loading, setLoading] = useState(false)
  const search = useRef({
    page: {
      currentPage: 1,
      pageSize: 20
    }
  })

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
    actions.policyAllList(search.current).then(() => {
      setLoading(false)

    }).catch(() => setLoading(false))
  }

  const getStatistics = (form) => {
    const { actions } = props
    actions.procurementPolicyStatistics(form).then(() => {
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

  const { globalRulePlatforms, actions, policyList } = props
  const dataSource = keys.map(key => source[key])
  const tableProps = {
    actions,
    getList,
    dataSource,
    globalRulePlatforms,
    isPolicy: true,
    policyList
  }

  return (
    <div className="policy-manage-list-container">
      <Spin spinning={loading}>
        <PageHeader
          onBack={false}
          title="采购政策列表"
          subTitle="This is a subtitle"
        />
        <PolicyAllFilterForm actions={props.actions} getList={getList} getStatistics={getStatistics} globalRulePlatforms={props.globalRulePlatforms}
          queryMediumsList={props.queryMediumsList} />
        <Tabs onChange={onTabChange} animated={false}>
          <TabPane tab={<span>全部 <span>{props.statistics.allCount}</span></span>} key="0" />
          {
            Object.entries(policyStatusMap).map(([key, { text, field }]) => <TabPane tab={
              <span>{text} <span>{props.statistics[field]}</span></span>} key={key} />)
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

        <PolicyTable {...tableProps} />
      </Spin>
    </div >
  );
};

const mapStateToProps = (state) => ({
  common: state.commonReducers,
  policyList: state.pricePolicyReducer.policyAllList,
  statistics: state.pricePolicyReducer.policyAllStatistics,
  globalRulePlatforms: state.pricePolicyReducer.globalRulePlatforms,
  queryMediumsList: state.pricePolicyReducer.queryMediumsList,
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
