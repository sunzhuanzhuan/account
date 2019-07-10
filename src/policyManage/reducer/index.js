import { GET_PROGRESS, GET_DISCOUNT_DETAIL, GET_POLICY_DETAIL } from "../constants/ActionTypes";

//品牌管理reducer
export default function pricePolicyReducer(state = {}, action) {
    const { progress, errorMsg, msg, discountDetail, policyDetail, newPolicyId } = action;
    switch (action.type) {
        case GET_PROGRESS:
            return { ...state, progress, errorMsg, msg, newPolicyId}
        case GET_DISCOUNT_DETAIL:
            return { ...state, discountDetail, errorMsg, progress}
        case GET_POLICY_DETAIL:
            return { ...state, policyDetail, errorMsg, progress}
        default:
            return state;
    }
}
