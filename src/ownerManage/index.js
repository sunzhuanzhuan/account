import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import lazyLoadComponent from '@/components/LazyLoadComponent'
import './container.less'

// 懒加载路由级组件
const UpdateOwnerPage = lazyLoadComponent(() => import('./containers/UpdateOwnerPage'))
const DetailsOwnerPage = lazyLoadComponent(() => import('./containers/DetailsOwnerPage'))
const AddOwnerPage = lazyLoadComponent(() => import('./containers/AddOwnerPage'))


class AccountEnterIndex extends Component {
  state = {}

  render() {
    return (
      <div className='owner-manage'>
        <Route path='/account/owner/add' component={AddOwnerPage} />
        <Route path='/account/owner/update/:id' component={UpdateOwnerPage} />
        <Route path='/account/owner/details/:id' component={DetailsOwnerPage} />
      </div>
    );
  }
}

export default AccountEnterIndex;



