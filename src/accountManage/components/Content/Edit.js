/**
 * 内容相关
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import {
  ContentForms,
  ContentFeatures,
  ContentStyles
} from "@/accountManage/components/common/Fields";
import { Button, Form } from "antd";

@Form.create()
export default class ContentEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      asyncVisibility: {},
      asyncOptions: {
        forms: [],
        features: [],
        styles: []
      }
    }
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const { form, feature, style } = fieldsValue['_client']
        let value = {
          content: {
            forms: form.defaultItems,
            customForm: form.custom,
            features: feature.defaultItems,
            customFeature: feature.custom,
            styles: style.defaultItems,
            customStyle: style.custom
          }
        }
        console.log('Received values of form: ', value);
      }
    });
  }

  render() {
    const {
      layout,
      data,
      actions,
      form,
      module: configureModule, platform: configurePlatform
    } = this.props
    const fieldProps = { layout, data, form, actions }
    const {
      isFamous,
      modifiedAt // 信息修改时间
    } = data.accountInfo || {}
    const {
      asyncVisibility,
      asyncOptions
    } = this.state
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: {modifiedAt || '--'}</span>
      <Button htmlType='submit' type='primary'>保存</Button>
    </div>;
    return <Form className='module-item-container' onSubmit={this.submit} colon={false}>
      <ModuleHeader title={configureModule.title} right={right} />
      <section className='content-wrap'>
        <ContentForms {...fieldProps} options={asyncOptions.forms} />
        <ContentStyles {...fieldProps} options={asyncOptions.styles} />
        <ContentFeatures {...fieldProps} options={asyncOptions.features} />
      </section>
    </Form>
  }
}
