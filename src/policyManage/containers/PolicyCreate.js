import React, { createRef, useEffect, useState } from 'react';
import * as commonActions from '@/actions';
import { bindActionCreators } from "redux";
import actions from "../actions";
import { connect } from "react-redux";
import {
  Button,
  PageHeader,
  message
} from "antd";

import PolicyEditForm from "../components/PolicyEditForm";
import LoadingWrapped from "@/base/LoadingWrapped";


const PolicyCreate = (props) => {

  const mcnId = props.match.params.ownerId;

  const [ submitLoading, setSubmitLoading ] = useState()
  const [ initData, setInitData ] = useState({ mcnId })
  const [ pageLoading, setPageLoading ] = useState(true)


  const formRef = createRef();

  useEffect(() => {
    // 获取主账号基本信息
    props.actions.getOwnerBaseInfo({ userId: mcnId })
      .then(({ data }) => {
        setInitData({
          mcnId: data.userId,
          identityName: data.identityName
        })
        setPageLoading(false)
      })
      .catch((err) => {
        setPageLoading(err)
      })

  }, [])

  const submit = () => {
    formRef.current && formRef.current.handleSubmit((body) => {
      setSubmitLoading(true)
      props.actions.addPolicy(body).then(() => {
        message.success('创建政策成功');
      }).finally(() => {
        setSubmitLoading(false)
      });
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
          title="添加政策"
        />
        <PolicyEditForm wrappedComponentRef={formRef} {...formProps} />
        <div className="policy-manage-edit-container-footer">
          <Button loading={submitLoading} type="primary" onClick={submit}>添加政策</Button>
        </div>
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
)(PolicyCreate)
