import React from "react";
import { Icon, Tag } from 'antd';
import PopoverComp from "./PopoverComp";
import { shallowEqual } from "../../util";

class Platform extends React.PureComponent {
	constructor(props) {
		super(props);
		const {itemInfo = {}, selectedPlatform = []} = props;

		this.state = {
			selectedTag: [...itemInfo.platformIds] || [],
			selectedPlatform: this.getSelectedWithoutCurrent(selectedPlatform, itemInfo.platformIds)
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const { platform = [] } = nextProps;
		const { propsValues = [] } = prevState;
		if(!shallowEqual(platform, propsValues)) {
			return {
				propsValues: platform,
				selectedTag: [...platform],
			}
		}
		return null;
	}

	getSelectedWithoutCurrent = (selected, currentArr) => {
		currentArr.forEach(item => {
			const currentIndex = selected.findIndex(cItem => cItem === item);
			selected.splice(currentIndex, 1);
		});

		return selected;
	}

	handleClose = (index, id) => {
		const { selectedTag, selectedPlatform = [] } = this.state;
		const delIndex = selectedPlatform.findIndex(item => item === id);

		selectedTag.splice(index, 1);
		selectedPlatform.splice(delIndex, 1);

		this.handleChangeItemInfo(selectedTag, selectedPlatform);
	}

	handleChangeItemInfo = (selectedTag, allSelected) => {
		const { itemInfo = {}, isSubmitOk, getErrorTips } = this.props;
		const { selectedPlatform = [] } = this.state;
		const updateAllSelected = allSelected ? allSelected : selectedPlatform.concat(selectedTag);
		const isPlatformOk = selectedTag.length > 0;
		itemInfo.platformIds = selectedTag;

		if(!isPlatformOk)
			getErrorTips('请选择平台');
		isSubmitOk(selectedTag.length > 0, 'platform');

		this.setState({
			selectedTag,
			selectedPlatform: this.getUniqueArr(updateAllSelected)
		});
	}

	getUniqueArr = (arr = []) => arr.filter((item, index, self) => self.indexOf(item) === index)

	render() {
		const { selectedTag, selectedPlatform } = this.state;
		const { platformList = [] } = this.props;

		const addBtn = (
			<Tag className='platformTag addTag' style={{ background: '#fff', borderStyle: 'dashed' }}>
				<Icon type="plus" />
			</Tag>
		)

		return (
			<div>
				{
					selectedTag.map((item, index) => {
						const itemInfo = platformList.find(opItem => opItem.id === item);
						if(itemInfo)
							return (
								<Tag className='platformTag' key={itemInfo.id} closable onClose={() => this.handleClose(index, itemInfo.id)}>
									{itemInfo.platformName}
								</Tag>
							)
						return null
					})
				}
				<PopoverComp 
					className='rulePopover' 
					selectedPlatform={selectedPlatform}
					checkedValues={[...selectedTag]}
					checkOption={platformList}
					handleSave={this.handleChangeItemInfo}
					entryComp={addBtn}
				/>
			</div>
		)
	}
}

export default Platform
