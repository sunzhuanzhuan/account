import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'
import { createAction } from 'redux-actions'

// 获取账号基础信息
export const {
  getBaseInfo,
  getBaseInfo_success
} = createHttpAction('getBaseInfo', Interface.getBaseInfo);


export const {
  getTrend,
  getTrend_success
} = createHttpAction('getTrend', Interface.getTrend);
//获取受众属性（性别，年龄，消费能力、tgl、设备分布）
export const {
  getAudienceAttribute,
  getAudienceAttribute_success
} = createHttpAction('getAudienceAttribute', Interface.getAudienceAttribute);

//获取广告案例类型
export const {
  getQueryIndustryInfoList,
  getQueryIndustryInfoList_success
} = createHttpAction('getQueryIndustryInfoList', Interface.getQueryIndustryInfoList);

//获取历史广告案例
export const {
  getQueryOrderCooperationList,
  getQueryOrderCooperationList_success
} = createHttpAction('getQueryOrderCooperationList', Interface.getQueryOrderCooperationList, {
  method: 'post',
});
//新增购物车账号
export const {
  addToCartAD,
  addToCartAD_success
} = createHttpAction('addToCartAD', Interface.addToCartAD, {
  method: 'post',
  //isTrack: true,
  // trackResult: (search, data) => {
  //   return {
  //     account_id: data && data[0]
  //   }
  // }
})
//批量删除购物车
export const {
  removeFromCartAD,
  removeFromCartAD_success
} = createHttpAction('removeFromCartAD', Interface.removeFromCartAD, {
  method: 'post'
})
//查询是否在选号车以选中
export const {
  getAccountIsInCart,
  getAccountIsInCart_success
} = createHttpAction('getAccountIsInCart', Interface.getAccountIsInCart)
