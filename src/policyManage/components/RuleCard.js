import React from 'react';
import { Card } from 'antd'

export default (props) => {
    const {title} = props;
    return <Card title={title} bordered={false}>
        {props.children}
    </Card>
}