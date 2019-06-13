/**
 * 主账号信息
 */
import React, { Component } from "react"
import { Row, Col } from 'antd/lib/index'
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";

export default class Owner extends Component {

  render() {
    const { babysitter_host = {} } = window.bentleyConfig || {};
    const {
      module: configureModule,
      platform: configurePlatform,
      data: { account, adminAccount, auth = {} },
      actions
    } = this.props
    const {
      identityName,
      userId,
      ownerAdminRealName,
      volAdminRealName,
      platformId
    } = adminAccount
    // TODO: 主账号更新时间字段
    const {
      id: accountId,
      base: { modifiedAt }
    } = account
    const babysitterHost = babysitter_host.value || 'http://toufang.tst-weiboyi.com';
    let isOwner = auth['account.manage.update.change.main.account'];
    let href = isOwner ? `${babysitterHost}/user/index/type/huanma/account_id/${accountId}/weibo_type/${platformId}` : `${babysitterHost}/user/chowner/account_id/${accountId}`;

    const rightC = <div className='wrap-panel-right-content'>
      <span className='gray-text'>信息更新时间 : {(modifiedAt && modifiedAt !== '1970-01-01 08:00:00') ? modifiedAt : '--'}</span>
      <a target={'_blank'} href={href}>更换主账号</a>
    </div>;
    return <div className='module-item-container'>
      <ModuleHeader title={configureModule.title} right={rightC} />
      <section className='content-wrap'>
        <Row>
          <Col span={6}>主账号名称：<a target={'_blank'} href={`${babysitterHost}/user/update/user_id/${userId}`}>{identityName}</a></Col>
          <Col span={6}>user_id：{userId}</Col>
          <Col span={6}>资源媒介：{ownerAdminRealName || '--'}</Col>
          <Col span={6}>项目媒介：{volAdminRealName || '--'}</Col>
        </Row>
      </section>
    </div>
  }
}
