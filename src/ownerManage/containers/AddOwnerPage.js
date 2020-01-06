/**
 * 更新主账号信息
 * Created by lzb on 2019-11-04.
 */
import React, { useEffect } from 'react';
import OwnerForm from "../components/AddOwnerForm";
import { bindActionCreators } from "redux";
import * as commonAction from "@/actions";
import * as action from "../actions";
import { connect } from "react-redux";

const AddOwnerPage = (props) => {

  // 获取媒介列表
  useEffect(() => {
    props.actions.getMediums()

  }, [])
  return (
    <div className="update-owner-page-container">
      <h2>
        添加主账号
      </h2>
      <OwnerForm
        config={props.config}
        defaultMedium={{
          id: parseInt(props.userInfo.user_id),
          name: props.userInfo.real_name
        }}
        mediumsOptions={props.mediums}
        action={props.actions.ownerAdd}
      />
    </div>
  );
};
const mapStateToProps = (state) => {

  return {
    ownerInfo: state.ownerManageReducer.ownerInfo,
    mediums: state.ownerManageReducer.mediums,
    auth: state.authorizationsReducers.authVisibleList,
    userInfo: state.loginReducer.userLoginInfo.user_info,
    config: state.commonReducers.config
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...commonAction, ...action }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOwnerPage);
