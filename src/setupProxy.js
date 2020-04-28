const proxy = require('http-proxy-middleware');
module.exports = function (app) {

  /*app.use(proxy('/api/operator-gateway/common/v1/getNewBPlatforms',
    { target: 'http://yapi.ops.tst-weiboyi.com/mock/129/', changeOrigin: true }
  ));*/
  app.use(proxy('/api',
    { target: 'http://nb.tst-weiboyi.com', changeOrigin: true }
  ));
}
