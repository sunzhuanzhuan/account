// import { GET_PROGRESS, GET_DISCOUNT_DETAIL, GET_POLICY_DETAIL } from "../constants/ActionTypes";

// //品牌管理reducer
// export default function pricePolicyReducer(state = {}, action) {
//     const { progress, errorMsg, msg, discountDetail, policyDetail, newPolicyId } = action;
//     switch (action.type) {
//         case GET_PROGRESS:
//             return { ...state, progress, errorMsg, msg, newPolicyId}
//         case GET_DISCOUNT_DETAIL:
//             return { ...state, discountDetail, errorMsg, progress}
//         case GET_POLICY_DETAIL:
//             return { ...state, policyDetail, errorMsg, progress}
//         default:
//             return state;
//     }
// }


import { combineReducers } from 'redux'
import { handleAction, handleActions, combineActions } from 'redux-actions';

export const policyInfo = handleActions({
    'getPolicyInfoByMcnId_success': (state, action) => {
        return {
            ...state,
            ...action.payload.data
        }
    },
    'saveGlobalAccountRule_success': (state, action) => {
        return {
            ...state,
            globalAccountRules: [action.payload.data, ...state.globalAccountRules]
        }
    },
    'saveSpecialAccountRule_success': (state, action) => {
        return {
            ...state,
            specialAccountRules: [action.payload.data, ...state.specialAccountRules]
        }
    },
}, {})

const accountInfo = handleAction('getAccountInfoByIds_success', (state, action) => {
    return {
        ...state,
        ...action.payload.data
    }
}, {})

export default combineReducers({
    policyInfo,
    accountInfo
})