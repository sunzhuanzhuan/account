import React, { Component } from "react"
import { Form, Button, Input } from 'antd'

const MAX_COUNT = 100
function transformStrToAry(str = '') {
  if (str.trim()) {
    return (str.split(/[\n]/)).filter(one => one && one.replace(/(^\s*)|(\s*$)/g, ""))
  }
  return []
}

@Form.create()
class RestorePage extends Component {
  state = {}

  validate = (rule, value, callback) => {
    const reg = /^[\r\s\n0-9]+$/
    if (!value.trim()) {
      return callback("请输入要恢复的账号ID")
    }

    if (!reg.test(value)) {
      return callback("只能输入数字")
    }

    const ary = transformStrToAry(value)
    if (ary.length > MAX_COUNT) {
      return callback(`最多可输入${MAX_COUNT}个账号`)
    }

    callback()
  }

  submit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        /*this.setState({
          loading: true
        })*/
        console.log('values', transformStrToAry(values.accounts));
      }
    });
  }

  reset = (e) => {
    e.preventDefault()
    this.props.form.resetFields()
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    return <Form onSubmit={this.submit} onReset={this.reset}>
      <h2>
        批量恢复账号
      </h2>
      <Form.Item>
        <div>请输入账号ID，一行一个，最多{MAX_COUNT}个</div>
        {getFieldDecorator('accounts', {
          validateTrigger: 'onSubmit',
          rules: [
            { validator: this.validate }
          ]
        })(
          <Input.TextArea autosize={{ minRows: 6, maxRows: 6 }} />
        )}
      </Form.Item>
      <div style={{ float: "right" }}>
        <Button type="primary" htmlType="submit" loading={loading}>恢复</Button>
        <span style={{ margin: "0 20px 0 auto" }} />
        <Button type="primary" ghost htmlType='reset'>清空</Button>
      </div>
    </Form>
  }
}


export default RestorePage
