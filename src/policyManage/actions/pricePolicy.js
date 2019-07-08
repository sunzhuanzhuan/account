import Interface from '../constants/Interface'
import api from '../../api/index';
import { GET_PROGRESS, GET_DISCOUNT_DETAIL, GET_POLICY_DETAIL } from '../constants/ActionTypes';

// 更新渠道折扣及政策信息
export function updatePriceInfo(payload, urlName) {
  return dispatch => {
    dispatch({ type:GET_PROGRESS, progress: 'loading' });
    return api.post(Interface[urlName], payload)
      .then(() => {
          dispatch({
              type:GET_PROGRESS,
              progress: 'saveSuccess'
          })
      })
      .catch( ({errorMsg}) => {
          dispatch({
              type:GET_PROGRESS,
              progress: 'fail',
              errorMsg
          })
      });
  }
}

// 获取渠道折扣详情
export function getDiscountDetail(isEdit, payload) {
  return dispatch => {
    dispatch({ type:GET_PROGRESS, progress: 'loading' });

    // return api.post(Interface.getDiscount, payload)
    // .then(() => {
    //     dispatch({
    //         type:GET_DISCOUNT_DETAIL,
    //         progress: 'success'
    //     })
    // })
    // .catch( ({errorMsg}) => {
    //     dispatch({
    //         type:GET_DISCOUNT_DETAIL,
    //         progress: 'fail',
    //         errorMsg
    //     })
    // });
    
    dispatch({
      type: GET_DISCOUNT_DETAIL,
      discountDetail: {
        "channelDiscountStatus": 1,
        "id": 1,
        "remark": "",
        "rules": [],
        "stopReason": "",
        "userId": 1,
        "username": "主账号名称"
      }
    });
  }
}

// 获取政策详情
export function getPolicyDetail(id) {
  return dispatch => {
    dispatch({ type:GET_PROGRESS, progress: 'loading' });

    return api.get(`${Interface.getPolicy}?id=${id}`)
    .then(result => {
      console.log('lskfjlskdjf', result)
        dispatch({
            type:GET_POLICY_DETAIL,
            policyDetail: result.data,
            progress: 'success'
        })
    })
    .catch( ({errorMsg}) => {
        dispatch({
            type:GET_POLICY_DETAIL,
            policyDetail: {},
            progress: 'fail',
            errorMsg
        })
    });
  }
}

