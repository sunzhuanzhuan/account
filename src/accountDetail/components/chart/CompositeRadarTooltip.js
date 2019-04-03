import React, { Component } from 'react'
import { Icon } from 'antd';
class CompositeRadarTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const list = [
      { name: '哈哈哈', value: 'ssss', value2: '333', up: 20 },
      { name: '哈哈哈', value: 'ssss', value2: '333', up: -20 },
      { name: '哈哈哈', value: 'ssss', value2: '333', up: 30 },
      { name: '哈哈哈', value: 'ssss', value2: '333', up: -32 }]
    return (
      <div>
        {list.map((one, index) => {
          return <div style={{ display: 'flex', fontSize: index == 0 ? 13 : 12, color: '#999' }} key={index}>
            <div style={{ color: index == 0 ? '#fff' : '', flex: 1 }}>{one.name}</div>
            <div style={{ color: index == 0 ? '#fff' : '', flex: 1 }}>{one.value}</div>
            <div style={{ color: index == 0 ? '#fff' : '', flex: 1 }}>{one.value2}</div>
            <div style={{ color: one.up > 0 ? '#EF554A' : '#7ED321', flex: 1 }}>
              {one.up > 0 ? '+' : '—'}{one.up}</div>
          </div>
        })}
      </div>
    );
  }
}

export default CompositeRadarTooltip;
