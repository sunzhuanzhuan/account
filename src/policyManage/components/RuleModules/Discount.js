import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Tag, Modal, Checkbox, Radio, Input, Icon, InputNumber, Form, Select } from 'antd'

import {
    ruleDiscount,
    Rule_Discount_Ratio,
    Rule_Discount_Numeric,

    ruleRebate,
    Rule_Rebate_Ratio,
    Rule_Rebate_Numeric,
    Rule_Rebate_LadderRatio
} from '../../constants/dataConfig'

const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};

export const DiscountEdit = (props) => {
    const { index } = props;
    const { getFieldDecorator } = props.form;
    const [type, useType] = useState(Rule_Discount_Ratio)
    const [visible, setVisible] = useState(false);

    const onDiscountRatioChange = e => {
        useType(e.target.value)
    }
    return <Row className='platform-wrap'>
        <Col className='form-label' span={formItemLayout.labelCol.span}>折扣：</Col>
        {!visible ? <Col className='ant-form-item-label' span={formItemLayout.wrapperCol.span}>
            <Button type='link' onClick={() => setVisible(true)}>+添加折扣</Button>
        </Col> :
            <Col span={formItemLayout.wrapperCol.span} style={{ background: '#eee' }}>
                <Form.Item label="类型：" {...formItemLayout}>
                    {getFieldDecorator(`rules.platform[${index}].type`, {
                        initialValue: Rule_Discount_Ratio,
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Radio.Group options={ruleDiscount} onChange={onDiscountRatioChange} />
                    )}
                </Form.Item>
                {
                    type == Rule_Discount_Ratio ? <Form.Item label='公式：' {...formItemLayout}>
                        {getFieldDecorator(`rules.platform[${index}].ratio`, {
                            rules: [{ required: false, message: 'Please input your Password!' }],
                        })(
                            <span>刊例价 X <InputNumber max={100} style={{ width: 100 }} suffix="%" />= 账号报价</span>
                        )} </Form.Item> :
                        <Form.Item label='公式：' {...formItemLayout}>
                            {getFieldDecorator('rule.numeric', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(<span>
                                刊例价 -<InputNumber style={{ width: 100 }} suffix="元" /> = 账号报价
                        </span>)}
                        </Form.Item>
                }
                <Button onClick={() => setVisible(false)} style={{ position: 'absolute', right: 0, top: 0 }} type="link" >删除</Button>
            </Col>
        }

    </Row >
}

export const DiscountView = (props) => {
    return <Row className='platform-wrap'>
        <Col className='form-label' span={2}>折扣类型：</Col>
        <Col className='form-label' span={22}>折扣公式：</Col>
    </Row>
}