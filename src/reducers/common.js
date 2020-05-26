import { combineReducers } from 'redux'
// import { handleAction, handleActions, combineActions } from 'redux-actions';
import { handleAction, handleActions } from 'redux-actions';
import { getAllPlatform_success, getAvailablePlatformList_success, getMediumsForAuth_success } from '@/actions'
import { getUserConfigKey_success } from '@/login/actions'

export const platforms = handleAction(getAllPlatform_success, (state, action) => {
  return [
    ...action.payload.data
  ]
}, [])

export const availablePlatforms = handleAction(getAvailablePlatformList_success, (state, action) => {
  return [
    ...action.payload.data
  ]
}, [])

export const config = handleAction(getUserConfigKey_success, (state, action) => {
  const { babysitter_host = {} } = action.payload.data
  return {
    ...state,
    babysitterHost: babysitter_host.value || "http://toufang.dev-weiboyi.com"
  }
}, {})


const mediumsListForAuth = handleAction(getMediumsForAuth_success, (state, action) => {
  return [
    ...action.payload.data
  ]
}, [])

export default combineReducers({
  platforms,
  availablePlatforms,
  mediumsListForAuth,
  config
})
