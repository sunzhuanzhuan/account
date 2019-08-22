/**
 * 内容相关
 */
import React, { Component } from "react"
import ContentEdit from "./Edit";
import ContentView from "./View";

const statusComponent = (status) => {
  const _map = {
    'edit': ContentEdit,
    'view': ContentView
  }
  return _map[status] || <div>信息错误</div>
}

export default class Content extends Component {
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
    this.props.actions.setModuleStatus({ 'content': moduleStatus })
  }

  render() {
    const Component = statusComponent(this.state.moduleStatus)
    return <Component {...this.props} onModuleStatusChange={this.handleChange} />
  }
}
