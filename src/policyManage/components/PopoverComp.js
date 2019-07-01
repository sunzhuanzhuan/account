import React from "react";
import { Popover, Checkbox, Button } from 'antd';

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

	isShowPopover = () => {
		this.setState({visible: !this.state.visible})
	}

	handleChangeChecked = checkedValues => {
		this.setState({
			indeterminate: !!checkedValues.length && checkedValues.length < this.checkOption.length,
			checkAll: checkedValues.length === this.checkOption.length,
			checkedValues
		})
	}

	handleSelectAll = ({target: {checked}}) => {
		const checkedValues = checked ? this.checkOption.map(item => item.value) : [];
		this.setState({ checkAll: checked, checkedValues });
	}

	handleSaveResult = () => {
		const { checkedValues } = this.state;
		this.props.handleSave(checkedValues);
		this.isShowPopover();
	}

	render() {
		const { checkedValues, indeterminate, checkAll, visible } = this.state;
		const { className, entryComp } = this.props;
		const title = () => (
			<CheckboxGroup value={[...checkedValues]} options={this.checkOption} onChange={this.handleChangeChecked}/>
		);
		const content = () => ([
			<Checkbox 
				key='checkbox' className='selectAll' 
				indeterminate={indeterminate} 
				checked={checkAll} onChange={this.handleSelectAll}
			>全选</Checkbox>,
			<Button key='ok' type='primary' onClick={this.handleSaveResult}>确定</Button>,
			<Button key='cancel' className='cancelBtn' onClick={this.isShowPopover}>取消</Button>,
		]);

		console.log('lsdkjflsdkjflkjsd', checkedValues)

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
