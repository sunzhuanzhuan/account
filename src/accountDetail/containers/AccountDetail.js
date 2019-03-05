import React, { Component } from 'react'
import { HeadInfo, DataIndicator, Composite, HistoricalAD } from "../components";

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
        <div className='data-composite'>
          <div className='data-composite-left'>
            <DataIndicator />
          </div>
          <div className='data-composite-right'>
            <Composite />
          </div>
        </div>
        <HistoricalAD />

      </div>
    );
  }
}

export default AccountDetail;
