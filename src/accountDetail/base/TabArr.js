import React, { Component } from 'react'
import './TabArr.less'
import { Divider } from 'antd';
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
    this.setState({
      cheackedNum: id
    })
  }
  render() {
    const { tabArrData } = this.props
    const { cheackedNum, } = this.state
    return (
      <div className='tab-arr'>
        {tabArrData.map(((one, index) => <div key={one.industryCode}>
          <div
            className={`tab-arr-item ${cheackedNum == one.industryCode ? 'tab-cheacked' : ''}`}
            onClick={() => this.onChangeTab(one.industryCode)}>{one.industryName}</div>
          {one.industryCode == 0 ? <Divider type="vertical" /> : null}
        </div>))
        }

      </div>
    );
  }
}

export default TabArr;
