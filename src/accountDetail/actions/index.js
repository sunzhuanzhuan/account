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
