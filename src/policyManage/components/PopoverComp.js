import React from "react";
import { Popover, Checkbox, Button } from 'antd';
import { shallowEqual } from "../../util";

const CheckboxGroup = Checkbox.Group;

class PopoverComp extends React.PureComponent {
	constructor(props) {
		super(props);
		const { checkOption, checkedValues = [] } = props;
		this.state = {
			visible: false,
			indeterminate: !!checkedValues.length && checkedValues.length < checkOption.length,
			checkAll: false,
			checkedValues,
		};
		this.checkOption = checkOption || [];
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const { checkedValues = [], checkOption = [] } = nextProps;
		const { propsValues = [] } = prevState;
		if(!shallowEqual(checkedValues, propsValues)) {
			return {
				propsValues: checkedValues,
				checkedValues: checkedValues,
				indeterminate: !!checkedValues.length && checkedValues.length < checkOption.length,
				checkAll: checkedValues.length === checkOption.length
			}
		}
		return null;
	}

	isShowPopover = () => {
		const { checkedValues } = this.props;
		this.setState({
			visible: !this.state.visible,
			checkedValues
		})
	}

	handleChangeChecked = checkedValues => {
		this.setState({
			indeterminate: !!checkedValues.length && checkedValues.length < this.checkOption.length,
			checkAll: checkedValues.length === this.checkOption.length,
			checkedValues
		})
	}

	handleSelectAll = ({target: {checked}}) => {
		const checkedValues = checked ? 
			this.checkOption.filter(item => !item.disabled)
				.map(item => item.id) : [];
		this.setState({ checkAll: checked, indeterminate: false, checkedValues });
	}

	handleSaveResult = () => {
		const { checkedValues } = this.state;
		this.props.handleSave(checkedValues);
		this.isShowPopover();
	}

	getOptionDisabled = () => {
		const { selectedPlatform = [] } = this.props;
		this.checkOption.forEach(item => {
			item.disabled = selectedPlatform.includes(item.id);
			item.label = item.platformName,
			item.value = item.id
		});

		return this.checkOption
	}

	render() {
		const { checkedValues, indeterminate, checkAll, visible } = this.state;
		const { className, entryComp, selectedPlatform } = this.props;
		const title = () => (
			<CheckboxGroup 
				value={checkedValues} 
				options={this.getOptionDisabled()} 
				onChange={this.handleChangeChecked}
			/>
		);
		const content = () => ([
			<Checkbox 
				key='checkbox' className='selectAll' 
				disabled={selectedPlatform.length === this.checkOption.length}
				indeterminate={indeterminate} 
				checked={checkAll} onChange={this.handleSelectAll}
			>全选</Checkbox>,
			<div key='operate'>
				<Button type='primary' onClick={this.handleSaveResult}>确定</Button>
				<Button className='cancelBtn' onClick={this.isShowPopover}>取消</Button>
			</div>
		]);

		return (
			<Popover 
				overlayClassName={`disCountPopover ${className}`}
				content={content()} 
				title={title()} 
				trigger="click" 
				visible={visible} 
				onVisibleChange={this.isShowPopover}
			>
				{ entryComp }
			</Popover>
		)
	}
}

export default PopoverComp
