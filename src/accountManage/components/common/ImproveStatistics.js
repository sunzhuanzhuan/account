import React, { Component } from "react"
import { Progress } from 'antd'
import * as PropTypes from 'prop-types';

export default class ImproveStatistics extends Component {
  static contextTypes = {
    antAnchor: PropTypes.object
  }

  handleScroll = (href) => {
    const { scrollTo } = this.context.antAnchor
    scrollTo(href)
  }

  goComplete = (moduleId = 'main') => {
    this.handleScroll('#navLink-' + moduleId)
    this.props.actions.setModuleStatus({[moduleId]: 'edit'})
  }

  render() {
    const { percent = 33, moduleId } = this.props
    const done = percent >= 100
    return <div className='improve-statistics-wrapper'>
      <div className='header-title'>账号完善度</div>
      <Progress
        strokeColor={{
          '0%': '#25c1f6',
          '100%': '#108ee9'
        }}
        size='small'
        percent={percent}
      />
      {done ? <div className='tips-text'>账号的曝光率提升了100%</div> :
        <div className='tips-text'>立即完善将提升账号的曝光率哦~</div>}
      {done ? null : <a onClick={() => this.goComplete(moduleId)}>去完善</a>}
    </div>
  }
}
