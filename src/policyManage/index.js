import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import lazyLoadComponent from '@/components/LazyLoadComponent'
import './container.less'
import { linkTo } from "@/util/linkTo";

// 懒加载路由级组件
const PolicyList = lazyLoadComponent(() => import('./containers/PolicyList'))
const PolicyListByOwner = lazyLoadComponent(() => import('./containers/PolicyListByOwner'))
const PolicyCreate = lazyLoadComponent(() => import('./containers/PolicyCreate'))
const PolicyUpdate = lazyLoadComponent(() => import('./containers/PolicyUpdate'))
const PolicyDetails = lazyLoadComponent(() => import('./containers/PolicyDetails'))


class AccountEnterIndex extends Component {
  state = {}

  render() {
    return (
      <div className='policy-manage'>
        <Switch>
          <Route exact path="/account/policy/list" component={PolicyList} />
          <Route path='/account/policy/list/:ownerId' component={PolicyListByOwner} />
          <Route path='/account/policy/details/:id' component={PolicyDetails} />
          <Route path='/account/policy/update/:id' component={PolicyUpdate} />
          <Route path='/account/policy/create/:ownerId' component={PolicyCreate} />
          <Route render={() => linkTo('/error')} />
        </Switch>
      </div>
    );
  }
}

export default AccountEnterIndex;



