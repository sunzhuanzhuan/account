import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'
import { createAction } from 'redux-actions'

/**
 * 获取账号信息
 */
export const {
    test,
    test_success
  } = createHttpAction('test', Interface.package.test);
