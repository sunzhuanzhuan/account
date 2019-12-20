const weChat = [
  { name: '评论数', key: 'mediaPlayNum' },
  { name: '点赞数', key: 'mediaLikeNum' },
  { name: '转发数', key: 'mediaRepostNum' },
]

const sina = [
  { name: '阅读数', key: 'mediaReadNum' },
  { name: '点赞数', key: 'mediaLikeNum' },
]

const redBook = [
  { name: '评论数', key: 'mediaPlayNum' },
  { name: '点赞数', key: 'mediaLikeNum' },
  { name: '收藏数', key: 'mediaCollectNum' },
]

const douyin = [
  { name: '评论数', key: 'mediaPlayNum' },
  { name: '点赞数', key: 'mediaLikeNum' },
  { name: '转发数', key: 'mediaRepostNum' },
]
const video = [
  { name: '播放数', key: 'mediaPlayNum' },
  ...douyin
]

const getDeliverConfig = (platformId) => {
  switch (platformId) {
    case '1':
      return sina
    case '9':
      return weChat
    case '93':
      return redBook
    case '115':
      return douyin
    default:
      return video
  }
}
export default getDeliverConfig
