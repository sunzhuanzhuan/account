import React from 'react'
import numeral from 'numeral'
import { formatWNumberDefult } from '../util'
import { Divider } from 'antd'
const getPercent = (value) => {
  return value == 0 || value > 0 ? numeral(value * 100).format('0.0') : '-'
}
const getDecimal = (value) => {
  return value == 0 || value > 0 ? numeral(value).format('0.0') : '-'
}
const getIsShow = (value) => {
  return value == 0 || value > 0 ? value : '-'
}
export const getWechat = (data = {}) => {
  return [
    {
      name: "总发布数（原创文章数）",
      value: getIsShow(data.mediaPublishCountAll),
      unit: `个（${getIsShow(data.mediaOriginalPublishCountAll)}篇）`
    },
    {
      name: "10w+阅读文章数",
      value: getIsShow(data.mediaReadExceed10wMediaCountAll),
      unit: `个`
    },
    {
      name: "真实阅读率",
      value: getPercent(data.trueReadRatio),
      unit: `%`
    },
    {
      name: "近28天推送次数",
      value: getIsShow(data.mediaGroupCount28d),
      unit: `次`
    },
    {
      name: "近28天发布频率",
      value: getDecimal(data.mediaWeeklyFloatCount28d),
      unit: `个/周`
    },
  ]
}
export const wechatColumns = [
  {
    title: '',
    dataIndex: 'rowName',
    key: 'rowName',
    align: 'center'
  },
  {
    title: '平均阅读量',
    dataIndex: 'mediaIndexAvgReadNum',
    key: 'mediaIndexAvgReadNum',
    render: text => getNumberW(text)
  },
  {
    title: '平均点赞数',
    dataIndex: 'mediaIndexAvgLikeNum',
    key: 'mediaIndexAvgLikeNum',
    render: text => getNumberW(text)
  },
  {
    title: '最高阅读量',
    dataIndex: 'mediaIndexMaxReadNum',
    key: 'mediaIndexMaxReadNum',
    render: text => getNumberW(text)
  },
  {
    title: '最高点赞数',
    dataIndex: 'mediaIndexMaxLikeNum',
    key: 'mediaIndexMaxLikeNum',
    render: text => getNumberW(text)
  },
  {
    title: '10w+阅读文章数',
    dataIndex: 'mediaIndexReadExceed10wMediaCount',
    key: 'mediaIndexReadExceed10wMediaCount',
    render: text => getNumberW(text)
  },
]
export const getSina = (data = {}) => {
  return [
    {
      name: "粉丝数",
      ...formatWNumberDefult(data.followerCount)
    },
    {
      name: "真粉率",
      value: getPercent(data.trueFansRate),
      unit: `%`
    },
    {
      name: "博文总数（直发 | 转发）",
      value: getIsShow(data.mediaCountAll),
      unit: `个（${getIsShow(data.mediaDirectCountAll)} | 
                ${getIsShow(data.mediaIndirectCountAll)}）`
    },
    {
      name: "图文微博数",
      value: getIsShow(data.mediaPictureUrlValidCountAll),
      unit: `个`
    },
    {
      name: "视频微博数",
      value: getIsShow(data.mediaVideoUrlValidCountAll),
      unit: `个`
    },
  ]
}
const textStyle = { textAlign: "center" }
export const sinaColumns = [
  {
    title: '',
    dataIndex: 'rowName',
    key: 'rowName',
    align: 'center',
    width: '100px'
  },
  {
    title: <div style={textStyle}><h3>转发数</h3>平均 | 最高</div>,
    dataIndex: 'avgread',
    key: 'avgread',
    render(text, record) {
      return <div>{getNumberW(record.mediaRepostAvg)}<Divider type="vertical" />{getNumberW(record.mediaRepostMax)}</div>
    }
  },
  {
    title: <div style={textStyle}><h3>评论数</h3>平均 | 最高</div>,
    dataIndex: 'avgread1',
    key: 'avgread1',
    render(text, record) {
      return <div>{getNumberW(record.mediaCommentAvg)}<Divider type="vertical" />{getNumberW(record.mediaCommentMax)}</div>
    }
  },
  {
    title: <div style={textStyle}><h3>点赞数</h3>平均 | 最高</div>,
    dataIndex: 'avgread2',
    key: 'avgread3',
    render(text, record) {
      return <div>{getNumberW(record.mediaLikeAvg)}<Divider type="vertical" />{getNumberW(record.mediaLikeMax)}</div>
    }
  },
]

const getNumberW = (value) => {
  const data = formatWNumberDefult(value)
  return `${data.value}${data.unit}`
}
export const getRedBook = (data = {}) => {
  return [
    {
      name: "粉丝数",
      ...formatWNumberDefult(data.followerCount)
    },
    // { name: "真粉率", value: '45.2', unit: `%` },
    // { name: "笔记总数", value: '382', unit: `个` },
    {
      name: "图文笔记",
      value: getIsShow(data.pictureCountAll),
      unit: `个`
    },
    {
      name: "视频笔记",
      value: getIsShow(data.mediaCountAll),
      unit: `个`
    }
  ]
}
export const redBookColumns = [
  {
    title: '',
    dataIndex: 'rowName',
    key: 'rowName',
  },
  {
    title: '平均播放数',
    dataIndex: 'mediaPlayAvg',
    key: 'mediaPlayAvg',
    render: text => getNumberW(text)
  },
  {
    title: '平均收藏数',
    dataIndex: 'mediaCollectAvg',
    key: 'mediaCollectAvg',
    render: text => getNumberW(text)
  },
  {
    title: '平均转发数',
    dataIndex: 'mediaRepostAvg',
    key: 'mediaRepostAvg',
    render: text => getNumberW(text)
  },
  {
    title: '平均点赞数',
    dataIndex: 'mediaLikeAvg',
    key: 'mediaLikeAvg',
    render: text => getNumberW(text)
  },
  {
    title: '平均评论数',
    dataIndex: 'mediaCommentAvg',
    key: 'mediaCommentAvg',
    render: text => getNumberW(text)
  },
]
