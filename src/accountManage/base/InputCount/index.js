/**
 * Created by lzb on 2019-05-07.
 */
import React, { Component } from "react"
import {} from 'antd'
import { Input } from "antd";

export default class InputCount extends Component {

  constructor(props) {
    super(props);

    const value = props.value;
    this.state = {
      value
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value
      };
    }
    return null
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  render() {
    const { showCount, max = 100, ...props } = this.props
    const { value } = this.state
    return <Input
      {...props}
      suffix={
        showCount ?
          <span className='input-suffix-text'>{(value || '').length}/{max}</span> : null
      }
      onChange={event => this.triggerChange(event.target.value)}
    />
  }
}
