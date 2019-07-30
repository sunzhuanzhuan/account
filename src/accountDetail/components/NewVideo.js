import React, { Component } from 'react'
import DividerArr from "../base/DividerArr";
import HoverImg from "../base/HoverImg";
import './NewVideo.less'
import moment from "moment";
import { Empty, Icon } from 'antd';
import { GroupedColumn } from "./chart";
class NewVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startIndex: 0,
      endIndex: 5
    };
  }
  componentDidMount = () => {
    this.props.getNewVideo({ accountId: this.props.accountId })
  }
  setData = () => {
    const { startIndex, endIndex } = this.state
    this.setState({
      startIndex: startIndex == 0 ? 5 : 0,
      endIndex: endIndex == 5 ? 10 : 5
    })
  }
  render() {
    const { newVideoList = [], platformId, baseInfo } = this.props
    const { feature = {} } = baseInfo
    const {
      mediaCommentAvg, //近30评论平均值
      mediaPlayAvg, //播放
      mediaLikeAvg//点赞
    } = feature
    const { startIndex,
      endIndex } = this.state
    const list = newVideoList.slice(startIndex, endIndex)
    return (
      newVideoList.length > 0 ? <div className='new-video-box'>
        <div className="grouped-left-direction">
          <Icon type="left-circle" onClick={this.setData} />
        </div>
        <GroupedColumn
          data={list.map((one, index) => ({ ...one, label: `${index + 1}` }))}
          avgLine1={mediaLikeAvg}
          avgLine2={platformId == 115 ? mediaCommentAvg : mediaPlayAvg}
          typeKey2={platformId == 115 ? 'mediaCommentNum' : 'mediaCommentNum'}
          typeText2={platformId == 115 ? '评论' : '播放'}
        />
        {/*   <div className='new-video' >
          <div className='video-list-box'>
            <div className="arrow left-direction">
              <Icon type="left-circle" onClick={this.setData} />
            </div>
                 <div className='video-list'>
              {list.map((one, index) => <div className='video-item' key={index} onClick={() => { window.open(one.mediaUrl, "_blank") }}>
                <div className='img'>
                  <HoverImg img={
                    <img src={one.mediaCoverUrl ? one.mediaCoverUrl : require('./img/deafult-box.png')} onError={(e) => e.target.src = require('./img/deafult-box.png')} />
                  } />

                </div>
                <div className='title'>
                  {one.mediaCaption || '-'}
                </div>
                <div className='text-center-time'>{
                  moment(one.mediaCreatedTime).format('YYYY/MM/DD hh:mm:ss')}</div>
           <div className='last-box'>
                <div className='number'>
                  <DividerArr list={[
                    { icon: 'like-gray', number: one.mediaLikeNum },
                    { icon: 'comment-gray', number: one.mediaCommentNum },
                    { icon: 'share', number: one.mediaRepostNum }]} />
                </div>
              </div> 
              </div>)}
            </div>
            <div className="arrow right-direction">
              <Icon type="right-circle" onClick={this.setData} />
            </div>
          </div>
        </div>*/}
        <div className="grouped-right-direction">
          <Icon type="right-circle" onClick={this.setData} />
        </div>
      </div> : <Empty style={{ padding: "30px", margin: '0px auto' }} />
    );
  }
}

export default NewVideo;
