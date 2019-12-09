import React from 'react';
import { Card, Button } from 'antd'

export default (props) => {
    const { title } = props;
    return <Card title={title} bordered={true} extra={<Button>删除</Button>}>
        {props.children}
    </Card>
}