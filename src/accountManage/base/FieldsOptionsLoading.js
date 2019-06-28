import React from 'react';
import { Icon } from 'antd'

const style = {
  fontSize: 18,
  marginRight: 10
}

class FieldsOptionsLoading extends React.Component {
  render() {
    return <a>
      <Icon type="loading" spin style={style} />
      Loading...
    </a>
  }
}

export default FieldsOptionsLoading;
