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

// 维护 - 修改数据
export const updateFetchInfo = createAction('updateFetchInfo', (data) => {
  return { data };
})
