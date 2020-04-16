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
const baseUrl = '/operator-gateway/policy/v1.1/'
export const interfaceKey = [
  { name: 'getPolicyInfoByMcnId' },
  { name: 'getAccountInfoByIds' },
  { name: 'saveGlobalAccountRule', method: 'post' },
  { name: 'saveSpecialAccountRule', method: 'post' },
  { name: 'delGlobalRuleById', method: 'post' },          //删除全局账号规则
  { name: 'delSpecialRuleById', method: 'post' },         //删除特殊账号规则
  { name: 'delWhiteListAccount', method: 'post' },        //删除白名单账号
  { name: 'delSpecialRuleAccountById', method: 'post' }, //删除特殊规则账号
  { name: 'saveProcurementPolicyInfo', method: 'post' },
  { name: 'saveWhiteList', method: 'post' },
  // { name: 'startPolicy', method: 'post' },
  // { name: 'stopPolicy', method: 'post' },
  { name: 'getPastPolicyListByMcnId' },
  { name: 'getPolicyInfoById' }

].map(item => {
  item.baseUrl = item.baseUrl || baseUrl;
  return item;
})

const policyInterface = interfaceKey.reduce((acc, cur) => {
  acc[cur.name] = `${cur.baseUrl}${cur.name}`;
  return acc;
}, {});

export default {
  getDiscount: '/operator-gateway/channel/discount/v1/get',
  addDiscount: '/operator-gateway/channel/discount/v1/add',
  editDiscount: '/operator-gateway/channel/discount/v1/modify',
  stopDiscount: '/operator-gateway/channel/discount/v1/stop',
  ...policyInterface,
  policy: {
    queryMcnByIdentityName: '/operator-gateway/mcn/v1/queryMcnByIdentityName',
    queryBySnsName: '/operator-gateway/account/v1/queryBySnsName',
    queryMediums: '/operator-gateway/mcn/v1/mediums',
    queryList: '/operator-gateway/policy/v2/queryList',
    procurementPolicyStatistics: '/operator-gateway/policy/v2/procurementPolicyStatistics',
    contractList: '/operator-gateway/contract/v1/list',
    getGlobalRulePlatforms: '/operator-gateway/policy/v2/getGlobalRulePlatforms',
    start: '/operator-gateway/policy/v2/startPolicy',
    stop: '/operator-gateway/policy/v2/stopPolicy',
    getGlobalAccountList: '/operator-gateway/policy/v2/getPolicyGlobalAccountList',
    getSpecialAccountList: '/operator-gateway/policy/v2/getPolicySpecialAccountList',
    getWhiteListAccountList: '/operator-gateway/policy/v2/getPolicyWhiteListAccountList',
    downMcnPolicyData: '/operator-gateway/policy/v2/downMcnPolicyData',
  }
}
