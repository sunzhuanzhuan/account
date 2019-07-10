import Interface from '../constants/Interface'
import api from '../../api/index';
import { GET_PROGRESS, GET_DISCOUNT_DETAIL, GET_POLICY_DETAIL } from '../constants/ActionTypes';

function getSaveMsg(urlName) {
  switch(urlName) {
    case 'addDiscount':
    case 'editDiscount':
    case 'addPolicy':
    case 'editPolicy':
      return '操作成功';

    case 'stopDiscount':
    case 'stopPolicy':
      return '停用成功';
    default: return '';
  }
}
// 更新渠道折扣及政策信息
export function updatePriceInfo(payload, urlName) {
  return dispatch => {
    dispatch({ type:GET_PROGRESS, progress: 'loading' });
    return api.post(Interface[urlName], payload)
      .then(() => {
          dispatch({
              type:GET_PROGRESS,
              progress: 'saveSuccess',
              msg: getSaveMsg(urlName)
          });
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
export function getDiscountDetail(payload) {
  return dispatch => {
    dispatch({ type:GET_PROGRESS, progress: 'loading' });

    if(payload)
      return api.post(Interface.getDiscount, payload)
      .then(result => {
          dispatch({
              type:GET_DISCOUNT_DETAIL,
              progress: 'success',
              discountDetail: result.data
          })
      })
      .catch( ({errorMsg}) => {
          dispatch({
              type:GET_DISCOUNT_DETAIL,
              progress: 'fail',
              errorMsg
          })
      });

    dispatch({
      type: GET_DISCOUNT_DETAIL,
      discountDetail: {
        "remark": "",
        "ruleDTOS": [],
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

