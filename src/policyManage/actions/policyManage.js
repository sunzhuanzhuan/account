import Interface from '../constants/Interface'
import api from '../../api/index';
import { GET_POPOVER_SELECTED_VALUE } from '../constants/ActionTypes';
//获取品牌列表
export function setPopoverValues(checkedValue = []) {
	return dispatch =>
    {
		dispatch({ type:GET_POPOVER_SELECTED_VALUE, checkedValue });
    }
}

