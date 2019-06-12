/**
 * 博主个人信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import {
  SexualOrientation,
  Gender,
  Area,
  Shipping,
  Birthday,
  Nationality,
  Industry,
  Occupations,
  EducationQualification,
  RelationshipStatus,
  Assets,
  Children,
  Pets,
  Skills,
  CustomSkills
} from "@/accountManage/components/common/Fields";
import { Button, Form } from "antd";
// TODO: 同步配置项提取出来
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
          { key: 10, text: '博士' }
        ],
        pets: [],
        skills: []
      }
    }
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const { pets, skills } = fieldsValue['_client']
        let value = {
          personalInfo:
            {
              ...fieldsValue.personalInfo,
              pets: pets.defaultItems,
              customPets: pets.custom,
              customSkills: skills.custom
            }
        }
        console.log('Received values of form: ', fieldsValue, value);

        // 处理父级地域id
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
            {/*<span className='gray-text text'>asdasd</span>*/}
          </h4>
          <div className='subclass-content'>
            <SexualOrientation {...fieldProps} />
            <Gender {...fieldProps} />
            <Area {...fieldProps} />
            <Shipping {...fieldProps} />
            <Birthday {...fieldProps} />
            <Nationality {...fieldProps} options={asyncOptions.nationality} />
            <Industry {...fieldProps} options={asyncOptions.industry} />
            <Occupations {...fieldProps} options={asyncOptions.occupations} />
            <EducationQualification {...fieldProps} options={asyncOptions.educationQualification} />
            <RelationshipStatus {...fieldProps} />
            <Assets {...fieldProps} />
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>家庭信息</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <Children {...fieldProps} />
            <Pets {...fieldProps} options={asyncOptions.pets} />
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>技能</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <Skills {...fieldProps} options={asyncOptions.skills} />
            <CustomSkills {...fieldProps} />
          </div>
        </li>
      </ul>
    </Form>
  }
}
