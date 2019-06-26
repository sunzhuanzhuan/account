import React from "react";

class CommonTitle extends React.Component {
	render() {
		const { title } = this.props;

		return (
			<div className='commonTitle'>{title}</div>
		)
	}
}



export default CommonTitle;
