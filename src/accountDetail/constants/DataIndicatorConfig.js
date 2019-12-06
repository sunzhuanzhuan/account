export const getWechat = (data = {}) => {
  return [
    { name: "总发布数（原创文章数）", value: '382', unit: `个（${143}篇）` },
    { name: "10w+阅读文章数", value: '8', unit: `个` },
    { name: "真实阅读率", value: '48.5', unit: `%` },
    { name: "近28天推送次数", value: '6', unit: `次` },
    { name: "近28天发布频率", value: '2.9', unit: `个/周` },
  ]
}
export const wechatColumns = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
    align: 'center'
  },
  {
    title: '平均阅读量',
    dataIndex: 'avgread',
    key: 'avgread',
  },
  {
    title: '平均点赞数',
    dataIndex: 'avglike',
    key: 'avglike',
  },
  {
    title: '最高阅读量',
    dataIndex: 'highlike',
    key: 'highlike',
  },
  {
    title: '最高点赞数',
    dataIndex: 'highlike',
    key: 'highlike',
  },
  {
    title: '10w+阅读文章数',
    dataIndex: 'read',
    key: 'read',
  },
]
export const getSina = (data = {}) => {
  return [
    { name: "粉丝数", value: '382', unit: `万` },
    { name: "真粉率", value: '382', unit: `%` },
    { name: "博文总数（原创 | 转发）", value: '382', unit: `个（${142} | ${240}）` },
    { name: "图文微博数", value: '382', unit: `个` },
    { name: "视频微博数", value: '382', unit: `个` },
  ]
}
export const sinaColumns = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    width: '100px'
  },
  {
    title: '平均转发数 | 最高转发数',
    dataIndex: 'avgread',
    key: 'avgread',
  },
  {
    title: '平均评论数 | 最高评论数',
    dataIndex: 'avgread',
    key: 'avgread',
  },
  {
    title: '平均点赞数 | 最高点赞数',
    dataIndex: 'avgread',
    key: 'avgread',
  },
]
export const getRedBook = (data = {}) => {
  return [
    { name: "粉丝数", value: '382', unit: `万` },
    // { name: "真粉率", value: '45.2', unit: `%` },
    // { name: "笔记总数", value: '382', unit: `个` },
    { name: "图文笔记", value: '382', unit: `个` },
    { name: "视频笔记", value: '382', unit: `个` }
  ]
}
export const redBookColumns = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '平均播放数',
    dataIndex: 'avgread平均播放数',
    key: 'avgread平均播放数',
  },
  {
    title: '平均收藏数',
    dataIndex: 'avgread平均收藏数',
    key: 'avgread平均收藏数',
  },
  {
    title: '平均转发数',
    dataIndex: 'avgread平均转发数',
    key: 'avgread平均转发数',
  },
  {
    title: '平均点赞数',
    dataIndex: 'avgread平均点赞数',
    key: 'avgread平均点赞数',
  },
  {
    title: '平均评论数',
    dataIndex: 'avgread平均评论数',
    key: 'avgread平均评论数',
  },
]
