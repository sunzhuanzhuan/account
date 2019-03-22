import React, { Component } from 'react'
import { HeadInfo, DataIndicator, HistoricalAD, ContentData, AudienceAttribute, NewVideo, AccountRecommend } from "../components";
import './AccountDetail.less'
import { Modal, message } from 'antd';
import LazyLoad from 'react-lazyload';
import { Route, withRouter } from 'react-router-dom'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import * as commonAction from "@/actions";
import qs from "qs";
class AccountDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      showModal: { title: '', content: '' },
      searchParam: qs.parse(this.props.location.search.substring(1)),
      isExistCar: false
    };
  }
  componentDidMount = () => {
    const { actions } = this.props
    const { searchParam: { accountId } } = this.state
    actions.getBaseInfo({ accountId: accountId })
    actions.getAccountIsInCart({ accountId: accountId }).then(({ data }) => {
      this.setState({ isExistCar: data == 1 })
    })
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
    const { searchParam: { accountId, platformId } } = this.state
    const { actions: { removeFromCartAD, addToCartAD } } = this.props
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
    const { showModal, visible, searchParam: { accountId }, isExistCar } = this.state
    const { actions, accountDetail } = this.props
    const {
      baseInfo,
      trendInfo,
      audienceAttributeInfo,
      queryOrderCooperationList,
      queryIndustryInfoList } = accountDetail
    const { getTrend, getAudienceAttribute, getQueryOrderCooperationList, getQueryIndustryInfoList } = actions
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
      accountId
    }
    return (
      <div className="account-view-detail" id='Js-account-view-detail-Id'>
        {/* 头部基础信息 */}
        <HeadInfo setShowModal={this.setShowModal} baseInfo={baseInfo} selectCarEdit={this.selectCarEdit} isExistCar={isExistCar} />
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
        {/* <LazyLoad once overflow>
          <AudienceAttribute getAudienceAttribute={getAudienceAttribute} audienceAttributeInfo={audienceAttributeInfo} />
        </LazyLoad> */}
        {/* 最新视频 */}
        {/* <LazyLoad once overflow>
          <NewVideo />
        </LazyLoad> */}
        {/* 账号推荐
          <AccountRecommend /> 
        */}
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
