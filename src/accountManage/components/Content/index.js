/**
 * 内容相关
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";

export default class Content extends Component {
  render() {
    const {  module: configureModule, platform: configurePlatform } = this.props
    return <div className='module-item-container'>
      <ModuleHeader title={configureModule.title} />
      <section className='content-wrap'>
        内容相关
      </section>
      {/*<section className='custom-infos'>
			</section>*/}
    </div>
  }
}
