import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store, { history } from './store';
import 'babel-polyfill';
import { ConfigProvider, LocaleProvider } from 'antd';
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
import AccountDetail from './accountDetail';
import Policy from './policyManage';
import ChannelDiscount from './policyManage/containers/ChannelDiscount';
import Owner from './ownerManage';

import { linkTo } from '@/util/linkTo';
// 设置语言包
numeral.locale('chs');
moment.locale('zh-cn');
// 处理跳转到其他项目的路由
const redirectToOtherProjects = ({ location: { pathname = '/error', search = '' } }) => {
  /** 新B端测试环境地址 @namespace process.env.REACT_APP_TRUNK_BENTLEY_ADDRESS **/
  linkTo(pathname + search)
  return null;
};
// 项目内路由
const routes = () => (
  <App history={history}>
    <ConfigProvider getPopupContainer={() => document.getElementById('app-content-children-id')}>
      <Switch>
        <Route path="/account/manage" component={AccountManage} />
        <Route path="/account/view" component={AccountDetail} />
        <Route path="/account/policy" component={Policy} />
        <Route path="/account/discount" component={ChannelDiscount} />
        <Route path="/account/owner" component={Owner} />
        <Route render={() => linkTo('/error')} />
      </Switch>
    </ConfigProvider>
  </App>
);

render(
  <LocaleProvider locale={zhCN}>
    <Provider store={store}>
      <Router>
        <Switch>
          {
            process.env.NODE_ENV === 'development' ?
              <Route exact path="/" render={() => <Redirect to="/account/owner/update" />} /> : null
          }
          <Route path="/account" render={routes} />
          <Route render={redirectToOtherProjects} />
        </Switch>
      </Router>
    </Provider>
  </LocaleProvider>,
  document.getElementById('root')
);
