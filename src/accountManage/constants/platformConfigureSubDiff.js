function listToKey(list, field) {
  return list.reduce((obj, cur) => {
    cur['platforms'].forEach(i => {
      obj[i] = cur[field || 'value']
    })
    return obj
  }, {})
}

// 案例链接
const cooperateLinkPlaceHolderSource = [
  {
    platforms: [1, 9, 23, 26, 33],
    value: '请填写曾经合作的广告案例链接'
  },
  {
    platforms: [105, 108, 106, 107, 112, 113, 114, 24, 25, 100, 102, 101, 109, 110, 111, 29, 30],
    value: '请填写曾合作的广告案例链接；若无案例可添加曾发布的视频、直播回放或微博链接'
  }
]
// 品牌名称
const cooperateBrandPlaceHolderSource = [
  {
    platforms: [1, 9, 26],
    value: '该链接所涉及的品牌名称'
  },
  {
    platforms: [105, 108, 106, 107, 112, 113, 114, 24, 25, 100, 102, 101, 109, 110, 111, 29, 30],
    value: '品牌：该链接所涉及的品牌名称\n主题：如某品牌的线上直播活动、原创视频作品；或该视频的主要内容。'
  }
]
// 数据效果
const cooperateContentPlaceHolderSource = [
  {
    platforms: [1],
    value: '在微博活跃的时间段，通过抽奖的形式进行微博图文直发，使xxx剃须刀曝光在广大男性用户的视野中，通过网页链接，直接跳转到京东店铺购买。阅读量100W+，点赞量3W+，评论量1000W+等；'
  },
  {
    platforms: [9],
    value: '如：原创头条发布，按照帐号一贯的专业风格，围绕xx产品的促销活动进行创作和发布。因为帐号调性匹配，精准针对目标用户，推广效果良好。阅读量100W+，点赞量3W+，评论量1000W+等；'
  },
  {
    platforms: [26],
    value: '请填写合作案例的数据情况或案例亮点'
  },
  {
    platforms: [105, 108, 106, 107, 112, 113, 114, 24, 25, 100, 102, 101, 109, 110, 111, 29, 30],
    value: '1.播放量100w，点赞量3w，转发量1w、观看量3W等等；\n 2.以关爱女性为主题，搭配浪漫温馨风格，完美植入了XX产品或进行了xx主题视频发布；\n 3.促进了产品销售，达到了推广效果，登上平台热门推荐，取得良好效果'
  }
]

export const cooperateLinkPlaceHolderMap = listToKey(cooperateLinkPlaceHolderSource)
export const cooperateBrandPlaceHolderMap = listToKey(cooperateBrandPlaceHolderSource)
export const cooperateContentPlaceHolderMap = listToKey(cooperateContentPlaceHolderSource)
