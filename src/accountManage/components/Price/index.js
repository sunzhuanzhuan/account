/**
 * 账号报价
 */
import React, { Component } from "react"
import PriceEdit from "./Edit";
import PriceView from "./View";
import LoadingBlock from "@/accountManage/base/LoadingBlock";

const statusComponent = (status) => {
  const _map = {
    'edit': PriceEdit,
    'view': PriceView
  }
  return _map[status] || <div>信息错误</div>
}

export default class Price extends Component {
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

  componentDidMount() {
    const { actions, data: { account } } = this.props
    actions.getSkuList({
      productLineId: account.base.isFamous,
      itemTypeId: 1,
      itemId: account.id,
      platformId: account.base.platformId
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  reload = (cb) => {
    const { actions, data: { account } } = this.props
    actions.getSkuList({
      productLineId: account.base.isFamous,
      itemTypeId: 1,
      itemId: account.id,
      platformId: account.base.platformId
    }).finally(() => {
      cb && cb()
    })
  }

  handleChange = (moduleStatus) => {
    this.props.actions.setModuleStatus({ 'price': moduleStatus })
  }

  render() {
    const Component = statusComponent(this.state.moduleStatus)
    return !this.state.loading ?
      <Component {...this.props} onModuleStatusChange={this.handleChange} reload={this.reload}/> : <LoadingBlock loading/>
  }
}
