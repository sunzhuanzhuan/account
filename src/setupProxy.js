const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/api/operator-gateway/trinitySku',
    { target: 'http://easymock.wby.me:7300/mock/5bee7271fc0fda00210ed111/test', changeOrigin: true }
  ));
  app.use(proxy('/api',
    { target: 'http://nb.tst-weiboyi.com', changeOrigin: true }
  ));
}
