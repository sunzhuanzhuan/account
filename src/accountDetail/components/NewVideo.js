import React, { Component } from 'react'
import DividerArr from "../base/DividerArr";
import './NewVideo.less'
import moment from "moment";
class NewVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    this.props.getNewVideo({ accountId: this.props.accountId })
    console.log('最新视频数据加载啦啦啦啦')
  }
  render() {
    const videoList = [{
      title: ' 小叶带你玩偷吃的最好技能哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      mediaCoverUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2924416775,758818339&fm=26&gp=0.jpg',
      a: 1,
      b: 22,
      mediaRepostNum: 33333,
      mediaCreatedTime: '2019-01-02'
    }, {
      title: ' 小叶带你玩偷吃的最好技能哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      mediaCoverUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2924416775,758818339&fm=26&gp=0.jpg',
      a: 1,
      b: 22,
      mediaRepostNum: 33333,
      mediaCreatedTime: '2019-01-02'
    }, {
      title: ' 小叶带你玩偷吃的最好技能哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      mediaCoverUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2924416775,758818339&fm=26&gp=0.jpg',
      a: 1,
      b: 22,
      mediaRepostNum: 33333,
      mediaCreatedTime: '2019-01-02'
    }, {
      title: ' 小叶带你玩偷吃的最好技能哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      mediaCoverUrl: '',
      a: 13,
      b: 23,
      mediaRepostNum: 44,
      mediaCreatedTime: '2019-01-02'
    }]
    const { newVideoList } = this.props
    return (
      <div className='new-video'>
        <div className='title-big' >最新视频</div>
        <div className='video-list'>
          {videoList.map((one, index) => <div className='video-item' key={index} onClick={window.open(one.mediaUrl, "_blank")}>
            <div className='img'>
              <img src={one.mediaCoverUrl ? one.mediaCoverUrl : require('./img/deafult-box.png')} onError={(e) => e.target.src = require('./img/deafult-box.png')} />
            </div>
            <div className='title'>
              {one.title}
            </div>
            <div className='last-box'>
              <div className='number'>
                <DividerArr list={[
                  { icon: 'like-gray', number: one.mediaLikeNum },
                  { icon: 'comment-gray', number: one.mediaCommentNum },
                  { icon: 'share', number: one.mediaRepostNum }]} />
              </div>
              <div className='date-time'>{moment(one.mediaCreatedTime.split('-')).fromNow()}</div>
            </div>
          </div>)}

        </div>
      </div>
    );
  }
}

export default NewVideo;
