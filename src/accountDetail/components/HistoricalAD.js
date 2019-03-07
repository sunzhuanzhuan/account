/*
 * @Author: wangxinyue 
 * @Date: 2019-02-28 17:43:12 
 * @Last Modified by: wangxinyue
 * @Last Modified time: 2019-03-07 21:12:13
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
  }
  render() {
    const listCase = [{
      title: ' 小叶带你玩偷吃的最好技能哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2924416775,758818339&fm=26&gp=0.jpg',
      a: 1,
      b: 22,
      c: 33333,
      d: '美妆',
      brand: '保洁爸爸'
    }, {
      title: ' 小叶带你玩偷吃的最好技能哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2924416775,758818339&fm=26&gp=0.jpg',
      a: 1,
      b: 22,
      c: 33333,
      d: '美妆',
      brand: '保洁爸爸'
    }, {
      title: ' 小叶带你玩偷吃的最好技能哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2924416775,758818339&fm=26&gp=0.jpg',
      a: 1,
      b: 22,
      c: 33333,
      d: '美妆',
      brand: '保洁爸爸'
    }, {
      title: ' 小叶带你玩偷吃的最好技能哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2924416775,758818339&fm=26&gp=0.jpg',
      a: 13,
      b: 23,
      c: 44,
      d: '美妆',
      brand: '保洁爸爸'
    }]
    return (
      <div className='historical-advertising'>
        <div className='title-big'>历史广告案例</div>
        <div className='head-box'>
          <div className='tab-box'>
            <TabArr tabArrData={[
              { name: '全部', id: 1 },
              { name: '美妆', id: 2 },
              { name: '汽车', id: 3 },
              { name: '3C', id: 4 },
              { name: '母婴', id: 5 }]} />
          </div>
        </div>
        <div className='historical-ad-case'>
          {listCase.map((one, index) => <div className='case-item' key={index}>
            <div className='left-img'>
              <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2924416775,758818339&fm=26&gp=0.jpg" />
            </div>
            <div className='right-info'>
              <div>
                <div className='title'>
                  {one.title}
                </div>
                <DividerArr list={[
                  { icon: 'like-gray', number: one.a },
                  { icon: 'comment-gray', number: one.b },
                  { icon: 'share', number: one.c }]} />
              </div>
              <div className='info-type-flex'>
                <TwoBox type='服务行业' value={one.d} />
                <TwoBox type='合作品牌' value={one.brand} marginLeft={20} />
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
