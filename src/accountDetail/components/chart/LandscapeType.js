import React from 'react';
import numeral from 'numeral';
import { Empty } from 'antd';
import './LandscapeType.less'

// CDN START

class LandscapeType extends React.Component {
  render() {
    const { data = [], height = 600 } = this.props
    return (
      data.length > 0 ? <div>
        <div className='land-scape-type-item'>
          <div className='name color9size12'>名称</div>
          <div className='type color9size12'>分类</div>
        </div>
        <div className='land-scape-type'>
          {data.map((one, index) => {
            return <div key={one.key} className='land-scape-type-item'
              style={{ height: 450 / data.length }}>
              <div className='name'>{one.name}</div>
              <div className='type'>{one.key}</div>
              <div className='land-scape-box-value'>
                <div className='land-scape-box' style={{ width: `calc(${100 * one.value}%)`, opacity: one.value > 0.08 ? one.value : 0.08 }}></div>
                <div className='unit-value'>{numeral(one.value).format('0.0%')}</div>
              </div>
            </div>
          })}
        </div>
      </div> : <Empty style={{ height: height + 18, paddingTop: height / 2 }} />
    );
  }
}
export default LandscapeType
