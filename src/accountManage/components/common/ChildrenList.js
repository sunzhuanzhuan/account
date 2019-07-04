import React from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Popconfirm,
  message, Radio, DatePicker
} from 'antd';
import moment from "moment";
import { initialMoment } from "@/accountManage/util";

const uuid = require('uuid/v1');
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 }
};

export default class ChildrenList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      let value = nextProps.value || []
      value.map(item => item.uuid ? item : Object.assign(item, { uuid: uuid() }))
      return {
        value: nextProps.value || []
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

  add = () => {
    let newValue = [...this.state.value]
    newValue.push({
      "gender": null,
      "birthDate": null,
      "canOnCamera": null,
      "uuid": uuid()

    })
    this.triggerChange(newValue)
  }

  remove = (index) => {
    let newValue = [...this.state.value]
    // setFieldsValue({})
    newValue.splice(index, 1)
    this.triggerChange(newValue)
  }

  render() {
    const { value = [] } = this.state
    const {
      form: { getFieldDecorator }
    } = this.props;
    return <div>
      {value.map((item, index) => {
        return <Card key={item.uuid} type="inner" title={'宝宝' + (index + 1)} extra={
          <Popconfirm placement="topRight" title={'是否删除?'} onConfirm={() => this.remove(index)}>
            <a>删除</a>
          </Popconfirm>} value={1} style={{ margin: '5px 0' }}>
          <FormItem label="性别" {...formItemLayout}>
            {getFieldDecorator(`_children.${item.uuid}.gender`, {
              initialValue: item.gender,
              rules: [{ required: true, message: '请选择宝宝的性别' }]
            })(
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label="生日" {...formItemLayout}>
            {getFieldDecorator(`_children.${item.uuid}.birthDate`, {
              initialValue: initialMoment(item.birthDate),
              rules: [{ required: true, message: '请选择宝宝的生日' }]
            })(
              <DatePicker allowClear={false} style={{ width: '100%' }} placeholder='请选择生日' disabledDate={date => {
                return date.isBefore(moment().subtract(150, 'y')) || date.isAfter(moment())
              }} />
            )}
          </FormItem>
          <FormItem label="是否出镜" {...formItemLayout}>
            {getFieldDecorator(`_children.${item.uuid}.canOnCamera`, {
              rules: [{ required: true, message: '请选择宝宝是否可出镜' }],
              initialValue: item.canOnCamera
            })(
              <RadioGroup>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </RadioGroup>
            )}
          </FormItem>
        </Card>;
      })}
      {
        value.length < 10 && <a onClick={this.add}>+ 添加</a>
      }
    </div>;
  }
}



