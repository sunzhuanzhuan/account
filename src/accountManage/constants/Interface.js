const oldPreFix = "/accountManage"
const prefix = "/operator-gateway"
export default {
  common: {
    areas: prefix + '/common/v1/areas',
    industries: prefix + '/common/v1/industries',
    platform: prefix + '/common/v1/platform',
    getCountryList: prefix + '/common/v1/onlineCountryList',
    getAreasHotCity: prefix + '/common/v1/countryCityAreaTree',
    getChildrenAreaList: prefix + '/common/v1/childrenAreaList',
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
  update: {
    saveSku: prefix + '/sku/v1/updateSku',
    accountBase: prefix + '/account/v1/updateBase',
    accountFans: prefix + '/account/v1/updateFollowersCount',
    accountFeature: prefix + '/account/v1/updateExtend',
    accountCooperation: prefix + '/account/v1/updateCooperationCases',
    accountOnSale: prefix + '/account/v1/updateOnline',
    accountStrategy: prefix + '/account/v1/updateStrategy',
    accountOther: prefix + '/account/v1/updateOtherInfo',
    accountAudiencePortrait: prefix + '/account/v1/updateAudiencePortrait'
  },
  classify: {
    isExistClassify: prefix + '/classifyAudit/v1/isExistClassify',
    getAuditDialogInfo: prefix + '/classifyAudit/v1/selectClassifyAuditInfo',
    addClassifyAuditInfo: prefix + '/classifyAudit/v1/addClassifyAuditInfo',
    addCustomClassify: prefix + '/classifyAudit/v1/addCustomClassify'
  },
  account: {
    getDetail: prefix + '/account/v1/getDetail',
    updateBaseInfo: prefix + '/account/v1/updateBaseInfo',
    updateCooperationInfo: prefix + '/account/v1/updateCooperationInfo',
    updateContentInfo: prefix + '/account/v1_1/updateContentInfo',
    updateStrategyInfo: prefix + '/account/v1_1/updateStrategyInfo',
    updateOtherInfo: prefix + '/account/v1/updateOtherInfo',
    updatePersonalInfo: prefix + '/account/v1_1/updatePersonalInfo',

  },
  config: {
    getVerifiedType: prefix + '/account/v1_1/configuration/verifiedType',
    getPlatFormData: prefix + '/account/v1_1/configuration/platFormData',
    getSkill: prefix + '/account/v1_1/configuration/skill',
    getLanguage: prefix + '/account/v1_1/configuration/language',
    getPet: prefix + '/account/v1_1/configuration/pet',
    getOccupation: prefix + '/account/v1_1/configuration/occupation',
    getContentStyle: prefix + '/account/v1_1/configuration/contentStyle',
    getContentFeature: prefix + '/account/v1_1/configuration/contentFeature',
    getContentForm: prefix + '/account/v1_1/configuration/contentForm',
    getAdvertisingOfferServices: prefix + '/account/v1_1/configuration/advertisingOfferServices',
    getAdvertisingFieldConfig: prefix + '/account/v1_1/configuration/advertisingFieldConfig',
    getCooperateNoticeFieldConfig: prefix + '/account/v1_1/configuration/cooperateNoticeFieldConfig',
    getAccountFieldConfig: prefix + '/account/v1_1/configuration/accountFieldConfig',
  }
}
