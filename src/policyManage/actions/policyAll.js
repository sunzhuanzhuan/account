/**
 * Created by lzb on 2020-03-10.
 */
import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/Interface';
import { createAction } from "redux-actions";


// 获取任务管理列表
export const {
  geta,
  geta_success
} = createHttpAction('geta', Interface.policyAll.a, {
  method: 'post'
});
