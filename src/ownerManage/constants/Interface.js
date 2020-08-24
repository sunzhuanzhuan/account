const prefix = "/operator-gateway/mcn/v1"
export default {
  getMediums: prefix + '/mediums',
  getOwnerDetail: prefix + '/detail',
  getOwnerTypes: prefix + '/getUserType',
  phoneUpdateHistory: prefix + '/phoneUpdateHistory',
  mcnAdminUpdateHistory: prefix + '/mcnAdminUpdateHistory',
  ownerUpdate: prefix + '/update',
  ownerAdd: prefix + '/add',
  isCanUpdateUserInfo: '/operator-gateway/rbac/isCanUpdateUserInfo',
  preCheckChangeOwnerAdmin: prefix + '/preCheckChangeOwnerAdmin',
  listMcnPaymentInfo: prefix + '/listMcnPaymentInfo',
}
