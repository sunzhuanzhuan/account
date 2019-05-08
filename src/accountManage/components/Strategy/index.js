/**
 * 策略信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";

export default class Strategy extends Component {
  render() {
    const {  module: configureModule, platform: configurePlatform } = this.props

    return <div className='module-item-container'>
      <ModuleHeader title={configureModule.title} />
      <section className='content-wrap'>
        策略信息
      </section>
      {/*<section className='custom-infos'>
			</section>*/}
    </div>
  }
}
