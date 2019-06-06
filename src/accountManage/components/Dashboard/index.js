/**
 * 数据统计
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { Button, Form, message, Modal } from "antd";
import { FamousPrice, NamelessPrice } from "../common/AccountPrice";
import { IsAcceptHardAd, PriceInclude, ReferencePrice } from "../common/Fields";
import { WrapPanel } from "@/accountManage/components/index";
import { checkVal } from "@/accountManage/util";

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const { data, actions } = this.props
  }

  render() {
    const {
      layout,
      data,
      actions,
      module: configureModule, platform: configurePlatform
    } = this.props
    const fieldProps = { layout, data, actions }
    const {
      isFamous
    } = data.accountInfo || {}

    return <div className='module-item-container'>
        <ModuleHeader title={configureModule.title}/>
        <section className='content-wrap'>
          数据统计
        </section>
      </div>
  }
}
