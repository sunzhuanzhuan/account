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
