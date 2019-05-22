const oldPreFix = "/accountManage"
const prefix = "/operator-gateway"
export default {
	common:{
		areas: prefix + '/common/v1/areas',
		industries: prefix + '/common/v1/industries',
		platform: prefix + '/common/v1/platform',
	},
	fetchAccountBaseInfo: prefix + '/account/v1/captureInfo',
	getAudiencePortrait: prefix + '/account/v1/getAudiencePortrait',
	getAccountInfo: prefix + '/account/v1/getDetail',
	getAccountOnShelfStatus: prefix + '/account/v1/onShelfStatus',
	saveAccountInfo: prefix + '/account/v1/addAccount',
	getSkuTypeList: prefix + '/sku/v1/skuType',
	getSkuList: prefix + '/sku/v1/skuList',
	getPrimaryAccountInfo: prefix + '/account/v1/getUserNameWithAdmin',
	getUserInvoiceInfo: prefix + '/account/v1/getUserInvoiceInfo',
	sensitiveWordsFilter: oldPreFix + '/sensitiveWordsFilter',
  getAccountTrinitySkuInfo: '/operator-gateway/trinitySku/v1/getAccountTrinitySkuInfo',
  addOrUpdateAccountTrinitySkuInfo: '/operator-gateway/trinitySku/v1/AddOrUpdateAccountTrinitySkuInfo',
	update: {
		saveSku: prefix + '/sku/v1/updateSku',
		accountBase: prefix + '/account/v1/updateBase',
		accountFans: prefix + '/account/v1/updateFollowersCount',
		accountFeature: prefix + '/account/v1/updateExtend',
		accountCooperation: prefix + '/account/v1/updateCooperationCases',
		accountOnSale: prefix + '/account/v1/updateOnline',
		accountStrategy: prefix + '/account/v1/updateStrategy',
		accountOther: prefix + '/account/v1/updateOtherInfo',
		accountAudiencePortrait: prefix + '/account/v1/updateAudiencePortrait',
	},
  classify: {
    isExistClassify: prefix + '/classifyaudit/v1/isExistClassify',
    getAuditDialogInfo: prefix + '/classifyaudit/v1/selectAuditDialogInfo',
    addClassifyAuditInfo: prefix + '/classifyaudit/v1/addClassifyAuditInfo',
    addCustomClassify: prefix + '/classifyaudit/v1/addCustomClassify'
	}
}
