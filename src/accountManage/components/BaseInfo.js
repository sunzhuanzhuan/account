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

	render() {
		const {
			getFieldDecorator, formItemLayout, children, halfWrapCol, form, data: { accountInfo }, hideUniqueId, hideLink, actions
		} = this.props
		const {
			snsName,
			isSnsNameEditable,
			snsNameMaintainedTime,
			snsId,
			isSnsIdEditable,
			snsIdMaintainedTime,
			url,
			isUrlEditable,
			urlMaintainedTime,
			snsUniqueId,
			avatarUrl,
			isAvatarUrlEditable,
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
					<Input disabled={isSnsNameEditable == 2} suffix={accountNameShow ?
						<span className='input-suffix-text'>{accountNameLen}/80</span> : null} onFocus={this.displayInputLen('accountName', true)} placeholder="账号名称" onChange={this.setInputLen('accountNameLen')} onBlur={this.displayInputLen('accountName', false)} />
				)}
			</FormItem>
			<FormItem {...formItemLayout} label='账号ID'>
				{getFieldDecorator('base.snsId', {
					initialValue: snsId,
					first: true,
					rules: [{ required: true, message: '账号ID不能为空' }, {
						pattern: /^.{0,100}$/,
						message: '账号ID最多可输入100个字符'
					}]
				})(
					<Input disabled={isSnsIdEditable == 2} suffix={IDShow ?
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
					<Input disabled={isUrlEditable == 2} placeholder="主页链接" />
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
						<WBYUploadFile tok={actions.getNewToken} uploadUrl='/api/file/v1/uploadPubBucket' accept={'.bmp, .gif, image/jpeg'} showUploadList={{
							showPreviewIcon: true,
							showRemoveIcon: !(isAvatarUrlEditable == 2)
						}} uploadText={'点击上传'} size={5} disabled={isAvatarUrlEditable == 2} />
					)}
				</div>
				<p className='input-desc-bottom'>请上传bmp, jpeg, jpg, gif;5M以内的图片</p>
				{/* 隐藏域提交 */}
				{getFieldDecorator('base.isSnsNameEditable', { initialValue: isSnsNameEditable })(
					<input type="hidden" />)}
				{getFieldDecorator('base.snsNameMaintainedTime', { initialValue: snsNameMaintainedTime })(
					<input type="hidden" />)}
				{getFieldDecorator('base.isSnsIdEditable', { initialValue: isSnsIdEditable })(
					<input type="hidden" />)}
				{getFieldDecorator('base.snsIdMaintainedTime', { initialValue: snsIdMaintainedTime })(
					<input type="hidden" />)}
				{getFieldDecorator('base.isUrlEditable', { initialValue: isUrlEditable })(
					<input type="hidden" />)}
				{getFieldDecorator('base.urlMaintainedTime', { initialValue: urlMaintainedTime })(
					<input type="hidden" />)}
				{getFieldDecorator('base.isAvatarUrlEditable', { initialValue: isAvatarUrlEditable })(
					<input type="hidden" />)}
				{getFieldDecorator('base.avatarUrlMaintainedTime', { initialValue: avatarUrlMaintainedTime })(
					<input type="hidden" />)}
				{/*{getFieldDecorator('catched_at', { initialValue: catched_at })(
					<input type="hidden" />)}*/}
			</FormItem>
			{React.Children.map(children, child => React.cloneElement(child, { ...form }))}
		</div>
	}
}
