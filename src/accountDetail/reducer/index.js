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


export default combineReducers({
  baseInfo,
  audienceAttributeInfo,
  trendInfo
})
