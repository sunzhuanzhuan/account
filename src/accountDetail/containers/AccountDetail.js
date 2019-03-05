import React, { Component } from 'react'
import { HeadInfo, DataIndicator, HistoricalAD, ContentData, AudienceAttribute, NewVideo } from "../components";

import './AccountDetail.less'
class AccountDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="account-view-detail" id='Js-account-view-detail-Id'>
        <HeadInfo />
        <DataIndicator />
        <HistoricalAD />
        <ContentData />
        <AudienceAttribute />
        <NewVideo />
      </div>
    );
  }
}

export default AccountDetail;
