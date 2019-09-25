const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/api/account/',
    { target: 'http://192.168.100.117:30010', changeOrigin: true }
  ));
  app.use(proxy('/api',
    { target: 'http://nb.tst-weiboyi.com', changeOrigin: true }
  ));
}
