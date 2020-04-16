import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions';
import { reducersResponseList } from '@/util/handleData'
import { GET_PROGRESS, GET_DISCOUNT_DETAIL, GET_POLICY_DETAIL } from "../constants/ActionTypes";
import update from "immutability-helper";

const selectedPlatformIds = (state = []) => {

  return state.reduce((acc, item) => {
    return acc.concat(item.platformList)
  }, []).reduce((acc, item) => {
    acc[item.platformId] = true;
    return acc
  }, {});
}
export const policyInfo = handleActions({

  'getPolicyInfoByMcnId_success': (state, action) => {
    const { globalAccountRules } = action.payload.data || {}
    return {
      ...action.payload.data,
      selectedPlatformIds: selectedPlatformIds(globalAccountRules)
    }
  },
  // 'saveGlobalAccountRule_success': (state, action) => {
  //   return {
  //     ...state,
  //     globalAccountRules: [action.payload.data, ...(state.globalAccountRules || [])]
  //   }
  // },
  // 'saveSpecialAccountRule_success': (state, action) => {

  //     return {
  //         ...state,
  //         specialAccountRules: [action.payload.data, ...(state.specialAccountRules || [])]
  //     }
  // },
  // 'delGlobalRuleById_success': (state, action) => {
  //     return {
  //         ...state,
  //         globalAccountRules: state.globalAccountRules.filter(item => item.ruleId != action.payload.__query.ruleId)
  //     }
  // },
  // 'delSpecialRuleById_success': (state, action) => {
  //     return {
  //         ...state,
  //         specialAccountRules: state.specialAccountRules.filter(item => item.ruleId != action.payload.data.ruleId)
  //     }
  // },
  // 'delWhiteListAccount_success': (state, action) => {
  //     return {
  //         ...state,
  //         whiteList: state.whiteList.filter(item => item.accountId !== action.payload.__query.accountId)
  //     }
  // },
  'saveWhiteList_success': (state, action) => {

    return {
      ...state,
      whiteList: action.payload.data.whiteList
    }
  }

}, {})

const newBPlatforms = handleAction('getNewBPlatforms_success', (state, action) => {
  return [
    ...state,
    ...action.payload.data
  ]
}, [])

const pastPolicyList = handleAction('getPastPolicyListByMcnId_success', (state, action) => {
  return {
    ...action.payload.data
  }
}, {})
const pastPolicyDetail = handleAction('getPolicyInfoById_success', (state, action) => {
  return {
    ...action.payload.data
  }
}, {})


const policyAllList = handleActions({
  "policyAllList_success": reducersResponseList(),
  "syncUpdatePolicyStatus": (state, action) => {
    let { key } = action.payload.data
    return update(state, {
      source: {
        [key]: {
          $set: {
            ...state.source[key],
            ...action.payload.data
          }
        }
      }
    })
  }
}, reducersResponseList.initList())


const policyAllStatistics = handleActions({
  "procurementPolicyStatistics_success": (state, action) => {
    let { data } = action.payload
    return {
      ...state,
      ...data
    }
  }
}, {})


const policyListByOwner = handleActions({
  "policyListByOwner_success": reducersResponseList(),
}, reducersResponseList.initList())

const policyOwnerStatistics = handleActions({
  "procurementPolicyStatisticsByOwner_success": (state, action) => {
    let { data } = action.payload
    return {
      ...state,
      ...data
    }
  }
}, {})

const contractListByOwner = handleActions({
  "contractListByOwner_success": reducersResponseList(),
}, reducersResponseList.initList())


//渠道折扣， 品牌管理reducer
function discountReducer(state = {}, action) {
  const { progress, errorMsg, msg, discountDetail, policyDetail, newPolicyId } = action;
  switch (action.type) {
    case GET_PROGRESS:
      return { ...state, progress, errorMsg, msg, newPolicyId }
    case GET_DISCOUNT_DETAIL:
      return { ...state, discountDetail, errorMsg, progress }
    case GET_POLICY_DETAIL:
      return { ...state, policyDetail, errorMsg, progress }
    default:
      return state;
  }
}

export default combineReducers({
  policyInfo,
  newBPlatforms,
  pastPolicyList,
  pastPolicyDetail,
  policyAllList,
  policyAllStatistics,
  policyListByOwner,
  policyOwnerStatistics,
  contractListByOwner,
  discountReducer
})
