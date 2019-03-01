import React, { Component } from 'react'
import { HeadInfo, DataIndicator, Composite, HistoricalAD } from "../components";
// import CompositeRadar from "../components/chart/CompositeRadar";
// import CurveLine from "../components/chart/CurveLine";
// import DataBox from "../components/chart/DataBox";
// import HistogramLine from "../components/chart/HistogramLine";
// import Landscape from "../components/chart/Landscape";
// import PieChart from "../components/chart/PieChart";
import ChinaMap from "../components/chart/ChinaMap";




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
        <ChinaMap />
      </div>
    );
  }
}

export default AccountDetail;
