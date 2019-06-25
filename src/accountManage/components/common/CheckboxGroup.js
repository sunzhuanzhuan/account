import React, { Component } from "react"
import { Icon, Input, Checkbox, Form } from 'antd'

export default class CheckboxGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      let value = (nextProps.value || []).map(item => item.id || item)
      return {
        value
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

  onChange = (checkedValue) => {

  }


  render() {
    const { value = [] } = this.state
    const { options = [] } = this.props
    return <Checkbox.Group options={options} value={value} onChange={this.onChange} />
  }
}
