import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions';
import { configItemKeyToField } from "@/accountManage/constants/packageConfig";
import {
  getAccountFieldConfig_success,
  getCooperateNoticeFieldConfig_success,
  getAdvertisingFieldConfig_success
} from '../actions/package'
// 账号特权
export const accountFields = handleActions({
  [combineActions(getAccountFieldConfig_success)]: (state, action) => {
    const data = action.payload.data
    return data.reduce((obj, item) => {
      let key = configItemKeyToField[item.itemKey]
      if (key) {
        obj[key] = true
      }
      return obj
    }, {})
  }
}, {})
// 合作须知
export const cooperateNoticeFields = handleActions({
  [combineActions(getCooperateNoticeFieldConfig_success)]: (state, action) => {
    const data = action.payload.data
    return data.reduce((obj, item) => {
      let key = configItemKeyToField[item.itemKey]
      if (key) {
        obj[key] = true
      }
      return obj
    }, {})
  }
}, {})
//广告服务
export const advertisingFields = handleActions({
  [combineActions(getAdvertisingFieldConfig_success)]: (state, action) => {
    const data = action.payload.data
    return data.reduce((obj, item) => {
      let key = configItemKeyToField[item.itemKey]
      if (key) {
        obj[key] = true
      }
      return obj
    }, {})
  }
}, {})
export default combineReducers({
  accountFields,
  cooperateNoticeFields,
  advertisingFields
})
