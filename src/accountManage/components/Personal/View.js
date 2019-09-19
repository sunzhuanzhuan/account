/**
 * 博主个人信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { Button, Form, Tag, Icon } from "antd";
import FieldView from "@/accountManage/base/FeildView";
import ChildrenListView
  from "@/accountManage/components/common/ChildrenListView";
import { configOptions } from "@/accountManage/constants/packageConfig";
import { dateDisplay, findStatusText } from '../../util'
import EmptyModule from "../common/EmptyModule";

@Form.create()
export default class PersonalView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      layout,
      data,
      actions,
      form,
      module: configureModule, platform: configurePlatform,
      onModuleStatusChange
    } = this.props
    const {
      isFamous,
      personalInfo: {
        sexualOrientation,
        gender,
        area = {},
        shipping = {},
        birthDate,
        nationalityName,
        industryName,
        occupations = [],
        educationQualification,
        relationshipStatus,
        hasHouse,
        hasCar,
        children = [],
        pets = [],
        customPets = [],
        skills = [],
        customSkills = [],
        personalInfoModifiedAt // 信息修改时间
      }
    } = data.account || {}
    const {
      asyncVisibility,
      asyncOptions
    } = this.state
    let shippingArea = [shipping.country, shipping.province, shipping.city, shipping.county].filter(Boolean)
    let petsList = [].concat(pets, customPets)
    let skillsList = [].concat(skills, customSkills)
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: {dateDisplay(personalInfoModifiedAt) || '--'}</span>
      {this.props.readOnly ? null : <a onClick={() => onModuleStatusChange('edit')} style={{ fontSize: '14px' }}>
        <Icon type="edit" style={{ marginRight: '6px' }} />
        编辑
      </a>}
      {/*<Button type='primary' onClick={() => onModuleStatusChange('edit')}>编辑</Button>*/}
    </div>;

    return <div className='module-item-container'>
        <ModuleHeader title={configureModule.title} right={right} />
        <ul className='content-wrap'>
          <li className='subclass-item-wrap'>
            <h4 className='subclass-head'>
              <span className='text'>博主信息</span>
              <small className='line' />
            </h4>
            <div className='subclass-content'>
              <div className="view-fields-container">
                    <div className='right-wrap'>
                      <FieldView width={70} title="性取向" value={
                        sexualOrientation === 1 ? '同性' : sexualOrientation === 2 ? '异性' : sexualOrientation === 3 ? '双性' : ''
                      } />
                      <FieldView width={70} title="性别" value={
                        gender === 1 ? '男' : gender === 2 ? '女' : gender === 3 ? '未知' : ''
                      } />
                      <FieldView width={70} title="常驻地" value={area.areaName} />
                      <FieldView width={70} title="收货地址" value={
                        Object.keys(shipping).length > 0 &&
                        <div className='shipping-card-item' style={{ width: "300px" }}>
                          <p>收货人： {shipping.receiver}</p>
                          <p>手机号： {shipping.phoneNumber}</p>
                          <p style={{ wordBreak: "break-all" }}>收货地址： {shippingArea.map(item => item.name).join('/')} {shipping.addressDetail}</p>
                        </div>
                      } />
                      <FieldView width={70} title="生日" value={birthDate && birthDate.slice(0, 10)} />
                      <FieldView width={70} title="国籍" value={nationalityName} />
                      <FieldView width={70} title="行业" value={industryName} />
                      <FieldView width={70} title="职业" value={occupations.map(n => n.occupationName).join('、')} />
                      <FieldView width={70} title="学历/学位" value={
                        findStatusText(
                          educationQualification,
                          configOptions['educationQualification'],
                          ['key', 'text']
                        )
                      } />
                      <FieldView width={70} title="情感状况" value={
                        findStatusText(
                          relationshipStatus,
                          configOptions['relationshipStatus'],
                          ['value', 'label']
                        )

                      } />
                      <FieldView width={70} title="资产" value={
                        (hasHouse === 1 || hasCar === 1) &&
                        <div>
                          {hasHouse === 1 &&
                          <span style={{ marginRight: '10px' }}>有房</span>}
                          {hasCar === 1 &&
                          <span>有车</span>}
                        </div>
                      } />
                    </div>
              </div>
            </div>
          </li>
          <li className='subclass-item-wrap'>
            <h4 className='subclass-head'>
              <span className='text'>家庭信息</span>
              <small className='line' />
            </h4>
            <div className='subclass-content'>
              <div className="view-fields-container">
                <div className='right-wrap'>
                  <FieldView width={40} title="宝宝" value={
                    children.length > 0 ?
                      <ChildrenListView list={children} /> : '--'
                  } />
                  <FieldView width={40} title="宠物" value={
                    petsList.length  > 0 ? petsList.map((item, n) =>
                        <Tag key={n}>{item.petName || item}</Tag>)
                      : <div>--</div>
                  } />
                </div>
              </div>
            </div>
          </li>
          <li className='subclass-item-wrap'>
            <h4 className='subclass-head'>
              <span className='text'>技能</span>
              <small className='line' />
            </h4>
            <div className='subclass-content'>
              <div className="view-fields-container">
                <div className='right-wrap'>
                  {
                    skillsList.length ? skillsList.map((item, n) =>
                      <Tag key={n}>{item.skillName || item}</Tag>) : '--'
                  }
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
  }
}
