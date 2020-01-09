import React, { Component } from "react"
import { policyRuleType } from "@/accountManage/constants";

export default class UpdatePageCommonContainer extends Component {
  render() {
    const { data: { priceInfo } } = this.props.params;
    const {
      policyId,
      ruleType,
      ruleId
    } = priceInfo;
    return <div className='update-page-container'>
      <h2>
        账号维护
        {policyId ?
          <small className='policyInfo-id-display'>
            价格政策ID: <a target='_blank' href={"/account/policy?policyPeriodIdentity=1&userId=" + policyId}>{policyId}-{policyRuleType[ruleType]}-{ruleId}</a></small>
          : null}
      </h2>
      {this.props.children}
    </div>
  }
}

