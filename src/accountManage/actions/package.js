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
/**
 * 获取查看态的账号信息
 */
export const {
  getAccountInfoById,
  getAccountInfoById_success
} = createHttpAction('getAccountInfoById', Interface.account.getAccountInfoById);

// 设置模块状态
export const setModuleStatus = createAction('setModuleStatus', (data) => {
  return { data };
})

// 更新账号信息
export const {
  updateBaseInfo
} = createHttpAction('updateBaseInfo', Interface.account.updateBaseInfo, {
  method: 'post'
})
export const {
  updateCooperationInfo
} = createHttpAction('updateCooperationInfo', Interface.account.updateCooperationInfo, {
  method: 'post'
})
export const {
  updateContentInfo
} = createHttpAction('updateContentInfo', Interface.account.updateContentInfo, {
  method: 'post'
})
export const {
  updateStrategyInfo
} = createHttpAction('updateStrategyInfo', Interface.account.updateStrategyInfo, {
  method: 'post'
})
export const {
  updateOtherInfo
} = createHttpAction('updateOtherInfo', Interface.account.updateOtherInfo, {
  method: 'post'
})
export const {
  updatePersonalInfo
} = createHttpAction('updatePersonalInfo', Interface.account.updatePersonalInfo, {
  method: 'post'
})

// 获取配置项
// 认证信息
export const {
  getVerifiedType,
  getVerifiedType_success
} = createHttpAction('getVerifiedType', Interface.config.getVerifiedType);
// 获取账号特权
export const {
  getAccountFieldConfig,
  getAccountFieldConfig_success
} = createHttpAction('getAccountFieldConfig', Interface.config.getAccountFieldConfig);
// 合作须知项
export const {
  getCooperateNoticeFieldConfig,
  getCooperateNoticeFieldConfig_success
} = createHttpAction('getCooperateNoticeFieldConfig', Interface.config.getCooperateNoticeFieldConfig);
// 广告服务项
export const {
  getAdvertisingFieldConfig,
  getAdvertisingFieldConfig_success
} = createHttpAction('getAdvertisingFieldConfig', Interface.config.getAdvertisingFieldConfig);
// 广告服务可选
export const {
  getAdvertisingOfferServices,
  getAdvertisingOfferServices_success
} = createHttpAction('getAdvertisingOfferServices', Interface.config.getAdvertisingOfferServices);
// 内容形式配置项
export const {
  getContentForm,
  getContentForm_success
} = createHttpAction('getContentForm', Interface.config.getContentForm);
// 内容特点配置项
export const {
  getContentFeature,
  getContentFeature_success
} = createHttpAction('getContentFeature', Interface.config.getContentFeature);
// 内容风格配置项
export const {
  getContentStyle,
  getContentStyle_success
} = createHttpAction('getContentStyle', Interface.config.getContentStyle);
// 获取国家列表
export const {
  getCountryList,
  getCountryList_success
} = createHttpAction('getCountryList', Interface.common.getCountryList);
// 获取职业列表
export const {
  getOccupation,
  getOccupation_success
} = createHttpAction('getOccupation', Interface.config.getOccupation);
// 获取宠物列表
export const {
  getPet,
  getPet_success
} = createHttpAction('getPet', Interface.config.getPet);
// 获取技能列表
export const {
  getSkill,
  getSkill_success
} = createHttpAction('getSkill', Interface.config.getSkill);
// 获取地域加热门城市
export const {
  getAreasHotCity,
  getAreasHotCity_success
} = createHttpAction('getAreasHotCity', Interface.common.getAreasHotCity);
