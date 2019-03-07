import React, { Component } from 'react'
import { Popover, Icon } from 'antd';
class CharTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { content, title } = this.props
    const titleStyle = {
      color: '#333333',
      fontSize: 14,
      marginLeft: 20,
      paddingTop: 20
    }
    return (<div>
      {content ? <Popover content={content} title={title} trigger="hover" getPopupContainer={() => document.querySelector('.account-view-detail')}>
        <div style={{ ...titleStyle, float: 'left' }}>
          {title}
        </div><Icon type="info-circle" theme="outlined" style={{ color: '#999', fontSize: 14,margin:'24px 0px 0px 5px' }} />
      </Popover> : <div style={{ ...titleStyle }}>
          {title}
        </div>}
    </div>

    );
  }
}

export default CharTitle;
