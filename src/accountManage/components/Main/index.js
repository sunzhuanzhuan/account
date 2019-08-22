/**
 * 账号基本信息
 */
import React, { Component } from "react"
import MainEdit from "./Edit";
import MainView from "./View";
import MainMini from "./Mini";

const statusComponent = (status) => {
  const _map = {
    'edit': MainEdit,
    'view': MainView,
    'mini': MainMini
  }
  return _map[status] || <div>基础信息错误</div>
}

export default class Main extends Component {
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
    this.props.actions.setModuleStatus({ 'main': moduleStatus })
  }

  render() {
    const Component = statusComponent(this.state.moduleStatus)
    return <Component {...this.props} onModuleStatusChange={this.handleChange} />
  }
}
