import React from "react";
import { connect } from 'react-redux';
import { Row, Col, Input, message, Popconfirm, Icon } from 'antd';
// import AddBtn from "./AddBtn";
// import PopoverComp from "./PopoverComp";
import Platform from "./Platform";

// const CheckboxGroup = Checkbox.Group;

class RuleContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checkedValues: [],
			finalChecked: []
		};
		// this.checkOption = [
		// 	{ label: '固定', value: 1 },
		// 	{ label: '阶梯', value: 2 },
		// ];
	}

	// handlePopoverSave = value => {
	// 	this.setState({finalChecked: value});
	// }

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

	handleChangeValue = (value, valueType) => {
		const { isSubmitOk, itemInfo = {} } = this.props;
		const isNum = /^\d+$/.test(value);
		const valueOk = isNum && parseInt(value) > 0 && parseInt(value) <= 100

		if(!valueOk)
			this.getErrorTips('请输入1~100的百分比');

		itemInfo[valueType] = value ? Number(value) / 100 : undefined;
		isSubmitOk(valueOk, 'discount')
		this.forceUpdate();
	}

	getDiscountComp = (isEdit, itemInfo) => {
		const { publicationRate, discountType = [1] } = itemInfo;
		return (
			<div key='sign'>
				{/* {
					isEdit ? 
					<CheckboxGroup 
						options={this.checkOption} 
						value={discountType} 
						onChange={value => {this.handleChangeValue(value, 'discountType')}} 
					/> :
					<div>固定</div>
				} */}
				{
					discountType.length ? 
						<div className='discountRuleItem'>
							{/* <span>公式：</span> */}
							<span>刊例价</span>
							<span key='signFirst' className='commonSign'>X</span>
							{
								isEdit ? 
								<Input 
									key='inputComp' 
									className='commonIptWidth' 
									value={publicationRate ? Number(publicationRate) * 100 : null}
									onChange={({target: {value}}) => {this.handleChangeValue(value, 'publicationRate')}} 
								/> : <span>{publicationRate ? Number(publicationRate) * 100 : null}</span>
							}
							<span key='signSec'> %</span>
							<span key='signThir' className='commonSign'>=</span>
							<span key='name'>渠道价</span>
						</div> : null
				}
			</div>
		)
	}

	render() {
		const { itemInfo = {}, rangeValue, isOperate, onClick, handleDel, isSubmitOk, selectedPlatform, availablePlatforms = [] } = this.props;
		const { platformIds = [] } = itemInfo;
		const editComp = (
			<div className='ruleContent staticContent'>
				<Row>
					<Col span={2}>平台</Col>
					<Col span={18}>
						<Platform 
							platformList={availablePlatforms}
							selectedPlatform={selectedPlatform}
							getErrorTips={this.getErrorTips}
							platform={platformIds}
							itemInfo={itemInfo} 
							isSubmitOk={isSubmitOk}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={2}>公式</Col>
					<Col span={20}>
						{ this.getDiscountComp(true, itemInfo) }
						{
							// !single ? 
							// <PopoverComp 
							// 	className='ruleModal'
							// 	checkedValues={finalChecked}
							// 	checkOption={this.checkOption}
							// 	handleSave={this.handlePopoverSave}
							// 	entryComp={<AddBtn title='添加折扣'/>}
							// /> : null
						}
					</Col>
				</Row>
			</div>
		);
		const staticDiscount = (
			<div className='ruleContent staticContent'>
				<Row className='platformWrapper'>
					<Col span={1}>平台</Col>
					<Col span={20}>
						{platformIds.map(item => {
							const itemInfo = availablePlatforms.find(opItem => opItem.id === item);
							if(itemInfo)
								return <div className='platformShowTag' key={itemInfo.id}>{itemInfo.platformName}</div>
							return null;
						})}
					</Col>
				</Row>
				<Row>
					<Col span={1}>公式</Col>
					<Col span={22}>
						{this.getDiscountComp(false, itemInfo)}
					</Col>
				</Row>
			</div>
		)

		return (
			!isOperate ? <div className='ruleWrapper'>
				<div className='ruleTitle'>
					<div>{`规则${rangeValue + 1}`}</div>
					<div className='ruleOperate'>
						<span onClick={() => {onClick(itemInfo, 'edit', rangeValue)}}>编辑</span>
						<Popconfirm
							title={`是否删除【规则${rangeValue + 1}】？`}
							icon={<Icon type="question-circle-o" style={{ color: 'red' }} />} 
							okText='确认' 
							cancelText='取消' 
							onConfirm={() => {handleDel(rangeValue)}}
						>
							<span>删除</span>
						</Popconfirm>

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

const mapStateToProps = (state) => {
    const { commonReducers = {} } = state;
    const { availablePlatforms = [] } = commonReducers;

    return { availablePlatforms };
}

export default connect(
    mapStateToProps,
    null
)(RuleContent)
