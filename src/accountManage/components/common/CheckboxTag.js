import React, { Component } from "react"
import { Icon, Checkbox, Popconfirm, Form, Spin } from 'antd'
import CheckTag from "@/accountManage/base/CheckTag";
import list from "less/lib/less/functions/list";

@Form.create()
class MiniForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
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

  onVisibleChange = (visible) => {
    this.props.action({
      platformId: this.props.platformId,
      skuTypeId: this.props.skuTypeId
    }).then(({ data }) => {
      let selected = [].concat(this.props.defaultValue, data.filter(item => item.isRequired === 1 )).map(item => item.equitiesId || item.id)
      console.log(selected, '____');
      this.setState({
        list: data,
        selected
      });
    })
  }

  onChecked = () => {

  }

  render() {
    const { list,  selected} = this.state
    const { placeholder, label, rules } = this.props
    const { getFieldDecorator } = this.props.form
    return <Popconfirm
      placement="bottom"
      onVisibleChange={this.onVisibleChange}
      title={
        list.length > 0 && <div style={{
          marginLeft: '-21px',
          minWidth: "120px",
          minHeight: '100px',
        }}>
          <Checkbox.Group value={selected} onChange={this.onChecked}>
            {
              list.map(item => {
                return <>
                  <Checkbox
                    style={{ lineHeight: "28px" }}
                    value={item.equitiesId}
                    disabled={item.isRequired === 1}
                  >
                    {item.equitiesName}

                  </Checkbox>
                  <br />
                </>
              })
            }
          </Checkbox.Group>
        </div>
      }
      trigger="click"
      icon={null}
      onCancel={this.close}
      onConfirm={this.add}
    >
      <a className='no-select-text'>+ {label}</a>
    </Popconfirm>
  }
}

export default class CheckboxTag extends Component {
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
      }
    }
    return null
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  onDel = (index) => {
    const { value } = this.state
    let newValue = [...value]
    newValue.splice(index, 1)
    this.onChange(newValue)
  }
  onChange = (newValue) => {
    this.setState({ value: newValue }, () => {
      this.triggerChange(newValue)
    })
  }

  render() {
    const { placeholder, label = '自定义', rules, options = [], isEdit } = this.props
    const { value = [] } = this.state
    return <div>
      {
        value.map(({ id, equitiesName, isRequired }, index) => <CheckTag checked key={id}>
          {equitiesName}
          {isRequired === 2 && <Icon
            style={{
              fontSize: "14px",
              color: "#256ea3",
              marginLeft: '6px',
              marginRight: -5,
              display: "inline-block"
            }}
            type="close-circle"
            theme="filled"
            onClick={() => this.onDel(equitiesName, index)}
          />}
        </CheckTag>)
      }
      {isEdit &&
      <MiniForm
        action={this.props.action}
        placeholder={placeholder}
        label={label}
        rules={rules}
        onChange={this.onChange}
        platformId={this.props.platformId}
        skuTypeId={this.props.skuTypeId}
        defaultValue={value}
      />}
    </div>
  }
}
