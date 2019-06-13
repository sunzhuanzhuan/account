const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/api/rbac/getAuthorizations',
    { target: 'http://easymock.wby.me:7300/mock/5bee7271fc0fda00210ed111/test', changeOrigin: true }
  ));
  app.use(proxy('/api/operator-gateway/account/v1_1',
    { target: 'http://192.168.20.51:7300/mock/5cc7f9c773f3100017a6441e', changeOrigin: true }
  ));
  app.use(proxy('/api',
    { target: 'http://nb.tst-weiboyi.com', changeOrigin: true }
  ));
}
