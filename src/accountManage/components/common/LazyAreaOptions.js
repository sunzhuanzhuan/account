import React, { Component } from "react"
import { Cascader } from 'antd';
import areas from "@/constants/areas";
import { analyzeAreaCode } from "@/util/analyzeAreaCode";

function copyAreas(areas, level) {
  return areas.map(area => {
    let _area = { ...area }
    if (_area.childrenList && _area.areaLevel < level) {
      return {
        ..._area,
        childrenList: copyAreas(_area.childrenList, level)
      }
    }
    delete _area.childrenList
    return _area
  })
}


export default class LazyAreaOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: copyAreas(areas, props.level || 4)
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      let value = []
      if(Array.isArray(nextProps.value)){
        value = nextProps.value.map(item => item.id || item)
      } else {
        value = analyzeAreaCode((nextProps.value || {}).id)
      }
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

  onChange = (value, selectedOptions) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    let targetOption
    if(Array.isArray(this.props.value)){
      targetOption = selectedOptions
    } else {
      targetOption = selectedOptions[selectedOptions.length - 1] || {}
    }
    this.triggerChange(targetOption)
  };

  loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    targetOption.loading = true;

    // 异步加载选项
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: '1'
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: '2'
        }
      ];
      this.setState({
        options: [...this.state.options]
      });
    }, 1000);
  };

  render() {
    return (
      <Cascader
        value={this.state.value}
        fieldNames={{
          label: 'areaName',
          value: 'id',
          children: 'childrenList'
        }}
        onChange={this.onChange}
        options={this.state.option}
        placeholder="请选择地域！" />
    );
  }
}
