import React, { Component } from "react"
import { bindActionCreators } from "redux";
import { message, Skeleton, Tabs, Anchor, Button } from 'antd'
import { connect } from "react-redux";
import * as action from '../actions/index'
import * as commonAction from '@/actions/index'
import * as packageAction from '../actions/package'
import { parseUrlQuery } from "@/util/parseUrl";
import { tabs, modulesMap, platformToModules } from '../constants/packageConfig'
import Module from "@/accountManage/components/common/Module";
import ImproveStatistics from "@/accountManage/components/common/ImproveStatistics";
import LoadingBlock from "@/accountManage/base/LoadingBlock";

const { TabPane } = Tabs;
const { Link } = Anchor;


class UpdatePageForPackage extends Component {
  constructor(props) {
    super(props);
    const { account_id, active } = parseUrlQuery(props.location.search)
    const { platformId } = props.match.params || {}
    this.state = {
      active: active || '1',
      accountId: account_id,
      platformId: platformId || '1',
      fullLoading: true,
      isError: false // { info: 'ssss' }
    }
  }

  componentDidMount() {
    // 获取account_id参数, 参数错误error
    // TODO: addQuote 参数判断是否是否直接进入报价编辑
    // 根据account_id获取账号信息, 错误error, 平台不对修改平台
    /* setTimeout(() => {
       window.location.replace('/account/manage/package/' + 9 + '?account_id=' + this.state.accountId)
     }, 2000);*/
    const { actions } = this.props
    actions.getDetail({ accountId: this.state.accountId }).then(({ data}) => {
      // 获取主账号信息
      let { userId } = data.base
      if (userId) {
        actions.getPrimaryAccountInfo({ userId })
        actions.getUserInvoiceInfo({ userIds: userId })
      }
      this.setState({
        fullLoading: false
      })
    }).catch((err) => {
      this.setState({
        fullLoading: false,
        isError: { info: err }
      })
    })
  }

  render() {
    const {
      active,
      fullLoading,
      isError
    } = this.state
    const activeTab = tabs[active - 1] || {}
    const { account: { perfectionDegree, base } } = this.props.accountManage
    const platform = platformToModules(base.platformId || this.state.platformId, activeTab.warp || [])
    const modulesList = platform.visibility.modules
    const statisticsProps = {
      percent: perfectionDegree.overall,
      // 找到当前tab的第一个未完善模块
      moduleId: activeTab.warp.find(key => {
        let perKey = modulesMap[key].perfectionDegreeKey
        return (perKey && perfectionDegree[perKey] < 100)
      })
    }
    return (!fullLoading && !isError) ? <div className='update-package-page-container'>
      <h2>账号维护</h2>
      {process.env.REACT_APP_CLIENT === 'NB' && <Tabs
        activeKey={active}
        animated={{ inkBar: true, tabPane: false }}
        style={{
          position: 'sticky',
          top: "-20px",
          background: '#fff',
          zIndex: 1
        }}
        onChange={(active) => {
          this.setState({ active }, () => {
            document.getElementById("app-content-children-id").scrollTop = 0
          })
        }}
      >
        {
          tabs.map(pane => <TabPane tab={
            <div className='tab-bar-item-wrapper'>
              <span>{pane.title}</span>
              {pane.perfectionDegreeKey && perfectionDegree[pane.perfectionDegreeKey] < 100 ?
                <b>(已完善 {perfectionDegree[pane.perfectionDegreeKey]}%)</b> : null}
            </div>
          } key={pane.index} />)
        }
      </Tabs>}
      <div className='tab-pane-common-box'>
        <div className='tab-pane-modules'>
          {
            modulesList.map((module) => {
              return <Module key={module.anchorId} module={module} platform={platform} actions={this.props.actions} data={{
                ...this.props.accountManage,
                auth: this.props.auth
              }} />
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
                modulesList.map(({ anchorId: key, title }) =>
                  <Link key={key} href={"#navLink-" + key} title={
                    <div className='nav-link-item-wrapper'>
                      <span>{title}</span>
                      {title.length === 5 && <b>未完善</b>}
                    </div>
                  } />)
              }
              <div className='nav-box-footer'>
                <Button type='primary' block>一键提交</Button>
              </div>
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
