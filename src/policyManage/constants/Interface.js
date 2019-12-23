// export default {
//     getDiscount: '/operator-gateway/channel/discount/v1/get',
//     addDiscount: '/operator-gateway/channel/discount/v1/add',
//     editDiscount: '/operator-gateway/channel/discount/v1/modify',
//     stopDiscount: '/operator-gateway/channel/discount/v1/stop',
//     // getPolicy: '/operator-gateway/policy/v1/getPolicyInfoById',
//     // getPolicy: '/operator-gateway/policy/v1.1/getPolicyInfoByMcnId',
//     addPolicy: '/operator-gateway/policy/v1/addPolicyInfo',
//     editPolicy: '/operator-gateway/policy/v1/updatePolicyInfo',
//     stopPolicy: '/operator-gateway/policy/v1/stopPolicyInfoById',

//     getPolicy: '/operator-gateway/policy/v1.1/getPolicyInfoByMcnId',
//     getAccountInfoByIds: 'operator-gateway/policy/v1.1/getAccountInfoByIds',
//     delGlobalRuleById: 'delGlobalRuleById',
//     delSpecialRuleById: 'delSpecialRuleById',
//     delWhiteListAccount: 'delWhiteListAccount',
//     delSpecialRuleAccountById: 'delSpecialRuleAccountById'
// }

export const interfaceKey = [
    'getPolicyInfoByMcnId',
    'getAccountInfoByIds',
    'delGlobalRuleById',
    'delSpecialRuleById',
    'delWhiteListAccount',
    'delSpecialRuleAccountById'
]

export default interfaceKey.reduce((acc, cur) => {
    acc[cur] = `/operator-gateway/policy/v1.1/${cur}`;
    return acc;
}, {})

