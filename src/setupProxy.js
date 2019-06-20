const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/api/operator-gateway',
    { target: 'http://172.16.21.131:17071', changeOrigin: true }
  ));
  app.use(proxy('/api',
    { target: 'http://nb.dev-weiboyi.com', changeOrigin: true }
  ));
}
