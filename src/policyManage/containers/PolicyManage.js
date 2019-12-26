import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
	Button, Icon, Form, DatePicker, Spin, Input, message,
	Radio, Switch, InputNumber, Upload, Modal
} from 'antd';

// import CommonTitle from "../components/CommonTitle";
// import RulesWrapper from "../components/RulesWrapper";
// import WhiteList from "../components/WhiteList";
import PageInfo from "../components/PageInfo";
import StopReasonModal from "../components/StopReasonModal";
import moment from 'moment';
import actions from '../actions';
import './PolicyManage.less';
import qs from 'qs';
import { ModuleHeader } from '@/components/ModuleHeader';
import WhiteList from '../components/WhiteList';
import RuleModule from '../components/RuleModule'
import EditRuleForm from '../components/RuleModules/EditRuleForm'
import AddAccountModal from '../components/RuleModules/AddAccountModal'
import { transBool } from '../constants/dataConfig'

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
// const RadioGroup = Radio.Group;
const { TextArea } = Input;

const RuleDiscountRatio = (props) => {
	const { getFieldDecorator } = props.form
	return <Form.Item>
		{getFieldDecorator('password', {
			rules: [{ required: true, message: 'Please input your Password!' }],
		})(
			<Input
				prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
				type="password"
				placeholder="Password"
			/>,
		)}
	</Form.Item>
}

