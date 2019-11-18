const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  /*app.use(proxy('/api/operator-gateway/rbac/isCanUpdateUserInfo',
    { target: 'http://yapi.ops.tst-weiboyi.com/mock/129', changeOrigin: true }
  ));
  app.use(proxy('/api/operator-gateway/mcn/v1',
    { target: 'http://yapi.ops.tst-weiboyi.com/mock/129', changeOrigin: true }
  ));*/
  app.use(proxy('/api',
    { target: 'http://nb.dev-weiboyi.com', changeOrigin: true }
  ));
}
