const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/api/common-file/',
    { target: 'http://weiboyi-files-service-test.192.168.100.203.nip.io', changeOrigin:true }
  ));
  app.use(proxy('/api/toolbox-gateway/',
    { target: 'http://weiboyi-toolbox-gateway-test.192.168.100.203.nip.io', changeOrigin:true }
  ));
  app.use(proxy('/api/operator-gateway/trinitySku/',
    { target: 'http://easymock.wby.me:7300/mock/5c9b20f173f3100017a64354', changeOrigin:true }
  ));
  app.use(proxy('/api/operator-gateway/',
    { target: 'http://weiboyi-operator-gateway-test.192.168.100.203.nip.io', changeOrigin:true }
  ));
  app.use(proxy('/api',
    { target: 'http://nb.tst-weiboyi.com', changeOrigin:true }
  ));
}
