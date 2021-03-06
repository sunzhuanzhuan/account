import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'
import { createAction } from 'redux-actions'

/**
 * 获取账号信息
 */
// 获取平台信息(图标, 名称)
export const {
  getPlatformInfo,
  getPlatformInfo_success
} = createHttpAction('getPlatformInfo', Interface.common.platform);


// 获取账号基本信息
export const {
  getAccountInfo,
  getAccountInfo_success
} = createHttpAction('getAccountInfo', Interface.getAccountInfo);

// 获取账号ab端上下架信息
export const {
  getAccountOnShelfStatus,
  getAccountOnShelfStatus_success
} = createHttpAction('getAccountOnShelfStatus', Interface.getAccountOnShelfStatus, {
  ignoreToast: true
});

// 获取受众画像信息
export const {
  getAudiencePortrait,
  getAudiencePortrait_success
} = createHttpAction('getAudiencePortrait', Interface.getAudiencePortrait);


// 获取主账号信息
export const {
  getPrimaryAccountInfo,
  getPrimaryAccountInfo_success
} = createHttpAction('getPrimaryAccountInfo', Interface.getPrimaryAccountInfo, {
  method: 'get'
});

// 获取主账号发票信息
export const {
  getUserInvoiceInfo,
  getUserInvoiceInfo_success
} = createHttpAction('getUserInvoiceInfo', Interface.getUserInvoiceInfo, {
  method: 'get'
});
// 获取上传图片token
export const {
  getUploadToken,
  getUploadToken_success
} = createHttpAction('getUploadToken', Interface.getUploadToken, {
  method: 'get'
});


// 编辑账号时，获取报价信息
export const {
  getSkuList,
  getSkuList_success
} = createHttpAction('getSkuList', Interface.getSkuList, {
  method: 'get'
});

// 获取媒体平台下某一个sku的权益list
export const {
  getSkuEquitiesList,
} = createHttpAction('getSkuEquitiesList', Interface.getSkuEquitiesList, {
  method: 'get'
});

// 三方相关报价
// 编辑账号时，获取三方报价项信息
export const {
  getAccountTrinitySkuInfo,
  getAccountTrinitySkuInfo_success
} = createHttpAction('getAccountTrinitySkuInfo', Interface.getAccountTrinitySkuInfo, {
  method: 'get',
});
export const {
  addOrUpdateAccountTrinitySkuInfo
} = createHttpAction('addOrUpdateAccountTrinitySkuInfo', Interface.addOrUpdateAccountTrinitySkuInfo, {
  method: 'post',
  ignoreToast: true
});

// 获取报价项信息
export const {
  getSkuTypeList,
  getSkuTypeList_success
} = createHttpAction('getSkuTypeList', Interface.getSkuTypeList, {
  method: 'get'
});

// 抓取账号信息
export const {
  fetchAccountBaseInfo,
  fetchAccountBaseInfo_request,
  fetchAccountBaseInfo_success
} = createHttpAction('fetchAccountBaseInfo', Interface.fetchAccountBaseInfo, {
  method: 'get'
});

// 更新页面抓取账号信息
export const {
  fetchAccountBaseInfoByUpdate,
  fetchAccountBaseInfoByUpdate_request
} = createHttpAction('fetchAccountBaseInfoByUpdate', Interface.fetchAccountBaseInfo, {
  method: 'get'
});
// 维护 - 修改数据
export const updateFetchInfo = createAction('updateFetchInfo', (data) => {
  return { data };
})
// 添加 - 修改数据
export const addFetchInfo = createAction('addFetchInfo', (data) => {
  return { data };
})

// 使得添加页面提交可用
export const setAddSubmit = createAction('setAddSubmit', (data) => {
  return data;
})

// 入库页面提交
export const {
  saveAccountInfo
} = createHttpAction('saveAccountInfo', Interface.saveAccountInfo, {
  method: 'post',
  ignoreToast: true
});
// 维护页面提交
/*export const {
	updateAccountInfo,
	updateAccountInfo_success
} = createHttpAction('updateAccountInfo', Interface.updateAccountInfo, {
	method: 'post',
});*/

// 获取 国家 -> 省 -> 市 -> 区 四级级联
export const {
  getRegionCode,
  getRegionCode_success
} = createHttpAction('getRegionCode', Interface.common.areas)

