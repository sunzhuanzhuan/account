import Interface from '../constants/Interface';
import { createHttpAction } from 'redux-action-extend';
import { createAction } from 'redux-actions';

// 查询资源媒介列表
export const { getMediums, getMediums_success } = createHttpAction(
  'getMediums',
  Interface.getMediums
);

// 主账号详情
export const { getOwnerDetail, getOwnerDetail_success } = createHttpAction(
  'getOwnerDetail',
  Interface.getOwnerDetail
);
// 获取主账号类型
export const { getOwnerTypes, getOwnerTypes_success } = createHttpAction(
  'getOwnerTypes',
  Interface.getOwnerTypes
);

// 获取手机号修改记录
export const { phoneUpdateHistory } = createHttpAction(
  'phoneUpdateHistory',
  Interface.phoneUpdateHistory
);

// 资源媒介修改历史
export const { mcnAdminUpdateHistory } = createHttpAction(
  'mcnAdminUpdateHistory',
  Interface.mcnAdminUpdateHistory,
  {
    method: 'post'
  }
);

// 主账号支付信息修改列表
export const { listMcnPaymentInfo } = createHttpAction(
  'listMcnPaymentInfo',
  Interface.listMcnPaymentInfo,
  {
    method: 'post'
  }
);

// 更新主账号信息
export const { ownerUpdate } = createHttpAction('ownerUpdate', Interface.ownerUpdate, {
  method: 'post'
});

// 新增主账号
export const { ownerAdd } = createHttpAction('ownerAdd', Interface.ownerAdd, {
  method: 'post'
});

// 主账号换媒介检测
export const { preCheckChangeOwnerAdmin } = createHttpAction(
  'preCheckChangeOwnerAdmin',
  Interface.preCheckChangeOwnerAdmin
);

// 是否可以修改主账号信息
export const { isCanUpdateUserInfo } = createHttpAction(
  'isCanUpdateUserInfo',
  Interface.isCanUpdateUserInfo
);

// 维护 - 修改数据
export const updateFetchInfo = createAction('updateFetchInfo', data => {
  return { data };
});
