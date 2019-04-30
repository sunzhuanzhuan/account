import React, { Component } from "react"
import { bindActionCreators } from "redux";
import { message, Skeleton, Tabs, Anchor } from 'antd'
import { connect } from "react-redux";
import * as action from '../actions/index'
import * as commonAction from '@/actions/index'
import * as packageAction from '../actions/package'
import { parseUrlQuery } from "@/util/parseUrl";
import { tabs, modules } from '../constants/packageConf'

const { TabPane } = Tabs;
const { Link } = Anchor;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    md: { span: 4 },
    lg: { span: 3 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 20 },
    lg: { span: 21 }
  }
};
const halfWrapCol = {
  xs: { span: 12 },
  sm: { span: 9 },
  md: { span: 10 },
  lg: { span: 10 }
}

class UpdatePageForPackage extends Component {
  constructor(props) {
    super(props);
    const { account_id, active } = parseUrlQuery(props.location.search)
    const { platform } = props.match.param
    this.state = {
      active: active || '1',
      accountId: account_id,
      platform: platform || '1',
      fullLoading: true,
      isError: false // { info: 'ssss' }
    }
  }

  componentDidMount() {
    // 获取account_id参数, 参数错误error
    // TODO: addQuote 参数判断是否是否直接进入报价编辑
    // 根据account_id获取账号信息, 错误error, 平台不对修改平台
    const { actions } = this.props
    actions.test({ accountId: this.state.accountId }).then(data => {
      console.log(data, '======>');
    })
  }

  render() {
    const { accountId, active, platform } = this.state
    const activeData = tabs[active - 1] || {}
    const activeModules = activeData.warp(platform || 1) || []
    return <div className='update-package-page-container'>
      <h2>账号维护</h2>
      <Tabs
        activeKey={active}
        animated={{ inkBar: true, tabPane: false }}
        style={{
          position: 'sticky',
          top: "-20px",
          background: '#fff'
        }}
        onChange={(active) => {
          this.setState({ active }, () => {
            document.getElementById("app-content-children-id").scrollTop = 0
          })
        }}
      >
        {
          tabs.map(pane => <TabPane tab={pane.title} key={pane.index} />)
        }
      </Tabs>
      {
        activeModules.length > 1 ? <div style={{ float: 'right' }}>
          <Anchor
            onClick={e => e.preventDefault()}
            offsetTop={60}
            getContainer={() => document.querySelector('#app-content-children-id')}
          >
            {
              activeModules.map(({ anchorId: key, title }) =>
                <Link key={key} href={"#navLink-" + key} title={title} />)
            }
          </Anchor>
        </div> : null
      }
      {
        activeModules.map(({ anchorId: key, title }) => {
          return <div key={key} id={"navLink-" + key} style={{ height: "600px" }}>
            {title}
          </div>
        })
      }
    </div>
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
