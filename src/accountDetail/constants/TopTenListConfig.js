export const weChat = {
  title: '近10个文章的数据表现',
  dataKey: '',
  //近10篇文章的封面图、跳转链接、阅读、点赞、发布位置、发布日期、标题
  fireText: '最火文章',
  dataText: ''
}

export const sina = {
  title: '近10个博文的数据表现',
  dataKey: '',
  //近10篇博文跳转链接、评论、点赞、转发、类型（eg：图文微博直发）、发布日期、标题
  fireText: '最火博文',
  dataText: ''
}

export const redBook = {
  title: '近10个笔记的数据表现',
  dataKey: '',
  //近10个笔记的数据表现：近10篇笔记封面图、跳转链接、评论、点赞、收藏、类型（eg：图文/视频 笔记）、发布日期、标题
  fireText: '最火笔记',
  dataText: ''
}


export const douyin = {
  title: '近10个视频数据表现',
  dataKey: 'mediaLikeNum',
  fireText: '最火视频',
  dataText: '评论'
}


export const video = {
  title: '近10个视频数据表现',
  dataKey: 'mediaPlayNum',
  fireText: '最火视频',
  dataText: '播放'
}
//页面根据平台获取相应配置信息
const getTopTenConfig = (platformId) => {
  switch (platformId) {
    case 1:
      return sina
    case 9:
      return weChat
    case 93:
      return redBook
    case 115:
      return douyin
    default:
      return video
  }
}
export default getTopTenConfig
