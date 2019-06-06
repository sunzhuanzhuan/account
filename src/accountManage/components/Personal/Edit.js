/**
 * 博主个人信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import {
  ContentForms,
  ContentFeatures,
  ContentStyles, SexualOrientation, Gender, Area, Shipping
} from "@/accountManage/components/common/Fields";
import { Button, Form } from "antd";

@Form.create()
export default class PersonalEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      asyncVisibility: {},
      asyncOptions: {

      }
    }
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        console.log('Received values of form: ', fieldsValue);
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
      <ul className='content-wrap'>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>播主信息</span>
            <small className='line' />
            <span className='gray-text text'>asdasd</span>
          </h4>
          <div className='subclass-content'>
            <SexualOrientation {...fieldProps}/>
            <Gender {...fieldProps}/>
            <Area {...fieldProps}/>
            <Shipping {...fieldProps}/>
          </div>
        </li>
      </ul>
    </Form>
  }
}
