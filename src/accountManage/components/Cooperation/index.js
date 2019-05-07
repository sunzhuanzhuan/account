/**
 * 合作信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";

export default class Cooperation extends Component {
  render() {

    return <div className='module-item-container'>
      <ModuleHeader title={this.props.data.title} />
      <section className='content-wrap'>
        合作信息
      </section>
      {/*<section className='custom-infos'>
			</section>*/}
    </div>
  }
}
