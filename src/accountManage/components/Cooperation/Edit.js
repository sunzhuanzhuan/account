/**
 * 合作信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import {
  DirectItems,
  RefuseBrands,
  ManuscriptModificationLimit,
  VideoShotArea,
  LiveArea,
  CooperationTips,
  CooperationCases,
  AdServiceItems,
  PostPlatform,
  ProductPlacementType
} from "@/accountManage/components/common/Fields";
import { Button, Divider, Form } from "antd";

@Form.create()
export default class CooperationEdit extends Component {
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

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      console.log('Received values of form: ', fieldsValue);
      if (err) {
        return;
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
            <span className='text'>合作须知</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            {asyncVisibility.isAcceptHardAd && asyncVisibility.isAcceptProductUse &&
            <DirectItems {...fieldProps} />}
            {asyncVisibility.refuseBrands && <RefuseBrands {...fieldProps} />}
            {asyncVisibility.manuscriptModificationLimit &&
            <ManuscriptModificationLimit {...fieldProps} />}
            <VideoShotArea {...fieldProps} />
            <LiveArea {...fieldProps} />
            <Divider dashed />
            <CooperationTips {...fieldProps} />
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>合作案例</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <CooperationCases {...fieldProps} />
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>广告服务</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <AdServiceItems {...fieldProps} options={asyncOptions.adServiceItems} />
            <PostPlatform {...fieldProps} options={[]}/>
            <ProductPlacementType {...fieldProps}/>
          </div>
        </li>
      </ul>
    </Form>
  }
}
