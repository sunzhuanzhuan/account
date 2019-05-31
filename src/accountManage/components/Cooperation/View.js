/**
 * 合作信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { Button, Divider, Form, Tag } from "antd";
import FieldView from "@/accountManage/base/FeildView";
import SimpleTag from "@/accountManage/base/SimpleTag";

@Form.create()
export default class CooperationView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      asyncVisibility: {
        isAcceptHardAd: true,
        isAcceptProductUse: true,
        refuseBrands: true,
        manuscriptModificationLimit: true
      },
      asyncOptions: {
        adServiceItems: [
          {
            "id": 1,
            "adServiceItemName": "真人出镜"
          },
          {
            "id": 2,
            "adServiceItemName": "口播"
          }
        ]
      }
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
      isAcceptHardAd,
      isAcceptProductUse,
      manuscriptModificationLimit,
      refuseBrands = [],
      videoShotAreaType,
      videoShotAreas = [],
      liveAreaType,
      liveAreas = [],
      cooperationTips,
      cooperationCases,
      adServiceItems,
      supportMultiPlatformOriginalPost,
      postPlatforms,
      multiPlatformOriginalPostTips,
      productPlacementType,
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
    return <Form className='module-item-container' onSubmit={this.submit} colon={false}>
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
                <FieldView width={130} title="拒绝项" value={
                  <div>
                    <span>{isAcceptHardAd === 1 ? '接硬广' : '不接受硬广'}</span>、
                    <span>{isAcceptProductUse === 1 ? '接受产品试用' : '不接受产品试用'}</span>
                  </div>
                } />
                <FieldView width={130} title="不接受的品牌" value={
                  refuseBrands.join('、')
                } />
                <FieldView width={130} title="稿件/大纲修改次数" value={
                  manuscriptModificationLimit === -1 ? '不限' : manuscriptModificationLimit
                } />
                <FieldView width={130} title="视频拍摄地点" value={
                  <div>
                    <span>{videoShotAreaType === 2 ? '部分地区' : '不限地点'}</span>
                    {
                      videoShotAreas.map(area => <Tag key={area.id}>{area.areaName}</Tag>)
                    }
                  </div>
                } />
                <FieldView width={130} title="直播形式" value={
                  liveAreaType === -1 ? '' : <div>
                    {liveAreaType === 1 && <span>不限</span>}
                    {liveAreaType === 2 && <span>线上直播间</span>}
                    {liveAreaType === 3 && <span>线下指定地点</span>}
                    {
                      liveAreaType === 3 && liveAreas.map(area => <Tag key={area.id}>{area.areaName}</Tag>)
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

          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>广告服务</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>

          </div>
        </li>
      </ul>
    </Form>
  }
}
