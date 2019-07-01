import { GET_POPOVER_SELECTED_VALUE } from "../constants/ActionTypes";

//品牌管理reducer
export default function policyManageReducer(state = {}, action) {
    switch (action.type) {
        case GET_POPOVER_SELECTED_VALUE:
            return { ...state, popValues: action.checkedValue}
        default:
            return state;
    }
}
