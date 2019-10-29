import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions';
import { allEditables } from '../constants/editables';
import account from './account'
import options from './options'
import visibility from './visibility'
import orders from './orders'


import {
  getAccountInfo_success,
  getAudiencePortrait_success,
  fetchAccountBaseInfo_request,
  fetchAccountBaseInfoByUpdate_request,
  getAccountOnShelfStatus_success,
  getAccountTrinitySkuInfo_success,
  updateFetchInfo,
  addFetchInfo,
  getSkuList_success,
  getSkuTypeList_success,
  getPrimaryAccountInfo_success,
  getUploadToken_success,
  getPlatformInfo_success,
  getRegionCode_success,
  getIndustryListForAccount_success,
  getUserInvoiceInfo_success,
  sensitiveWordsFilter_success,
  getPolicyIdAndDiscount_success,
  getInfoIdsByUserIdAndPlatformId_success,
  setAddSubmit
} from '../actions'

import {
  setModuleStatus,
  getDetail_success,
  getAccountInfoById_success,
  getAreasHotCity_success
} from '../actions/package'

const handleEdit = (data) => {
  for (let key in data) {
    if (!data.hasOwnProperty(key)) continue
    if (data[key] == 1 && Object.keys(allEditables).find(str => str === key)) {
      delete data[key]
      delete data[allEditables[key]]
    }
  }
  return data
}
let initAccountData = () => {
  let account = {}
  Object.keys(allEditables).forEach(key => {
    account[key] = 1
  })
  return account
}

// 扁平化数据
let reduceData = (data) => {
  let { id, base, extend, strategy, cooperationCases, skuList, adminUser, user, audiencePortrait, feature } = data
  let value = Object.assign({}, base, extend, adminUser, user, feature)
  value = {
    ...value,
    strategy, cooperationCases, skuList, audiencePortrait,
    ...(base.onShelfStatus || {}),
    accountId: id
  }
  return value || {}
}

export const accountInfo = handleActions({
  [combineActions(getAccountInfo_success)]: (state, action) => {
    let { data } = action.payload
    return {
      ...state,
      ...reduceData(data)
    }
  },
  [combineActions(getAccountOnShelfStatus_success)]: (state, action) => {
    let { data } = action.payload
    return {
      ...state,
      ...data
    }
  },
  /*fetchAccountBaseInfo_success, */
  [combineActions(addFetchInfo)]: (state, action) => {
    let data = { ...action.payload.data }
    let { isNewFetch, value } = data
    if (isNewFetch) {
      return {
        ...state,
        ...initAccountData(),
        hasAddSubmit: true,
        ...value
      }
    } else {
      return {
        ...state,
        ...handleEdit(value)
      }
    }
  },
  [combineActions(fetchAccountBaseInfo_request, fetchAccountBaseInfoByUpdate_request, setAddSubmit)]: (state) => {
    return {
      ...state,
      hasAddSubmit: true
    }
  },
  [combineActions(getPrimaryAccountInfo_success)]: (state, action) => {
    return {
      ...state,
      ...{},
      ...action.payload.data
    }
  },
  [combineActions(getPlatformInfo_success, getAudiencePortrait_success)]: (state, action) => {
    return {
      ...state,
      ...action.payload.data
    }
  },
  [combineActions(getUploadToken_success)]: (state, action) => {
    return {
      ...state,
      token: { ...action.payload.data }
    }
  }
}, initAccountData())

export const priceInfo = handleActions({
  [combineActions(getSkuList_success)]: (state, action) => {
    return {
      ...state,
      ...action.payload.data
    }
  },
  [combineActions(getUserInvoiceInfo_success)]: (state, action) => {
    let [item = {}] = action.payload.data || []
    return {
      ...state,
      ...item
    }
  },
  [combineActions(getPolicyIdAndDiscount_success)]: (state, action) => {
    return {
      ...state,
      ...action.payload.data
    }
  },
  [combineActions(getInfoIdsByUserIdAndPlatformId_success)]: (state, action) => {
    return {
      ...state,
      ...action.payload.data
    }
  },
}, {})

export const trinityPriceInfo = handleActions({
  [combineActions(getAccountTrinitySkuInfo_success)]: (state, action) => {
    return {
      ...state,
      ...action.payload.data
    }
  }
}, {})

export const priceTypeList = handleActions({
  [combineActions(getSkuTypeList_success)]: (state, action) => {
    return [
      // ...state,
      ...action.payload.data
    ]
  }
}, [])

export const regionCode = handleActions({
  [combineActions(getRegionCode_success)]: (state, action) => {
    return [
      ...state,
      ...action.payload.data
    ]
  }
}, [])

export const industryListForAccount = handleActions({
  [combineActions(getIndustryListForAccount_success)]: (state, action) => {
    return [
      ...state,
      ...action.payload.data
    ]
  }
}, [])
export const sensitiveWordsFilter = handleActions({
  [combineActions(sensitiveWordsFilter_success)]: (state, action) => {
    return {
      ...state,
      ...action.payload.data
    }
  }
}, {})

/**
 * 账号包装新增
 */
let initStatus = {
  "main": "view",
  "cooperation": "view",
  "content": "view",
  "strategy": "view",
  "price": "view",
  "personal": "view"
}

// 设置模块状态
export const moduleStatus = handleActions({
  [combineActions(setModuleStatus)]: (state, action) => {
    return {
      ...state,
      ...action.payload.data
    }
  },
  [combineActions(getDetail_success, getAccountInfoById_success)]: (state, action) => {
    const { base: canEdit } = action.payload.data
    if (canEdit) {
      return {
        "main": "edit",
        "cooperation": "edit",
        "content": "edit",
        "strategy": "edit",
        "price": "edit",
        "personal": "edit"
      }
    }
  }
}, initStatus)

// 设置主账号信息
export const adminAccount = handleActions({
  [combineActions(getPrimaryAccountInfo_success)]: (state, action) => {
    return {
      ...state,
      ...action.payload.data
    }
  }
}, {})

// 地域信息(包含热门城市)
const storeAreasHotCity = window.localStorage.getItem("areasHotCity_v1")
export const areasHotCity = handleActions({
  [combineActions(getAreasHotCity_success)]: (state, action) => {
    const {
      "china": chinaAreas, "foreign": foreignAreas, hotCity
    } = action.payload.data
    const cityList = [];
    const areasMap = {};
    const generateList = data => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const id = node.id;
        let item = { id: node.id, areaName: node.areaName, areaLevel: node.areaLevel }
        cityList.push(item);
        areasMap[id] = item
        if (node.childrenList) {
          generateList(node.childrenList);
        }
      }
    };
    generateList([].concat(chinaAreas, foreignAreas))
    let data = { cityList, areasMap, chinaAreas, foreignAreas, hotCity }
    window.localStorage.setItem("areasHotCity_v1", JSON.stringify(data))
    return {
      ...state,
      ...data
    }
  }
}, storeAreasHotCity ? JSON.parse(storeAreasHotCity) : {
  cityList: [],
  areasMap: {},
  chinaAreas: [],
  foreignAreas: [],
  hotCity: []
})

export default combineReducers({
  account,
  options,
  visibility,
  adminAccount,
  areasHotCity,
  accountInfo,
  priceInfo,
  priceTypeList,
  regionCode,
  industryListForAccount,
  sensitiveWordsFilter,
  trinityPriceInfo,
  moduleStatus,
  orders
})
