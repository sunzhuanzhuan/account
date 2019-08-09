const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/api/common-file/',
    { target: 'http://weiboyi-files-service-test.192.168.100.203.nip.io', changeOrigin: true }
  ));
  app.use(proxy('/api/toolbox-gateway/',
    { target: 'http://weiboyi-toolbox-gateway-test.192.168.100.203.nip.io', changeOrigin: true }
  ));
  app.use(proxy('/api/operator-gateway/accountDetail/v1/',
    { target: 'http://192.168.20.51:7300/mock/5c7cf65573f3100017a640d9/accountDetail', changeOrigin: true }
  ));
  app.use(proxy('/api/operator-gateway/',
    { target: 'http://weiboyi-operator-gateway-test.192.168.100.203.nip.io', changeOrigin: true }
  ));

  app.use(proxy('/api',
    { target: 'http://nb.tst-weiboyi.com', changeOrigin: true }
  ));
}
