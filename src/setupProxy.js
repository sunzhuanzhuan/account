const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/api/file',
    { target: 'http://192.168.20.116:19091', changeOrigin:true }
  ));
  app.use(proxy('/api/toolbox/file',
    { target: 'http://192.168.20.111:17079', changeOrigin:true }
  ));
  app.use(proxy(['/api/account/','/api/common/','/api/sku/',],
    { target: 'http://192.168.20.111:17071', changeOrigin:true }
  ));
  app.use(proxy('/api',
    { target: 'http://192.168.100.196:8090', changeOrigin:true }
  ));
}
