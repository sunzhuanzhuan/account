const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  // app.use(proxy('/api/operator-gateway/policy/v1.1',
  //   { target: 'http://yapi.ops.tst-weiboyi.com/mock/129/', changeOrigin: true }
  // ));

  app.use(proxy('/api',
    { target: 'http://nb.tst-weiboyi.com', changeOrigin: true, logLevel: 'debug' }
  ));
}
