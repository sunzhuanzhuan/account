import React, { Component } from 'react'
import './TabArr.less'
class TabArr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cheackedNum: 1
    };
  }
  onChangeTab = (id) => {
    const { onChange } = this.props
    onChange && onChange()
    console.log(id);

    this.setState({ cheackedNum: id })
  }
  render() {
    const { tabArrData } = this.props
    const { cheackedNum } = this.state
    return (
      <div className='tab-arr'>
        {tabArrData.map(((one, index) => <div
          className={`tab-arr-item ${cheackedNum == one.id ? 'tab-cheacked' : ''}`}
          key={one.id}
          onClick={() => this.onChangeTab(one.id)}>{one.name}</div>))
        }
      </div>
    );
  }
}

export default TabArr;
