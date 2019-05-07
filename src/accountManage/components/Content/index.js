/**
 * 内容相关
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";

export default class Content extends Component {
  render() {

    return <div className='module-item-container'>
      <ModuleHeader title={this.props.data.title} />
      <section className='content-wrap'>
        内容相关
      </section>
      {/*<section className='custom-infos'>
			</section>*/}
    </div>
  }
}
