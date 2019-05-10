/**
 * 账号基本信息 - 展示态
 */
import React, { Component } from "react"
import { Button, Divider, Icon, Form, Popover, Radio } from 'antd'
import { WBYPlatformIcon } from 'wbyui'
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import FieldView from "@/accountManage/base/FeildView";
import SimpleTag from "@/accountManage/base/SimpleTag";


export default class MainView extends Component {
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
      layout,
      data,
      actions,
      form,
      module: configureModule, platform: configurePlatform,
      onModuleStatusChange
    } = this.props
    // const { getFieldDecorator } = form
    // const fieldProps = { layout, data, form, actions }
    const {
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
    } = data.accountInfo || {}
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
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: {baseModifiedAt || '--'}</span>
      <Button type='primary' onClick={() => onModuleStatusChange('edit')}>编辑</Button>
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
                <FieldView title="账号名称" value={snsName} />
                <FieldView title="账号ID" value={snsId} />
                {configurePlatform.visibility.fields.url && <FieldView title="主页链接" value={url} />}
                {configurePlatform.visibility.fields.weiboUrl &&
                <FieldView title="微博链接" value={weiboUrl} />}
                {configurePlatform.visibility.fields.qcCode && <FieldView title="二维码" value={
                  <Popover placement="bottomLeft" arrowPointAtCenter trigger="hover" content={
                    <img src={qrCodeUrl} width={120} height={120} />
                  }>
                    <Icon style={{ fontSize: '16px' }} type="qrcode" />
                  </Popover>}
                />}
                <FieldView title="账号简介" value={introduction} />
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
                <FieldView title="粉丝数" value={followerCount} />
                <FieldView title="粉丝数截图" value={
                  followerCountScreenshotUrl ?
                    <img src={followerCountScreenshotUrl} width={100} height={100} /> : '暂无截图'
                } />
                <FieldView title="平台等级" value={level === 0 ? '' : level} />
              </div>
            </div>
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>内容分类</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <div className='view-fields-container'>
              <div className='right-wrap'>
                {
                  classificationList.length > 0 ? classificationList.map(({ name }) =>
                    <SimpleTag key={name}>{name}</SimpleTag>) : '暂无分类'
                }
              </div>
            </div>
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>账号类属</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <div className='view-fields-container'>
              <div className='right-wrap'>
                {
                  mediaType === 2 ? "个人号-具有个人的属性特征" : mediaType === 3 ? "企业号-社会上的企业或官方注册" : mediaType === 4 ? " 内容号-不具有人的属性特征、仅以内容存在" : "未知"
                }
              </div>
            </div>
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>账号特权</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <div className='view-fields-container'>
              <div className='right-wrap'>
                <FieldView title="是否认证" value={isVerified === 1 ? '已认证' : '未认证'} />
                {isVerified === 1 && <FieldView title="认证信息" value={verifiedStatus} />}
                {isVerified === 1 && <FieldView title="认证说明" value={verificationInfo} />}
                {asyncVisibility.isOpenStore &&
                <FieldView title="橱窗/店铺" value={isOpenStore === 1 ? '已开通' : '未开通'} />}
                {asyncVisibility.isOpenLiveProgram &&
                <FieldView title="直播" value={isOpenLiveProgram === 1 ? '已开通' : '未开通'} />}
              </div>
            </div>
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>上架信息</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <div className='view-fields-container'>
              <div className='right-wrap'>
                <FieldView title="是否上架" value='否' />
                <FieldView title="原因" value={'这是一条原因'} />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  }
}
