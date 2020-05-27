/**
 * Created by lzb on 2020-03-16.
 */

/**
 * 处理列表数据为map表
 * @param primary_key
 * @returns {function(state, action): {total: *, keys: *, response: *, pageSize: *, source, pageNum: *}}
 */
export const reducersResponseList = (primary_key = 'id') => {
  return (state, action) => {
    let response = action.payload.data || {}, source = {}
    const { total = 0, pageNum = 1, pageSize = 50, list = [] } = response
    const keys = list.map(item => {
      source[item[primary_key]] = { ...item }
      source[item[primary_key]]['key'] = item[primary_key]
      return item[primary_key]
    })
    return {
      total,
      pageNum,
      pageSize,
      keys,
      source: { ...state.source, ...source },
      response
    }
  }
}

/**
 * 初始化列表数据
 * @returns {{total: number, keys: [], response: {}, pageSize: number, source: {}, pageNum: number}}
 */
reducersResponseList.initList = (pageSize = 50) => {
  return { keys: [], source: {}, total: 0, pageNum: 1, pageSize, response: {} }
}
