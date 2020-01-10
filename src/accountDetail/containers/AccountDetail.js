import React, { Component } from 'react'
import { HeadInfo, DataIndicator, HistoricalAD, ContentData, AudienceAttribute, BaseInfo, ContentQuality, DataTrends } from "../components";
import Delivery from '../components/delivery'
import './AccountDetail.less'
import { Modal, message, Spin, Tabs } from 'antd';
import LazyLoad from 'react-lazyload';
import { Route, withRouter } from 'react-router-dom'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import * as commonAction from "@/actions";
import { platformView } from "../../accountManage/constants/platform";
import qs from "qs";
const { TabPane } = Tabs;
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
    actions.getHistoryPriceCount({ account_id: accountId })
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
    const { actions, accountDetail, authorizationsReducers } = this.props
    //是否BP角色
    const authVisble = authorizationsReducers.authVisibleList['is.bp']

    const {
      baseInfo, trendInfo,
      queryOrderCooperationList,
      queryIndustryInfoList,
      isExistCar, newVideoList, } = accountDetail
    const { getTrend,
      getQueryOrderCooperationList, addQueryIndustryInfoList,
      getQueryIndustryInfoList, getNewVideo } = actions
    const contentDataProps = {
      trendInfo,
      getTrend,
      accountId,
      baseInfo,
      getNewVideo,
      newVideoList
    }
    const { base = {}, feature = {} } = baseInfo
    const { platformId = 0 } = base
    const historicalADProps = {
      getQueryOrderCooperationList,
      queryOrderCooperationList,
      queryIndustryInfoList,
      getQueryIndustryInfoList,
      accountId,
      addQueryIndustryInfoList
    }
    const headProps = {
      setShowModal: this.setShowModal,
      selectCarEdit: this.selectCarEdit,
      isExistCar, accountDetail,
      actions, baseInfo, accountId, authVisble,
    }
    return (
      <div className="account-view-detail" id='Js-account-view-detail-Id'>
        <Spin spinning={isLoading}>
          <BaseInfo {...headProps} />
          {/* 头部基础信息 */}
          <HeadInfo {...headProps} />
          <div className='data-charts'>
            <div className='updata-time'>数据更新时间：{feature.latestUpdateTime}</div>
            <Tabs defaultActiveKey="1" onChange={this.changeType} className='detail-tabs' size='large'>
              <TabPane tab="平台数据" key="1">
                {/* 数据指标 */}
                <DataIndicator baseInfo={baseInfo} />
                {/* 历史案例 */}
                <LazyLoad once overflow>
                  <HistoricalAD {...historicalADProps} />
                </LazyLoad>
                {/*数据趋势  */}
                <DataTrends accountId={accountId} baseInfo={baseInfo} />
                {/*内容质量*/}
                <ContentQuality accountId={accountId} baseInfo={baseInfo} platformId={platformId} />

              </TabPane>
              <TabPane tab="用户画像" key="2">
                {/* 受众画像 */}
                {platformId == 118 ? null : <LazyLoad once overflow>
                  <AudienceAttribute accountId={accountId} />
                </LazyLoad>}
              </TabPane>
              <TabPane tab="投放数据" key="3">
                <Delivery setShowModal={this.setShowModal} feature={feature} />
              </TabPane>
            </Tabs>
          </div>
          {/* 账号推荐 */}
          {/* <AccountRecommend /> */}
          <Modal
            title={showModal.title}
            visible={visible} footer={null}
            onOk={() => this.setShowModal(false, null)}
            onCancel={() => this.setShowModal(false, null)}
            width={showModal.width}
            maskClosable={false}
            destroyOnClose={true}
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
    accountDetail: state.accountDetailReducer,
    authorizationsReducers: state.authorizationsReducers,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...commonAction, ...action }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountDetail))
