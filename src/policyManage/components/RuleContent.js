import React from "react";
import { Row, Col, Popover, Checkbox, Button } from 'antd';
import DiscountRule from "./DiscountRule";
import AddBtn from "./AddBtn";
import PopoverComp from "./PopoverComp";

class RuleContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checkedValues: [],
			finalChecked: []
		};
		this.checkOption = [
			{ label: '固定', value: 1 },
			{ label: '阶梯', value: 2 },
		];
	}

	handlePopoverSave = value => {
		this.setState({finalChecked: value});
	}

	handleRemoveRuleItem = index => {
		const { finalChecked } = this.state;
		
		finalChecked.splice(index, 1);

		this.setState({
			finalChecked, 
			checkedValues: [...finalChecked], 
		});
	}

	getDiscountRuleItem = () => {
		const { finalChecked } = this.state;

		return finalChecked.map((item, index) => (
				<DiscountRule 
					key={+new Date() + Math.random()} 
					ruleType={item}
					handleRemove={() => {this.handleRemoveRuleItem(index)}}
				/>
			)
		)
	}

	render() {
		const { finalChecked } = this.state;
		console.log('lsdkjflskdflkj', finalChecked)
		return (
			<div className='ruleWrapper'>
				<div className='ruleTitle'>规则1</div>
				<div className='ruleContent'>
					<Row>
						<Col span={1}>平台</Col>
						<Col span={20}>值</Col>
					</Row>
					<Row>
						<Col span={1}>折扣</Col>
						<Col span={22}>
							{ this.getDiscountRuleItem() }
							<PopoverComp 
								className=''
								checkedValues={finalChecked}
								checkOption={this.checkOption}
								handleSave={this.handlePopoverSave}
								entryComp={<AddBtn title='添加折扣'/>}
							>
							</PopoverComp>
						</Col>
					</Row>
					<Row>
						<Col span={1}>返点</Col>
						<Col span={22}>值</Col>
					</Row>
				</div>
			</div>
		)
	}
}

export default RuleContent;
