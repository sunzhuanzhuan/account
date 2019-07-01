import React from "react";
import { Icon, Tag } from 'antd';
import PopoverComp from "./PopoverComp";

class Platform extends React.PureComponent {
	constructor(props) {
		super(props);
		const {itemInfo = {}} = props;
		this.state = {
			selectedTag: [...itemInfo.platform] || [],
		};
		this.checkOption = [
			{label: '平台1', value: '平台1'},
			{label: '平台2', value: '平台2'},
			{label: '平台3', value: '平台3'},
			{label: '平台4', value: '平台4'},
		];
	}

	handleClose = (index) => {
		const { selectedTag } = this.state;
		selectedTag.splice(index, 1);
		this.setState({selectedTag});
	}

	showPopover = () => {

	}
	
	handlePopoverSave = selectedTag => {
		const { itemInfo = {} } = this.props;
		itemInfo.platform = selectedTag;
		this.setState({
			selectedTag
		});
	}

	render() {
		const { selectedTag } = this.state;
		const addBtn = (
			<Tag className='platformTag addTag' onClick={this.showPopover} style={{ background: '#fff', borderStyle: 'dashed' }}>
				<Icon type="plus" />
			</Tag>
		)

		return (
			<div>
				{
					selectedTag.map((item, index) => {
						const itemInfo = this.checkOption.find(opItem => opItem.value === item)
						if(itemInfo)
							return (
								<Tag className='platformTag' key={itemInfo.label} closable onClose={() => this.handleClose(index)}>
									{itemInfo.label}
								</Tag>
							)
						return null
					})
				}
				<PopoverComp 
					className='ruleModal'
					checkedValues={[...selectedTag]}
					checkOption={this.checkOption}
					handleSave={this.handlePopoverSave}
					entryComp={addBtn}
				/>
			</div>
		)
	}
}

export default Platform
