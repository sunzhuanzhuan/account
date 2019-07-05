import React, { Component } from "react"
import { Icon, Input, Popconfirm, Form } from 'antd'
import CheckTag from "@/accountManage/base/CheckTag";

@Form.create()
class MiniForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  add = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onChange(values.text, -1)
        this.close()
      }
    })

  }
  close = () => {
    this.setState({ visible: false })
    this.props.form.resetFields()
  }


  render() {
    const { visible } = this.state
    const { placeholder, label, rules } = this.props
    const { getFieldDecorator } = this.props.form
    return <Popconfirm
      visible={visible}
      placement="top"
      title={<Form style={{ marginLeft: '-21px', minWidth: "220px", height: '100px' }}>
        <Form.Item label={label} colon={false} required={false}>
          {getFieldDecorator('text', {
            validateFirst: true,
            validateTrigger: 'onSubmit',
            rules: rules || []
          })(
            <Input placeholder={placeholder} />
          )}
        </Form.Item>
      </Form>}
      trigger="click"
      icon={null}
      onCancel={this.close}
      onConfirm={this.add}
    >
      <a className='no-select-text' onClick={() => this.setState({ visible: true })}>+ {label}</a>
    </Popconfirm>
  }
}

export default class WordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
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

  onChange = (text, index) => {
    let newValue = [...this.state.value]
    if (index > -1) {
      newValue.splice(index, 1)
    } else {
      newValue.push(text)
    }

    this.setState({ value: newValue }, () => {
      this.triggerChange(newValue)
    })
  }

  render() {
    const { placeholder, label = '添加项', rules } = this.props
    const { value } = this.state
    return <div>
      {
        value.map((text, index) => <CheckTag checked key={text}>
          {text}
          <Icon
            style={{ fontSize: "14px", color: "#256ea3", marginLeft: '6px' }}
            type="close-circle"
            theme="filled"
            onClick={() => this.onChange(text, index)}
          />
        </CheckTag>)
      }
      {value.length < 10 &&
      <MiniForm placeholder={placeholder} label={label} rules={rules} onChange={this.onChange} />
      }
    </div>
  }
}
