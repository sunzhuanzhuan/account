import Interface, { interfaceKey } from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'
// import { createAction } from 'redux-actions';
import * as policyAll from './policyAll'


const actions = interfaceKey.reduce((acc, cur) => {
  const httpAction = createHttpAction(
    cur.name,
    `${cur.baseUrl}${cur.name}`,
    { method: cur.method || 'get' })
  return { ...acc, ...httpAction };
}, {})

export default {
  ...actions,
  ...policyAll,
}