class PolicyManage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stopModal: false,
			showEditRuleModal: false
		}
		const search = this.props.location.search.substring(1);
		this.userId = qs.parse(search)['userId'];
		this.policyId = qs.parse(search)['id'];
		this.userName = qs.parse(search)['name'];
	}

	componentDidMount() {
		const search = this.props.location.search.substring(1);
		const userId = qs.parse(search)['userId'];
		const policyId = qs.parse(search)['id'];
		const userName = qs.parse(search)['name'];

		// if (policyId !== undefined)
		// 	this.props.getPolicyDetail(policyId);
		console.log('getPolicyInfoByMcnId', this.props)
		this.props.getPolicyInfoByMcnId(policyId);
		this.setState({ policyId, userName, userId })
	}

	componentDidUpdate(prevProps) {
		const { progress: prevProgress } = prevProps;
		const { errorMsg = '操作失败', newPolicyId, progress, msg = '操作成功' } = this.props;

		if (prevProgress !== progress && progress === 'fail') {
			this.getErrorTips(errorMsg, 'error');
		} else if (prevProgress !== progress && progress === 'saveSuccess') {
			this.getErrorTips(msg, 'success');
			if (newPolicyId) {
				this.props.history.replace(`/account/policy?id=${newPolicyId}`)
				window.location.reload();
			}
		}
	}

	getErrorTips = (msg, type = 'error') => {
		try {
			if (typeof message.destroy === 'function') {
				message.destroy();
			}
			message[type](msg);
		} catch (error) {
			console.log(error);
		}
	};

	getDisabledDate = (current) => {
		const { timeRange = [] } = this.state;

		if (timeRange[0])
			// return !(!(current && current <= moment().subtract(1, 'days').endOf('day')) && current.diff(timeRange[0], 'days') > 60); //60天内不可选
			return current && current <= moment().subtract(1, 'days').endOf('day');
	}

	handleSavePolicy = () => {
		const { form, policyDetail = {} } = this.props;
		const { policyId, userId } = this.state;
		const { id, policyStatus } = policyDetail;

		form.validateFields((err, values) => {
			console.log("=====", values)
			// if (err) return;
			// const { policyTime = [], illustration } = values;
			// const updateObj = {
			// 	validStartTime: policyTime[0].format('YYYY-MM-DD 00:00:00'),
			// 	validEndTime: policyTime[1].format('YYYY-MM-DD 00:00:00'),
			// 	illustration
			// };
			// const isEdit = policyId !== undefined;
			// let method = isEdit ? 'editPolicy' : 'addPolicy';

			// if (isEdit) {
			// 	Object.assign(updateObj, { id, policyStatus })
			// } else {
			// 	Object.assign(updateObj, { userId })
			// }

			// this.props.updatePriceInfo(updateObj, method).then(() => {
			// 	if (isEdit)
			// 		this.props.getPolicyDetail(policyId);
			// });
		})
	}

	handleChangeDate = (timeRange) => {
		this.setState({ timeRange });
	}

	handleChangeDateRange = () => {
		this.setState({ timeRange: [] })
	}

	judgeInputLenth = (_, value, callback) => {
		if (value && value.length <= 2000) {
			callback();
		} else if (!value) {
			callback('请输入政策说明')
		} else if (value.length > 200) {
			callback('政策说明最多可输入2000字')
		}
	}

	isShowStopModal = () => {
		this.setState({ stopModal: !this.state.stopModal })
	}

	handleStopPolicy = (value) => {
		const { policyDetail = {} } = this.props;
		const { policyId } = this.state;
		const { id, policyStatus } = policyDetail;
		Object.assign(value, { id, policyStatus });

		this.props.updatePriceInfo(value, 'stopPolicy').then(() => {
			if (policyId !== undefined)
				this.props.getPolicyDetail(policyId);
		});
		this.isShowStopModal();
	}
	normFile = e => {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};
	addRule = (type) => {
		this.setState({ showEditRuleModal: true, editRuleModalType: type, currentRuleId: -1 })
	}
	editRule = (type, currentRuleId) => {
		console.log("编辑规则", type, currentRuleId)
		this.setState({ showEditRuleModal: true, editRuleModalType: type, currentRuleId })
	}
	delRule = (type, ruleId) => {
		console.log("删除规则", type, ruleId)
		const delRuleById = type == 'global' ? this.props.delGlobalRuleById : this.props.delSpecialRuleById
		delRuleById({ ruleId, userId: this.userId })
	}
	editRuleModalClose = e => {
		this.setState({ showEditRuleModal: false })
	}

	render() {
		const { form, policyInfo = {}, progress } = this.props;
		const { getAccountInfoByIds } = this.props;
		const { stopModal, policyId, userName, showEditRuleModal, editRuleModalType, currentRuleId } = this.state;
		const isEdit = policyId !== undefined;
		const { policyStatus, identityName, illustration,
			validStartTime, validEndTime, modifyName = '未知', id, modifiedAt, stopReason,
			globalAccountRules = [], specialAccountRules = [], whiteList = [],
		} = policyInfo;
		const currentRule = (editRuleModalType == 'global' ? globalAccountRules : specialAccountRules).filter(item => item.ruleId == currentRuleId)
		const { getFieldDecorator } = form;
		const formItemLayout = {
			labelCol: { span: 2 },
			wrapperCol: { span: 22 },
		};
		const contractUploadProps = {
			name: 'file',
			multiple: true,
			action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
			onChange(info) {
				const { status } = info.file;
				if (status !== 'uploading') {
					console.log(info.file, info.fileList);
				}
				if (status === 'done') {
					message.success(`${info.file.name} file uploaded successfully.`);
				} else if (status === 'error') {
					message.error(`${info.file.name} file upload failed.`);
				}
			},
		};
		console.log(whiteList, 'whiteList')
		return [
			<h2 key='policyHeader' className='policyHeader'>
				{isEdit ? '修改政策' : '新增政策'}
			</h2>,
			<div key='policyWrapper' className='policyWrapper'>
				<Spin spinning={progress === 'loading'}>
					{isEdit ? <PageInfo policyId={id} status={policyStatus} stopReason={stopReason} editor={modifyName} editTime={moment(modifiedAt).format('YYYY-MM-DD HH:mm:ss')} /> : null}
					<Form>
						{/* <FormItem label='主账号名称' {...formItemLayout}>
							{isEdit ? identityName : userName || '未知'}
						</FormItem> */}
						<FormItem label="政策有效期"  {...formItemLayout}>
							{getFieldDecorator('policyTime', {
								rules: [{ type: 'array', required: true, message: 'Please select time!' }],
								initialValue: [moment(validStartTime), moment(validEndTime)]
							})(
								<RangePicker
									className='policyTime'
									onCalendarChange={this.handleChangeDate}
									onChange={this.handleChangeDateRange}
								// disabledDate={this.getDisabledDate} 
								/>
							)}
						</FormItem>

						<ModuleHeader title="全局账号设置"></ModuleHeader>
						<div>政策规则：<Button onClick={() => this.addRule('global')} type="link">+添加</Button></div>
						<RuleModule
							key='globalAccountRules'
							data={globalAccountRules}
							type='global'
							editRule={this.editRule}
							delRule={this.delRule}
							form={form}
						></RuleModule>

						<ModuleHeader title="特殊账号设置"></ModuleHeader>
						<div>政策规则：<Button onClick={() => this.addRule('special')} type="link">+添加</Button></div>
						<RuleModule
							key='specialAccountRules'
							data={specialAccountRules}
							type='special'
							editRule={this.editRule}
							delRule={this.delRule}
							form={form}
						></RuleModule>

						<ModuleHeader title="白名单"></ModuleHeader>
						<WhiteList
							key={whiteList.length}
							whiteList={whiteList}
							getAccountInfoByIds={this.props.getAccountInfoByIds}
							addWhiteListAccount={this.props.addWhiteListAccount}
							delWhiteListAccount={this.props.delWhiteListAccount}
						></WhiteList>

						<ModuleHeader title="返点规则"></ModuleHeader>
						<FormItem label='返点结算周期' {...formItemLayout}>
							{
								getFieldDecorator('rebateSettlementCycle', {
									initialValue: policyInfo.rebateSettlementCycle
								})(
									<Radio.Group options={[{ label: '月', value: 1 }, { label: '季', value: 2 }, { label: '半年', value: 3 }, { label: '年', value: 4 }]} />
								)
							}
						</FormItem>
						<FormItem label='阶梯返点结算' {...formItemLayout}>

							{
								getFieldDecorator('stepRebateSettlementType', {
									initialValue: policyInfo.stepRebateSettlementType
								})(<Radio.Group options={[{ label: '阶梯收入计算', value: 1 }, { label: '全量收入计算', value: 2 }]} />)
							}
							<cite className='eg-explain'>例：0-100返点3%，100及以上返点5%，博主总收入150<br />
								阶梯收入计算=（100*3%）+（50*5%）<br />
								全量收入计算=150*5%
							</cite>

						</FormItem>
						<FormItem label='保底政策' {...formItemLayout}>
							{
								getFieldDecorator('isGuaranteed', {
									initialValue: transBool(policyInfo.isGuaranteed),
									valuePropName: 'checked'
								})(
									<Switch checkedChildren="开" unCheckedChildren="关" />
								)
							}
						</FormItem>
						<FormItem label='保底金额' {...formItemLayout}>
							{
								getFieldDecorator('guaranteedMinAmount', { initialValue: policyInfo.guaranteedMinAmount })(
									<InputNumber style={{ width: 100 }} max={999999999} suffix="元" />
								)
							}
						</FormItem>
						<FormItem label='保底备注' {...formItemLayout}>
							{
								getFieldDecorator('guaranteedRemark', { initialValue: policyInfo.guaranteedRemark })(
									<Input.TextArea rows={4} style={{ width: 100 }} suffix="元" />
								)
							}
						</FormItem>
						<Form.Item label="合同附件" {...formItemLayout} {...contractUploadProps}>
							{getFieldDecorator('contractFileUrl', {
								valuePropName: 'fileList',
								getValueFromEvent: this.normFile,
								// initialValue: policyInfo.contractFileUrl
							})(
								<Upload.Dragger name="files" action="/upload.do">
									<p className="ant-upload-drag-icon">
										<Icon type="inbox" />
									</p>
									<p className="ant-upload-text">Click or drag file to this area to upload</p>
									<p className="ant-upload-hint">Support for a single or bulk upload.</p>
								</Upload.Dragger>,
							)}
						</Form.Item>
						<FormItem label="备注"  {...formItemLayout}>
							{getFieldDecorator('remark', { initialValue: policyInfo.remark })(
								<TextArea className='remarksText' max={1000} />
							)}
						</FormItem>

						<FormItem className='policyFooter'>
							{
								policyStatus == 1 || policyStatus == 2 ?
									<Button type='primary' onClick={this.isShowStopModal}>停用</Button> : null
							}
							<Button type='primary' onClick={this.handleSavePolicy}>{policyStatus == 4 ? '启用' : '提交'}</Button>
						</FormItem>
					</Form>
				</Spin>
				{stopModal ? <StopReasonModal onCancel={this.isShowStopModal} onOk={this.handleStopPolicy} /> : null}

				{showEditRuleModal && <EditRuleForm
					mcnId={this.userId}
					currentRule={currentRule[0]}
					getAccountInfoByIds={getAccountInfoByIds}
					saveSpecialAccountRule={this.props.saveSpecialAccountRule}
					saveGlobalAccountRule={this.props.saveGlobalAccountRule}
					delSpecialRuleAccountById={this.props.delSpecialRuleAccountById}
					type={editRuleModalType}
					showEditRuleModal={showEditRuleModal}
					editRuleModalClose={this.editRuleModalClose}
				></EditRuleForm>}

			</div >
		]
	}
}

const mapStateToProps = (state) => {
	const { pricePolicyReducer = {} } = state;
	const { policyInfo, newPolicyId, progress, errorMsg, msg } = pricePolicyReducer;

	return { policyInfo, newPolicyId, progress, errorMsg, msg };
}

const mapDispatchToProps = (dispatch) => (

	bindActionCreators({
		...actions
	}, dispatch)
)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form.create()(PolicyManage))
