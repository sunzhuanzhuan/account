const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/api',
    { target: 'http://nb.pre-weiboyi.com', changeOrigin: true }
  ));

}
