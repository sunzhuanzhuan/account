import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions';
import {
  clearAccountInfo,
  getOrdersByAccount_success
} from '../actions'

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
  [combineActions(getOrdersByAccount_success)]: handleResponseList('order_id'),
  [combineActions(clearAccountInfo)]: initList
}, initList())

export default orders
