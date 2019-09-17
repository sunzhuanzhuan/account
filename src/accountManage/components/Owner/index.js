/**
 * 主账号信息
 */
import React, { Component } from "react"
import { Row, Col } from 'antd/lib/index'
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";

export default class Owner extends Component {

  render() {
    const {
      module: configureModule,
      data: { account, adminAccount, auth, userConfig },
    } = this.props
    const { babysitter_host = {} } = userConfig;
    const {
      identityName,
      userId,
      ownerAdminRealName,
      volAdminRealName
    } = adminAccount
    const {
      id: accountId,
      base: { platformId }
    } = account
    const babysitterHost = babysitter_host.value || 'http://toufang.weiboyi.com';
    let isOwner = auth['account.manage.update.change.main.account'];
    let href = isOwner ? `${babysitterHost}/user/index/type/huanma/account_id/${accountId}/weibo_type/${platformId}` : `${babysitterHost}/user/chowner/account_id/${accountId}`;

    const rightC = this.props.readOnly ? null : <div className='wrap-panel-right-content'>
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
