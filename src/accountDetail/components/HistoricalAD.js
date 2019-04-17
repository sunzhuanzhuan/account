/*
 * @Author: wangxinyue 
 * @Date: 2019-02-28 17:43:12 
 * @Last Modified by: wangxinyue
 * @Last Modified time: 2019-04-17 16:41:16
 * 历史广告案例
 */

import React, { Component } from 'react'
import TabArr from "../base/TabArr";
import "./HistoricalAD.less"
import DividerArr from "../base/DividerArr";
import { Spin, Icon } from 'antd';
class HistoricalAD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreLoading: false,
      industryCode: null,
      currentPage: 2,
      isShowMore: false,
      isShowHis: true
    };
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
        industryCode: industryCode == 0 ? null : industryCode
      }
    }).then(({ data }) => {
      this.setState({
        industryCode: industryCode == 0 ? null : industryCode,
        currentPage: 2,
      })
      if (!industryCode) {
        this.setState({
          isShowHis: data.list.length > 0
        })
      }
    })

  }
  loadMore = async () => {
    const { industryCode, currentPage } = this.state
    const { accountId } = this.props
    this.setState({
      moreLoading: true,
    })
    await this.props.addQueryIndustryInfoList({
      page: {
        currentPage: currentPage,//当前页
        pageSize: 4, //每页条数
      },
      form: {
        accountId: accountId,
        industryCode: industryCode == 0 ? null : industryCode
      }
    })
    this.setState({
      moreLoading: false,
      currentPage: currentPage + 1
    })
  }
  render() {
    const { moreLoading, isShowHis } = this.state
    const { queryOrderCooperationList: { list = [], total }, queryIndustryInfoList = [] } = this.props
    return (
      isShowHis ? <div className='historical-advertising'>
        <div className='title-big'>历史广告案例</div>
        <div className='head-box'>
          <div className='tab-box'>
            <TabArr onChange={this.onChangeIndustryCode} tabArrData={[
              { industryName: '全部', industryCode: 0 },
              ...queryIndustryInfoList]} />
          </div>
        </div>
        <div className='historical-ad-case'>
          {list.map((one, index) => <div className='case-item' key={index} onClick={() => window.open(one.executionUrl, "_blank")}>
            <div className='left-img'>
              <img src={one.mediaCoverUrl ? one.mediaCoverUrl : require('./img/deafult-box.png')} onError={(e) => e.target.src = require('./img/deafult-box.png')} />
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
          {list.length < total ? <a className='more-loading' onClick={this.loadMore}>
            加载更多 {moreLoading ? null : <Icon type="down" />}
            <Spin spinning={moreLoading} >
            </Spin></a> : null}
        </div>
      </div > : null
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
