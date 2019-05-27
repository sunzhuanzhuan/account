const proxy = require('http-proxy-middleware');
module.exports = function (app) {
<<<<<<< HEAD
=======
  app.use(proxy('/api/common-file/',
    { target: 'http://weiboyi-files-service-test.192.168.100.203.nip.io', changeOrigin: true }
  ));
  app.use(proxy('/api/toolbox-gateway/',
    { target: 'http://weiboyi-toolbox-gateway-test.192.168.100.203.nip.io', changeOrigin: true }
  ));
  app.use(proxy('/api/operator-gateway/accountDetail/v1/',
    { target: 'http://nb.tst-weiboyi.com', changeOrigin: true }
  ));
  app.use(proxy('/api/operator-gateway/',
    { target: 'http://weiboyi-operator-gateway-test.192.168.100.203.nip.io', changeOrigin: true }
  ));

>>>>>>> feature/accountDetailChart
  app.use(proxy('/api',
    { target: 'http://nb.tst-weiboyi.com', changeOrigin: true }
  ));
}
