/**
 * 三方报价相关
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import {
  TrinityConfigAndPrice
} from "@/accountManage/components/common/Fields";
import { Button, Form, message } from "antd";

@Form.create()
export default class Trinity extends Component {
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
      module: configureModule, platform: configurePlatform, reload
    } = this.props
    const fieldProps = { layout, data, form, actions }
    const right = <div className='wrap-panel-right-content'>
      {/*<span className='gray-text'>最近更新于: {otherInfoModifiedAt || '--'}</span>*/}
      {/*<Button htmlType='submit' type='primary' loading={this.state.submitLoading}>保存</Button>*/}
    </div>;
    return <Form className='module-item-container' onSubmit={this.submit} colon={false}>
      <ModuleHeader title={configureModule.title} right={right} />
      <section className='content-wrap'>
        <TrinityConfigAndPrice {...fieldProps} reload={reload} readOnly/>
      </section>
    </Form>
  }
}
