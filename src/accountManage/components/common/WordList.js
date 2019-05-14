import React, { Component } from "react"
import { Icon, Input, Popconfirm, Form } from 'antd'
import SimpleTag from "@/accountManage/base/SimpleTag";

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
        value: nextProps.value
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
    value = value || this.state.word
    if (value.length < 2 || value.length > 20) {
      this.setState({
        validateStatus: 'error',
        help: '请输入2~20字的品牌名称'
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
    const { value = [] } = this.props
    const { validateStatus, help, word, visible } = this.state
    const content = <div style={{ marginLeft: '-21px', minWidth: "220px" }}>
      <Form.Item
        validateStatus={validateStatus}
        help={help}
        label='添加品牌'
        colon={false}
      >
        <Input placeholder='请输入2~20字的品牌名称' value={word} onChange={this.wordChange} />
      </Form.Item>
    </div>
    return <div>
      {
        value.map((word, index) => <SimpleTag key={word}>
          {word}
          <Icon
            style={{ fontSize: "14px", color: "#256ea3", marginLeft: '6px' }}
            type="close-circle"
            theme="filled"
            onClick={() => this.onChange(word, index)}
          />
        </SimpleTag>)
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
        <a className='no-select-text' onClick={() => this.setState({ visible: true })}>+ 添加品牌</a>
      </Popconfirm>}
    </div>
  }
}
