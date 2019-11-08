import React, { Component } from 'react';
import { Row, Col } from 'antd'
import { fansColumnsKeys } from "@/accountManage/constants";
import { platformView } from "@/accountManage/constants/platform";

const fields = {
  "真粉率": "trueFansRate",
  "snbt": "snbt",
  "视频数": "mediaCount",
  "作品数": "mediaCount",
  "笔记数": "mediaCount",
  "直发微博平均评论数": "directMediaCommentAvg",
  "直发微博平均转发数": "directMediaRepostAvg",
  "直发微博平均点赞数": "directMediaLikeAv",
  "转发微博平均评论数": "indirectMediaCommentAvg",
  "转发微博平均转发数": "indirectMediaRepostAvg",
  "转发微博平均点赞数": "indirectMediaLikeAv",
  "平均点赞数": "mediaLikeAvg",
  "视频平均点赞数": "mediaLikeAvg",
  "平均评论数": "directMediaCommentAvg",
  "视频平均评论数": "mediaCommentAvg",
  "平均播放数": "mediaPlayAvg",
  "平均观看数": "mediaPlayAvg",
  "场均观看": "mediaPlayAvg",
  "视频平均观看数": "mediaPlayAvg",
  "平均收藏数": "mediaCollectAvg",
  "平均弹幕数": "mediaBarrageAvg",
  "总被赞数": "likeCount",
  "历史直播数": "liveCount",
  "直播平均观众数": "liveOnlineAvg",
  "直播最高观众数": "liveOnlineMax",
  "多图文第一条平均阅读数": "mediaIndex1AvgReadNum",
  "多图文第一条平均点赞数": "mediaIndex1AvgLikeNum",
  "多图文第二条平均阅读数": "mediaIndex2AvgReadNum",
  "多图文第二条平均点赞数": "mediaIndex2AvgLikeNum",
  "多图文第3-N条平均阅读数": "mediaOtherDeSingularAvgReadNum",
  "多图文第3-N条平均点赞数": "mediaOtherDeSingularAvgLikeNum",
  "视频平均分享数": "mediaRepostAvg",
  "平均转发数": "mediaRepostAvg",
  "视频平均收藏数": "mediaCollectAvg",
  "文章平均点赞数": "pictureLikeAvg",
  "文章平均收藏数": "pictureCollectAvg",
  "文章平均评论数": "pictureCommentAvg",
  "最近30条平均阅读数": "mediaAvgReadNum",
  "最近30条平均点赞数": "mediaAvgLikeNum"
}

export default class ContentStatistic extends Component {

  componentDidMount() {
    if (this.show) {
      const blockNode = window.document.getElementById('statistic-block-wrapped')
      const emptyNode = window.document.getElementById('statistic-empty-wrapped')
      if (blockNode) {
        blockNode.style.display = 'block'
      }
      if (emptyNode) {
        emptyNode.style.display = 'none'
      }
    }
  }

  render() {
    const columnsKeys = (fansColumnsKeys[platformView[this.props.pid] || ''] || []).map(key => {
      if (fields[key]) {
        return {
          key: fields[key],
          name: key
        }
      }
    }).filter(Boolean)
    const {
      data = {}
    } = this.props
    this.show = columnsKeys.some(({ key }) => data[key])
    return <div className='content-statistic-wrapper'>
      <Row>
        {
          columnsKeys.map(({ key, name }) => <Col span={7} key={key}>
            <div className='statistic-field'>
              <span className='title'>{name}</span>
              <span className='value'>{data[key] || '-'}</span>
            </div>
          </Col>)
        }
      </Row>
    </div>
  }
}
