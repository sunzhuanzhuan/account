/**
 * 账号基本信息
 */
import React, { Component } from "react"
import { Form, Input } from 'antd'
import { WBYPlatformIcon } from 'wbyui'
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { platformView } from "@/accountManage/constants/platform";
import WBYUploadFile from "@/accountManage/base/NewUpload";
import InputCount from "@/accountManage/base/InputCount";
const FormItem = Form.Item;

@Form.create()
export default class Main extends Component {
  setInputLen = key => e => {
    this.setState({
      [key]: e.target.value.length
    })
  }

  displayInputLen = (key, diaplay) => e => {
    this.setState({
      [key + 'Show']: diaplay,
      [key + 'Len']: e.target.value.length
    })
  }

  constructor(props) {
    super(props)
    let name =  ''
    let id =  ''
    this.state = {
      accountNameLen: name.length,
      IDLen: id.length,
      accountNameShow: false,
      IDShow: false
    }
  }
  render() {
    const {
      layout,
      formItemLayout,
      halfWrapCol,
      data: { accountInfo = {} },
      hideUniqueId,
      hideLink,
      actions
    } = this.props
    const {  module: configureModule, platform: configurePlatform } = this.props

    const {
      getFieldDecorator,
    } = this.props.form

    const {
      snsName,
      snsNameFrom,
      snsNameMaintainedTime,
      snsId,
      snsIdFrom,
      snsIdMaintainedTime,
      url,
      urlFrom,
      urlMaintainedTime,
      snsUniqueId,
      avatarUrl,
      avatarUrlFrom,
      avatarUrlMaintainedTime
    } = accountInfo
    const { accountNameLen, IDLen, accountNameShow, IDShow } = this.state
    const left = <div className='wrap-panel-left-content'>
      <span style={{
        verticalAlign: "text-bottom",
        display: "inline-block",
        lineHeight: 0,
      }}>
        <WBYPlatformIcon weibo_type={1} width={22} />
      </span>
      <span>{platformView[1]}</span>
    </div>;
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: 1970-01-01 08:00:00</span>
    </div>;

    return <Form className='module-item-container'>
      <ModuleHeader title={configureModule.title} left={left} right={right} />
      <ul className='content-wrap'>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>基础信息</span>
            <small className='line'/>
          </h4>
          <div className='subclass-content'>
            {hideUniqueId ? null :
              <FormItem {...layout.full} label='唯一标识'>
                {getFieldDecorator('base.snsUniqueId', {
                  initialValue: snsUniqueId
                })(
                  <div>{snsUniqueId || '--'}</div>
                )}
              </FormItem>}
            <FormItem {...layout.full} label='account_id'>
              2812125851
            </FormItem>
            <FormItem {...layout.full} label='账号名称'>
              {getFieldDecorator('base.snsName', {
                initialValue: snsName,
                first: true,
                rules: [{ required: true, message: '账号名称不能为空' }, {
                  pattern: /^(.){0,40}$/,
                  message: '账号名称最多可输入80个字符'
                }]
              })(
                <InputCount placeholder="账号名称" showCount disabled={false} max={40}/>
              )}
            </FormItem>
            <FormItem {...layout.full} label='账号ID'>
              {getFieldDecorator('base.snsId', {
                initialValue: snsId,
                first: true,
                rules: [{ required: true, message: '账号ID不能为空' }, {
                  pattern: /^.{0,100}$/,
                  message: '账号ID最多可输入100个字符'
                }]
              })(
                <InputCount placeholder="账号名ID" showCount disabled={false} max={100}/>
              )}
            </FormItem>
            {hideLink ? null : <FormItem {...layout.full} label='主页链接'>
              {getFieldDecorator('base.url', {
                first: true,
                initialValue: url,
                rules: [{ required: true, message: '主页链接不能为空' }, {
                  pattern: /^((htt(p|ps))|weixin):\/\//,
                  message: '主页链接格式不正确，请填写前缀为“http://或https://”的主页链接'
                }, { max: 1024, message: '主页链接最多可输入1024个字符' }]
              })(
                <Input disabled={urlFrom == 2} placeholder="主页链接" />
              )}
            </FormItem>}
            {/*

            <FormItem {...layout.full} label='头像'>
              <div className='clearfix'>
                {getFieldDecorator('base.avatarUrl', {
                  initialValue: avatarUrl ? [{
                    name: avatarUrl,
                    url: avatarUrl,
                    filepath: avatarUrl
                  }] : [],
                  rules: [{ required: true, message: '头像不能为空' }]
                })(
                  <WBYUploadFile tok={actions.getNewToken} uploadUrl='/api/common-file/file/v1/uploadPubBucket' accept={'.bmp, .gif, image/jpeg'} showUploadList={{
                    showPreviewIcon: true,
                    showRemoveIcon: !(avatarUrlFrom == 2)
                  }} uploadText={'点击上传'} size={5} disabled={avatarUrlFrom == 2} />
                )}
              </div>
              <p className='input-desc-bottom'>请上传bmp, jpeg, jpg, gif;5M以内的图片</p>
            </FormItem>*/}
            {/* 隐藏域提交 */}
            {getFieldDecorator('base.snsNameFrom', { initialValue: snsNameFrom })(
              <input type="hidden" />)}
            {getFieldDecorator('base.snsNameMaintainedTime', { initialValue: snsNameMaintainedTime })(
              <input type="hidden" />)}
            {getFieldDecorator('base.snsIdFrom', { initialValue: snsIdFrom })(
              <input type="hidden" />)}
            {getFieldDecorator('base.snsIdMaintainedTime', { initialValue: snsIdMaintainedTime })(
              <input type="hidden" />)}
            {getFieldDecorator('base.urlFrom', { initialValue: urlFrom })(
              <input type="hidden" />)}
            {getFieldDecorator('base.urlMaintainedTime', { initialValue: urlMaintainedTime })(
              <input type="hidden" />)}
            {getFieldDecorator('base.avatarUrlFrom', { initialValue: avatarUrlFrom })(
              <input type="hidden" />)}
            {getFieldDecorator('base.avatarUrlMaintainedTime', { initialValue: avatarUrlMaintainedTime })(
              <input type="hidden" />)}
          </div>
        </li>
      </ul>
      {/*<section className='custom-infos'>
			</section>*/}
    </Form>
  }
}
