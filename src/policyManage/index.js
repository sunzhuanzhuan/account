import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import lazyLoadComponent from '@/components/LazyLoadComponent'
import './container.less'

// 懒加载路由级组件
const PolicyList = lazyLoadComponent(() => import('./containers/PolicyList'))
const __PolicyList = lazyLoadComponent(() => import('./containers/__PolicyList'))
const PolicyListByOwner = lazyLoadComponent(() => import('./containers/PolicyListByOwner'))
const PolicyCreate = lazyLoadComponent(() => import('./containers/PolicyCreate'))


class AccountEnterIndex extends Component {
  state = {}

  render() {
    return (
      <div className='policy-manage'>
        <Route exact path="/account/policy/list" component={PolicyList} />
        <Route path='/account/policy/list/:id' component={PolicyListByOwner} />
        <Route path='/account/policy/details/:id' component={__PolicyList} />
        <Route path='/account/policy/update/:id' component={__PolicyList} />
        <Route path='/account/policy/create/:ownerId' component={PolicyCreate} />
      </div>
    );
  }
}

export default AccountEnterIndex;



