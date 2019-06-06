import React, { Component } from "react"
import { Cascader, Form, Input, Modal } from 'antd';
import areas from "@/constants/areas";
import { analyzeAreaCode } from "@/util/analyzeAreaCode";
import LazyAreaOptions from "@/accountManage/components/common/LazyAreaOptions";

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
  submit = e => {
    e && e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    return <Modal
      visible
      title='填写收货地址信息'
    >
      <Form colon={false} hideRequired>
        <Form.Item label='收货人'>
          {getFieldDecorator('receiver', {
            rules: [{ required: true, message: 'Please select your country!' }],
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item label='手机号'>
          {getFieldDecorator('phoneNumber', {
            rules: [{ required: true, message: 'Please select your country!' }],
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item label='所在地区'>
          {getFieldDecorator('area', {
            rules: [{ required: true, message: 'Please select your country!' }],
          })(
            <LazyAreaOptions/>
          )}
        </Form.Item>
        <Form.Item label='详细地址'>
          {getFieldDecorator('addressDetail', {
            rules: [{ required: true, message: 'Please select your country!' }],
          })(
            <Input.TextArea placeholder='详细地址：如道路、门牌号、小区、楼栋号、单元室等'/>
          )}
        </Form.Item>
      </Form>
    </Modal>
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
        <EditModal data={this.state.value}/>
      </div>
    );
  }
}
