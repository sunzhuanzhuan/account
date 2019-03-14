import React, { Component } from 'react'
import { HeadInfo, DataIndicator, HistoricalAD, ContentData, AudienceAttribute, NewVideo } from "../components";
import './AccountDetail.less'
import { Modal } from 'antd';
import LazyLoad from 'react-lazyload';
import { Route, withRouter } from 'react-router-dom'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import * as commonAction from "@/actions";
class AccountDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      showModal: { title: '', content: '' }
    };
  }
  componentDidMount = () => {
    const { actions } = this.props
    actions.getBaseInfo()
  }

  componentWillUnmount() {
  }

  setShowModal = (visible, showModal) => {
    if (visible) {
      this.setState({
        visible: visible,
        showModal: showModal
      })
    } else {
      this.setState({ visible: visible })
    }
  }
  render() {
    const { showModal, visible } = this.state
    const { actions, accountDetail } = this.props
    const {
      baseInfo,
      trendInfo,
      audienceAttributeInfo } = accountDetail
    const { getTrend, getAudienceAttribute } = actions
    const contentDataProps = {
      trendInfo,
      getTrend
    }
    return (
      <div className="account-view-detail" id='Js-account-view-detail-Id'>

        <HeadInfo setShowModal={this.setShowModal} baseInfo={baseInfo} />
        <DataIndicator baseInfo={baseInfo} />
        <LazyLoad once overflow>
          <HistoricalAD />
        </LazyLoad>
        <LazyLoad once overflow>
          <ContentData {...contentDataProps} />
        </LazyLoad>
        <LazyLoad once overflow>
          <AudienceAttribute getAudienceAttribute={getAudienceAttribute} audienceAttributeInfo={audienceAttributeInfo} />
        </LazyLoad>
        {/* <LazyLoad once overflow>
          <NewVideo />
        </LazyLoad> */}
        <Modal
          title={showModal.title}
          visible={visible}
          onOk={() => this.setShowModal(false, null)}
          onCancel={() => this.setShowModal(false, null)}
          footer={null}
          width={showModal.width}
        >
          {showModal.content}
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    accountDetail: state.accountDetailReducer
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...commonAction, ...action }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountDetail))
