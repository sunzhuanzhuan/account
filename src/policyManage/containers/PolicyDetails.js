/**
 * Created by lzb on 2020-04-24.
 */
/**
 * Created by lzb on 2020-04-23.
 */
import React, { useEffect, useState } from 'react';
import * as commonActions from '@/actions';
import { bindActionCreators } from "redux";
import actions from "../actions";
import { connect } from "react-redux";
import {
  Button,
  PageHeader,
} from "antd";

import PolicyViewDetails from "../components/PolicyViewDetails";
import LoadingWrapped from "@/base/LoadingWrapped";
import {
  POLICY_STATUS_ACTIVE,
  POLICY_STATUS_INACTIVE,
} from "@/policyManage/constants/dataConfig";


const PolicyDetails = (props) => {

  const id = props.match.params.id;

  const [ initData, setInitData ] = useState({ id })
  const [ pageLoading, setPageLoading ] = useState(true)


  useEffect(() => {
    reload()
  }, [])


  const reload = () => {
    // 获取政策信息
    props.actions.getPolicyInfoById({ id })
      .then(({ data }) => {
        setInitData(data)
        setPageLoading(false)
      })
      .catch((err) => {
        setPageLoading(err)
      })
  }

  const detailsProps = {
    actions: props.actions,
    platformListByPolicy: props.platformListByPolicy,
    data: initData
  }

  return (
    <LoadingWrapped loading={pageLoading}>
      <div className="policy-manage-details-container">
        <PageHeader
          onBack={props.history.goBack}
          title="政策详情"
        />
        <PolicyViewDetails {...detailsProps} />
        <div className="policy-manage-details-container-footer">
          {
            (initData.policyStatus === POLICY_STATUS_INACTIVE ||
              initData.policyStatus === POLICY_STATUS_ACTIVE) &&
            <>
              <Button type="primary" onClick={() => {
                props.history.push('/account/policy/update/' + id)
              }}>编辑政策</Button>
            </>
          }
        </div>
      </div>
    </LoadingWrapped>
  );
};

const mapStateToProps = (state) => ({
  common: state.commonReducers,
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
)(PolicyDetails)
