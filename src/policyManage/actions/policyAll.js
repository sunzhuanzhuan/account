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

// 采购政策列表
export const {
  policyAllList,
  policyAllList_success,
} = createHttpAction('policyAllList', Interface.policyAll.queryList, {
  method: 'post'
});

export default {
  queryMcnByIdentityName,
  policyAllList
}
