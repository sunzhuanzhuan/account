const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/api/operator-gateway/classifyaudit/',
    { target: 'http://easymock.wby.me:7300/mock/5cdcc95a73f3100017a644ea/classify', changeOrigin: true }
  ));
  app.use(proxy('/api/operator-gateway/common/',
    { target: 'http://easymock.wby.me:7300/mock/5cdcc95a73f3100017a644ea/classify', changeOrigin: true }
  ));
  app.use(proxy('/api',
    { target: 'http://nb.tst-weiboyi.com', changeOrigin: true }
  ));
}
