/**
 * Created by lzb on 2020-04-27.
 */
import React, { Component } from 'react';
import { InputNumber } from 'antd';
import numeral from "numeral";


export default class InputPercent extends Component {
  state = {
    value: undefined
  };

  static getDerivedStateFromProps(nextProps) {
    if ("value" in nextProps && !isNaN(nextProps.value)) {
      return {
        value: numeral(nextProps.value).multiply(100).value()
      };
    }
    return null;
  }



  handleChange = value => {
    let newVal = numeral(value).divide(100).value()



    if ("value" in this.props) {
      this.triggerChange(newVal)
    } else {
      this.setState({ newVal });
    }
  };

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  render() {
    const { value } = this.state;
    return (
      <InputNumber
        {...this.props}
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}
