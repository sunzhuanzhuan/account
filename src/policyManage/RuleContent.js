import React from "react";
import { Row, Col } from 'antd';
import StaticRule from "./StaticRule";
import AddBtn from "./AddBtn";

class RuleContent extends React.Component {
	render() {

		return (
			<div className='ruleWrapper'>
				<div className='ruleTitle'>规则1</div>
				<div className='ruleContent'>
					<Row>
						<Col span={1}>平台</Col>
						<Col span={20}>值</Col>
					</Row>
					<Row>
						<Col span={1}>折扣</Col>
						<Col span={22}>
							<StaticRule />
							<AddBtn title='添加折扣'/>
						</Col>
					</Row>
					<Row>
						<Col span={1}>返点</Col>
						<Col span={22}>值</Col>
					</Row>
				</div>
			</div>
		)
	}
}

export default RuleContent;
