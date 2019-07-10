
import React, { Component } from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types'
import './ButtonTab.less'
class ButtonTab extends Component {
  static propTypes = {
    buttonList: PropTypes.array.isRequired,
    contentMap: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      checkedKey: props.buttonList[0].key || '1'
    };
  }
  onClickButton = (e) => {
    this.setState({ checkedKey: e.target.value })
    const { onChange } = this.props
    onChange && onChange(e.target.value)
  }
  render() {
    const { buttonList = [], contentMap = {} } = this.props
    const { checkedKey } = this.state
    return (
      <div className='button-group-tab-box'>
        <div className='button-group-box'>
          <Radio.Group defaultValue={checkedKey} onChange={this.onClickButton} >
            {buttonList.map(one => <Radio.Button key={one.key} value={one.key}>{one.name}</Radio.Button>)}
          </Radio.Group>
        </div>
        <div key={checkedKey}>{contentMap[checkedKey]}</div>
      </div>
    );
  }
}

export default ButtonTab;
