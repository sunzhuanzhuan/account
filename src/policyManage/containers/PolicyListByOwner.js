import React, { useEffect, useRef, useState } from 'react';
import * as commonActions from '@/actions';
import { bindActionCreators } from "redux";
import actions from "../actions";
import { connect } from "react-redux";
import { Alert, Button, Checkbox, Form, Pagination, Tabs, Spin, message, PageHeader } from "antd";

import { policyStatusMap } from "@/policyManage/base/PolicyStatus";

import OwnerInfos from "@/policyManage/components/OwnerInfos";
import PolicyTable from '../components/PolicyTable'
import LoadingWrapped from "@/base/LoadingWrapped";

const { TabPane } = Tabs;


const PolicyListByOwner = (props) => {


  const { keys, source, total, pageNum, pageSize } = props.policyList

  const [ loading, setLoading ] = useState(false)
  const [ pageLoading, setPageLoading ] = useState(true)
  const [ ownerInfo, setOwnerInfo ] = useState(false)
  const mcnId = props.match.params.ownerId
  const search = useRef({
    page: {
      currentPage: 1,
      pageSize: 5
    }
  })
  useEffect(() => {
    // 获取主账号基本信息
    props.actions.getOwnerBaseInfo({ userId: mcnId })
      .then(({ data }) => {
        setOwnerInfo({
          mcnId: data.userId,
          identityName: data.identityName
        })
        setPageLoading(false)
      })
      .catch((err) => {
        setPageLoading(err)
      })

    getList()
    getStatistics()

  }, [])

  const getList = ({ page } = {}) => {
    const { actions } = props
    search.current = {
      page: Object.assign({}, search.current.page, page),
      form: { mcnId: mcnId }
    }
    setLoading(true)
    actions.policyListByOwner(search.current).then(() => {
      setLoading(false)
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
  const dataSource = keys.map(key => source[key])
  const { globalRulePlatforms, actions, policyList, platformListByPolicy } = props
  const tableProps = {
    getList,
    actions,
    loading,
    noColumnArr: [ 'identityName', 'ownerAdminName' ],
    dataSource,
    globalRulePlatforms, policyList, platformListByPolicy,
    pageSizeOptions: [ '5', '10', '20', '50', '100' ]
  }

  return (
    <LoadingWrapped loading={pageLoading}>
      <div className="policy-manage-owner-list-container">
        <PageHeader
          onBack={false}
          title="主账号政策列表"
          subTitle=" "
        >
          <OwnerInfos actions={props.actions} list={props.contractList} data={ownerInfo} />
        </PageHeader>
        <Button type="primary" onClick={() => window.open(`/account/policy/create/${mcnId}`, '_self')}>添加政策</Button>
        <Tabs onChange={onTabChange} animated={false}>
          <TabPane tab={<span>全部 <span>{props.statistics.allCount}</span></span>} key="0" />
          {
            Object.entries(policyStatusMap).map(([ key, { text, field } ]) => <TabPane tab={
              <span>{text} <span>{props.statistics[field]}</span></span>} key={key} />)
          }
        </Tabs>
        <PolicyTable {...tableProps} />
        {/*<PolicyAccountModal />*/}
      </div>
    </LoadingWrapped>
  );
};

const mapStateToProps = (state) => ({
  common: state.commonReducers,
  policyList: state.pricePolicyReducer.policyListByOwner,
  statistics: state.pricePolicyReducer.policyOwnerStatistics,
  contractList: state.pricePolicyReducer.contractListByOwner,
  globalRulePlatforms: state.pricePolicyReducer.globalRulePlatforms,
  queryMediumsList: state.pricePolicyReducer.queryMediumsList,
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
)(Form.create()(PolicyListByOwner))
