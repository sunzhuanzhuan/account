/**
 * 三方报价相关
 */
import React, { Component } from "react"
import TrinityEdit from "./Edit";
import TrinityView from "./View";

const statusComponent = (status) => {
  const _map = {
    'edit': TrinityEdit,
    'view': TrinityView
  }
  return _map[status] || <div>其他信息错误</div>
}

export default class Trinity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleStatus: 'edit',
      loading: true
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if ('moduleStatus' in nextProps) {
      return {
        moduleStatus: nextProps.moduleStatus || 'edit'
      };
    }
    return null
  }

  reload = (cb) => {
    const { actions, data: { account } } = this.props
    actions.getAccountTrinitySkuInfo({
      accountId: account.id,
      platformId: account.base.platformId
    }).finally(() => {
      cb && cb()
    })
  }

  componentDidMount() {
    const { actions, data: { account } } = this.props
    actions.getAccountTrinitySkuInfo({
      accountId: account.id,
      platformId: account.base.platformId
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  handleChange = (moduleStatus) => {
    this.props.actions.setModuleStatus({ 'trinity': moduleStatus })
  }

  render() {
    const Component = statusComponent(this.state.moduleStatus)
    const {
      account: {
        base: { isFamous }
      },
      trinityPriceInfo: {
        cooperationPlatformResVOS = []
      } = {}
      // 信息修改时间
    } = this.props.data
    return this.state.loading ?
      null : (isFamous === 1 && cooperationPlatformResVOS.length > 0) ?
      <Component {...this.props} onModuleStatusChange={this.handleChange} reload={this.reload} /> : null
  }
}
