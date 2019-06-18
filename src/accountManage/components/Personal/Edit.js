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
import { Button, Form, message } from "antd";
import { configItemKeyToField, configOptions } from "@/accountManage/constants/packageConfig";
import update from "immutability-helper";

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
      },
      submitLoading: false
    }
    // window注入组件
    window.__UpdateAccountReactComp__.personal = this
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

  // 处理提交数据
  handleSubmitValues = (values) => {
    const { data: { account } } = this.props;
    const { pets, skills } = values['_client']
    const { shipping, area = {} } = values['personalInfo']
    let value = {
      id: account.id,
      personalInfo: {
        ...values.personalInfo,
        areaId: area.id,
        pets: pets.defaultItems,
        customPets: pets.custom,
        customSkills: skills.custom,
        area: undefined,
        shipping: shipping ? {
          "receiver": shipping.receiver,
          "phoneNumber": shipping.phoneNumber,
          "countryId": shipping.country.id || 0,
          "provinceId": shipping.province.id || 0,
          "cityId": shipping.city.id || 0,
          "countyId": shipping.county.id || 0,
          "addressDetail": shipping.addressDetail
        } : {}
      }
    }
    // values.base['platformId'] = platformId;
    return value;
  };

  submit = (e) => {
    e && e.preventDefault();
    const { actions, form, reload, onModuleStatusChange } = this.props
    this.setState({ submitLoading: true });
    form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        let values = this.handleSubmitValues(fieldsValue)
        actions.updatePersonalInfo(values).then(() => {
          // reload(() => onModuleStatusChange('view'))
          message.success('更新账号成功');
        }).finally(() => {
          this.setState({
            submitLoading: false
          });
        });
      } else {
        this.setState({ submitLoading: false });
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
