import React, { Component } from "react"
import { Icon, Input, Popconfirm, Form } from 'antd'
import CheckTag from "@/accountManage/base/CheckTag";

export default class WordList extends Component {
  constructor(props) {
    super(props);

    const value = props.value;
    this.state = {
      value,
      validateStatus: 'success',
      help: '',
      word: '',
      visible: false
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

  validate = (value) => {
    const { validator, message = '输入错误' } = this.props
    value = value || this.state.word
    let result = validator ? validator(value) : true
    if (!result) {
      this.setState({
        validateStatus: 'error',
        help: message
      })
      return false
    }
    this.setState({
      validateStatus: 'success',
      help: ''
    })
    return true
  }

  wordChange = (e) => {
    let value = e.target.value
    this.validate(value)
    this.setState({
      word: e.target.value
    })
  }

  render() {
    const { value = [], placeholder, label = '添加项' } = this.props
    const { validateStatus, help, word, visible } = this.state
    const content = <div style={{ marginLeft: '-21px', minWidth: "220px" }}>
      <Form.Item
        validateStatus={validateStatus}
        help={help}
        label={label}
        colon={false}
      >
        <Input placeholder={placeholder} value={word} onChange={this.wordChange} />
      </Form.Item>
    </div>
    return <div>
      {
        value.map((word, index) => <CheckTag checked key={word}>
          {word}
          <Icon
            style={{ fontSize: "14px", color: "#256ea3", marginLeft: '6px' }}
            type="close-circle"
            theme="filled"
            onClick={() => this.onChange(word, index)}
          />
        </CheckTag>)
      }
      {value.length < 10 &&
      <Popconfirm
        visible={visible}
        placement="top"
        title={content}
        trigger="click"
        icon={null}
        onCancel={() => {
          this.setState({
            word: '',
            validateStatus: 'success',
            help: '',
            visible: false
          })
        }}
        onConfirm={() => {
          if (this.validate()) {
            this.onChange(word, -1)
            this.setState({ word: '', visible: false })
          }
        }}
      >
        <a className='no-select-text' onClick={() => this.setState({ visible: true })}>+ {label}</a>
      </Popconfirm>}
    </div>
  }
}
