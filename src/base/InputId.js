import React, { Component } from 'react';
import { Input } from "antd";

export default class InputId extends Component {

  handleChange = e => {
    let newVal = e.target.value
    this.triggerChange(newVal)
  };

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }
  handleBlur = e => {
    let val = e.target.value?.trim()

    if(!(val && /^\d+$/.test(val))){
      val = ''
    }
    this.triggerChange(val)
  }

  render() {
    const { value } = this.props;
    return (
      <Input
        {...this.props}
        value={value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}
