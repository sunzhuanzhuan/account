import React, { Component } from 'react'
import DividerArr from "../base/DividerArr";
import HoverImg from "../base/HoverImg";
import './NewVideo.less'
import moment from "moment";
import { Empty } from 'antd';
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
    const { newVideoList } = this.props
    return (
      <div className='new-video' >
        <div className='title-big' >最新视频</div>
        <div className='video-list'>
          {newVideoList.length > 0 ? newVideoList.slice(0, 5).map((one, index) => <div className='video-item' key={index} onClick={() => { window.open(one.mediaUrl, "_blank") }}>
            <div className='img'>
              <HoverImg img={
                <img src={one.mediaCoverUrl ? one.mediaCoverUrl : require('./img/deafult-box.png')} onError={(e) => e.target.src = require('./img/deafult-box.png')} />
              } />
              <div className='date-time'>{moment(one.mediaCreatedTime.split('-')).fromNow()}</div>
            </div>
            <div className='title'>
              {one.mediaCaption || '-'}
            </div>
            <div className='last-box'>
              <div className='number'>
                <DividerArr list={[
                  { icon: 'like-gray', number: one.mediaLikeNum },
                  { icon: 'comment-gray', number: one.mediaCommentNum },
                  { icon: 'share', number: one.mediaRepostNum }]} />
              </div>
            </div>
          </div>) : <Empty style={{ padding: "30px", margin: '0px auto' }} />}
        </div>
      </div>
    );
  }
}

export default NewVideo;
