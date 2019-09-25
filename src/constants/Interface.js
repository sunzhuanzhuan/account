export default {
  common: {
    getCompanyList: '/export/account/getCompanyList',
    searchForCompanyByName: '/account/getCompanyList',
    searchForBrandByName: '/account/getBrandList',
    getAllPlatform: '/platform/getAll',
    getChineseCities: '/operator-gateway/common/v1/chineseCities',
    getToken: '/toolbox-gateway/file/v1/getToken',
    getAllClassifyInfos: '/operator-gateway/common/v1/getAllClassifyInfos',
    getFileRealPath: '/operator-gateway/common/v1/getRealDownLoadPath',
    platformList: '/operator-gateway/common/v1/platformList',
    checkSensitiveWord: '/operator-gateway/common/v1/checkSensitiveWord'
  },
  sourceRulesUrl: {
    add: '/sourceRule/add',
    delete: '/rbac/deleteResourceRule',
    get: '/sourceRule/getSourceRules'
  },
  roleUrl: {
    add: '/rbac/addRoles',
    delete: '/rbac/deleteRoles',
    update: '/rbac/updateRoles',
    get: '/rbac/getRolesList'
  },
  roleRelationUrl: {
    update: '/rbac/updateUserRole',
    get: '/rbac/getUserRoleList'
  },
  auth: {
    getAuthorizations: 'rbac/getAuthorizations'
  }
}
