import React from "react";
import { Row, Col, Input } from 'antd';
import AddBtn from "./AddBtn";
import PopoverComp from "./PopoverComp";
import Platform from "./Platform";

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

	handleChangeValue = (value, itemInfo) => {
		itemInfo.discount = value;
		this.forceUpdate();
	}

	getDiscountComp = (isEdit, itemInfo) => {
		return (
			<div key='sign'>
				<span>刊例价</span>
				<span key='signFirst' className='commonSign'>X</span>
				{
					isEdit ? 
					<Input 
						key='inputComp' 
						className='commonIptWidth' 
						value={itemInfo.discount}
						onChange={({target: {value}}) => {this.handleChangeValue(value, itemInfo)}} 
					/> : <span>{itemInfo.discount}</span>
				}
				<span key='signSec'> %</span>
				<span key='signThir' className='commonSign'>=</span>
				<span key='name'>渠道价</span>
			</div>
		)
	}

	render() {
		const { itemInfo = {}, rangeValue, isOperate, single, onClick, handleDel } = this.props;
		const { finalChecked } = this.state;
		const editComp = (
			<div className='ruleContent staticContent'>
				<Row>
					<Col span={2}>平台</Col>
					<Col span={18}><Platform itemInfo={itemInfo} /></Col>
				</Row>
				<Row>
					<Col span={2}>折扣</Col>
					<Col span={20}>
						{ this.getDiscountComp(true, itemInfo) }
						{
							!single ? 
							<PopoverComp 
								className='ruleModal'
								checkedValues={finalChecked}
								checkOption={this.checkOption}
								handleSave={this.handlePopoverSave}
								entryComp={<AddBtn title='添加折扣'/>}
							/> : null
						}
					</Col>
				</Row>
			</div>
		);
		const staticDiscount = (
			<div className='ruleContent staticContent'>
				<Row>
					<Col span={1}>平台</Col>
					<Col span={20}>{itemInfo.platform}</Col>
				</Row>
				<Row>
					<Col span={1}>折扣</Col>
					<Col span={22}>
						{this.getDiscountComp(false, itemInfo)}
					</Col>
				</Row>
			</div>
		)

		return (
			!isOperate ? <div className='ruleWrapper'>
				<div className='ruleTitle'>
					<div>{`规则${rangeValue}`}</div>
					<div className='ruleOperate'>
						<span onClick={() => {onClick(itemInfo, 'edit')}}>编辑</span>
						<span onClick={() => {handleDel(itemInfo)}}>删除</span>
					</div>
				</div>
				{
					staticDiscount
				}
			</div>
			: editComp
		)
	}
}

export default RuleContent;
