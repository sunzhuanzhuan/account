/**
 * 策略信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import {

} from "@/accountManage/components/common/Fields";
import { Button, Divider, Form } from "antd";
import { OnSaleInfo } from "@/accountManage/components/common/Fields";
import { MaxOrderCount } from "@/accountManage/components/common/Fields";
import { Strategy } from "@/accountManage/components/common/Fields";

@Form.create()
export default class StrategyEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      asyncVisibility: {},
      asyncOptions: {
        forms: [],
        features: [],
        styles: []
      }
    }
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      console.log('Received values of form: ', fieldsValue);

      if (!err) {
        //
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
    return <Form className='module-item-container' onSubmit={this.submit} colon={false} hideRequiredMark>
      <ModuleHeader title={configureModule.title} right={right} />
      <ul className='content-wrap'>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>上架信息</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
              {/*<OnSaleInfo {...fieldProps}/>*/}
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>接单策略</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <Strategy {...fieldProps}/>
            <MaxOrderCount {...fieldProps}/>
          </div>
        </li>
      </ul>
    </Form>
  }
}
