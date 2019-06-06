/**
 * 博主个人信息
 */
import React, { Component } from "react"
import PersonalEdit from "./Edit";
import PersonalView from "./View";

const statusComponent = (status) => {
  const _map = {
    'edit': PersonalEdit,
    'view': PersonalView,
  }
  return _map[status] || <div>信息错误</div>
}

export default class Personal extends Component {
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
