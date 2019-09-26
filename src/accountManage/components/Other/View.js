/**
 * 其他信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { Button, Divider, Form, Tag, Icon, Tooltip } from "antd";
import FieldView from "@/accountManage/base/FeildView";
import SimpleTag from "@/accountManage/base/SimpleTag";
import CooperationCasesView from "@/accountManage/components/common/CooperationCasesView";
import EmptyModule from "../common/EmptyModule";
import { dateDisplay, handleReason } from "../../util";
import { IsLowQuality } from "@/accountManage/components/common/Fields";

@Form.create()
export default class OtherView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      data,
      module: configureModule,
      onModuleStatusChange,
      platform: configurePlatform
    } = this.props
    const {
      mediaTeamNote,
      isLowQuality,
      lowQualityReasonList,
      otherInfoModifiedAt
    } = data.account.otherInfo || {};
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: {dateDisplay(otherInfoModifiedAt) || '--'}</span>
      {this.props.readOnly ? null :
        <a onClick={() => onModuleStatusChange('edit')} style={{ fontSize: '14px' }}>
          <Icon type="edit" style={{ marginRight: '6px' }} />
          编辑
        </a>}
      {/*<Button type='primary' onClick={() => onModuleStatusChange('edit')}>编辑</Button>*/}
    </div>;

    return <div className='module-item-container'>
      <ModuleHeader title={configureModule.title} right={right} />
      <section className='content-wrap'>
        <div className="view-fields-container">
          <div className='right-wrap'>
            {configurePlatform.visibility.fields.isLowQuality &&
            <FieldView width={70} title="是否劣质号" value={
              isLowQuality ? <div>
                {isLowQuality === 1 && <Tooltip title={handleReason(lowQualityReasonList)}>
                  <span>是</span>
                </Tooltip>}
                {isLowQuality === 2 && <span>否</span>}
              </div> : '未获取到数据'
            } />}
            <FieldView width={70} title="媒介备注" value={mediaTeamNote} />
          </div>
        </div>
      </section>
    </div>
  }
}
