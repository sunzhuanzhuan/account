import React, { Component } from "react"
import { bindActionCreators } from "redux";
import { Tabs, Anchor, Button, message } from 'antd'
import { connect } from "react-redux";
import * as action from '../actions/index'
import * as commonAction from '@/actions/index'
import * as packageAction from '../actions/package'
import { parseUrlQuery } from "@/util/parseUrl";
import { tabs, modulesMap, platformToModules } from '../constants/packageConfig'
import Module from "@/accountManage/components/common/Module";
import ImproveStatistics from "@/accountManage/components/common/ImproveStatistics";
import LoadingBlock from "@/accountManage/base/LoadingBlock";
import numeral from '@/util/numeralExpand'
import { sensors } from "@/util/sensor/sensors";
import AccountState from "@/accountManage/components/AccountState";

const { TabPane } = Tabs;
const { Link } = Anchor;


class UpdatePageForPackage extends Component {
  constructor(props) {
    super(props);
    const { account_id, active, addQuote } = parseUrlQuery(props.location.search)
    const { platformId } = props.match.params || {}
    // addQuote 参数判断是否是否直接进入报价编辑
    this.state = {
      active: active || (addQuote ? '2' : '1'),
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

  allSubmit = () => {
    // 一键提交
    const {
      updateBaseInfo,
      updateCooperationInfo,
      updateContentInfo,
      updateStrategyInfo,
      updateOtherInfo,
      updatePersonalInfo
    } = this.props.actions
    let actionsMap = {
      'main': updateBaseInfo,
      'cooperation': updateCooperationInfo,
      'content': updateContentInfo,
      'strategy': updateStrategyInfo,
      'other': updateOtherInfo,
      'personal': updatePersonalInfo
    }
    let comps = [], actions = [];
    Object.entries(window.__UpdateAccountReactComp__).forEach(([key, value]) => {
      if (value) {
        comps.push(value)
        actions.push(actionsMap[key])
      }
    })
    const verifies = comps.map((c) => {
      return new Promise((resolve, reject) => {
        c.props.form.validateFieldsAndScroll((err, fieldsValue) => {
          if (!err) resolve(c.handleSubmitValues(fieldsValue))
          reject(err)
        })
      })
    })
    Promise.all(verifies).then(data => {
      this.setState({
        submitLoading: true
      })
      let updates = actions.map((action, index) => action(data[index]))
      Promise.all(updates).then((data) => {
        this.setState({
          submitLoading: false
        })
        message.success(data.message || '更新账号成功', 1.5, () => this.reload())

      }).finally(() => {
        this.setState({
          submitLoading: false
        })
      })
    }).catch(err => {
      console.error('一键提交:', err);
      message.error('信息填写不合法, 请重新填写')
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
    actions.getDetail({ accountId: this.state.accountId }).then(({ data }) => {
      // 获取主账号信息
      let { userId } = data.base
      if (userId) {
        actions.getPrimaryAccountInfo({ userId })
        actions.getUserInvoiceInfo({ userIds: userId })
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
      submitLoading
    } = this.state
    const activeTab = tabs[active - 1] || {}
    const { account: { perfectionDegree, base } } = this.props.accountManage
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
    return (!fullLoading && !isError) ? <div className='update-package-page-container'>
      <h2>账号维护</h2>
      {process.env.REACT_APP_CLIENT === 'NB' && <Tabs
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
      </Tabs>}
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
                  auth: this.props.auth
                }}
                reload={this.reload}
              />
            })
          }
        </div>
        {
          modulesList.length > 2 ? <div style={{ float: 'right' }}>
            <Anchor
              onClick={e => e.preventDefault()}
              offsetTop={60}
              showInkInFixed={true}
              getContainer={() => document.querySelector('#app-content-children-id')}
            >
              <ImproveStatistics {...statisticsProps} actions={this.props.actions} />
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
              {process.env.REACT_APP_CLIENT === 'NB' && <div className='nav-box-footer'>
                <Button type='primary' loading={submitLoading} block onClick={this.allSubmit}>一键提交</Button>
              </div>}
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
    auth: state.authorizationsReducers.authVisibleList
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...commonAction, ...action, ...packageAction }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePageForPackage)
