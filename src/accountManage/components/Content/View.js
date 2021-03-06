/**
 * 内容相关
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { Button, Form, Tag, Icon } from "antd";
import FieldView from "@/accountManage/base/FeildView";
import { dateDisplay } from "@/accountManage/util";
import EmptyModule from "@/accountManage/components/common/EmptyModule";

@Form.create()
export default class ContentView extends Component {
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
    const fieldProps = { layout, data, form, actions }
    const {
      isFamous,
      content: {
        forms = [],
        customForm = [],
        features = [],
        customFeature = [],
        styles = [],
        customStyle = [],
        modifiedAt
      }
    } = data.account || {}
    const {
      asyncVisibility,
      asyncOptions
    } = this.state
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: {dateDisplay(modifiedAt) || '--'}</span>
      {this.props.readOnly ? null : <a onClick={() => onModuleStatusChange('edit')} style={{fontSize: '14px'}}>
        <Icon type="edit" style={{marginRight: '6px'}}/>
        编辑
      </a>}
      {/*<Button type='primary' onClick={() => onModuleStatusChange('edit')}>编辑</Button>*/}
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
              viewForms.length > 0 ? viewForms.map(item => <Tag key={item}>{item}</Tag>) : '--'
            } />
            <FieldView width={70} title="内容风格" value={
              viewStyles.length > 0 ? viewStyles.map(item => <Tag key={item}>{item}</Tag>): '--'
            } />
            <FieldView width={70} title="内容特点" value={
              viewFeatures.length > 0 ? viewFeatures.map(item => <Tag key={item}>{item}</Tag>): '--'
            } />
          </div>
        </div>
      </section>
    </div>
  }
}
