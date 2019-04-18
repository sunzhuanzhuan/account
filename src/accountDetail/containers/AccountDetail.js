import React, { Component } from 'react'
import { HeadInfo, DataIndicator, HistoricalAD, ContentData, AudienceAttribute, NewVideo, AccountRecommend } from "../components";
import './AccountDetail.less'
import { Modal, message, Spin } from 'antd';
import LazyLoad from 'react-lazyload';
import { Route, withRouter } from 'react-router-dom'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import * as commonAction from "@/actions";
import { platformView } from "../../accountManage/constants/platform";

import qs from "qs";
class AccountDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      showModal: { title: '', content: '' },
      searchParam: qs.parse(this.props.location.search.substring(1)),
      isLoading: true
    };
  }
  componentDidMount = async () => {
    const { actions } = this.props
    const { searchParam: { accountId } } = this.state
    const { data = {} } = await actions.getBaseInfo({ accountId: accountId })
    actions.getAccountIsInCart({ accountId: accountId })
    this.setState({
      isLoading: false
    })
    const { base = {} } = data
    document.title = `${base.snsName || ''}-${platformView[base.platformId] || ''}平台-微播易`
  }

  //弹窗方法
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
  //选号车操作
  selectCarEdit = async (isAdd) => {
    const { searchParam: { accountId } } = this.state
    const { actions: { removeFromCartAD, addToCartAD, getAccountIsInCart }, accountDetail: { baseInfo: { base: { platformId } } } } = this.props
    if (isAdd) {
      await addToCartAD({
        accounts: [{ account_id: accountId, platform_id: platformId }],
        item_type_id: 1
      })
    } else {
      await removeFromCartAD({ staging_ids: [accountId] })
    }
    message.success('操作成功')
  }
  render() {
    const { showModal, visible, searchParam: { accountId }, isLoading } = this.state
    const { actions, accountDetail } = this.props
    const {
      baseInfo,
      trendInfo,
      audienceAttributeInfo,
      queryOrderCooperationList,
      queryIndustryInfoList,
      isExistCar, queryTgiList,
      newVideoList } = accountDetail
    const { getTrend, getAudienceAttribute,
      getQueryOrderCooperationList, addQueryIndustryInfoList,
      getQueryIndustryInfoList, getNewVideo, getQueryTgiList } = actions
    const contentDataProps = {
      trendInfo,
      getTrend,
      accountId
    }
    const historicalADProps = {
      getQueryOrderCooperationList,
      queryOrderCooperationList,
      queryIndustryInfoList,
      getQueryIndustryInfoList,
      accountId,
      addQueryIndustryInfoList
    }
    return (
      <div className="account-view-detail" id='Js-account-view-detail-Id'>
        <Spin spinning={isLoading}>
          {/* 头部基础信息 */}
          <HeadInfo setShowModal={this.setShowModal} baseInfo={baseInfo} selectCarEdit={this.selectCarEdit} isExistCar={isExistCar} />
          {/* 数据指标 */}
          <DataIndicator baseInfo={baseInfo} />
          {/* 历史案例 */}
          <LazyLoad once overflow>
            <HistoricalAD {...historicalADProps} />
          </LazyLoad>
          {/*内容数据  */}
          <LazyLoad once overflow>
            <ContentData {...contentDataProps} />
          </LazyLoad>
          {/* 受众画像 */}
          <LazyLoad once overflow>
            <AudienceAttribute accountId={accountId}
              getAudienceAttribute={getAudienceAttribute}
              audienceAttributeInfo={audienceAttributeInfo}
              queryTgiList={queryTgiList}
              getQueryTgiList={getQueryTgiList} />
          </LazyLoad>
          {/* 最新视频 */}
          <LazyLoad once overflow>
            <NewVideo getNewVideo={getNewVideo} newVideoList={newVideoList} accountId={accountId} />
          </LazyLoad>
          {/* 账号推荐 */}
          {/* <AccountRecommend /> */}
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
        </Spin>
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
