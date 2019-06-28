import React, { Component } from "react"
import { Checkbox } from "antd";

class CheckedWrap extends Component {
  render() {
    const { mapBooleanToValueAry = [1, 2] } = this.props
    let checked = false;
    let index = mapBooleanToValueAry.indexOf(this.props.checked);
    if (index > 0) {
      checked = !!index
    }
    return <Checkbox {...this.props} checked={checked}>
      {this.props.children}
    </Checkbox>
  }
}

export default CheckedWrap
