/**
 * Created by lzb on 2020-04-23.
 */
import React, { createRef, useEffect, useState } from 'react';
import * as commonActions from '@/actions';
import { bindActionCreators } from "redux";
import actions from "../actions";
import { connect } from "react-redux";
import {
  Button,
  PageHeader,
  message, Icon
} from "antd";

import PolicyEditForm from "../components/PolicyEditForm";
import LoadingWrapped from "@/base/LoadingWrapped";
import PolicyStatus from "@/policyManage/base/PolicyStatus";
import {
  POLICY_STATUS_ACTIVE,
  POLICY_STATUS_INACTIVE,
  POLICY_STATUS_STOP
} from "@/policyManage/constants/dataConfig";
import StopReasonModal from "@/policyManage/components/StopReasonModal";


const PolicyUpdate = (props) => {

  const id = props.match.params.id;

  const [ submitLoading, setSubmitLoading ] = useState()
  const [ initData, setInitData ] = useState({ id })
  const [ pageLoading, setPageLoading ] = useState(true)
  const [ stopModal, setStopModal ] = useState(false)


  const formRef = createRef();

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

  const submit = () => {
    formRef.current && formRef.current.handleSubmit((body) => {
      setSubmitLoading(true)
      props.actions.updatePolicy(body).then(() => {
        message.success('更新政策成功');
      }).finally(() => {
        setSubmitLoading(false)
      });
    })
  }

  // 停用
  const stopPolicy = (id) => {
    setStopModal(id)

  }

  // 停用原因提交
  const stopReasonSubmit = ({ policyStopReason }) => {
    return props.actions.stopPolicy({ id: stopModal, policyStopReason }).then(({ data }) => {
      message.success('操作成功')
      setStopModal()
      setInitData(Object.assign({}, initData, {
        policyStatus: POLICY_STATUS_STOP,
        policyStopReason,
        ...data
      }))
    })
  }

  // 启用
  const startPolicy = (id) => {
    const { actions } = props
    const hide = message.loading('处理中...')
    actions.startPolicy({ id }).then(({ data }) => {
      message.success('操作成功')
      hide()
      setInitData(Object.assign({}, initData, {
        policyStatus: POLICY_STATUS_ACTIVE,
        ...data
      }))
    })
  }


  const formProps = {
    actions: props.actions,
    allPlatforms: props.allPlatforms,
    data: initData
  }

  return (
    <LoadingWrapped loading={pageLoading}>
      <div className="policy-manage-edit-container">
        <PageHeader
          onBack={props.history.goBack}
          title="编辑政策"
          subTitle={
            <div className='policy-manage-edit-container-status'>
              <span className='fields-item-'>政策ID：{initData.id}</span>
              <span className='fields-item-'>修改人：{initData.modifiedByName}</span>
              <span className='fields-item-'>修改于：{initData.modifiedAt}</span>
              <PolicyStatus status={initData.policyStatus} reason={initData.policyStopReason} />
            </div>
          }
        />
        <PolicyEditForm wrappedComponentRef={formRef} {...formProps} />
        <div className="policy-manage-edit-container-footer">
          <Button loading={submitLoading} type="primary" onClick={submit}>更新政策</Button>
          {
            (initData.policyStatus === POLICY_STATUS_INACTIVE ||
              initData.policyStatus === POLICY_STATUS_ACTIVE) &&
            <Button onClick={() => stopPolicy(id)}>停用</Button>
          }
          {
            (initData.policyStatus === POLICY_STATUS_STOP) &&
            <Button onClick={() => startPolicy(id)}>启用</Button>
          }
        </div>
        {stopModal ? <StopReasonModal onCancel={stopPolicy} onOk={stopReasonSubmit} /> : null}
      </div>
    </LoadingWrapped>
  );
};

const mapStateToProps = (state) => ({
  common: state.commonReducers,
  allPlatforms: state.pricePolicyReducer.globalRulePlatforms
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
)(PolicyUpdate)
