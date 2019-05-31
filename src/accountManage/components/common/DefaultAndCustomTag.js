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
      console.log(values);
      if (!err) {
        // this.props.onChange()
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

export default class DefaultAndCustomTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultItems: [],
      custom: []
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      let { defaultItems = [], custom = [] } = nextProps.value || {}
      return {
        defaultItems,
        custom
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

  onChange = (word, index) => {
    const { value } = this.state
    let newValue = [...value]
    // let index = value.indexOf(word)
    if (index < 0) {
      newValue.push(word)
    } else {
      newValue.splice(index, 1)
    }
    this.setState({ value: newValue }, () => {
      this.triggerChange(newValue)
    })
  }

  render() {
    const { placeholder, label = '自定义', rules } = this.props
    const { defaultItems = [], custom = [] } = this.state
    return <div>
      {
        defaultItems.map(({ id, name }, index) => <CheckTag checked key={id}>
          {name}
        </CheckTag>)
      }
      {
        custom.map((word, index) => <CheckTag checked key={word}>
          {word}
          <Icon
            style={{ fontSize: "14px", color: "#256ea3", marginLeft: '6px' }}
            type="close-circle"
            theme="filled"
            onClick={() => this.onChange(word, index)}
          />
        </CheckTag>)
      }
      <MiniForm placeholder={placeholder} label={label} rules={rules} />
    </div>
  }
}
