import React, { Component } from 'react';
import { Form, Input } from 'antd';
import WBYUploadFile from '@/accountManage/base/NewUpload'

const FormItem = Form.Item;

export class BaseInfo extends Component {

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
    let name = props.data.accountInfo['snsName'] || ''
    let id = props.data.accountInfo['snsId'] || ''
    this.state = {
      accountNameLen: name.length,
      IDLen: id.length,
      accountNameShow: false,
      IDShow: false
    }
  }

  validateSnsId = (rule, value, callback) => {
		const lenReg = /^.{0,100}$/;
		const emojiReg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|\u3030|\u3030/ig;
		const contentReg = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g;
		if (!(value && value.trim())) {
			callback('账号ID不能为空');
		} else if (!lenReg.test(value)) {
			callback('账号ID最多可输入100个字符');
		} else if (contentReg.test(value) || emojiReg.test(value)) {
			callback('账号ID不能包含中文或特殊字符');
		} else {
			callback();
		}
	}

  render() {
    const {
      getFieldDecorator, formItemLayout, children, halfWrapCol, form, data: { accountInfo }, hideUniqueId, hideLink, actions
    } = this.props
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
    return <div>
      <FormItem {...formItemLayout} label='账号名称'>
        {getFieldDecorator('base.snsName', {
          initialValue: snsName,
          first: true,
          rules: [{ required: true, message: '账号名称不能为空' }, {
            pattern: /^(.){0,80}$/,
            message: '账号名称最多可输入80个字符'
          }]
        })(
          <Input disabled={snsNameFrom == 2} suffix={accountNameShow ?
            <span className='input-suffix-text'>{accountNameLen}/80</span> : null} onFocus={this.displayInputLen('accountName', true)} placeholder="账号名称" onChange={this.setInputLen('accountNameLen')} onBlur={this.displayInputLen('accountName', false)} />
        )}
      </FormItem>
      <FormItem {...formItemLayout} label='账号ID'>
        {getFieldDecorator('base.snsId', {
          initialValue: snsId,
          first: true,
          rules: [{ required: true, message: ' ' }, { validator: this.validateSnsId }]
        })(
          <Input disabled={snsIdFrom == 2} suffix={IDShow ?
            <span className='input-suffix-text'>{IDLen}/100</span> : null} onFocus={this.displayInputLen('ID', true)} placeholder="账号ID" onChange={this.setInputLen('IDLen')} onBlur={this.displayInputLen('ID', false)} />
        )}
      </FormItem>
      {hideLink ? null : <FormItem {...formItemLayout} label='主页链接'>
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
      {hideUniqueId ? null :
        <FormItem {...formItemLayout} wrapperCol={halfWrapCol} label='唯一标识'>
          {getFieldDecorator('base.snsUniqueId', {
            initialValue: snsUniqueId
          })(
            <p>{snsUniqueId || '--'}</p>
          )}
        </FormItem>}
      <FormItem {...formItemLayout} label='头像'>
        <div className='clearfix'>
          {getFieldDecorator('base.avatarUrl', {
            initialValue: avatarUrl ? [{
              name: avatarUrl,
              url: avatarUrl,
              filepath: avatarUrl
            }] : [],
            rules: [{ required: true, message: '头像不能为空' }]
          })(
            <WBYUploadFile tok={actions.getNewToken} uploadUrl='/api/common-file/file/v1/uploadPubBucket' accept={'.bmp,.jpg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.cdr,.pcd,.dxf,.ufo,.eps,.raw,.wmf,.webp,.flic,.ico'} showUploadList={{
              showPreviewIcon: true,
              showRemoveIcon: !(avatarUrlFrom == 2)
            }} uploadText={'点击上传'} size={25} disabled={avatarUrlFrom == 2} />
          )}
        </div>
        <p className='input-desc-bottom'>请上传25M以内的图片</p>
      </FormItem>
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
      {/*{getFieldDecorator('catched_at', { initialValue: catched_at })(
					<input type="hidden" />)}*/}
      {React.Children.map(children, child => React.cloneElement(child, { ...form }))}
    </div>
  }
}
