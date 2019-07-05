import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/pricePolicy';
import { getAvailablePlatformList } from "../../actions";
import { Modal, Icon, Input, Row, Col, Spin, Button, message } from 'antd';
import './PolicyManage.less';
import RulesWrapper from "../components/RulesWrapper";
import RuleContent from "../components/RuleContent";
import PageInfo from "../components/PageInfo";
import StopReasonModal from "../components/StopReasonModal";
import { shallowEqual } from "../../util";

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
		this.props.getDiscountDetail();
		this.props.getAvailablePlatformList();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const { discountDetail = {} } = nextProps;
		const { rules = [] } = discountDetail;
		const { propsValue } = prevState;
		let selectedPlatform = []

		if(!shallowEqual(discountDetail, propsValue)) {
			if(rules.length) {
				rules.forEach(item => {
					selectedPlatform = selectedPlatform.concat(item.platformIds)
				});
			}
			return {
				propsValue: discountDetail,
				ruleItems: rules,
				selectedPlatform
			}
		}
		return null;
	}

	handleAddRule = () => {
		const { itemInfo = {}, ruleItems = [], modalType } = this.state;
		if(modalType === 'add') {
			ruleItems.push(itemInfo)
		}else {
			const editIndex = ruleItems.findIndex(item => item.channelDiscountId === itemInfo.channelDiscountId);
			if(editIndex > -1)
				ruleItems.splice(editIndex, 1, itemInfo)
		}
		this.isShowRuleModal();
	}

	handleDel = delItem => {
		const { ruleItems } = this.state;
		const delIndex = ruleItems.findIndex(item => item.channelDiscountId === delItem.channelDiscountId);

		if(delIndex > -1)
			ruleItems.splice(delIndex, 1);

		this.setState({ ruleItems });
	}

	isShowRuleModal = (itemInfo, modalType) => {
		const isEdit = modalType === 'edit';
		this.setState({ 
			itemInfo: {...itemInfo}, 
			modalType, 
			ruleVisible: !this.state.ruleVisible,
			discountStatus: isEdit,
			platformStatus: isEdit
		})
	}

	isSubmitOk = (submitStatus, type) => {
		this.setState({[`${type}Status`]: submitStatus})
	}

	getErrorTips = msg => {
        try {
            if (typeof message.destroy === 'function') {
                message.destroy();
            }
            message.error(msg);
        } catch (error) {
            console.log(error);
        }
    };

	handleChangeRemarks = ({target: {value}}) => {
		const { discountDetail = {} } = this.props;
		if(value.length > 2000) {
			this.getErrorTips('备注最多可输入2000字');
			return;
		}
		discountDetail.remark = value;
		this.forceUpdate();
	}

	isShowStopModal = () => {
		this.setState({stopModal: !this.state.stopModal})
	}

	handleStopDiscount = stopReason => {

		this.props.updatePriceInfo(stopReason, 'stopDiscount');
	}

	handleSaveDiscount = () => {
		const { discountDetail = {} } = this.props;
		const { rules = [] } = discountDetail;
		const isEdit = false;
		const method = isEdit ? 'editDiscount' : 'addDiscount';


		if( !rules.length )
		{
			this.getErrorTips('请添加折扣规则');
			return;
		}

		this.props.updatePriceInfo(discountDetail, method);

		console.log('ChannelDiscount handleSaveDiscount discountDetail', discountDetail)
	}

	render() {
		const { 
			ruleVisible, 
			stopModal, 
			ruleItems, 
			itemInfo = {}, 
			modalType, 
			discountStatus, 
			platformStatus, 
			selectedPlatform,
		} = this.state;
		const { discountDetail = {} } = this.props;
		const { channelDiscountStatus, username='未知', stopReason, modifiedAt, modifiedPerson } = discountDetail;

		return [
			<div key='policyHeader' className='policyHeader'><Icon type="left-circle" />新建渠道折扣</div>,
			<div key='policyWrapper' className='policyWrapper discountWrapper'>
				<Spin spinning={false} style={{position: 'unset'}}>
					<Row>
						<div className='accountName'>主账号名称：{username}</div>
						<PageInfo status={channelDiscountStatus} stopReason={stopReason} editor={modifiedPerson} editTime={modifiedAt} />
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
				</Spin>
					<Row className='policyFooter'>
						{ channelDiscountStatus == 1 ? <Button type='primary' onClick={this.isShowStopModal}>停用</Button> : null}
						{ 
							channelDiscountStatus == 2 ? 
							<Button type='primary' onClick={this.handleSaveDiscount}>启用</Button> : 
							<Button type='primary' onClick={this.handleSaveDiscount}>保存</Button> 
						}
						<Button>取消</Button>
					</Row>
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
						isOperate single 
					/>
				</Modal>
				{ stopModal ? <StopReasonModal onCancel={this.isShowStopModal} onOk={this.handleStopDiscount} /> : null }
			</div>
		]
	}
}

const mapStateToProps = (state) => {
    const { pricePolicyReducer = {}, commonReducers = {} } = state;
	const { discountDetail, progress } = pricePolicyReducer;
	const { availablePlatforms = [] } = commonReducers;
	
    return { discountDetail, availablePlatforms, progress };
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
