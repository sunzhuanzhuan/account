import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store, { history } from './store';
import 'babel-polyfill';
import { LocaleProvider } from 'antd';
import './index.less';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
// 导入语言包
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import 'numeral/locales/chs';
// 顶级根目录页面
import App from './containers/App';
import AccountManage from './accountManage';
// 设置语言包
numeral.locale('chs');
moment.locale('zh-cn');
// 处理跳转到其他项目的路由
const redirectToOtherProjects = ({ location: { pathname = '/error' } }) => {
  /** 新B端测试环境地址 @namespace process.env.REACT_APP_TRUNK_BENTLEY_ADDRESS **/
  if (process.env.NODE_ENV === 'development') {
    window.location.replace(process.env.REACT_APP_TRUNK_BENTLEY_ADDRESS + pathname);
  } else {
    window.location.replace(pathname);
  }
  return null;
};
// 项目内路由
const routes = () => (
  <App history={history}>
    <Switch>
      <Route path="/account/manage" component={AccountManage} />
      <Redirect to="/error" />
    </Switch>
  </App>
);

render(
  <LocaleProvider locale={zhCN}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/account" render={routes} />
          <Route render={redirectToOtherProjects} />
        </Switch>
      </Router>
    </Provider>
  </LocaleProvider>,
  document.getElementById('root')
);
