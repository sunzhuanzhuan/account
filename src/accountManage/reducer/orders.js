import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions';
import {
  getVerifiedType_success
} from '../actions/package'
import {
  clearAccountInfo
} from '../actions'
import {
  getAvailablePlatformList_success
} from '@/actions'

// 处理列表数据为map表
function handleResponseList(primary_key) {
  return (state, action) => {
    let response = action.payload.data || {}, source = {}
    const { total = 0, page = 1, pageSize = 50, rows = [] } = response
    const list = rows.map(item => {
      source[item[primary_key]] = { ...item }
      source[item[primary_key]]['key'] = item[primary_key]
      return item[primary_key]
    })
    return {
      total, page, pageSize, list, source: { ...state.source, ...source }, response
    }
  }
}

// 初始化列表数据
function initList() {
  return { list: [], source: {}, total: 0, page: 1, pageSize: 50, response: {} }
}

// 相关订单信息
export const orders = handleActions({
  [combineActions(clearAccountInfo)]: handleResponseList('order_id'),
  [combineActions(clearAccountInfo)]: () => {
    return initList()
  }
}, initList())

export default orders
