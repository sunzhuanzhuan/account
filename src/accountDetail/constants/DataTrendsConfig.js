//微信图表配置
const weChatContent = {
  title: '阅读数和点赞数趋势图',
  content: '可观察最近10周账号阅读数和点赞数变化趋势',
  dataKey: 'contentSum',//图表数据对应key值
  BluelineText: '阅读数',
  BluelineName: 'followerCountFull',
  GreenlineText: '点赞数',
  GreenlineName: 'followerCountIncre'
}
//微信数据趋势配置
export const weChat = {
  trend: [
    { key: 1, name: '全部', content: { ...weChatContent, dataKey: 'contentSum' } },
    { key: 2, name: '第一条', content: { ...weChatContent, dataKey: 'contentSum' } },
    { key: 3, name: '第二条', content: { ...weChatContent, dataKey: 'contentSum' } }
  ],
}
//微博图表配置
const sinaContent = {
  title: '评论数和点赞数趋势图',
  content: '可观察最近10周账号评论数和点赞数变化趋势',
  dataKey: 'contentSum',//图表数据对应key值
  BluelineText: '评论数',
  BluelineName: 'followerCountFull',
  GreenlineText: '点赞数',
  GreenlineName: 'followerCountIncre'
}
//微博数据趋势配置
export const sina = {
  trend: [
    { key: 1, name: '全部', content: { ...sinaContent, dataKey: 'contentSum' } },
    { key: 2, name: '直发', content: { ...sinaContent, dataKey: 'contentSum' } },
    { key: 3, name: '转发', content: { ...sinaContent, dataKey: 'contentSum' } }
  ],
}
//小红书图表配置
const redBookContent = {
  title: '评论数和点赞数趋势图',
  content: '可观察最近10周账号评论数和点赞数变化趋势',
  dataKey: 'contentSum',//图表数据对应key值
  BluelineText: '评论数',
  BluelineName: 'followerCountFull',
  GreenlineText: '点赞数',
  GreenlineName: 'followerCountIncre'
}
//小红书数据趋势配置
export const redBook = {
  trend: [
    { key: 1, name: '全部', content: { ...redBookContent, dataKey: 'contentSum' } },
    { key: 2, name: '图文', content: { ...redBookContent, dataKey: 'contentSum' } },
    { key: 3, name: '视频', content: { ...redBookContent, dataKey: 'contentSum' } }
  ]
}
//视频数据趋势配置
export const getVideo = (platformId) => {
  //抖音视频与其他视频不同判断
  const typeText = platformId == 115 ? '点赞增量' : '播放增量'
  return {
    trend: [
      {
        key: 1, name: '粉丝趋势',
        content: {
          title: '粉丝累计量和增量趋势图',
          content: '可观察最近10周账号粉丝累计和增量变化趋势',
          dataKey: 'contentSum',
          BluelineText: '粉丝累计量',
          BluelineName: 'followerCountFull',
          GreenlineText: '粉丝增量',
          GreenlineName: 'followerCountIncre',
        }
      },
      {
        key: 2, name: '传播趋势',
        content: {
          title: `评论增量和${typeText}趋势图`,
          content: `可观察最近10周内评论增量和${typeText}变化趋势`,
          dataKey: 'spreadTrend',
          BluelineText: '评论增量',
          BluelineName: 'mediaCommentAvgIncre',
          GreenlineText: typeText,
          GreenlineName: platformId == 115 ? 'mediaLikeAvgIncre' : 'mediaPlayAvgIncre'
        }
      },
      {
        key: 3, name: '互动趋势',
        content: {
          title: '互动数和互动率趋势图',
          content: '可观察最近10周内互动数和互动率变化趋势',
          dataKey: 'interactive',
          BluelineText: '互动数',
          BluelineName: 'mediaInteractionAvgIncre',
          GreenlineText: platformId == 115 ? null : '互动率',
          GreenlineName: platformId == 115 ? null : 'interactionProportionIncre'
        }
      }
    ],
  }
}
//页面根据平台获取相应配置信息
const getTrendConfig = (platformId) => {
  switch (platformId) {
    case '1':
      return sina
    case '9':
      return weChat
    case '93':
      return redBook
    default:
      return getVideo(platformId)
  }
}
export default getTrendConfig
