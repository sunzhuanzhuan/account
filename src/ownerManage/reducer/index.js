import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions';


import {
  getOwnerDetail_success,
  getMediums_success
} from '../actions'

const ownerInfo = handleActions({
  [getOwnerDetail_success]: (state, action) => {
    return {
      ...state,
      ...action.payload.data
    }

  }
}, {})

const mediums = handleActions({
  [getMediums_success]: (state, action) => {
    return [
      ...action.payload.data
    ]

  }
}, [])

export default combineReducers({
  ownerInfo,
  mediums
})
