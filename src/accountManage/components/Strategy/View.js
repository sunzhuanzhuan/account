/**
 * 策略信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { Button, Form, Tag } from "antd";
import FieldView from "@/accountManage/base/FeildView";

@Form.create()
export default class StrategyView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      asyncVisibility: {}
    }
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
    const fieldProps = { layout, data, form, actions }
    const {
      isFamous,
      forms = [],
      customForm = [],
      features = [],
      customFeature = [],
      styles = [],
      customStyle = [],
      modifiedAt // 信息修改时间
    } = data.accountInfo || {}
    const {
      asyncVisibility,
      asyncOptions
    } = this.state
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: {modifiedAt || '--'}</span>
      <Button type='primary' onClick={() => onModuleStatusChange('edit')}>编辑</Button>
    </div>;

    let viewForms = [].concat(forms, customForm).map(item => item.name || item)
    let viewFeatures = [].concat(features, customFeature).map(item => item.name || item)
    let viewStyles = [].concat(styles, customStyle).map(item => item.name || item)
    return <div className='module-item-container'>
      <ModuleHeader title={configureModule.title} right={right} />
      <section className='content-wrap'>
        <div className="view-fields-container">
          <div className='right-wrap'>
            <FieldView width={70} title="内容形式" value={
              viewForms.length && viewForms.map(item => <Tag key={item}>{item}</Tag>)
            } />
            <FieldView width={70} title="内容风格" value={
              viewStyles.length && viewStyles.map(item => <Tag key={item}>{item}</Tag>)
            } />
            <FieldView width={70} title="内容特点" value={
              viewFeatures.length && viewFeatures.map(item => <Tag key={item}>{item}</Tag>)
            } />
          </div>
        </div>
      </section>
    </div>
  }
}
