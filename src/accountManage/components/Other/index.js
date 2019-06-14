/**
 * 其他信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { IsLowQuality, MediaTeamNote } from "@/accountManage/components/common/Fields";
import { Button, Form } from "antd";

@Form.create()
export default class Other extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        console.log('Received values of form: ', fieldsValue);
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
      otherInfo: { otherInfoModifiedAt }
      // 信息修改时间
    } = data.account || {}
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: {otherInfoModifiedAt || '--'}</span>
      <Button htmlType='submit' type='primary'>保存</Button>
    </div>;

    return <Form className='module-item-container' onSubmit={this.submit} colon={false}>
      <ModuleHeader title={configureModule.title} right={right} />
      <section className='content-wrap'>
        {configurePlatform.visibility.fields.isLowQuality && <IsLowQuality {...fieldProps} />}
        <MediaTeamNote {...fieldProps} />
      </section>
    </Form>
  }
}
