import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'
import { createAction } from 'redux-actions'

/**
 * 获取账号信息
 */
export const {
  getDetail,
  getDetail_success
} = createHttpAction('getDetail', Interface.account.getDetail);

// 设置模块状态
export const setModuleStatus = createAction('setModuleStatus', (data) => {
  return { data };
})

// 配置项接口
// 认证信息
export const {
  getVerifiedType,
} = createHttpAction('getVerifiedType', Interface.config.getVerifiedType);
// 获取账号特权
export const {
  getAccountFieldConfig,
} = createHttpAction('getAccountFieldConfig', Interface.config.getAccountFieldConfig);
// 合作须知项
export const {
  getCooperateNoticeFieldConfig,
} = createHttpAction('getCooperateNoticeFieldConfig', Interface.config.getCooperateNoticeFieldConfig);
// 广告服务项
export const {
  getAdvertisingFieldConfig,
} = createHttpAction('getAdvertisingFieldConfig', Interface.config.getAdvertisingFieldConfig);
// 广告服务可选
export const {
  getAdvertisingOfferServices,
} = createHttpAction('getAdvertisingOfferServices', Interface.config.getAdvertisingOfferServices);
// 获取地域加热门城市
export const {
  getAreasHotCity,
  getAreasHotCity_success,
} = createHttpAction('getAreasHotCity', Interface.common.getAreasHotCity);
