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
import { configItemKeyToField, configOptions } from "@/accountManage/constants/packageConfig";
import update from "immutability-helper";
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
        pets: [],
        skills: []
      }
    }
  }

  componentDidMount() {
    const { actions, form, data: { account } } = this.props
    // 获取配置项 - 国籍列表
    actions.getCountryList().then(({ data }) => {
      this.setState(update(this.state, {
        asyncOptions: {
          nationality: {
            $set: data.map(item => ({ value: item.id, label: item.areaName }))
          }
        }
      }))
    })
    // 获取配置项 - 行业列表
    actions.getIndustryListForAccount().then(({ data }) => {
      this.setState(update(this.state, {
        asyncOptions: {
          industry: {
            $set: data.map(item => ({ value: item.id, label: item.name }))
          }
        }
      }))
    })
    // 获取配置项 - 职业列表
    actions.getProfession().then(({ data }) => {
      this.setState(update(this.state, {
        asyncOptions: {
          occupations: {
            $set: data.map(item => ({ value: item.itemKey, label: item.itemValue }))
          }
        }
      }))
    })
    // 获取配置项 - 宠物列表
    actions.getPet().then(({ data }) => {
      this.setState(update(this.state, {
        asyncOptions: {
          pets: {
            $set: data.map(item => ({ id: item.itemKey, name: item.itemValue }))
          }
        }
      }))
    })
    // 获取配置项 - 技能列表
    actions.getSkill().then(({ data }) => {
      let newData = data.map(item => {
        let obj = {
          value: item.itemKey,
          label: item.itemValue
        }
        if (item.childrenList) {
          obj.children = item.childrenList.map(n => ({ value: n.itemKey, label: n.itemValue }))
        }
        return obj
      })
      this.setState(update(this.state, {
        asyncOptions: {
          skills: {
            $set: newData
          }
        }
      }))
    })
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
            <EducationQualification {...fieldProps} options={configOptions.educationQualification} />
            <RelationshipStatus {...fieldProps} options={configOptions.relationshipStatus} />
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
