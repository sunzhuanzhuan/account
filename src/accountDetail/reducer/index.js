import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import * as accountDetail from '../actions'
//获取token

export const baseInfo = handleActions({
  [accountDetail.getBaseInfo_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {})

export const trendInfo = handleActions({
  [accountDetail.getTrend_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {})

export const audienceAttributeInfo = handleActions({
  [accountDetail.getAudienceAttribute_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {})


export const queryIndustryInfoList = handleActions({
  [accountDetail.getQueryIndustryInfoList_success]: (state, action) => {
    return [...action.payload.data]
  }
}, [])

export const queryOrderCooperationList = handleActions({
  [accountDetail.getQueryOrderCooperationList_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {})

export const isExistCar = handleActions({
  [accountDetail.getAccountIsInCart_success]: (state, action) => {
    const data = action.payload.data
    return data == 2
  }
}, false)



export default combineReducers({
  baseInfo,
  audienceAttributeInfo,
  trendInfo,
  queryOrderCooperationList,
  queryIndustryInfoList,
  isExistCar
})
