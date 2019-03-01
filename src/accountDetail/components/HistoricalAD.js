/*
 * @Author: wangxinyue 
 * @Date: 2019-02-28 17:43:12 
 * @Last Modified by: wangxinyue
 * @Last Modified time: 2019-02-28 18:26:10
 * 历史广告案例
 */

import React, { Component } from 'react'
class HistoricalAD extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='historical-advertising'>
        <div className='head-box'>
          <div className='title'>历史广告案例</div>
          <div className='tab-box'>
            <div className='tab-item'>全部</div>
            <div className='tab-item'>美妆</div>
            <div className='tab-item'>汽车</div>
            <div className='tab-item'>3C</div>
            <div className='tab-item'>母婴</div>
          </div>
        </div>
        <div className='historical-ad-case'>
          <div>

          </div>
        </div>
      </div>
    );
  }
}

export default HistoricalAD;
