/**
 * 其他信息
 */
import React, { Component } from "react"
import OtherEdit from "./Edit";
import OtherView from "./View";

const statusComponent = (status) => {
  const _map = {
    'edit': OtherEdit,
    'view': OtherView,
  }
  return _map[status] || <div>其他信息错误</div>
}

export default class Other extends Component {
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
    this.props.actions.setModuleStatus({ 'other': moduleStatus })
  }

  render() {
    const Component = statusComponent(this.state.moduleStatus)
    return <Component {...this.props} onModuleStatusChange={this.handleChange} />
  }
}
