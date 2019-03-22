/*
 * @Author: wangxinyue 
 * @Date: 2019-02-28 17:43:12 
 * @Last Modified by: wangxinyue
 * @Last Modified time: 2019-03-22 11:49:58
 * 历史广告案例
 */

import React, { Component } from 'react'
import TabArr from "../base/TabArr";
import "./HistoricalAD.less"
import DividerArr from "../base/DividerArr";
class HistoricalAD extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    console.log('加载数据哈哈哈HistoricalAD')
    const { accountId } = this.props
    this.onChangeIndustryCode()
    this.props.getQueryIndustryInfoList({ accountId })
  }
  //历史案例切换

  onChangeIndustryCode = (industryCode) => {
    const { accountId } = this.props
    this.props.getQueryOrderCooperationList({
      page: {
        currentPage: 1,//当前页
        pageSize: 4, //每页条数
      },
      form: {
        accountId: accountId,
        industryCode: industryCode
      }
    })
  }

  render() {
    const { queryOrderCooperationList: { list = [] }, queryIndustryInfoList = [] } = this.props
    return (
      <div className='historical-advertising'>
        <div className='title-big'>历史广告案例</div>
        <div className='head-box'>
          <div className='tab-box'>
            <TabArr onChange={this.onChangeIndustryCode} tabArrData={[
              { industryName: '全部', industryCode: 0 },
              ...queryIndustryInfoList]} />
          </div>
        </div>
        <div className='historical-ad-case'>
          {list.map((one, index) => <div className='case-item' key={index}>
            <div className='left-img'>
              <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2924416775,758818339&fm=26&gp=0.jpg" />
            </div>
            <div className='right-info'>
              <div>
                <div className='title'>
                  {one.mediaCaption}
                </div>
                <DividerArr list={[
                  { icon: 'like-gray', number: one.mediaLikeNum },
                  { icon: 'comment-gray', number: one.mediaCommentNum },
                  { icon: 'share', number: one.mediaRepostNum }]} />
              </div>
              <div className='info-type-flex'>
                <TwoBox type='服务行业' value={one.industryName} />
                <TwoBox type='合作品牌' value={one.brandName} marginLeft={20} />
              </div>
            </div>
          </div>)}
        </div>
      </div>
    );
  }
}
const TwoBox = ({ type, value, marginLeft }) => {
  return <div className='two-box' style={{ marginLeft: marginLeft }}>
    <div className='type'>{type}</div>
    <div className='value'>{value}</div>
  </div>
}

export default HistoricalAD;
