import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'
import { createAction } from 'redux-actions'


// 查询资源媒介列表
export const {
  getMediums,
  getMediums_success
} = createHttpAction('getMediums', Interface.getMediums);

// 主账号详情
export const {
  getOwnerDetail,
  getOwnerDetail_success
} = createHttpAction('getOwnerDetail', Interface.getOwnerDetail);

// 获取手机号修改记录
export const {
  phoneUpdateHistory
} = createHttpAction('phoneUpdateHistory', Interface.phoneUpdateHistory);

// 资源媒介修改历史
export const {
  mcnAdminUpdateHistory
} = createHttpAction('mcnAdminUpdateHistory', Interface.mcnAdminUpdateHistory, {
  method: "post"
});

// 维护 - 修改数据
export const updateFetchInfo = createAction('updateFetchInfo', (data) => {
  return { data };
})
