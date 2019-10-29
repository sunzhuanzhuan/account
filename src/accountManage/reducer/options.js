import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions';
import update from 'immutability-helper'

import {
  getVerifiedType_success,
  // getCooperateNoticeFieldConfig_success,
  // getAdvertisingFieldConfig_success,
  getAdvertisingOfferServices_success,
  getContentForm_success,
  getContentFeature_success,
  getContentStyle_success,
  getCountryList_success,
  getOccupation_success,
  getPet_success,
  getSkill_success,
} from '../actions/package'
import {
  getIndustryListForAccount_success,
  getOrdersFilterItem_success
} from '../actions'
import {
  getAvailablePlatformList_success
} from '@/actions'
// 认证类型
export const verified = handleActions({
  [combineActions(getVerifiedType_success)]: (state, action) => {
    const data = action.payload.data
    return data.map(item => ({
      id: parseInt(item.itemKey),
      name: item.itemValue
    }))
  }
}, [])
// 可提供服务项
export const adServiceItems = handleActions({
  [combineActions(getAdvertisingOfferServices_success)]: (state, action) => {
    const data = action.payload.data
    return data.map(item => ({
      id: parseInt(item.itemKey),
      adServiceItemName: item.itemValue
    }))
  }
}, [])
// 内容相关
export const forms = handleActions({
  [combineActions(getContentForm_success)]: (state, action) => {
    const data = action.payload.data
    return data.map(item => ({
      id: parseInt(item.itemKey),
      name: item.itemValue
    }))
  }
}, [])
export const features = handleActions({
  [combineActions(getContentFeature_success)]: (state, action) => {
    const data = action.payload.data
    return data.map(item => ({
      id: parseInt(item.itemKey),
      name: item.itemValue
    }))
  }
}, [])
export const styles = handleActions({
  [combineActions(getContentStyle_success)]: (state, action) => {
    const data = action.payload.data
    return data.map(item => ({
      id: parseInt(item.itemKey),
      name: item.itemValue
    }))
  }
}, [])
export const nationality = handleActions({
  [combineActions(getCountryList_success)]: (state, action) => {
    const data = action.payload.data
    return data.map(item => ({ value: item.id, label: item.areaName }))
  }
}, [])
export const occupations = handleActions({
  [combineActions(getOccupation_success)]: (state, action) => {
    const data = action.payload.data
    return data.map(item => ({ value: parseInt(item.itemKey), label: item.itemValue }))
  }
}, [])
export const industry = handleActions({
  [combineActions(getIndustryListForAccount_success)]: (state, action) => {
    const data = action.payload.data
    return data.map(item => ({ value: item.id, label: item.name }))
  }
}, [])
export const platforms = handleActions({
  [combineActions(getAvailablePlatformList_success)]: (state, action) => {
    return action.payload.data
  }
}, [])
export const pets = handleActions({
  [combineActions(getPet_success)]: (state, action) => {
    const data = action.payload.data
    return data.map(item => ({ id: parseInt(item.itemKey), name: item.itemValue }))
  }
}, [])
export const skills = handleActions({
  [combineActions(getSkill_success)]: (state, action) => {
    const data = action.payload.data
    let newData = data.map(item => {
      let obj = {
        value: parseInt(item.itemKey),
        label: item.itemValue
      }
      if (item.childrenList) {
        obj.children = item.childrenList.map(n => ({
          value: parseInt(n.itemKey),
          label: n.itemValue
        }))
      }
      return obj
    })
    return newData
  }
}, [])
export const skillReduce = handleActions({
  [combineActions(getSkill_success)]: (state, action) => {
    const data = action.payload.data
    let newData = []
    data.forEach(item => {
      if (item.childrenList) {
        newData = newData.concat(item.childrenList.map(n => ({
          value: parseInt(n.itemKey),
          label: n.itemValue
        })))
      }
    })
    return newData
  }
}, [])

// 订单信息筛选项
const initOrderFilterOptions = {
  reservationStatus: {},
  customerConfirmationStatus: {},
  executionStatus: {},
}
export const orderFilterOptions = handleActions({
  [combineActions(getOrdersFilterItem_success)]: (state, action) => {
    const {
      reservation_status,
      customer_confirmation_status,
      execution_status
    } = action.payload.data
    return update(state, {
      reservationStatus: {
        $set: reservation_status
      },
      customerConfirmationStatus: {
        $set: customer_confirmation_status
      },
      executionStatus: {
        $set: execution_status
      },
    })
  }
}, initOrderFilterOptions)

export default combineReducers({
  verified,
  adServiceItems,
  forms,
  features,
  styles,
  industry,
  platforms,
  pets,
  skills,
  skillReduce,
  occupations,
  nationality,
  orderFilterOptions
})
