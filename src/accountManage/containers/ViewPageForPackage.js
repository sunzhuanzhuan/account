/**
 * Created by lzb on 2019-09-17.
 */
import React, { Component } from "react"
import { bindActionCreators } from "redux";
import { Tabs, Anchor } from 'antd'
import { connect } from "react-redux";
import * as action from '../actions/index'
import * as commonAction from '@/actions/index'
import * as packageAction from '../actions/package'
import { parseUrlQuery } from "@/util/parseUrl";
import { viewTabs as tabs, modulesMap, platformToModules } from '../constants/packageConfig'
import Module from "@/accountManage/components/common/Module";
import ImproveStatistics from "@/accountManage/components/common/ImproveStatistics";
import LoadingBlock from "@/accountManage/base/LoadingBlock";
import numeral from '@/util/numeralExpand'
import AccountState from "@/accountManage/components/AccountState";
import { policyRuleType } from "@/accountManage/constants";

const { TabPane } = Tabs;
const { Link } = Anchor;


class ViewPageForPackage extends Component {
  constructor(props) {
    super(props);
    const { account_id, active } = parseUrlQuery(props.location.search)
    const { platformId } = props.match.params || {}
    // addQuote 参数判断是否是否直接进入报价编辑
    this.state = {
      active: active || '1',
      accountId: account_id,
      platformId: parseInt(platformId) || 1,
      fullLoading: true,
      isError: false,// { info: 'ssss' }
      submitLoading: false
    }
    // 创建更新form容器
    window.__UpdateAccountReactComp__ = {}
  }

  reload = (cb) => {
    const { getDetail } = this.props.actions
    getDetail({ accountId: this.state.accountId }).finally(() => {
      cb && cb()
    })
  }

  componentWillUnmount() {
    const { actions } = this.props
    actions.clearAccountInfo()

  }

  componentDidMount() {
    // 获取account_id参数, 参数错误error
    if (!this.state.accountId) {
      return this.setState({
        isError: { info: '参数错误: 没有账号ID' }
      })
    }
    const { actions } = this.props
    actions.getAccountInfoById({ accountId: this.state.accountId }).then(({ data }) => {
      // 获取主账号信息
      let { userId } = data.base
      if (userId) {
        actions.getPrimaryAccountInfo({ userId })
        actions.getUserInvoiceInfo({ userIds: userId })
        actions.getPolicyIdAndDiscount({ accountId: data.id })
      }
      this.setState({
        fullLoading: false
      })
    }).catch(({ errorMsg }) => {
      this.setState({
        fullLoading: false,
        isError: { info: errorMsg, type: 'error' }
      })
    })
  }

  render() {
    const {
      active,
      fullLoading,
      isError,
    } = this.state
    const activeTab = tabs[active - 1] || {}
    const { account: { perfectionDegree, base }, priceInfo } = this.props.accountManage
    const platform = platformToModules(base.platformId || this.state.platformId, activeTab.warp || [])
    const modulesList = platform.visibility.modules
    const statisticsProps = {
      percent: numeral(perfectionDegree.overall).multiply(100).format('0'),
      // 找到当前tab的第一个未完善模块
      moduleId: activeTab.warp.find(key => {
        let perKey = modulesMap[key].perfectionDegreeKey
        return (perKey && perfectionDegree[perKey] < 1)
      })
    }
    // 根据account_id获取账号信息, 错误error, 平台不对修改平台
    if (base.platformId && base.platformId !== this.state.platformId) {
      let _url = window.location.href.replace(/\/(\d)+\?/i, `/${base.platformId}?`)
      window.location.replace(_url)
      return null
    }
    const { policyId, ruleType, ruleId } = priceInfo;
    return (!fullLoading && !isError) ? <div className='update-package-page-container'>
      <h2>
        账号维护
        {policyId ?
          <small className='policyInfo-id-display'>
            价格政策ID: {policyId}</small>
          : null}
      </h2>
      <Tabs
        activeKey={active}
        animated={{ inkBar: true, tabPane: false }}
        onChange={(active) => {
          this.setState({ active }, () => {
            document.getElementById("app-content-children-id").scrollTop = 0
          })
        }}
        tabBarExtraContent={
          // 是否下架 是否可接单 是否预约账号
          <AccountState
            actions={this.props.actions}
            data={this.props.accountManage}
          />
        }
      >
        {
          tabs.map(pane => <TabPane tab={
            <div className='tab-bar-item-wrapper'>
              <span>{pane.title}</span>
              {pane.perfectionDegreeKey && perfectionDegree[pane.perfectionDegreeKey] < 100 ?
                <b>（{perfectionDegree[pane.perfectionDegreeKey] > 0 ? `已完善 ${numeral(perfectionDegree[pane.perfectionDegreeKey]).format('0%')}` : '未完善'}）</b> : null}
            </div>
          } key={pane.index} />)
        }
      </Tabs>
      <div className='tab-pane-common-box'>
        <div className='tab-pane-modules'>
          {
            modulesList.map((module) => {
              return <Module
                key={module.anchorId}
                module={module}
                platform={platform}
                actions={this.props.actions}
                data={{
                  ...this.props.accountManage,
                  auth: this.props.auth,
                  userConfig: this.props.userConfig
                }}
                readOnly
                reload={this.reload}
              />
            })
          }
        </div>
        {
          modulesList.length > 2 ? <div style={{ marginLeft: '20px' }}>
            <Anchor
              onClick={e => e.preventDefault()}
              offsetTop={60}
              showInkInFixed={true}
              getContainer={() => document.querySelector('#app-content-children-id')}
            >
              <ImproveStatistics {...statisticsProps} actions={this.props.actions} readOnly/>
              {
                modulesList.map(({ anchorId: key, title, perfectionDegreeKey }) =>
                  <Link key={key} href={"#navLink-" + key} title={
                    <div className='nav-link-item-wrapper'>
                      <span>{title}</span>
                      {perfectionDegreeKey &&
                      <b>{
                        perfectionDegree[perfectionDegreeKey] > 0 ?
                          `已完善 ${numeral(perfectionDegree[perfectionDegreeKey]).format('0%')}` :
                          '未完善'
                      }</b>}
                    </div>
                  } />)
              }
            </Anchor>
          </div> : null
        }
      </div>
    </div> : <LoadingBlock loading={fullLoading} error={isError} />
  }
}

const mapStateToProps = (state) => {
  return {
    accountManage: state.accountManageReducer,
    auth: state.authorizationsReducers.authVisibleList,
    userConfig: state.loginReducer.UserConfigKey,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...commonAction, ...action, ...packageAction }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPageForPackage)
