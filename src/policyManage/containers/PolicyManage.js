import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Form, DatePicker, Spin, Input, Modal } from 'antd';
// import CommonTitle from "../components/CommonTitle";
// import RulesWrapper from "../components/RulesWrapper";
// import WhiteList from "../components/WhiteList";
import PageInfo from "../components/PageInfo";
import StopReasonModal from "../components/StopReasonModal";
import moment from 'moment';
import * as actions from '../actions/pricePolicy';
import './PolicyManage.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
// const RadioGroup = Radio.Group;
const { TextArea } = Input;

class PolicyManage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stopModal: false
		}
		// this.rateOption = [
		// 	{ label: '未知', value: 0 },
		// 	{ label: '月', value: 1 },
		// 	{ label: '季', value: 2 },
		// 	{ label: '半年', value: 3 },
		// 	{ label: '年', value: 4 },
		// ];
	}

	componentDidMount() {
		this.props.getPolicyDetail();
	}

	getDisabledDate = (current) => {
		const { timeRange = [] } = this.state; 

		if(timeRange[0])
			return !(!(current && current <= moment().subtract(1, 'days').endOf('day')) && current.diff(timeRange[0], 'days') > 60);

		return current && current < moment().subtract(1, 'days').endOf('day')
	}

	handleSavePolicy = () => {
		const { form, policyDetail= {}, userId='需要路由取出userid' } = this.props;
		const { id, policyStatus } = policyDetail;
		const isEdit = false;

		form.validateFields((err, values) => {
			if(err) return;
			const { policyTime = [], illustration } = values;
			const updateObj = {
				validStartTime: policyTime[0].valueOf(),
				validEndTime: policyTime[1].valueOf(),
				illustration
			};
			let method = isEdit ? 'editPolicy' : 'addPolicy';

			if(isEdit) {
				Object.assign(updateObj, {id, policyStatus})
			}else {
				Object.assign(updateObj, {userId})
			}

			this.props.updatePriceInfo(updateObj, method);

		})
	}

	handleChangeDate = (timeRange) => {
		this.setState({timeRange});
	}

	handleChangeDateRange = () => {
		this.setState({timeRange: []})
	}

	judgeInputLenth = (_, value, callback) => {
		if(value && value.length <= 200) {
			callback();
		}else if(!value) {
			callback('请输入停用原因')
		}else if(value.length > 200) {
			callback('停用原因最多可输入200字')
		}
	}

	isShowStopModal = () => {
		this.setState({stopModal: !this.state.stopModal})
	}

	handleStopPolicy = (value) => {
		const { policyDetail = {} } = this.props;
		const { id, policyStatus } = policyDetail;
		Object.assign(value, {id, policyStatus});

		this.props.updatePriceInfo(value);
	}

	handleCancel = () => {

	}

	render() {
		const { form, policyDetail = {} } = this.props;
		const { stopModal } = this.state;
		const { policyStatus, illustration, validStartTime, validEndTime, modifyName='未知', id, modifiedAt, stopReason } = policyDetail;
		const { getFieldDecorator } = form;
		const formItemLayout = {
            labelCol: {span: 2},
            wrapperCol: {span: 22},
		};

		return [
			<div key='policyHeader' className='policyHeader'><Icon type="left-circle" />新增政策</div>,
			<div key='policyWrapper' className='policyWrapper'>
				<Spin spinning={false}>
					<PageInfo policyId={id} status={policyStatus} stopReason={stopReason} editor={modifyName} editTime={moment(modifiedAt).format('YYYY-MM-DD')} />
					<Form>
						<FormItem label='主账号名称' {...formItemLayout}>
							主账号名称
						</FormItem>
						<FormItem label="政策有效期"  {...formItemLayout}>
							{getFieldDecorator('policyTime', {
								initialValue: validStartTime && validEndTime ? [moment(validStartTime), moment(validEndTime)] : undefined,
								rules: [{
									required: true,
									message: '请添加政策有效期',
								}],
							})(
								<RangePicker 
									className='policyTime' 
									onCalendarChange={this.handleChangeDate} 
									onChange={this.handleChangeDateRange}
									disabledDate={this.getDisabledDate} 
								/>
							)}
						</FormItem>
						{/* <FormItem label="返点结算频次"  {...formItemLayout}>
							{getFieldDecorator('settleRate', {
								initialValue: 0
							})(
								<RadioGroup options={this.rateOption}/>
							)}
						</FormItem>
						<CommonTitle title='全局账号设置'/>
						<FormItem label='政策规则' {...formItemLayout}>
							<RulesWrapper />
						</FormItem>
						<CommonTitle title='特殊账号设置'/>
						<FormItem label='政策规则' {...formItemLayout}>
							<RulesWrapper />
						</FormItem>
						<CommonTitle title='白名单'/>
						<WhiteList /> */}
						<FormItem label="政策说明"  {...formItemLayout}>
							{getFieldDecorator('illustration', {
								initialValue: illustration
							})(
								<TextArea className='remarksText' />
							)}
						</FormItem>
						<FormItem className='policyFooter'>
							{ 
								policyStatus == 1 || policyStatus == 2 ? 
									<Button type='primary' onClick={this.isShowStopModal}>停用</Button> : null 
							}
							{ 
								policyStatus == 4 ? 
									<Button type='primary' onClick={this.handleSavePolicy}>启用</Button> : 
									<Button type='primary' onClick={this.handleSavePolicy}>提交</Button>
							}
							<Button onClick={this.handleCancel}>取消</Button>
						</FormItem>
					</Form>
				</Spin>
				{stopModal ? <StopReasonModal onCancel={this.isShowStopModal} onOk={this.handleStopPolicy} /> : null}
			</div>
		]
	}
}

const mapStateToProps = (state) => {
    const { pricePolicyReducer = {} } = state;
    const { policyDetail, progress } = pricePolicyReducer;

    return { policyDetail, progress };
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

