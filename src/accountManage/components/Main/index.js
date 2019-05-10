/**
 * 账号基本信息
 */
import React, { Component } from "react"
import { Button, Divider, Form, Icon, Input } from 'antd'
import { WBYPlatformIcon, OssUpload } from 'wbyui'
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import InputCount from "@/accountManage/base/InputCount";
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
  QCCodeUpload,
  AccountId,
  Name, QrCodeUrl, WeiboUrl, Level, MediaType
} from "../common/Fields";
import { BaseInfo } from "@/accountManage/components/BaseInfo";
import { platformMap } from "@/accountManage/constants/platform";
import { FansCount } from "@/accountManage/components/FansCount";
import { Fans } from "@/accountManage/components/Fans";

const FormItem = Form.Item;

@Form.create()
export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authToken: ''
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
    const { getFieldDecorator } = form
    const fieldProps = { layout, data, form, actions }
    const {
      isFamous
    } = data.accountInfo || {}
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
      <span className='gray-text'>最近更新于: 1970-01-01 08:00:00</span>
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
            <AvatarUrl  {...fieldProps} authToken={this.state.authToken} />
            {configurePlatform.visibility.fields.qcCode &&
            <QrCodeUrl {...fieldProps} authToken={this.state.authToken} />}
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
            <FollowerCountScreenshotUrl {...fieldProps} authToken={this.state.authToken}/>
            <FollowerCountVerificationStatus {...fieldProps}/>
            <Divider dashed />
            <Level {...fieldProps} options={configurePlatform.configure.levelText}/>
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>账号类属</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <MediaType {...fieldProps}/>
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>账号特权</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            ss
          </div>
        </li>
      </ul>
    </Form>
  }
}
