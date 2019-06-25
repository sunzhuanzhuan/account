import React from "react";
import { Row, Col, Select } from 'antd';
const { Option } = Select;

class StaticRule extends React.Component {
	render() {
		return (
			<div className='ruleItem'>
				<Row>
					<Col span={1}>
						类型
					</Col>
					<Col span={10}>
						<Select>
							<Option></Option>
							<Option></Option>
						</Select>
					</Col>
				</Row>
				<Row>
					<Col span={1}>
						公式
					</Col>
					<Col span={10}>
						pintailzhi
					</Col>
				</Row>
			</div>
		)
	}
}



export default StaticRule;
