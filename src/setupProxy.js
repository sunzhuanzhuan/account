const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/oss/file',
    { target: 'http://192.168.20.116:19091', changeOrigin:true }
  ));
  app.use(proxy('/api/toolbox/file/v1',
    { target: 'http://192.168.20.111:17079', changeOrigin:true }
  ));
  app.use(proxy(['/api/account/v1','/api/common/v1','/api/sku/v1',],
    { target: 'http://192.168.20.111:17071', changeOrigin:true }
  ));
  app.use(proxy('/api',
    { target: 'http://192.168.100.196:8090', changeOrigin:true }
  ));
}
