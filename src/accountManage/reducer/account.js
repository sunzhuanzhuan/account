import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions';
import {
  getDetail_success,
} from '../actions/package'
import {
  updateFetchInfo,
} from '../actions'
import { allEditables } from "@/accountManage/constants/editables";

const filterFetchData = (_data) => {
	let data = { ..._data }
	for (let key in data) {
		if (!data.hasOwnProperty(key)) continue
		if (parseInt(data[key]) === 1 && Object.keys(allEditables).indexOf(key) > -1 ) {
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
	}
}, {})
// 账号完整度
export const perfectionDegree = handleActions({
	[combineActions(getDetail_success)]: (state, action) => {
		let { perfectionDegree = {} } = action.payload.data
		return {
			...state,
			...perfectionDegree
		}
	}
}, {})
// 完整响应信息
export const _response = handleActions({
	[combineActions(getDetail_success)]: (state, action) => {
		return action.payload.data
	}
}, {})

export default combineReducers({
	id,
	base,
	cooperation,
	content,
	strategyInfo,
	perfectionDegree,
	otherInfo,
	feature,
  _response
})
