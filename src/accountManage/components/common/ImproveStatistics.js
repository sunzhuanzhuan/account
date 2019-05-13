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
    // 处理编辑状态
  }

  render() {
    const { percent = 33, done } = this.props
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
      {done ? null : <a onClick={() => this.goComplete()}>去完善</a>}
    </div>
  }
}
