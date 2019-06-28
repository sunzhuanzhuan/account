/**
 * 数据统计
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { Statistic, Row, Col } from "antd";
import ContentStatistic from "@/accountManage/components/common/ContentStatistic";
import PercentageChart from "@/accountManage/components/common/PercentageChart";

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { data, actions } = this.props
  }

  render() {
    const {
      data,
      module: configureModule, platform: configurePlatform
    } = this.props
    const {
      feature = {}
    } = data.account

    const {
      snbt,
      trueFansRate,
      sexs = [],
      ages = [],
      areas = [],
      interests = [],
      snbtModifiedTime,
      kolModifiedTime,
      featureModifiedTime
    } = feature
    return <div className='module-item-container'>
      <ModuleHeader title={configureModule.title} />
      <ul className='content-wrap'>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>平台统计</span>
            <small className='line' />
            <span className='gray-text text'>最近更新于: {snbtModifiedTime || '--'}</span>
          </h4>
          <div className='subclass-content'>
            <div className='view-fields-container'>
              <div className='right-wrap'>
                <Row>
                  <Col span={3}>
                    <Statistic title="SNBT" value={snbt} formatter={snbt ? null : () => '-'} precision={1} />
                  </Col>
                  {
                    process.env.REACT_APP_CLIENT === 'NB' &&
                    configurePlatform.visibility.fields.trueFansRate &&
                    <Col span={3}>
                      <Statistic title="真粉率" value={trueFansRate} precision={1} suffix={'%'} />
                    </Col>}
                </Row>
              </div>
            </div>
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>内容统计</span>
            <small className='line' />
            <span className='gray-text text'>最近更新于: {featureModifiedTime || '--'}</span>
          </h4>
          <div className='subclass-content'>
            <div className='view-fields-container'>
              <div className='right-wrap'>
                <ContentStatistic pid={configurePlatform.platformId} data={feature} />
              </div>
            </div>
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>受众画像</span>
            <small className='line' />
            <span className='gray-text text'>最近更新于: {kolModifiedTime || '--'}</span>
          </h4>
          <div className='subclass-content'>
            <div className='view-fields-container'>
              <div className='right-wrap' style={{
                display: 'flex',
                justifyContent: "space-around"
              }}>
                <PercentageChart title='性别' value={sexs} colors={['#4880ff', '#f4525b']} />
                <PercentageChart title='年龄' value={ages.slice(0, 3)} colors={['#4880ff', '#ffc400']} />
                <PercentageChart title='地域' value={areas.slice(0, 3)} colors={['#4880ff', '#ffc400', '#f4525b']} />
                <PercentageChart title='兴趣' value={interests.slice(0, 3)} colors={['#f4525b', '#ffc400', '#23cab6']} />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  }
}
