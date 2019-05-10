/**
 * 账号基本信息 - 编辑态
 */
import React, { Component } from "react"
import { Button, Divider, Form } from 'antd'
import { WBYPlatformIcon } from 'wbyui'
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import {
  Introduction,
  UniqueId,
  Id,
  Url,
  AvatarUrl,
  MicroFlashPost,
  ContentCategory,
  FollowerCount,
  FollowerCountScreenshotUrl,
  FollowerCountVerificationStatus,
  AccountId,
  Name, QrCodeUrl, WeiboUrl, Level, MediaType, Verified, OpenStore, OpenLiveProgram
} from "../common/Fields";

const FormItem = Form.Item;

@Form.create()
export default class MainEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authToken: '',
      asyncVisibility: {
        isOpenLiveProgram: true,
        isOpenStore: true,
      }
    }
    props.actions.getNewToken().then(({ data: authToken }) => {
      this.setState({ authToken })
    })

  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      console.log('Received values of form: ', fieldsValue);
      if (err) {
        return;
      }


    });
  }


  render() {
    const {
      layout,
      data,
      actions,
      form,
      module: configureModule, platform: configurePlatform
    } = this.props
    // const { getFieldDecorator } = form
    const fieldProps = { layout, data, form, actions }
    const {
      isFamous,
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
      <Button htmlType='submit' type='primary'>保存</Button>
    </div>;

    return <Form className='module-item-container' onSubmit={this.submit}>
      <ModuleHeader title={configureModule.title} left={left} right={right} />
      <ul className='content-wrap'>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>基础信息</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            {configurePlatform.visibility.fields.uniqueId && <UniqueId {...fieldProps} />}
            <AccountId {...fieldProps} />
            <Name {...fieldProps} />
            <Id {...fieldProps} />
            {configurePlatform.visibility.fields.url && <Url {...fieldProps} />}
            <AvatarUrl  {...fieldProps} authToken={authToken} />
            {configurePlatform.visibility.fields.qcCode &&
            <QrCodeUrl {...fieldProps} authToken={authToken} />}
            <Introduction {...fieldProps} placeholder={configurePlatform.configure.introductionPlaceholder} />
            {configurePlatform.visibility.fields.weiboUrl && <WeiboUrl {...fieldProps} />}
            <MicroFlashPost {...fieldProps} />
            <Divider dashed />
            <ContentCategory {...fieldProps} />
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>数据信息</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <FollowerCount {...fieldProps} disabled={configurePlatform.configure.disabledFollowersCount} />
            <FollowerCountScreenshotUrl {...fieldProps} authToken={authToken} />
            <FollowerCountVerificationStatus {...fieldProps} />
            <Divider dashed />
            <Level {...fieldProps} options={configurePlatform.configure.levelText} />
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>账号类属</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <MediaType {...fieldProps} />
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>账号特权</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <Verified {...fieldProps} />
            {/* 以下字段需要判断可见性 */}
            {asyncVisibility.isOpenStore && <OpenStore {...fieldProps} />}
            {asyncVisibility.isOpenLiveProgram && <OpenLiveProgram {...fieldProps} />}
          </div>
        </li>
      </ul>
    </Form>
  }
}
