/**
 * Created by lzb on 2020-04-22.
 */
import React, { Component } from 'react';
import { Checkbox, Select } from "antd";

const Option = Select.Option;

export default class SelectAllCheck extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.action()
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  onSelect = (key) => {
    const newVal = [ ...this.props.value, key ]
    this.triggerChange(newVal)
  }

  onDeselect = (key) => {
    const newVal = [ ...this.props.value ]
    const index = newVal.findIndex(item => item === key)
    newVal.splice(index, 1)

    if (newVal.length === 0) {
      this.props.onDeselect(null, true, () => {
        this.triggerChange(newVal)
      })
    } else {
      this.props.onDeselect(key, false, () => {
        this.triggerChange(newVal)
      })
    }


  }


  onCheckAll = (check) => {
    if (check) {
      this.triggerChange(this.props.options.map(item => item.id))
    } else {
      this.props.onDeselect(null, true, () => {
        this.triggerChange([])
      })
    }
  }

  render() {
    const { options = [], value } = this.props
    return (
      options.length > 0 && <div className="select-all-check-container">
        <Select
          mode="multiple"
          placeholder="请选择平台"
          optionFilterProp="children"
          value={value}
          onSelect={this.onSelect}
          onDeselect={this.onDeselect}
        >
          {options.map(item =>
            <Option
              disabled={false}
              key={item.id}
              value={item.id}
            >
              {item.platformName}
            </Option>)
          }
        </Select>
        <div className="check-wrapper">
          <Checkbox onChange={e => this.onCheckAll(e.target.checked)}>全选</Checkbox>
        </div>
      </div>
    );
  }
}

