/**
 * 账号基本信息 - 摘要
 */
import React, { Component } from "react"
import { Button, Divider, Icon, Form, Popover, Radio } from 'antd'
import { WBYPlatformIcon } from 'wbyui'
import numeral from "@/util/numeralExpand";
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import FieldView from "@/accountManage/base/FeildView";
import SimpleTag from "@/accountManage/base/SimpleTag";


export default class MainMini extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authToken: '',
      asyncVisibility: {
        isOpenLiveProgram: true,
        isOpenStore: true
      }
    }
    props.actions.getNewToken().then(({ data: authToken }) => {
      this.setState({ authToken })
    })
  }

  render() {
    const {
      data,
      module: configureModule, platform: configurePlatform,
      onModuleStatusChange
    } = this.props
    // const { getFieldDecorator } = form
    // const fieldProps = { layout, data, form, actions }
    const {
      base: {
        avatarUrl,
        snsName,
        snsId,
        url,
        weiboUrl,
        qrCodeUrl,
        introduction,
        followerCount,
        followerCountScreenshotUrl,
        level,
        mediaType,
        classificationList = [],
        isVerified,
        verifiedStatus,
        verificationInfo,
        isOpenStore,
        isOpenLiveProgram,
        baseModifiedAt // 账号基本信息修改时间
      },
      strategyInfo : {
        onShelfStatus: {
          aOnShelfStatus,
          aOffShelfReasonStringList,
          bOnShelfStatus,
          bOffShelfReasonStringList
        } = {},
      }
    } = data.account || {}
    const {
      authToken,
      asyncVisibility
    } = this.state
    const left = <div className='wrap-panel-left-content'>
      <span style={{
        verticalAlign: "middle",
        display: "inline-block",
        marginRight: "6px"
      }}>
        <WBYPlatformIcon weibo_type={configurePlatform.platformId} width={22} />
      </span>
      <span>{configurePlatform.platformName}</span>
    </div>;

    return <div className='module-item-container' onSubmit={this.submit}>
      <header className='mini-fields-header clearfix'>
        <div>
          <span className='gray-text'>最近更新于: {baseModifiedAt || '--'}</span>
          <span onClick={() => onModuleStatusChange('edit')}>
            <Icon type="edit" />
            编辑
          </span>
        </div>
      </header>
      <main className='content-wrap mini-fields-content'>
        <div className='left-wrap'>
          <div>
            <img src={avatarUrl} alt="头像" />
          </div>
        </div>
        <div className='right-wrap'>
          <div className='mini-infos'>
            <span className='mini-sns-name'>{snsName || "--"}</span>
            {
              classificationList.map(({ name }) =>
                <SimpleTag key={name}>{name}</SimpleTag>)
            }
          </div>
          <div className='mini-infos'>
            <span className='gray-text'>ID: {snsId || '--'}</span>
            <Divider type="vertical" />
            <span>
              {numeral(followerCount).format('0,0w') || '--'}
              <span className='gray-text' style={{ marginLeft: '8px' }}>粉丝</span></span>
            <Divider type="vertical" />
            <span style={{
              verticalAlign: "middle",
              display: "inline-block",
              marginRight: "6px"
            }}>
              <WBYPlatformIcon weibo_type={configurePlatform.platformId} width={22} />
            </span>
            <span>{configurePlatform.platformName}</span>
          </div>
          <div>
            {introduction || '暂无简介'}
          </div>
          {/*<div className='line' style={{ borderBottom: '1px solid #e8e8e8', margin: '10px 0' }} />
          <div className='gray-text'>
            未上架: 原因
          </div>*/}
        </div>
      </main>
      <footer className='mini-fields-footer clearfix'>
        <div>
          <span onClick={() => onModuleStatusChange('view')}>
            展开更多 <Icon type="double-right" rotate={90} />
          </span>
        </div>
      </footer>
    </div>
  }
}
