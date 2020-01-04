import React from 'react';
import { Card, Button } from 'antd'

export default (props) => {
	const { title, onDelBtnClick, onEditBtnClick, disable } = props;
	const extra = !disable ? <>
		<Button onClick={() => { onEditBtnClick() }} type='primary' style={{ marginRight: 10 }}>编辑</Button>
		<Button onClick={() => { onDelBtnClick() }}>删除</Button>
	</> : null
	return <Card title={title} bordered={true} extra={extra}>
		{props.children}
	</Card>
}
