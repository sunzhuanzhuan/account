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
    const newListLength = newVideoList.length
    return (
      newListLength > 0 ? <div className='new-video-box'>
        {newListLength > 5 ?
          <div className="grouped-left-direction">
            <Icon type="left-circle" onClick={this.setData} />
          </div> : null}
        <GroupedColumn
          data={list}
          //avgLine1={mediaLikeAvg}
          //avgLine2={platformId == 115 ? mediaCommentAvg : mediaPlayAvg}
          typeKey2={platformId == 115 ? 'mediaCommentNum' : 'mediaPlayNum'}
          typeText2={platformId == 115 ? '评论' : '播放'}
          hotKey={platformId == 115 ? 'mediaLikeNum' : 'mediaPlayNum'}
          start={startIndex}
          end={endIndex}
        />
        {newListLength > 5 ?
          <div className="grouped-right-direction">
            <Icon type="right-circle" onClick={this.setData} />
          </div> : null
        }
      </div> : <Empty style={{ padding: "30px", margin: '0px auto' }} />
    );
  }
}

export default NewVideo;
