/**
 * 合作信息
 */
import React, { Component } from "react"
import CooperationEdit from "./Edit";
import CooperationView from "./View";

const statusComponent = (status) => {
  const _map = {
    'edit': CooperationEdit,
    'view': CooperationView
  }
  return _map[status] || <div>信息错误</div>
}

export default class Cooperation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleStatus: 'edit'
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

  handleChange = (moduleStatus) => {
    this.props.actions.setModuleStatus({ 'cooperation': moduleStatus })
  }

  render() {
    const Component = statusComponent(this.state.moduleStatus)
    return <Component {...this.props} onModuleStatusChange={this.handleChange}/>
  }
}
