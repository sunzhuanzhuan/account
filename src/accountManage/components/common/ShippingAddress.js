import React, { Component } from "react"
import { Cascader, Form } from 'antd';
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


@Form.create()
class EditModal extends Component {
  render() {
    return ''
  }

}

export default class ShippingAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {}
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value || {}
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

  onChange = (value) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.triggerChange(value)
  };


  render() {
    return (
      <div>
        <a>填写收货地址信息</a>
        <span className='gray-text'>
         （用于您接收广告主提供的试用产品）
        </span>
      </div>
    );
  }
}
