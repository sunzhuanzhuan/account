import React from "react";
import { Row, Col, Select, Input } from 'antd';
import AddBtn from "./AddBtn";
const { Option } = Select;

class DiscountRule extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stepArr: [
				{ start: 0, end: undefined, percent: undefined },
			]
		}
	}

	getCommonComp = name => ([
		<span key='signFirst' className='commonSign'>X</span>,
		<Input key='inputComp' className='commonIptWidth' />,
		<span key='signSec'> %</span>,
		<span key='signThir' className='commonSign'>=</span>,
		<span key='name'>{name}</span>
	])

	getStaticComp = () => (
		[
			<div key='account'>
				<Select defaultValue={1} className='commonIptWidth'>
					<Option value={1}>渠道价</Option>
					<Option value={2}>刊例价</Option>
				</Select>
				{ this.getCommonComp('账号报价') }
			</div>,
			<div key='sign'>
				<span>刊例价</span>
				{ this.getCommonComp('渠道价') }
			</div>
		]
	)

	getStepComp = () => (
		[
			<div key='default'>
				<span className='rightMargin'>按照</span>
				<Select defaultValue={1} className='commonIptWidth'>
					<Option value={1}>含税</Option>
					<Option value={2}>不含税</Option>
				</Select>
				<span className='commonSign'>计算收入满足条件，按照</span>
				<Select defaultValue={1} className='commonIptWidth'>
					<Option value={1}>含税</Option>
					<Option value={2}>不含税</Option>
				</Select>
				<span className='leftMargin'>计算折后基数。</span>
			</div>,
			this.getStepItemsComp(),
			<AddBtn key='addBtn' title='添加区间范围' onClick={this.handleAddStepItem}/>,
			this.getFinalItem()
		]
	)

	getStepItem = index => (
		<div key={+new Date() + Math.random()}>
			<span className='rightMargin'>收入在</span>
			<Input className='commonIptWidth' />
			<span className='commonSign'>-</span>
			<Input className='commonIptWidth' />
			<span className='commonSign'>之间时，折扣为</span>
			<Input className='commonIptWidth' />
			<span className='leftMargin'>%</span>
			{ index > 0 ? <span className='removeBtn' onClick={() => {this.handleRemoveStepItem(index)}}>删除</span> : null }
		</div>
	);

	getFinalItem = () => (
		<div key='finalItem'>
			<span className='rightMargin'>收入在</span>
			<Input className='commonIptWidth' />
			<span className='commonSign'>及其以上时，折扣为</span>
			<Input className='commonIptWidth' />
			<span className='leftMargin'>%</span>
		</div>
	);

	getStepItemsComp = () => {
		const { stepArr } = this.state;
		return stepArr.map((_, index) => this.getStepItem(index))
	}

	handleAddStepItem = () => {
		const { stepArr } = this.state;
		this.setState({ stepArr: [...stepArr, {start: 0, end: undefined, percent: undefined}]})
	}

	handleRemoveStepItem = index => {
		const { stepArr } = this.state;
		stepArr.splice(index, 1);
		this.setState({ stepArr });
	}

	render() {
		const { ruleType, handleRemove } = this.props;

		return (
			<div className='ruleItem'>
				<Row>
					<Col span={2} className='modalAfterCon'>
						类型
					</Col>
					<Col span={14}>
						{ ruleType === 1 ? '固定' : '阶梯' }
					</Col>
				</Row>
				<Row>
					<Col span={2} className='modalAfterCon'>
						公式
					</Col>
					<Col span={16}>
					{ ruleType === 1 ? this.getStaticComp() : this.getStepComp() }
					</Col>
				</Row>
				<span className='ruleRemoveBtn' onClick={() => {handleRemove()}}>删除</span>
			</div>
		)
	}
}



export default DiscountRule;