//获取行业信息
export const {
  getIndustryListForAccount,
  getIndustryListForAccount_success
} = createHttpAction('getIndustryListForAccount', Interface.common.industries)
//敏感词判别
export const {
  sensitiveWordsFilter,
  sensitiveWordsFilter_success
} = createHttpAction('sensitiveWordsFilter', Interface.sensitiveWordsFilter, {
  method: 'post'
})

/**
 * 更新账号信息 - new
 */
// 基础信息
export const {
  updateAccountBase
} = createHttpAction('updateAccountBase', Interface.update.accountBase, {
  method: 'post'
});
// 粉丝信息
export const {
  updateAccountFans
} = createHttpAction('updateAccountFans', Interface.update.accountFans, {
  method: 'post'
});
// 账号特征
export const {
  updateAccountFeature
} = createHttpAction('updateAccountFeature', Interface.update.accountFeature, {
  method: 'post'
});
// 合作信息
export const {
  updateAccountCooperation
} = createHttpAction('updateAccountCooperation', Interface.update.accountCooperation, {
  method: 'post'
});
// 上下架信息
export const {
  updateAccountOnSale
} = createHttpAction('updateAccountOnSale', Interface.update.accountOnSale, {
  method: 'post'
});
// 策略信息
export const {
  updateAccountStrategy
} = createHttpAction('updateAccountStrategy', Interface.update.accountStrategy, {
  method: 'post'
});
// 其他信息
export const {
  updateAccountOther
} = createHttpAction('updateAccountOther', Interface.update.accountOther, {
  method: 'post'
});
// 维护页面报价信息提交
export const {
  saveSku
} = createHttpAction('saveSku', Interface.update.saveSku, {
  method: 'post',
  ignoreToast: true
});
// 修改受众画像
export const {
  updateAccountAudiencePortrait
} = createHttpAction('updateAccountAudiencePortrait', Interface.update.accountAudiencePortrait, {
  method: 'post'
});

/**
 * 内容分类反馈
 */
// 判断当前账号是否有内容分类反馈信息
export const {
  isExistClassify
} = createHttpAction('isExistClassify', Interface.classify.isExistClassify)

// 查看分类反馈进度
export const {
  getAuditDialogInfo
} = createHttpAction('getAuditDialogInfo', Interface.classify.getAuditDialogInfo)

// 提交内容分类反馈
export const {
  addClassifyAuditInfo
} = createHttpAction('addClassifyAuditInfo', Interface.classify.addClassifyAuditInfo, {
  method: 'post'
})
// 提交自定义分类
export const {
  addCustomClassify
} = createHttpAction('addCustomClassify', Interface.classify.addCustomClassify, {
  method: 'post'
})
// 维护 - 清除账号数据
export const clearAccountInfo = createAction('clearAccountInfo', () => {
  return null
})

/**
 * 获取政策ID和渠道折扣
 */
export const {
  getPolicyIdAndDiscount,
  getPolicyIdAndDiscount_success,
} = createHttpAction('getPolicyIdAndDiscount', Interface.getPolicyRuleInfoByAccount)
export const {
  getInfoIdsByUserIdAndPlatformId,
  getInfoIdsByUserIdAndPlatformId_success,
} = createHttpAction('getInfoIdsByUserIdAndPlatformId', Interface.getPolicyRuleInfoByPlatform)
// 计算刊例价
export const {
  calculatePrice,
} = createHttpAction('calculatePrice', Interface.calculatePrice, {
  method: 'post'
})

/**
 * 订单信息
 */
export const {
  getOrdersFilterItem,
  getOrdersFilterItem_success
} = createHttpAction('getOrdersFilterItem', Interface.orders.getOrdersFilterItem)

// 获取账号订单列表

export const {
  getOrdersByAccount,
  getOrdersByAccount_success
} = createHttpAction('getOrdersByAccount', Interface.orders.getOrdersByAccount)
/*
 * 恢复账号
 */
export const {
  batchUpdateAccountIsDeleted,
} = createHttpAction('batchUpdateAccountIsDeleted', Interface.batchUpdateAccountIsDeleted, {
  method: 'post'
})
