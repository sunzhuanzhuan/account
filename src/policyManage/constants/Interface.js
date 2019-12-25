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
    { name: 'getPolicyInfoByMcnId' },
    { name: 'getAccountInfoByIds' },
    { name: 'saveGlobalAccountRule', method: 'post' },
    { name: 'saveSpecialAccountRule', method: 'post' },
    { name: 'delGlobalRuleById', method: 'post' },          //删除全局账号规则
    { name: 'delSpecialRuleById', method: 'post' },         //删除特殊账号规则
    { name: 'delWhiteListAccount', method: 'post' },        //删除白名单账号
    { name: 'delSpecialRuleAccountById', method: 'post' }, //删除特殊规则账号

]

export default interfaceKey.reduce((acc, cur) => {
    acc[cur.name] = `/operator-gateway/policy/v1.1/${cur.name}`;
    return acc;
}, {})

