const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/api/operator-gateway/accountDetail/v1/getBaseInfo',
    { target: 'http://nb.pre-weiboyi.com', changeOrigin: true }
  ));
  app.use(proxy('/api/operator-gateway/',
    { target: 'http://yapi.ops.tst-weiboyi.com/mock/129', changeOrigin: true }
  ));
  app.use(proxy('/api/export/account/getAccountDetailDegreeList',
    { target: 'http://172.16.121.123:7001/', changeOrigin: true }
  ));
  app.use(proxy('/api',
    { target: 'http://nb.pre-weiboyi.com', changeOrigin: true }
  ));
}
