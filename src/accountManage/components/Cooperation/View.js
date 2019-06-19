/**
 * 合作信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { Button, Divider, Form, Tag } from "antd";
import FieldView from "@/accountManage/base/FeildView";
import SimpleTag from "@/accountManage/base/SimpleTag";
import CooperationCasesView from "@/accountManage/components/common/CooperationCasesView";

@Form.create()
export default class CooperationView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    const { actions, data: { account, visibility } } = this.props
    // 获取字段配置项 - 合作须知/广告服务
    Object.keys(visibility.cooperateNoticeFields).length === 0 &&
    actions.getCooperateNoticeFieldConfig({ accountId: account.id })
    Object.keys(visibility.advertisingFields).length === 0 &&
    actions.getAdvertisingFieldConfig({ accountId: account.id })
  }
  render() {
    const {
      data,
      module: configureModule,
      onModuleStatusChange
    } = this.props
    const {
      cooperation: {
        isAcceptHardAd,
        isAcceptProductUse,
        manuscriptModificationLimit,
        refuseBrands = [],
        videoShotAreaType,
        videoShotAreas = [],
        liveAreaType,
        liveAreas = [],
        cooperationTips,
        cooperationCases = [],
        adServiceItems = [],
        supportMultiPlatformOriginalPost,
        postPlatforms = [],
        multiPlatformOriginalPostTips,
        productPlacementType,
        modifiedAt // 信息修改时间
      }
    } = data.account || {}
    const {
      visibility
    } = data
    const asyncVisibility = {
      ...visibility.cooperateNoticeFields,
      ...visibility.advertisingFields
    }
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: {modifiedAt || '--'}</span>
      <Button type='primary' onClick={() => onModuleStatusChange('edit')}>编辑</Button>
    </div>;
    return <div className='module-item-container'>
      <ModuleHeader title={configureModule.title} right={right} />
      <ul className='content-wrap'>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>合作须知</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <div className="view-fields-container">
              <div className='right-wrap'>
                {asyncVisibility.isAcceptHardAd && asyncVisibility.isAcceptProductUse &&
                <FieldView width={130} title="拒绝项" value={
                  <div>
                    <span>{isAcceptHardAd === 1 ? '接硬广' : '不接受硬广'}</span>、
                    <span>{isAcceptProductUse === 1 ? '接受产品试用' : '不接受产品试用'}</span>
                  </div>
                } />}
                {asyncVisibility.refuseBrands &&
                <FieldView width={130} title="不接受的品牌" value={
                  refuseBrands.join('、')
                } />}
                {asyncVisibility.manuscriptModificationLimit &&
                <FieldView width={130} title="稿件/大纲修改次数" value={
                  manuscriptModificationLimit === -1 ? '不限' : manuscriptModificationLimit
                } />}
                <FieldView width={130} title="视频拍摄地点" value={
                  <div>
                    <span style={{ marginRight: '8px' }}>{videoShotAreaType === 2 ? '部分地区' : '不限地点'}</span>
                    {
                      videoShotAreas.map(area => <Tag key={area.id}>{area.areaName}</Tag>)
                    }
                  </div>
                } />
                <FieldView width={130} title="直播形式" value={
                  liveAreaType === -1 ? '' : <div>
                    {liveAreaType === 1 && <span style={{ marginRight: '8px' }}>不限</span>}
                    {liveAreaType === 2 && <span style={{ marginRight: '8px' }}>线上直播间</span>}
                    {liveAreaType === 3 && <span style={{ marginRight: '8px' }}>线下指定地点</span>}
                    {
                      liveAreaType === 3 && liveAreas.map(area =>
                        <Tag key={area.id}>{area.areaName}</Tag>)
                    }
                  </div>
                } />
                <FieldView width={130} title="备注" value={cooperationTips} />
              </div>
            </div>
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>合作案例</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <div className="view-fields-container">
              <div className='right-wrap'>
                <CooperationCasesView list={cooperationCases} />
              </div>
            </div>
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>广告服务</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <div className="view-fields-container">
              <div className='right-wrap'>
                {
                  adServiceItems.map(item => <Tag key={item.id}>{item.adServiceItemName}</Tag>)
                }
                <FieldView width={70} title="植入类型" value={
                  productPlacementType === -1 ? '' : <div>
                    {productPlacementType === 0 && <span>不限</span>}
                    {productPlacementType === 1 && <span>单品</span>}
                    {productPlacementType === 2 && <span>合集</span>}
                  </div>
                } />
                <FieldView width={70} title="分发平台" value={
                  <div>
                    <span style={{ marginRight: '8px' }}>{supportMultiPlatformOriginalPost === 1 ? '可分发' : '不可分发'}</span>
                    {
                      postPlatforms.map(item => <Tag key={item.id}>{item.platformName}</Tag>)
                    }
                  </div>
                } />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  }
}
