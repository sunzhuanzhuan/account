/**
 * 博主个人信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import {
  ContentForms,
  ContentFeatures,
  ContentStyles,
  SexualOrientation,
  Gender,
  Area,
  Shipping,
  Birthday,
  Nationality,
  Industry,
  Occupations, EducationQualification
} from "@/accountManage/components/common/Fields";
import { Button, Form } from "antd";

@Form.create()
export default class PersonalEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      asyncVisibility: {},
      asyncOptions: {
        nationality: [],
        industry: [],
        occupations: [],
        educationQualification: [
          { key: -1, text: '无' },
          { key: 1, text: '初中' },
          { key: 2, text: '高中' },
          { key: 3, text: '中技' },
          { key: 4, text: '中转' },
          { key: 5, text: '大专' },
          { key: 6, text: '本科' },
          { key: 7, text: '硕士' },
          { key: 8, text: 'MBA' },
          { key: 9, text: 'EMBA' },
          { key: 10, text: '博士' },
        ]
      }
    }
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        console.log('Received values of form: ', fieldsValue);

        // 处理父级id
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
            <Birthday {...fieldProps}/>
            <Nationality {...fieldProps} options={this.state.asyncOptions.nationality}/>
            <Industry {...fieldProps} options={this.state.asyncOptions.industry}/>
            <Occupations {...fieldProps} options={this.state.asyncOptions.occupations}/>
            <EducationQualification {...fieldProps} options={this.state.asyncOptions.educationQualification}/>
          </div>
        </li>
      </ul>
    </Form>
  }
}
