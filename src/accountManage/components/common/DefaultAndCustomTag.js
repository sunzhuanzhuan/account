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
        this.props.onChange({
          text: values.text,
          index: -1
        }, 'custom')
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
            validateTrigger: 'onBlur',
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

  onChange = (value, type) => {
    const { defaultItems, custom } = this.state
    let newValue = {
      defaultItems: [...defaultItems],
      custom: [...custom]
    }
    if (type === "default") {
      let { id, index } = value
      if (index > -1) {
        newValue.defaultItems.splice(index, 1)
      } else {
        newValue.defaultItems.push(id)
      }
    } else if (type === "custom") {
      let { text, index } = value
      if (index > -1) {
        newValue.custom.splice(index, 1)
      } else {
        newValue.custom.push(text)
      }
    }
    this.setState({ value: newValue }, () => {
      this.triggerChange(newValue)
    })
  }

  render() {
    const { placeholder, label = '自定义', rules, options = [] } = this.props
    const { defaultItems = [], custom = [] } = this.state
    return <div>
      {
        options.map(({ id, name }, index) => {
          let checked = defaultItems.find(key => id === key)
          return <CheckTag
            checked={checked}
            key={id}
            onClick={() => this.onChange({ id, index: checked ? index : -1 }, 'default')}
          >
            {name}
          </CheckTag>
        })
      }
      {
        custom.map((text, index) => <CheckTag checked key={text}>
          {text}
          <Icon
            style={{ fontSize: "14px", color: "#256ea3", marginLeft: '6px' }}
            type="close-circle"
            theme="filled"
            onClick={() => this.onChange({ text, index }, 'custom')}
          />
        </CheckTag>)
      }
      <MiniForm placeholder={placeholder} label={label} rules={rules} onChange={this.onChange} />
    </div>
  }
}
