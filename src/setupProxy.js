const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  // app.use(proxy('/api/operator-gateway/policy/v1.1',
  //   { target: 'http://yapi.ops.tst-weiboyi.com/mock/129/', changeOrigin: true }
  // ));
  // http://yapi.ops.tst-weiboyi.com/mock/129/api/operator-gateway/common/v1/getNewBPlatforms

  // app.use(proxy('/api/operator-gateway/common/v1/getNewBPlatforms',
  //   { target: 'http://yapi.ops.tst-weiboyi.com/mock/129/', changeOrigin: true }
  // ));
  app.use(proxy('/api/account/getOrderList',
    { target: 'http://yapi.ops.tst-weiboyi.com/mock/257/', changeOrigin: true }
  ));
  app.use(proxy('/api',
    { target: 'http://nb.fat-weiboyi.com', changeOrigin: true }
  ));
}
