import React from "react";
import { Icon } from 'antd';

class AddBtn extends React.Component {
	render() {
		const { title, onClick } = this.props;

		return (
			<div key='addBtn' className='appRules' onClick={onClick}><Icon type="plus" />{title}</div>
		)
	}
}



export default AddBtn;
