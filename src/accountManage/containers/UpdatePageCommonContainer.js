import React, { Component } from "react"

export default class UpdatePageCommonContainer extends Component {
  render() {
    const { data: { priceInfo } } = this.props.params;
    const {
      policyInfoId
    } = priceInfo;
    return <div className='update-page-container'>
      <h2>
        账号维护
        {policyInfoId ?
          <small className='policyInfo-id-display'>
            价格政策ID: <a href={"/account/policy?id=" + policyInfoId}>{policyInfoId}</a></small>
          : null}
      </h2>
      {this.props.children}
    </div>
  }
}

