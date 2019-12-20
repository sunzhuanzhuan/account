//微信数据箱体配置
export const weChat = {
  defaultKey: 'read',
  afterText: '文章',
  quality: [
    { key: 'read', name: '阅读' },
    { key: 'like', name: '点赞' },
  ],
}
//微博数据箱体配置
export const sina = {
  defaultKey: 'comment',
  afterText: '文章',
  quality: [
    { key: 'comment', name: '评论' },
    { key: 'like', name: '点赞' },
    { key: 'repost', name: '转发' },
  ],
}
//小红书数据箱体配置
export const redBook = {
  defaultKey: 'comment',
  afterText: '文章',
  quality: [
    { key: 'comment', name: '评论' },
    { key: 'like', name: '点赞' },
    { key: 'collect', name: '收藏' },
  ],
}


//抖音数据箱体配置
const douyin = {
  defaultKey: 'like',
  afterText: '视频',
  quality: [
    { key: 'like', name: '点赞', },
    { key: 'comment', name: '评论' },
  ],
}
//其他短视频
const video = {
  defaultKey: 'like',
  afterText: '视频',
  quality: [
    ...douyin.quality,
    { key: 'play', name: '播放' }
  ],
}
//页面根据平台获取相应配置信息
const getQualityConfig = (platformId) => {
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
export default getQualityConfig
export const keyToName = {
  read: '阅读',
  like: '点赞',
  comment: '评论',
  repost: '转发',
  collect: '收藏',
  play: '播放'
}
