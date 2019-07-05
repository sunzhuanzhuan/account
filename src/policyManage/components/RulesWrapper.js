import React from "react";
import RuleContent from "./RuleContent";
import AddBtn from "./AddBtn";

class RulesWrapper extends React.Component {
	render() {
		const { ruleItems = [], onClick, handleDel } = this.props;
		const ruleItemsComp = () => {
			if(ruleItems.length)
				return ruleItems.map((item, index) => {
					return <RuleContent 
						key={+new Date() + Math.random()} 
						rangeValue={index + 1} 
						itemInfo={item} 
						onClick={onClick} 
						handleDel={handleDel}
					/>
				})
		};

		return [
			<AddBtn key='addBtn' title='添加' onClick={() => {onClick({platformIds: [], channelDiscountId: Math.random()}, 'add')}} />, 
			ruleItemsComp()
		]
	}
}



export default RulesWrapper;
