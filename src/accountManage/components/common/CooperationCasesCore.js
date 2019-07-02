import React from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Popconfirm,
  message
} from 'antd';
import { checkForSensitiveWord } from "./Fields";

const uuid = require('uuid/v1');
const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 }
};

export default class CooperationCasesCore extends React.Component {
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
      "brand": "", // String 品牌
      "link": "", // String 链接
      "content": "", // String 合作效果
      "uuid": uuid() // String 合作效果

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
      form: { getFieldDecorator },
      layout,
      actions: { sensitiveWordsFilter },
      data: { accountInfo },
      configurePlatform
    } = this.props;
    return <div>
      {value.map((item, index) => {
        return <Card key={item.uuid} type="inner" title={'案例' + (index + 1)} extra={
          <Popconfirm placement="topRight" title={'是否删除案例?'} onConfirm={() => this.remove(index)}>
            <a>删除</a>
          </Popconfirm>} value={1} style={{ margin: '5px 0' }}>
          <FormItem label="案例链接" {...formItemLayout}>
            {getFieldDecorator(`_case.${item.uuid}.link`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, message: 'URL不能为空' }, {
                pattern: /^htt(p|ps):\/\//,
                message: 'URL格式不正确，请填写前缀为“http://或https://”的URL'
              }],
              initialValue: item.link
            })(
              <Input style={{ width: '100%' }} placeholder={configurePlatform.configure.cooperateLinkPlaceHolder} />
            )}
          </FormItem>
          <FormItem label="品牌名称" {...formItemLayout}>
            {getFieldDecorator(`_case.${item.uuid}.brand`, {
              validateTrigger: ['onBlur'],
              validateFirst: true,
              rules: [
                { required: true, message: '品牌不能为空' },
                { max: 20, message: '品牌不能超过20字' },
                { validator: checkForSensitiveWord, name: '品牌名称' }
              ],
              initialValue: item.brand
            })(
              <TextArea
                style={{ width: '100%' }}
                placeholder={configurePlatform.configure.cooperateBrandPlaceHolder}
              />
            )}
          </FormItem>
          <FormItem label="数据/效果" {...formItemLayout}>
            {getFieldDecorator(`_case.${item.uuid}.content`, {
              initialValue: item.content,
              validateTrigger: ['onBlur'],
              validateFirst: true,
              rules: [
                { max: 1000, message: '数据/效果不能超过1000字' },
                { required: true, message: '数据/效果不能为空' },
                { validator: checkForSensitiveWord, name: '数据效果' }
              ]
            })(
              <TextArea
                style={{ width: '100%' }}
                placeholder={configurePlatform.configure.cooperateContentPlaceHolder}
                autosize={{
                  minRows: 3,
                  maxRows: 6
                }} />
            )}
          </FormItem>
        </Card>;
      })}
      {
        value.length < 5 && <a onClick={this.add}>+ 添加案例</a>
      }
    </div>;
  }
}



