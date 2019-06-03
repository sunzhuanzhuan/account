const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/api/accountPackage/',
    { target: 'http://192.168.20.51:7300/mock/5cc7f9c773f3100017a6441e', changeOrigin: true }
  ));
  app.use(proxy('/api',
    { target: process.env.HOST || 'http://nb.tst-weiboyi.com', changeOrigin: true }
  ));
}
