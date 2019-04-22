const oldPreFix = "/operator-gateway/accountDetail/v1/"
export default {
  getBaseInfo: oldPreFix + 'getBaseInfo',
  getAudienceAttribute: oldPreFix + 'getAudienceAttribute',
  getTrend: oldPreFix + 'getTrend',
  getQueryOrderCooperationList: oldPreFix + 'queryOrderCooperationList',
  getQueryIndustryInfoList: oldPreFix + 'getUserBaseInfoWithAdmin',
  getNewVideo: oldPreFix + 'getNewVideo',
  //消费能力
  getQueryTgiList: oldPreFix + 'getQueryTgiList',
  //删除购物车数据
  removeFromCartAD: "/export/account/removeFromCart",
  //添加购物车数据
  addToCartAD: "/export/account/addToCart",
  //查询是否在选号车以选中
  getAccountIsInCart: "/export/account/getAccountIsInCart",
  //应约价格数量
  getHistoryPriceCount: '/export/account/getHistoryPriceCount',
  //应约价格
  getRecentReservationOrderPriceList: "/export/account/getRecentReservationOrderPriceList",
}
