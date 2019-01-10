const oldPreFix = "/accountManage"
export default {
	common:{
		areas: '/common/v1/areas',
		industries: '/common/v1/industries',
		platform: '/common/v1/platform',
	},
	fetchAccountBaseInfo: '/account/v1/captureInfo',
	getAudiencePortrait: '/account/v1/getAudiencePortrait',
	getAccountInfo: '/account/v1/getDetail',
	getAccountOnShelfStatus: '/account/v1/onShelfStatus',
	saveAccountInfo: '/account/v1/addAccount',
	getSkuTypeList: '/sku/v1/skuType',
	getSkuList: '/sku/v1/skuList',
	getPrimaryAccountInfo: '/account/v1/getUserNameWithAdmin',
	getUserInvoiceInfo: '/account/v1/getUserInvoiceInfo',
	sensitiveWordsFilter: oldPreFix + '/sensitiveWordsFilter',
	update: {
		saveSku: '/sku/v1/updateSku',
		accountBase: '/account/v1/updateBase',
		accountFans: '/account/v1/updateFollowersCount',
		accountFeature: '/account/v1/updateExtend',
		accountCooperation: '/account/v1/updateCooperationCases',
		accountOnSale: '/account/v1/updateOnline',
		accountStrategy: '/account/v1/updateStrategy',
		accountOther: '/account/v1/updateOtherInfo',
		accountAudiencePortrait: '/account/v1/updateAudiencePortrait',
	}
}
