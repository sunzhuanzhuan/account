/**
 * 策略信息
 */
import React, { Component } from "react"
import StrategyEdit from "./Edit";
import StrategyView from "./View";

const statusComponent = (status) => {
  const _map = {
    'edit': StrategyEdit,
    'view': StrategyView
  }
  return _map[status] || <div>信息错误</div>
}

export default class Strategy extends Component {
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
