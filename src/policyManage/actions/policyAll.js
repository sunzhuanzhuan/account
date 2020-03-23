/**
 * Created by lzb on 2020-03-10.
 */
import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/Interface';
import { createAction } from "redux-actions";


// 根据主账号名称搜索下拉框
export const {
  queryMcnByIdentityName,
} = createHttpAction('queryMcnByIdentityName', Interface.policyAll.queryMcnByIdentityName, {
  method: 'post'
});

// 根据账号名称查询下拉框
export const {
  queryAccountBySnsName,
} = createHttpAction('queryAccountBySnsName', Interface.policyAll.queryBySnsName, {
  method: 'post'
});

// 采购政策列表
export const {
  policyAllList,
  policyAllList_success,
} = createHttpAction('policyAllList', Interface.policyAll.queryList, {
  method: 'post'
});

// 采购政策列表
export const {
  procurementPolicyStatistics,
  procurementPolicyStatistics_success,
} = createHttpAction('procurementPolicyStatistics', Interface.policyAll.procurementPolicyStatistics, {
  method: 'post'
});

// 查询资源媒介列表
export const {
  queryMediums,
} = createHttpAction('queryMediums', Interface.policyAll.queryMediums);


export const syncUpdatePolicyStatus = createAction('syncUpdatePolicyStatus', (data) => {
  return { data };
})

export default {
  queryMcnByIdentityName,
  queryAccountBySnsName,
  queryMediums,
  syncUpdatePolicyStatus,
  procurementPolicyStatistics,
  policyAllList
}
