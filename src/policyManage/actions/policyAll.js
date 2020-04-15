/**
 * Created by lzb on 2020-03-10.
 */
import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/Interface';
import { createAction } from "redux-actions";


// 根据主账号名称搜索下拉框
export const {
  queryMcnByIdentityName,
} = createHttpAction('queryMcnByIdentityName', Interface.policy.queryMcnByIdentityName, {
  method: 'post'
});

// 根据账号名称查询下拉框
export const {
  queryAccountBySnsName,
} = createHttpAction('queryAccountBySnsName', Interface.policy.queryBySnsName, {
  method: 'post'
});

// 采购政策列表
export const {
  policyAllList,
  policyAllList_success,
} = createHttpAction('policyAllList', Interface.policy.queryList, {
  method: 'post'
});

// 采购政策列表统计
export const {
  procurementPolicyStatistics,
  procurementPolicyStatistics_success,
} = createHttpAction('procurementPolicyStatistics', Interface.policy.procurementPolicyStatistics, {
  method: 'post'
});


// 查询资源媒介列表
export const {
  queryMediums,
} = createHttpAction('queryMediums', Interface.policy.queryMediums);


export const syncUpdatePolicyStatus = createAction('syncUpdatePolicyStatus', (data) => {
  return { data };
})


// 主账号采购政策列表
export const {
  policyListByOwner,
  policyListByOwner_success
} = createHttpAction('policyListByOwner', Interface.policy.queryList, {
  method: 'post'
});

// 主账号采购政策列表统计
export const {
  procurementPolicyStatisticsByOwner,
  procurementPolicyStatisticsByOwner_success,
} = createHttpAction('procurementPolicyStatisticsByOwner', Interface.policy.procurementPolicyStatistics, {
  method: 'post'
});

// 主账号合同列表
export const {
  contractListByOwner,
  contractListByOwner_success
} = createHttpAction('contractListByOwner', Interface.policy.contractList);


// 停用政策
export const {
  stopPolicy,
} = createHttpAction('stopPolicy', Interface.policy.stop, {
  method: 'post'
});

// 启用政策
export const {
  startPolicy,
} = createHttpAction('startPolicy', Interface.policy.start, {
  method: 'post'
});
