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
  getSkill_success
} from '../actions/package'
import {
  getIndustryListForAccount_success
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
  executionStatus: [
    { 'label': '执行中', 'value': '21' },
    { 'label': '已执行', 'value': '22' },
    { 'label': '待执行', 'value': '23' },
    { 'label': '执行取消', 'value': '24' },
    { 'label': '执行终止', 'value': '25' },
    { 'label': '待质检', 'value': '26' },
    { 'label': '质检中', 'value': '27' },
    { 'label': '质检完成', 'value': '28' },
    { 'label': '终止申请中', 'value': '31' },
    { 'label': '已完成', 'value': '32' },
    { 'label': '赔偿申请中', 'value': '33' },
    { 'label': '赔偿通过', 'value': '34' },
    { 'label': '已结案', 'value': '35' }
  ],
  brands: [],
  companies: []
}
export const orderFilterOptions = handleActions({
  /*[combineActions(getExecutor_success)]: (state, action) => {
    return update(state, {
      executors: {
        $set: action.payload.data
      }
    })
  }*/
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
