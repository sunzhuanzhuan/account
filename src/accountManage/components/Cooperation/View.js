/**
 * 合作信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { Button, Divider, Form, Tag, Icon } from "antd";
import FieldView from "@/accountManage/base/FeildView";
import SimpleTag from "@/accountManage/base/SimpleTag";
import CooperationCasesView from "@/accountManage/components/common/CooperationCasesView";
import EmptyModule from "../common/EmptyModule";
import { dateDisplay } from "../../util";

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
    actions.getCooperateNoticeFieldConfig({ platformId: account.base.platformId })
    Object.keys(visibility.advertisingFields).length === 0 &&
    actions.getAdvertisingFieldConfig({ platformId: account.base.platformId })
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
      <span className='gray-text'>最近更新于: {dateDisplay(modifiedAt) || '--'}</span>
      <a onClick={() => onModuleStatusChange('edit')} style={{ fontSize: '14px' }}>
        <Icon type="edit" style={{ marginRight: '6px' }} />
        编辑
      </a>
      {/*<Button type='primary' onClick={() => onModuleStatusChange('edit')}>编辑</Button>*/}
    </div>;

    return Object.keys(data.account.cooperation).length > 0 ?
      <div className='module-item-container'>
        <ModuleHeader title={configureModule.title} right={right} />
        <ul className='content-wrap'>
          <li className='subclass-item-wrap'>
            <h4 className='subclass-head'>
              <span className='text'>合作须知</span>
              <small className='line' />
            </h4>
            <div className='subclass-content'>
              <div className="view-fields-container">
                {
                  (isAcceptHardAd === 2 || isAcceptProductUse ===2 || refuseBrands.length || manuscriptModificationLimit || manuscriptModificationLimit === 0 || videoShotAreaType || liveAreaType) ?
                    <div className='right-wrap'>
                      {(asyncVisibility.isAcceptHardAd || asyncVisibility.isAcceptProductUse) &&
                      <FieldView width={130} title="拒绝项" value={
                        (isAcceptHardAd === 2 || isAcceptProductUse === 2) &&
                        <div>
                          {asyncVisibility.isAcceptHardAd &&
                          <span>{isAcceptHardAd === 2 ? '不接受硬广、' : ''}</span>}
                          {asyncVisibility.isAcceptProductUse &&
                          <span>{isAcceptProductUse === 2 ? '不接受产品试用' : ''}</span>}
                        </div>
                      } />}
                      {asyncVisibility.refuseBrands && refuseBrands.length > 0 &&
                      <FieldView width={130} title="不接受的品牌" value={
                        refuseBrands.join('、')
                      } />}
                      {asyncVisibility.manuscriptModificationLimit &&
                      <FieldView width={130} title="稿件/大纲修改次数" value={
                        manuscriptModificationLimit === -1 ? '不限' : manuscriptModificationLimit
                      } />}
                      {asyncVisibility.videoShotArea &&
                      <FieldView width={130} title="视频拍摄地点" value={
                        videoShotAreaType ? <div>
                          <span style={{ marginRight: '8px' }}>{videoShotAreaType === 2 ? '部分地区' : '不限地点'}</span>
                          {
                            videoShotAreas.map(area =>
                              <Tag key={area.id}>{area.areaName}</Tag>)
                          }
                        </div> : null
                      } />}
                      {asyncVisibility.liveArea &&
                      <FieldView width={130} title="直播形式" value={
                        (liveAreaType && liveAreaType !== -1) ?
                          <div>
                            {liveAreaType === 1 &&
                            <span style={{ marginRight: '8px' }}>不限</span>}
                            {liveAreaType === 2 &&
                            <span style={{ marginRight: '8px' }}>线上直播间</span>}
                            {liveAreaType === 3 &&
                            <span style={{ marginRight: '8px' }}>线下指定地点</span>}
                            {
                              liveAreaType === 3 && liveAreas.map(area =>
                                <Tag key={area.id}>{area.areaName}</Tag>)
                            }
                          </div> : null
                      } />}
                      <FieldView width={130} title="备注" value={cooperationTips} />
                    </div> :
                    <div className='right-wrap'>您可添加您的合作须知（比如不接硬广、不接受产品试用等），有利于更好的增加您的接单转化率</div>
                }
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
                {
                  cooperationCases.length > 0 ?
                    <div className='right-wrap'>
                      <CooperationCasesView list={cooperationCases} />
                    </div> : <div className='right-wrap'>添加合作案例将提升您的接单率哟~</div>
                }
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
                {
                  (adServiceItems.length > 0 || productPlacementType || supportMultiPlatformOriginalPost) ?
                    <div className='right-wrap'>
                      {
                        adServiceItems.map(item =>
                          <Tag key={item.id}>{item.adServiceItemName}</Tag>)
                      }
                      {asyncVisibility.productPlacement &&
                      <FieldView width={70} title="植入类型" value={
                        productPlacementType === -1 ? '' : <div>
                          {productPlacementType === 0 &&
                          <span>不限</span>}
                          {productPlacementType === 1 &&
                          <span>单品</span>}
                          {productPlacementType === 2 &&
                          <span>合集</span>}
                        </div>
                      } />}
                      {asyncVisibility.postPlatform &&
                      <FieldView width={70} title="分发平台" value={
                        <div>
                          <span style={{ marginRight: '8px' }}>{supportMultiPlatformOriginalPost === 1 ? '可分发' : '不可分发'}</span>
                          {
                            supportMultiPlatformOriginalPost === 1 && postPlatforms.map(item =>
                              <Tag key={item.id}>{item.platformName}</Tag>)
                          }
                        </div>
                      } />}
                    </div> : <div className='right-wrap'>添加您可以提供的广告服务项，将提升您的曝光~</div>
                }
              </div>
            </div>
          </li>
        </ul>
      </div> :
      <EmptyModule title={configureModule.title} desc={'您可在此添加合作须知、案例、可提供的广告服务'} onChange={onModuleStatusChange} />
  }
}
