/**
 * 合作信息
 */
import React, { Component } from "react"
import CooperationEdit from "./Edit";
import CooperationView from "./View";

const statusComponent = (status) => {
  const _map = {
    'edit': CooperationEdit,
    'view': CooperationView,
  }
  return _map[status] || <div>基础信息错误</div>
}

export default class Cooperation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleStatus: props.moduleStatus || 'edit'
    }
  }

  handleChange = (moduleStatus) => {
    this.setState({
      moduleStatus
    })
  }

  render() {
    const Component = statusComponent(this.state.moduleStatus)
    return <Component {...this.props} onModuleStatusChange={this.handleChange} />
  }
}
