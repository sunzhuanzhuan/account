import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions';
import {
  getDetail_success
} from '../actions/package'
import {
  updateFetchInfo,
  clearAccountInfo,
  getAccountOnShelfStatus_success
} from '../actions'
import { allEditables } from "@/accountManage/constants/editables";

const filterFetchData = (_data) => {
  let data = { ..._data }
  for (let key in data) {
    if (!data.hasOwnProperty(key)) continue
    if (parseInt(data[key]) === 1 && Object.keys(allEditables).indexOf(key) > -1) {
      delete data[key]
      delete data[allEditables[key]]
    }
  }
  return data
}
let initEditable = () => {
  let obj = {}
  Object.keys(allEditables).forEach(key => {
    obj[key] = 1
  })
  return obj
}

// id
export const id = handleActions({
  [combineActions(getDetail_success)]: (state, action) => {
    let { id } = action.payload.data
    return id
  },
  [combineActions(clearAccountInfo)]: () => {
    return ''
  }
}, '')

// 基本信息
export const base = handleActions({
  [combineActions(getDetail_success)]: (state, action) => {
    let { base = {} } = action.payload.data
    return {
      ...state,
      ...base
    }
  },
  [combineActions(updateFetchInfo)]: (state, action) => {
    let data = action.payload.data
    data = filterFetchData(data)
    return {
      ...state,
      ...data
    }
  },
  [combineActions(clearAccountInfo)]: () => {
    return initEditable()
  }
}, initEditable())
// 合作相关
export const cooperation = handleActions({
  [combineActions(getDetail_success)]: (state, action) => {
    let { cooperation = {} } = action.payload.data
    return {
      ...state,
      ...cooperation
    }
  },
  [combineActions(clearAccountInfo)]: () => {
    return {}
  }
}, {})
// 内容相关
export const content = handleActions({
  [combineActions(getDetail_success)]: (state, action) => {
    let { content = {} } = action.payload.data
    return {
      ...state,
      ...content
    }
  },
  [combineActions(clearAccountInfo)]: () => {
    return {}
  }
}, {})
// 策略信息
export const strategyInfo = handleActions({
  [combineActions(getDetail_success)]: (state, action) => {
    let { strategyInfo = {} } = action.payload.data
    return {
      ...state,
      ...strategyInfo
    }
  },
  [combineActions(getAccountOnShelfStatus_success)]: (state, action) => {
    return {
      ...state,
      onShelfStatus: {
        ...state.onShelfStatus,
        ...action.payload.data
      }
    }
  },
  [combineActions(clearAccountInfo)]: () => {
    return {}
  }
}, {})
// 其他信息
export const otherInfo = handleActions({
  [combineActions(getDetail_success)]: (state, action) => {
    let { otherInfo = {} } = action.payload.data
    return {
      ...state,
      ...otherInfo
    }
  },
  [combineActions(clearAccountInfo)]: () => {
    return {}
  }
}, {})
// 特征数据
export const feature = handleActions({
  [combineActions(getDetail_success)]: (state, action) => {
    let { feature = {} } = action.payload.data
    return {
      ...state,
      ...feature
    }
  },
  [combineActions(clearAccountInfo)]: () => {
    return {}
  }
}, {})
// 博主个人信息
export const personalInfo = handleActions({
  [combineActions(getDetail_success)]: (state, action) => {
    let { personalInfo = {} } = action.payload.data
    return {
      ...state,
      ...personalInfo
    }
  },
  [combineActions(clearAccountInfo)]: () => {
    return {}
  }
}, {})
// 账号完整度
const initPerfection = {
  "base": 0,
  "sku": 0,
  "cooperation": 0,
  "content": 0,
  "personal": 0,
  "overall": 0
}
export const perfectionDegree = handleActions({
  [combineActions(getDetail_success)]: (state, action) => {
    let { perfectionDegree = {} } = action.payload.data
    return {
      ...state,
      ...perfectionDegree
    }
  },
  [combineActions(clearAccountInfo)]: () => {
    return initPerfection
  }
}, initPerfection)
// 完整响应信息
export const _response = handleActions({
  [combineActions(getDetail_success)]: (state, action) => {
    return action.payload.data
  },
  [combineActions(clearAccountInfo)]: () => {
    return {}
  }
}, {})

export default combineReducers({
  id,
  base,
  cooperation,
  content,
  strategyInfo,
  personalInfo,
  perfectionDegree,
  otherInfo,
  feature,
  _response
})
