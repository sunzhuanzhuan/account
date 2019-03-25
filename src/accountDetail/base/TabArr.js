import React, { Component } from 'react'
import './TabArr.less'
import { Spin } from 'antd';
class TabArr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cheackedNum: 0,
    };
  }
  onChangeTab = async (id) => {
    const { onChange } = this.props
    await onChange && onChange(id)
  }
  render() {
    const { tabArrData } = this.props
    const { cheackedNum, } = this.state
    return (
      <div className='tab-arr'>
        {tabArrData.map(((one, index) => <div
          className={`tab-arr-item ${cheackedNum == one.industryCode ? 'tab-cheacked' : ''}`}
          key={one.industryCode}
          onClick={() => this.onChangeTab(one.industryCode)}>{one.industryName}</div>))
        }
      </div>
    );
  }
}

export default TabArr;
