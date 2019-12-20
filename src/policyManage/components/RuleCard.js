import React from 'react';
import { Card, Button } from 'antd'

export default (props) => {
    const { title, onDelBtnClick } = props;
    return <Card title={title} bordered={true} extra={<Button onClick={() => { onDelBtnClick() }}>删除</Button>}>
        {props.children}
    </Card>
}