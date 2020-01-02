import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import lazyLoadComponent from '@/components/LazyLoadComponent'
import './container.less'
// import moment from 'moment'
// moment.fn.toJSON = function () {return moment(this).format("YYYY-MM-DD HH:mm:ss")}

// 懒加载路由级组件
const AddPage = lazyLoadComponent(() => import('./containers/AddPage'))
const RestorePage = lazyLoadComponent(() => import('./containers/RestorePage'))
const UpdatePageForPackage = lazyLoadComponent(() => import('./containers/UpdatePageForPackage'))
const ViewPageForPackage = lazyLoadComponent(() => import('./containers/ViewPageForPackage'))


class AccountEnterIndex extends Component {
  state = {}

  render() {
    return (
      <div className='account-manage' id='account-manage-container'>
        <Route path='/account/manage/add' component={AddPage} />
        <Route path='/account/manage/update/:platformId' component={UpdatePageForPackage} />
        <Route path='/account/manage/view/:platformId' component={ViewPageForPackage} />
        <Route path='/account/manage/batch-restore' component={RestorePage} />
      </div>
    );
  }
}

export default AccountEnterIndex;



