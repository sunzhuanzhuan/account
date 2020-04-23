import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'
import { createAction } from 'redux-actions';

//获取公司下拉列表
export const {
  getCompanyList2,
  getCompanyList_success
} = createHttpAction('getCompanyList2', Interface.common.getCompanyList)

// 模糊搜索公司
export const {
  searchForCompanyByName,
} = createHttpAction('searchForCompanyByName', Interface.common.searchForCompanyByName)

// 模糊搜索品牌
export const {
  searchForBrandByName,
} = createHttpAction('searchForBrandByName', Interface.common.searchForBrandByName)

//新上传获取token
export const {
  getNewToken
} = createHttpAction('getNewToken', Interface.common.getToken)

//所有平台下拉列表
export const {
  getAllPlatform,
  getAllPlatform_success
} = createHttpAction('getAllPlatform', Interface.common.getAllPlatform)

// 可用媒体平台下拉列表
export const {
  getAvailablePlatformList,
  getAvailablePlatformList_success
} = createHttpAction('getAvailablePlatformList', Interface.common.platformList)

// 获取中国城市列表
export const {
  getChineseCities,
  getChineseCities_success
} = createHttpAction('getChineseCities', Interface.common.getChineseCities)

export const {
  getAuthorizations,
  getAuthorizations_success
} = createHttpAction('getAuthorizations', Interface.auth.getAuthorizations, {
  method: 'get',
  isHttp: true,
  ignoreToast: true,
  ignoreLoading: true
});

// 获取分类选项
export const {
  getAllClassifyInfos
} = createHttpAction('getAllClassifyInfos', Interface.common.getAllClassifyInfos)

// 获取真实的文件下载地址
export const {
  getFileRealPath
} = createHttpAction('getFileRealPath', Interface.common.getFileRealPath)

// 敏感词校验(JAVA)
export const {
  checkSensitiveWord,
} = createHttpAction('checkSensitiveWord', Interface.common.checkSensitiveWord, {
  method: 'post',
})

export const resetSiderAuth = createAction('RESET_SIDERMENU_AUTH', () => {
  return [];
})

// 获取新b端可添加平台列表
export const {
  getNewBPlatforms
} = createHttpAction('getNewBPlatforms', Interface.common.getNewBPlatforms)

// 根据主账号Id获取主账号基本信息
export const {
  getOwnerBaseInfo
} = createHttpAction('getOwnerBaseInfo', Interface.account.getOwnerBaseInfo)


export const getCompanyList = getCompanyList2
