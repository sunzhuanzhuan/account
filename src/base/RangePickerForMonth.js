/**
 * Created by lzb on 2020-04-27.
 */
import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from "moment";

const { RangePicker } = DatePicker;


export default class RangePickerForMonth extends Component {
  state = {
    mode: [ 'month', 'month' ],
    value: []
  };

  static getDerivedStateFromProps(nextProps) {
    if ("value" in nextProps) {
      return {
        value: nextProps.value || []
      };
    }
    return null;
  }


  handlePanelChange = (value, mode) => {
    this.setState({
      mode: [ mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1] ]
    });
    this.handleChange(value)
  };

  handleChange = value => {
    let newVal = []
    if(value.length > 0){
      newVal = [
        moment(value[0]).startOf('M'),
        moment(value[1]).endOf('M')
      ]
    }
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
    const { value, mode } = this.state;
    return (
      <RangePicker
        {...this.props}
        placeholder={[ '开始月份', '结束月份' ]}
        format="YYYY-MM"
        value={value}
        mode={mode}
        onChange={this.handleChange}
        onPanelChange={this.handlePanelChange}
      />
    );
  }
}
