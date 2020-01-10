import Interface, { interfaceKey } from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'
// import { createAction } from 'redux-actions';

const actions = interfaceKey.reduce((acc, cur) => {
  const httpAction = createHttpAction(
    cur.name,
    `${cur.baseUrl}${cur.name}`,
    { method: cur.method || 'get' })
  return { ...acc, ...httpAction };
}, {})
export const {
  addWhiteListAccount,
  addWhiteListAccount_success,
} = createHttpAction('addWhiteListAccount', Interface.getAccountInfoByIds)

export default {
  ...actions,
  addWhiteListAccount
}
