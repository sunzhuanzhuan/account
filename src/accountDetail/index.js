import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import lazyLoadComponent from '@/components/LazyLoadComponent'
import './index.less'
// 懒加载路由级组件
const AccountDetail = lazyLoadComponent(() => import('./containers/AccountDetail'))


class AccountDetailIndex extends Component {
  state = {}

  render() {
    return (
      <div >
        <Route path='/account/view/detail' component={AccountDetail} />
      </div>
    );
  }
}

export default AccountDetailIndex;



