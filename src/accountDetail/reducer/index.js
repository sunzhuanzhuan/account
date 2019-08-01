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
  [accountDetail.addQueryIndustryInfoList_success]: (state, action) => {
    const list = [...(state.list), ...(action.payload.data.list)]
    return { ...state, list }
  },
  [accountDetail.getQueryOrderCooperationList_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {})

export const isExistCar = handleActions({
  [accountDetail.addToCartAD_success]: (state, action) => {
    return false
  },
  [accountDetail.removeFromCartAD_success]: (state, action) => {
    return true
  },
  [accountDetail.getAccountIsInCart_success]: (state, action) => {
    const data = action.payload.data
    return data == 2
  }
}, false)


export const newVideoList = handleActions({
  [accountDetail.getNewVideo_success]: (state, action) => {
    return [...action.payload.data].map((one, index) => ({ ...one, label: `${index}` }))
  }
}, [])
//账号详情---最近应约价
export const recentReservationOrderPriceList = handleActions({
  [accountDetail.AddGetPriceList_success]: (state, action) => {
    return [
      ...state, ...action.payload.data
    ]
  },
  [accountDetail.getRecentReservationOrderPriceList_success]: (state, action) => {
    return [
      ...action.payload.data
    ]
  }
}, [])


export const historyPriceCount = handleActions({
  [accountDetail.getHistoryPriceCount_success]: (state, action) => {
    return action.payload.data
  }
}, 0)
export default combineReducers({
  baseInfo,
  audienceAttributeInfo,
  trendInfo,
  queryOrderCooperationList,
  queryIndustryInfoList,
  isExistCar,
  newVideoList,
  recentReservationOrderPriceList,
  historyPriceCount
})
