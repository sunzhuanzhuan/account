const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  /*app.use(proxy('/api/operator-gateway/sku/v1/getSkuEquitiesList',
    { target: 'http://yapi.ops.tst-weiboyi.com/mock/129/', changeOrigin: true }
  ));*/
  app.use(proxy('/api',
    { target: process.env.REACT_APP_TRUNK_BENTLEY_ADDRESS, changeOrigin: true }
  ));
}
