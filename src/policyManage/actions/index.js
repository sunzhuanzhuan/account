import Interface, { interfaceKey } from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'
// import { createAction } from 'redux-actions';
console.log(Interface)
// //根据accountId数组获取账号信息列表
// export const {
//     getAccountInfoByIds,
//     getAccountInfoByIds_success
// } = createHttpAction('getAccountInfoByIds', Interface.common.getCompanyList)

// // 模糊搜索公司
// export const {
//     delGlobalRuleById,
//     delGlobalRuleById_success,
// } = createHttpAction('delGlobalRuleById', Interface.common.searchForCompanyByName)

const obj = interfaceKey.reduce((acc, cur) => {
    const a = createHttpAction(
        cur.name,
        `/operator-gateway/policy/v1.1/${cur.name}`,
        { method: cur.method || 'get' })
    return { ...acc, ...a };
}, {})

console.log(obj, 'all action')

export const {
    addWhiteListAccount,
    addWhiteListAccount_success,
} = createHttpAction('addWhiteListAccount', Interface.getAccountInfoByIds)

export default {
    ...obj,
    addWhiteListAccount
}