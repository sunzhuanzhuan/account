import React from "react"
import { Modal, Icon, Input, Row, Col } from 'antd'

import './PolicyManage.less';
import RulesWrapper from "../components/RulesWrapper";
import RuleContent from "../components/RuleContent";

const { TextArea } = Input;

class ChannelDiscount extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			ruleVisible: false,
			ruleItems: [
				{platform: ['平台1', '平台2'], discount: 1}
			]
		};
	}

	handleAddRule = () => {
		const { itemInfo, ruleItems, modalType } = this.state;
		if(modalType === 'add') {
			ruleItems.push(itemInfo)
		}else {
			ruleItems.splice(0, 1, itemInfo)
		}
		this.setState({ruleItems});
		this.isShowRuleModal();
	}

	handleDel = () => {

	}

	isShowRuleModal = (itemInfo, modalType) => {
		this.setState({itemInfo: {...itemInfo}, modalType, ruleVisible: !this.state.ruleVisible})
	}

	handleSaveRuleItem = () => {
		this.isShowRuleModal();
	}

	render() {
		const { ruleVisible, ruleItems, itemInfo, modalType } = this.state;
		return (
			<div className='policyWrapper discountWrapper'>
				<div className='policyHeader'><Icon type="left-circle" />新建渠道折扣</div>
				<Row>
					<Col span={2} className='commonTitle'>渠道折扣</Col>
					<Col span={20}>
						<RulesWrapper 
							single={ruleItems.length > 0} 
							ruleItems={ruleItems} 
							onClick={this.isShowRuleModal}
							handleDel={this.handleDel}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={2} className='commonTitle'>备注</Col>
					<Col span={20}>
						<TextArea className='remarksText' />
					</Col>
				</Row>
				<Modal
					className='ruleModal'
					title={modalType === 'add' ? "添加规则" : '编辑规则'}
					width={700}
					visible={ruleVisible}
					onOk={this.handleAddRule}
					onCancel={this.isShowRuleModal}
				>
					<RuleContent itemInfo={itemInfo} isOperate single />
				</Modal>
			</div>
		)
	}
}

export default ChannelDiscount;
