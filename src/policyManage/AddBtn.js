import React from "react";
import { Icon } from 'antd';

class AddBtn extends React.Component {
	render() {
		const { title } = this.props;

		return (
			<div key='addBtn' className='appRules'><Icon type="plus" />{title}</div>
		)
	}
}



export default AddBtn;
