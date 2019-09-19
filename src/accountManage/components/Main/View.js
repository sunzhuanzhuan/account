/**
 * 账号基本信息 - 展示态
 */
import React, { Component } from "react"
import { Button, Divider, Icon, Form, Popover, Radio, Typography } from 'antd'
import { WBYPlatformIcon } from 'wbyui'
import update from "immutability-helper";
import numeral from "@/util/numeralExpand";
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import FieldView from "@/accountManage/base/FeildView";
import SimpleTag from "@/accountManage/base/SimpleTag";
import {
  configItemKeyToField,
  configOptions
} from "@/accountManage/constants/packageConfig";
import { dateDisplay } from "../../util";


export default class MainView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { actions, data: { account, visibility } } = this.props
    // 获取字段配置项 - 账号特权
    Object.keys(visibility.accountFields).length === 0 &&
    actions.getAccountFieldConfig({ platformId: account.base.platformId })
  }

  render() {
    const {
      data,
      module: configureModule, platform: configurePlatform,
      onModuleStatusChange
    } = this.props
    const {
      id,
      base: {
        avatarUrl,
        snsUniqueId,
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
        verifiedStatusName,
        verificationInfo,
        showWindow,
        isSupportLive,
        baseModifiedAt // 账号基本信息修改时间
      }
    } = data.account || {}
    const {
      visibility
    } = data
    const asyncVisibility = visibility.accountFields
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
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: {dateDisplay(baseModifiedAt) || '--'}</span>
      {this.props.readOnly ? null : <a onClick={() => onModuleStatusChange('edit')} style={{ fontSize: '14px' }}>
        <Icon type="edit" style={{ marginRight: '6px' }} />
        编辑
      </a>}
      {/*<Button type='primary' onClick={() => onModuleStatusChange('edit')}>编辑</Button>*/}
    </div>;

    return <div className='module-item-container'>
      <ModuleHeader title={configureModule.title} left={left} right={right} />
      <ul className='content-wrap'>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>基础信息</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <div className='view-fields-container main-base-info'>
              <div className='left-wrap'>
                <div>
                  <img src={avatarUrl} alt="头像" />
                </div>
              </div>
              <div className='right-wrap'>
                <FieldView title="唯一标识" value={snsUniqueId} />
                <FieldView title="account_id" value={id} />
                <FieldView title="账号名称" value={snsName} />
                <FieldView title="账号ID" value={snsId} />
                {configurePlatform.visibility.fields.url &&
                <FieldView title="主页链接" value={
                  url ? <a href={url} target="_blank" className='ellipsis-text'>
                    {url}
                  </a> : '请完善主页链接'
                } />}
                {configurePlatform.visibility.fields.weiboUrl &&
                <FieldView title="微博链接" value={
                  weiboUrl ? <a href={weiboUrl} target="_blank" className='ellipsis-text'>
                    {weiboUrl}
                  </a> : null
                } />}
                {configurePlatform.visibility.fields.qcCode &&
                <FieldView title="二维码" value={
                  <Popover placement="bottomLeft" arrowPointAtCenter trigger="hover" content={
                    <img alt='二维码' src={qrCodeUrl} width={120} height={120} />
                  }>
                    <Icon style={{ fontSize: '16px' }} type="qrcode" />
                  </Popover>}
                />}
                <FieldView title="账号简介" value={introduction || "您还没有添加账号简介哦~"} />
              </div>
            </div>
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>数据信息</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <div className='view-fields-container'>
              <div className='right-wrap'>
                <FieldView title="粉丝数" value={numeral(followerCount).format('0,0')} />
                {configurePlatform.visibility.fields.isFansNumberImg &&
                <FieldView title="粉丝数截图" value={
                  followerCountScreenshotUrl ?
                    <img alt='粉丝数截图' src={followerCountScreenshotUrl} width={100} height={100} /> : '请添加粉丝数截图'
                } />}
                <FieldView title="平台等级" value={level === 0 ? '' : (configurePlatform.configure.levelText ? configurePlatform.configure.levelText[level] : level)} />
              </div>
            </div>
          </div>
        </li>
        {classificationList.length > 0 && <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>内容分类</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <div className='view-fields-container'>
              <div className='right-wrap'>
                {
                  classificationList.map(({ name }) =>
                    <SimpleTag key={name}>{name}</SimpleTag>)
                }
              </div>
            </div>
          </div>
        </li>}
        {configOptions.mediaTypeMap[mediaType] && <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>账号类属</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <div className='view-fields-container'>
              <div className='right-wrap'>
                {
                  configOptions.mediaTypeMap[mediaType] || '请选择账号类属'
                }
              </div>
            </div>
          </div>
        </li>}
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>账号特权</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <div className='view-fields-container'>
              <div className='right-wrap'>
                <FieldView title="是否认证" value={isVerified === 1 ? '已认证' : '未认证'} />
                {isVerified === 1 &&
                <FieldView title="认证信息" value={verifiedStatusName} />}
                {isVerified === 1 &&
                <FieldView title="认证说明" value={verificationInfo} />}
                {asyncVisibility.showWindow &&
                <FieldView title="橱窗/店铺" value={showWindow === 1 ? '已开通' : '未开通'} />}
                {asyncVisibility.isSupportLive &&
                <FieldView title="直播" value={isSupportLive === 1 ? '已开通' : '未开通'} />}
              </div>
            </div>
          </div>
        </li>
      </ul>
      {this.props.readOnly ? null : <footer className='mini-fields-footer clearfix'>
        <div>
          <span onClick={() => onModuleStatusChange('mini')}>
            收起更多 <Icon type="double-left" rotate={90} />
          </span>
        </div>
      </footer>}
    </div>
  }
}
