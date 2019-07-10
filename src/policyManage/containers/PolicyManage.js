import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Form, DatePicker, Spin, Input, message } from 'antd';
// import CommonTitle from "../components/CommonTitle";
// import RulesWrapper from "../components/RulesWrapper";
// import WhiteList from "../components/WhiteList";
import PageInfo from "../components/PageInfo";
import StopReasonModal from "../components/StopReasonModal";
import moment from 'moment';
import * as actions from '../actions/pricePolicy';
import './PolicyManage.less';
import qs from 'qs';

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
		const search = this.props.location.search.substring(1);
		const userId = qs.parse(search)['userId'];
		const policyId = qs.parse(search)['id'];
		const userName= qs.parse(search)['name'];

		if(policyId !== undefined)
			this.props.getPolicyDetail(policyId);
		this.setState({policyId, userName, userId})
	}

	componentDidUpdate(prevProps) {
        const { progress: prevProgress } = prevProps;
        const { errorMsg = '操作失败', progress, msg = '操作成功' } = this.props;

        if(prevProgress !== progress && progress === 'fail') {
            this.getErrorTips(errorMsg, 'error');
        }else if(prevProgress !== progress && progress === 'saveSuccess') {
			this.getErrorTips(msg, 'success');
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

		if(timeRange[0])
			// return !(!(current && current <= moment().subtract(1, 'days').endOf('day')) && current.diff(timeRange[0], 'days') > 60); //60天内不可选
			return current && current <= moment().subtract(1, 'days').endOf('day');
	}

	handleSavePolicy = () => {
		const { form, policyDetail= {}, userId } = this.props;
		const { policyId } = this.state;
		const { id, policyStatus } = policyDetail;

		form.validateFields((err, values) => {
			if(err) return;
			const { policyTime = [], illustration } = values;
			const updateObj = {
				validStartTime: policyTime[0].format('YYYY-MM-DD 00:00:00'),
				validEndTime: policyTime[1].format('YYYY-MM-DD 00:00:00'),
				illustration
			};
			const isEdit = policyId !== undefined;
			let method = isEdit ? 'editPolicy' : 'addPolicy';

			if(isEdit) {
				Object.assign(updateObj, {id, policyStatus})
			}else {
				Object.assign(updateObj, {userId})
			}
			
			this.props.updatePriceInfo(updateObj, method).then(() => {
				if(isEdit)
					this.props.getPolicyDetail(policyId);
			});

		})
	}

	handleChangeDate = (timeRange) => {
		this.setState({timeRange});
	}

	handleChangeDateRange = () => {
		this.setState({timeRange: []})
	}

	judgeInputLenth = (_, value, callback) => {
		if(value && value.length <= 2000) {
			callback();
		}else if(!value) {
			callback('请输入政策说明')
		}else if(value.length > 200) {
			callback('政策说明最多可输入2000字')
		}
	}

	isShowStopModal = () => {
		this.setState({stopModal: !this.state.stopModal})
	}

	handleStopPolicy = (value) => {
		const { policyDetail = {} } = this.props;
		const { policyId } = this.state;
		const { id, policyStatus } = policyDetail;
		Object.assign(value, {id, policyStatus});

		this.props.updatePriceInfo(value, 'stopPolicy').then(() => {
			if( policyId !== undefined )
				this.props.getPolicyDetail(policyId);
		});
		this.isShowStopModal();
	}

	render() {
		const { form, policyDetail = {}, progress } = this.props;
		const { stopModal, policyId, userName } = this.state;
		const isEdit = policyId !== undefined;
		const { policyStatus, identityName, illustration, validStartTime, validEndTime, modifyName='未知', id, modifiedAt, stopReason } = policyDetail;
		const { getFieldDecorator } = form;
		const formItemLayout = {
            labelCol: {span: 2},
            wrapperCol: {span: 22},
		};

		return [
			<h2 key='policyHeader' className='policyHeader'>
				{isEdit ? '修改政策' : '新增政策'}
			</h2>,
			<div key='policyWrapper' className='policyWrapper'>
				<Spin spinning={progress === 'loading'}>
					{ isEdit ? <PageInfo policyId={id} status={policyStatus} stopReason={stopReason} editor={modifyName} editTime={moment(modifiedAt).format('YYYY-MM-DD HH:mm:ss')} /> : null }
					<Form>
						<FormItem label='主账号名称' {...formItemLayout}>
							{isEdit ? identityName : userName || '未知'}
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
								initialValue: illustration,
								rules: [
									{required: true, message: ' '},
									{validator: this.judgeInputLenth}
								],
							})(
								<TextArea className='remarksText' />
							)}
						</FormItem>
						<FormItem className='policyFooter'>
							{ 
								policyStatus == 1 || policyStatus == 2 ? 
									<Button type='primary' onClick={this.isShowStopModal}>停用</Button> : null 
							}
							<Button type='primary' onClick={this.handleSavePolicy}>{ policyStatus == 4 ? '启用' : '提交'}</Button>
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
    const { policyDetail, progress, errorMsg, msg } = pricePolicyReducer;

    return { policyDetail, progress, errorMsg, msg };
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
