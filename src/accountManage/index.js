import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import lazyLoadComponent from 'lazy-load-component';
import './container.less';
// import moment from 'moment'
// moment.fn.toJSON = function () {return moment(this).format("YYYY-MM-DD HH:mm:ss")}

// 懒加载路由级组件
const AddPage = lazyLoadComponent(() => import('./containers/AddPage'));
const UpdatePage = lazyLoadComponent(() => import('./containers/UpdatePage'));
const Test = lazyLoadComponent(() => import('./containers/Test'));

class AccountEnterIndex extends Component {
  state = {};

  render() {
    return (
      <div className="account-manage" id="account-manage-container">
        <Route path="/account/manage/add" component={AddPage} />
        <Route path="/account/manage/update" component={UpdatePage} />
        <Route path="/account/manage/test" component={Test} />
      </div>
    );
  }
}

export default AccountEnterIndex;
