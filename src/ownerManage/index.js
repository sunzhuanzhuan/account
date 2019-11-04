import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import lazyLoadComponent from '@/components/LazyLoadComponent'
import './container.less'

// 懒加载路由级组件
const UpdateOwnerPage = lazyLoadComponent(() => import('./containers/UpdateOwnerPage'))


class AccountEnterIndex extends Component {
  state = {}

  render() {
    return (
      <div className='owner-manage'>
        <Route path='/account/owner/update' component={UpdateOwnerPage} />
      </div>
    );
  }
}

export default AccountEnterIndex;



