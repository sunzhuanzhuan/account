import React from "react";
import RuleContent from "./RuleContent";
import AddBtn from "./AddBtn";

class PolicyRulesWrapper extends React.Component {
	render() {

		return [
			<RuleContent key='ruleContent' />,
			<AddBtn key='addBtn' title='添加' />
		]
	}
}



export default PolicyRulesWrapper;
