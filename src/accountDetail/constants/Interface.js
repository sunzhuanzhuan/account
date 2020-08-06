const oldPreFix = "/operator-gateway/accountDetail/v1/"
export default {
  getBaseInfo: oldPreFix + 'getBaseInfo',
  getAudienceAttribute: oldPreFix + 'getAudienceAttribute',
  getTrend: oldPreFix + 'getTrend',
  getQueryOrderCooperationList: oldPreFix + 'queryOrderCooperationList',
  getQueryIndustryInfoList: oldPreFix + 'getUserBaseInfoWithAdmin',
  getNewVideo: oldPreFix + 'getNewVideo',

  //删除购物车数据
  removeFromCartAD: "/operator-gateway/search/export/branch/removeFromCart",
  //添加购物车数据
  addToCartAD: "/operator-gateway/search/export/branch/addToCart",
  //查询是否在选号车以选中
  getAccountIsInCart: "/operator-gateway/search/export/branch/getAccountIsInCart",
  //应约价格数量
  getHistoryPriceCount: '/operator-gateway/search/export/getHistoryPriceCount',
  //应约价格
  getRecentReservationOrderPriceList: "/operator-gateway/search/export/getRecentReservationOrderPriceList",
}
