import React, { Component } from 'react'
import DividerArr from "../base/DividerArr";
import './NewVideo.less'
import moment from "moment";
class NewVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const videoList = [{
      title: ' 小叶带你玩偷吃的最好技能哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      a: 1,
      b: 22,
      c: 33333,
      time: '2019-01-02'
    }, {
      title: ' 小叶带你玩偷吃的最好技能哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      a: 1,
      b: 22,
      c: 33333,
      time: '2019-01-02'
    }, {
      title: ' 小叶带你玩偷吃的最好技能哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      a: 1,
      b: 22,
      c: 33333,
      time: '2019-01-02'
    }, {
      title: ' 小叶带你玩偷吃的最好技能哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      a: 13,
      b: 23,
      c: 44,
      time: '2019-01-02'
    }]
    return (
      <div className='new-video'>
        <div className='title-big' >最新视频</div>
        <div className='video-list'>
          {videoList.map((one, index) => <div className='video-item' key={index} >
            <div className='img'>
              <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </div>
            <div className='title'>
              {one.title}
            </div>
            <div className='last-box'>
              <div className='number'>
                <DividerArr list={[
                  { icon: 'like-gray', number: 22 },
                  { icon: 'comment-gray', number: 22 },
                  { icon: 'share', number: 22 }]} />
              </div>
              <div className='date-time'>{moment(one.time.split('-')).fromNow()}</div>
            </div>
          </div>)}

        </div>
      </div>
    );
  }
}

export default NewVideo;
