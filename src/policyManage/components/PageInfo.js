import React from "react";
import { Badge, Tooltip, Popover } from 'antd';

class PageInfo extends React.Component {
	render() {
		const { policyId, editor, editTime, stopReason='暂无', status } = this.props;
		const policyStatus = {
			1: '待开始',
			2: '进行中',
			3: '已过期',
			4: '已停用'
		};
		const discountStatus = {
			1: '进行中',
			2: '已停用'
		}
		const normalStatus = text => <span className='status'>{text}</span>;
		const toolTipStatus = text => (
			<Popover 
				overlayClassName='stopPopover'
				content={stopReason} 
				title='停用原因' 
				trigger="click" 
			>
				<span className='status withTooltip'>{text}</span>
			</Popover>
		)
		const getPolicyStatusComp = status => {
			switch(parseInt(status)) {
				case 1:
				case 2:
				case 3: 
					return normalStatus(policyStatus[status]);
				case 4: 
					return toolTipStatus(policyStatus[status]);
				default:
					return <span className='status'>未知</span>
			}
		}

		const getDiscountStatusComp = status => {
			switch(parseInt(status)) {
				case 1:
					return normalStatus(discountStatus[status]);
				case 2:
					return toolTipStatus(discountStatus[status]);
				default:
					return <span className='status'>未知</span>
			}
		}

		return (
			<div className='pageInfo'>
				{policyId ? <div>政策ID：{policyId}</div> : null}
				<div>
					{/* <Badge offset={[-10, -4]} count={5}><span>状态：</span></Badge> */}
					<span>状态：</span>
					{ policyId ? getPolicyStatusComp(status) : getDiscountStatusComp(status) }
				</div>
				<div>最后修订人：{editor}</div>
				<div>最后修订时间：{editTime}</div>
			</div>
		)
	}
}



export default PageInfo;
