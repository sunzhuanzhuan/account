import React, { Component } from "react"
import { Cascader, Form, Input, Modal } from 'antd';
import areas from "@/constants/areas";
import { analyzeAreaCode } from "@/util/analyzeAreaCode";
import LazyAreaOptions from "@/accountManage/components/common/LazyAreaOptions";

@Form.create()
class EditModal extends Component {
  submit = e => {
    e && e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let [country = {}, province = {}, city = {}, county = {}] = values.area
        this.props.add({
          ...values,
          country,
          province,
          city,
          county,
          area: undefined,
        })
        this.props.setModal()
      }
    });
  };

  render() {
    const { form, data } = this.props;
    const { getFieldDecorator } = form;
    return <Modal
      visible
      title='填写收货地址信息'
      onOk={this.submit}
      onCancel={() => this.props.setModal()}
    >
      <Form colon={false} hideRequiredMark>
        <Form.Item label='收货人'>
          {getFieldDecorator('receiver', {
            initialValue: data.receiver,
            rules: [{ required: true, min: 2, max: 30, message: '收货人姓名需在2~30个字符之间!' }]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label='手机号'>
          {getFieldDecorator('phoneNumber', {
            initialValue: data.phoneNumber,
            validateFirst: true,
            rules: [
              { pattern: /^\d+$/, message: '请输入正确的手机号!' },
              { required: true, min: 6, max: 11, message: '请输入6~11位的手机号!' }
            ]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label='所在地区'>
          {getFieldDecorator('area', {
            initialValue: data.area,
            rules: [{ required: true, message: '请选择所在地区!' }]
          })(
            <LazyAreaOptions />
          )}
        </Form.Item>
        <Form.Item label='详细地址'>
          {getFieldDecorator('addressDetail', {
            initialValue: data.addressDetail,
            rules: [{ required: true, min: 4, max: 200, message: '请输入4~200字的详细地址!' }]
          })(
            <Input.TextArea placeholder='详细地址：如道路、门牌号、小区、楼栋号、单元室等' />
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
      value: {},
      modal: false
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

  setModal = modal => {
    this.setState({ modal })
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
    const isEmpty = Object.keys(this.state.value).length === 0
    const { receiver, phoneNumber, country, province, city, county, addressDetail } = this.state.value
    const area = [country, province, city, county].filter(Boolean)
    return (
      <div>
        {isEmpty ? <div>
          <a onClick={() => this.setModal(true)}>填写收货地址信息</a>
          <span className='gray-text'>
         （用于您接收广告主提供的试用产品）
        </span>
        </div> : <div className='shipping-card-item'>
          <span className='actions'>
            <a onClick={() => this.setModal(true)}>编辑</a>
            <a onClick={() => this.onChange({})}>删除</a>
          </span>
          <p>收货人： {receiver}</p>
          <p>手机号： {phoneNumber}</p>
          <p>收货地址： {area.map(item => item.areaName).join('')} {addressDetail}</p>
        </div>}
        {this.state.modal &&
        <EditModal data={{...this.state.value, area}} add={this.onChange} setModal={this.setModal} />}
      </div>
    );
  }
}
