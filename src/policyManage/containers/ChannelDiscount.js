import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/pricePolicy';
import { getAvailablePlatformList } from "../../actions";
import { Modal, Input, Row, Col, Spin, Button, message } from 'antd';
import './PolicyManage.less';
import RulesWrapper from "../components/RulesWrapper";
import RuleContent from "../components/RuleContent";
import PageInfo from "../components/PageInfo";
import StopReasonModal from "../components/StopReasonModal";
import { shallowEqual } from "../../util";
import qs from 'qs';

const { TextArea } = Input;

class ChannelDiscount extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			ruleVisible: false,
			ruleItems: [],
			selectedPlatform: []
		};
	}

	componentDidMount() {
		const search = this.props.location.search.substring(1);
		const userId = qs.parse(search)['userId'];
		const userName = qs.parse(search)['name'];
		const isEdit = userName === undefined;
		const payload = isEdit ? { userId } : null;

		this.props.getDiscountDetail(payload);
		this.props.getAvailablePlatformList();

		this.setState({ userId, userName, isEdit })
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const { discountDetail = {} } = nextProps;
		const { ruleDTOS = [] } = discountDetail;
		const { propsValue } = prevState;
		let selectedPlatform = [];

		if (!shallowEqual(discountDetail, propsValue)) {
			if (ruleDTOS.length) {
				ruleDTOS.forEach(item => {
					selectedPlatform = selectedPlatform.concat(item.platformIds)
				});
			}
			return {
				propsValue: discountDetail,
				ruleItems: ruleDTOS,
				selectedPlatform
			}
		}
		return null;
	}

	componentDidUpdate(prevProps) {
		const { progress: prevProgress } = prevProps;
		const { errorMsg = '操作失败', progress, msg } = this.props;
		const { isEdit, userId } = this.state;

		if (prevProgress !== progress && progress === 'fail') {
			this.getErrorTips(errorMsg, 'error');
		} else if (prevProgress !== progress && progress === 'saveSuccess') {
			this.getErrorTips(msg, 'success');
			if (!isEdit) {
				this.props.history.push(`/account/discount?userId=${userId}`)
				window.location.reload();
			}
		}
	}

	handleAddRule = () => {
		const { itemInfo = {}, ruleIndex, ruleItems = [], modalType } = this.state;
		let selectedPlatform = [];

		if (modalType === 'add') {
			ruleItems.push(itemInfo)
		} else {
			ruleItems.splice(ruleIndex, 1, itemInfo)
		}

		ruleItems.forEach(item => {
			selectedPlatform = selectedPlatform.concat(item.platformIds)
		})

		this.setState({ selectedPlatform });

		this.isShowRuleModal();
	}

	handleDel = index => {
		const { ruleItems, selectedPlatform } = this.state;

		const delItem = ruleItems.splice(index, 1)[0];
		const { platformIds = [] } = delItem;
		platformIds.forEach(item => {
			const pIndex = selectedPlatform.findIndex(sItem => { sItem === item });
			selectedPlatform.splice(pIndex, 1);
		})

		this.setState({ ruleItems, selectedPlatform });
	}

	isShowRuleModal = (itemInfo, modalType, ruleIndex) => {
		const isEdit = modalType === 'edit';
		this.setState({
			itemInfo: { ...itemInfo },
			ruleIndex,
			modalType,
			ruleVisible: !this.state.ruleVisible,
			discountStatus: isEdit,
			platformStatus: isEdit
		})
	}

	isSubmitOk = (submitStatus, type) => {
		this.setState({ [`${type}Status`]: submitStatus })
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

	handleChangeRemarks = ({ target: { value } }) => {
		const { discountDetail = {} } = this.props;
		if (value.length > 2000) {
			this.getErrorTips('备注最多可输入2000字');
			return;
		}
		discountDetail.remark = value;
		this.forceUpdate();
	}

	isShowStopModal = () => {
		this.setState({ stopModal: !this.state.stopModal })
	}

	handleStopDiscount = ({ policyStopReason: stopReason }) => {
		const { discountDetail = {} } = this.props;
		const { userId, isEdit } = this.state;
		const { id } = discountDetail;
		this.props.updatePriceInfo({ stopReason, id, userId }, 'stopDiscount').then(() => {
			if (isEdit)
				this.props.getDiscountDetail({ userId });
		});
		this.isShowStopModal();
	}

	handleSaveDiscount = () => {
		const { discountDetail = {} } = this.props;
		const { isEdit, userId } = this.state;
		const { ruleDTOS = [] } = discountDetail;
		const method = isEdit ? 'editDiscount' : 'addDiscount';

		if (!ruleDTOS.length) {
			this.getErrorTips('请添加折扣规则');
			return;
		}
		Object.assign(discountDetail, { userId });
		this.props.updatePriceInfo(discountDetail, method).then(() => {
			if (isEdit)
				this.props.getDiscountDetail({ userId });
		});
	}

	render() {
		const {
			isEdit,
			userName,
			ruleVisible,
			stopModal,
			ruleItems,
			itemInfo = {},
			modalType,
			discountStatus,
			platformStatus,
			selectedPlatform,
		} = this.state;
		const pageTitle = isEdit ? '修改' : '新建';
		const { discountDetail = {}, progress } = this.props;
		const { channelDiscountStatus, identityName, stopReason, modifiedAt, modifyName } = discountDetail;

		return [
			<h2 key='policyHeader' className='policyHeader'>
				{pageTitle}渠道折扣
			</h2>,
			<div key='policyWrapper' className='policyWrapper discountWrapper'>
				<Spin spinning={progress === 'loading'} style={{ position: 'unset' }}>
					<Row>
						<div className='snsName'>
							主账号名称：{isEdit ? identityName : userName || '未知'}
						</div>
						{
							isEdit ? <PageInfo status={channelDiscountStatus} stopReason={stopReason} editor={modifyName} editTime={modifiedAt} /> : null
						}
					</Row>
					<Row>
						<Col span={2} className='commonTitle'>渠道折扣</Col>
						<Col span={20}>
							<RulesWrapper
								ruleItems={ruleItems}
								onClick={this.isShowRuleModal}
								handleDel={this.handleDel}
							/>
						</Col>
					</Row>
					<Row>
						<Col span={2} className='commonTitle'>备注</Col>
						<Col span={20}>
							<TextArea value={discountDetail.remark} className='remarksText' onChange={this.handleChangeRemarks} />
						</Col>
					</Row>
					<Row className='policyFooter'>
						{channelDiscountStatus == 1 ? <Button type='primary' onClick={this.isShowStopModal}>停用</Button> : null}
						<Button type='primary' onClick={this.handleSaveDiscount}>{channelDiscountStatus == 2 ? '启用' : '提交'}</Button>
					</Row>
				</Spin>
				<Modal
					className='ruleModal'
					title={modalType === 'add' ? "添加规则" : '编辑规则'}
					width={700}
					destroyOnClose
					visible={ruleVisible}
					onCancel={this.isShowRuleModal}
					footer={[
						<Button key="cancel" onClick={this.isShowRuleModal}>
							取消
						</Button>,
						<Button key="submit" type="primary" disabled={!discountStatus || !platformStatus} onClick={this.handleAddRule}>
							保存
						</Button>
					]}
				>
					<RuleContent
						itemInfo={itemInfo}
						selectedPlatform={selectedPlatform}
						isSubmitOk={this.isSubmitOk}
						isOperate
					/>
				</Modal>
				{stopModal ? <StopReasonModal onCancel={this.isShowStopModal} onOk={this.handleStopDiscount} /> : null}
			</div>
		]
	}
}

const mapStateToProps = (state) => {
	const { pricePolicyReducer = {}, commonReducers = {} } = state;
	const { discountDetail, progress, errorMsg, msg } = pricePolicyReducer.discountReducer;
	const { availablePlatforms = [] } = commonReducers;

	return { discountDetail, availablePlatforms, progress, errorMsg, msg };
}

const mapDispatchToProps = (dispatch) => (
	bindActionCreators({
		...actions, getAvailablePlatformList
	}, dispatch)
)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChannelDiscount)
