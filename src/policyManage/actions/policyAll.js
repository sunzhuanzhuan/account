/**
 * Created by lzb on 2020-03-10.
 */
import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/Interface';
import { createAction } from "redux-actions";


// 根据主账号名称搜索下拉框
export const {
  queryMcnByIdentityName
} = createHttpAction('queryMcnByIdentityName', Interface.policy.queryMcnByIdentityName, {
  method: 'post'
});
// 获取账号规则平台列表
export const {
  getGlobalRulePlatforms
} = createHttpAction('getGlobalRulePlatforms', Interface.policy.getGlobalRulePlatforms);

// 根据账号名称查询下拉框
export const {
  queryAccountBySnsName
} = createHttpAction('queryAccountBySnsName', Interface.policy.queryBySnsName, {
  method: 'post'
});

// 根据政策名称查询下拉框
export const {
  querySelectList
} = createHttpAction('querySelectList', Interface.policy.querySelectList, {
  method: 'post'
});

// 获取全局账号数量
export const {
  queryGlobalAccountCount
} = createHttpAction('queryGlobalAccountCount', Interface.policy.queryGlobalAccountCount);

// 采购政策列表
export const {
  policyAllList,
  policyAllList_success
} = createHttpAction('policyAllList', Interface.policy.queryList, {
  method: 'post'
});

// 采购政策列表数量统计
export const {
  procurementPolicyStatistics,
  procurementPolicyStatistics_success
} = createHttpAction('procurementPolicyStatistics', Interface.policy.procurementPolicyStatistics, {
  method: 'post'
});

// 采购政策列表订单统计
export const {
  orderStatistics,
  orderStatistics_success
} = createHttpAction('orderStatistics', Interface.policy.orderStatistics, {
  method: 'post'
});

export const {
  downMcnPolicyData
} = createHttpAction('downMcnPolicyData', Interface.policy.downMcnPolicyData);

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
  procurementPolicyStatisticsByOwner_success
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
  stopPolicy
} = createHttpAction('stopPolicy', Interface.policy.stop, {
  method: 'post'
});

// 启用政策
export const {
  startPolicy
} = createHttpAction('startPolicy', Interface.policy.start, {
  method: 'post'
});
// 删除政策
export const {
  delPolicy
} = createHttpAction('delPolicy', Interface.policy.delPolicy, {
  method: 'post'
});
// 政策包含账号 全局列表
export const {
  getGlobalAccountList
} = createHttpAction('getGlobalAccountList', Interface.policy.getGlobalAccountList, {
  method: 'post'
});

// 政策包含账号 特殊列表
export const {
  getSpecialAccountList
} = createHttpAction('getSpecialAccountList', Interface.policy.getSpecialAccountList, {
  method: 'post'
});

// 政策包含账号 特殊列表
export const {
  getWhiteListAccountList
} = createHttpAction('getWhiteListAccountList', Interface.policy.getWhiteListAccountList, {
  method: 'post'
});
//删除合同
export const {
  contractDelete
} = createHttpAction('contractDelete', Interface.policy.contractDelete, {
  method: 'post'
});
//上传合同
export const {
  contractAdd
} = createHttpAction('contractAdd', Interface.policy.contractAdd, {
  method: 'post'
});
//获取最新合同ID
export const {
  getLatestUpload
} = createHttpAction('getLatestUpload', Interface.policy.getLatestUpload);
//获取当前政策下的平台列表
export const {
  getPlatformListByPolicy
} = createHttpAction('getPlatformListByPolicy', Interface.policy.getPlatformListByPolicy);

// 根据accountId数组获取账号信息列表
export const {
  getAccountInfoByIds
} = createHttpAction('getAccountInfoByIds', Interface.policy.getAccountInfoByIds)


//添加政策
export const {
  addPolicy
} = createHttpAction('addPolicy', Interface.policy.addPolicy, {
  method: 'post'
});

//修改政策
export const {
  updatePolicy
} = createHttpAction('updatePolicy', Interface.policy.updatePolicy, {
  method: 'post'
});

// 根据id政策信息
export const {
  getPolicyInfoById
} = createHttpAction('getPolicyInfoById', Interface.policy.getPolicyInfoById)
