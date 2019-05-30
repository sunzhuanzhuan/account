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
  LiveArea
} from "@/accountManage/components/common/Fields";
import { Button, Form } from "antd";

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
      modifiedAt // 账号基本信息修改时间
    } = data.accountInfo || {}
    const {
      asyncVisibility
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
            <VideoShotArea {...fieldProps}/>
            <LiveArea {...fieldProps}/>

          </div>
        </li>
      </ul>
    </Form>
  }
}
