import Interface from '../constants/Interface'
import api from '../../api/index';
import { GET_PROGRESS, GET_DISCOUNT_DETAIL, GET_POLICY_DETAIL } from '../constants/ActionTypes';

// 更新渠道折扣及政策信息
export function updatePriceInfo(payload, urlName) {
  return dispatch => {
    dispatch({ type:GET_PROGRESS, progress: 'loading' });
    return api.get(Interface[urlName], payload)
      .then(() => {
          dispatch({
              type:GET_PROGRESS,
              progress: 'success'
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
export function getDiscountDetail(userId) {
  return dispatch => {
    dispatch({
      type: GET_DISCOUNT_DETAIL,
      discountDetail: {
        "channelDiscountStatus": 1,
        "remark": "我是备注",
        "rules": [
          {
            "channelDiscountId": 1,
            "platformIds": [1],
            "publicationRate": 0.1
          }
        ],
        "stopReason": "我是停用原因",
        "userId": 1,
        "username": "主账号名称"
      }
    });
  }
}

// 获取政策详情
export function getPolicyDetail(id) {
  return dispatch => {
    dispatch({
      type: GET_POLICY_DETAIL,
      policyDetail: {
        "id":"政策id",
        "userId":"主账号id不能为空",
        "illustration":"政策说明",
        "policyStatus":3,
        "validStartTime":0,
        "validEndTime":0,
        "stopReason":"停用原因",
        "modifiedBy":"修改人",
        "modifiedAt":"修改时间",
        "identityName":"主账号名称",
        "modifyName":"修改人名称"
        }
    });
  }
}

