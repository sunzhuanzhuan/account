import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Tag, Modal, Checkbox, Radio, Input, Icon, InputNumber, Form, Select } from 'antd'
import LadderRatio from './LadderRatio'
import {
    ruleDiscount,
    Rule_Discount_Ratio,
    Rule_Discount_Numeric,

    ruleRebate,
    Rule_Rebate_Ratio,
    Rule_Rebate_Numeric,
    Rule_Rebate_LadderRatio
} from '../../constants/dataConfig'


const platformList = [
    { id: 1, name: '新浪微博' },
    { id: 2, name: '微信' },
    { id: 3, name: '秒拍' },
    { id: 4, name: '美拍' },
    { id: 5, name: '今日头条' },
    { id: 6, name: '小红书' }

];
const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};

export const RebateEdit = (props) => {
    const { getFieldDecorator } = props.form;
    const [type, useType] = useState(Rule_Rebate_Ratio)
    const [ratio, useRatio] = useState();
    const [numeric, useNumeric] = useState();
    const [visible, setVisible] = useState(false);
    const onTypeChange = e => {
        console.log('onTypeChange', e.target.value);
        useType(e.target.value)
    }
    const onRatioChange = e => {
        // console.log('onRatioChange', e.target.value);
        // useRatio(e.target.value)
    };
    const onNumericChange = e => {
        // console.log('onNumericChange', e.target.value);
        // useNumeric(e.target.value)
    }
    // handleSubmit = e => {
    //     e.preventDefault();
    //     console.log("000011");
    //     this.props.form.validateFields((err, values) => {
    //       console.log(err);
    //       if (!err) {
    //         console.log("Received values of form: ", values);
    //       }
    //     });
    //   };

    const checkPrice = (rule, value, callback) => {
        console.log("-----", value);
        const { rebateNumbers } = value;
        const isBetterZero = value.percentage.every(item => item <= 100);
        console.log("isBetterZero", isBetterZero);
        if (!isBetterZero) {
            callback("返点比例必须大于0，小于等于100");
            return;
        }
        for (let i = rebateNumbers.length; i > 0; i--) {
            console.log(i, rebateNumbers, rebateNumbers[i - 1], rebateNumbers[i]);
            if (rebateNumbers[i - 1] > rebateNumbers[i]) {
                callback("后面的值必须大于前面的值");
            }
        }
        callback();
    };
    return <Row className='platform-wrap'>
        <Col className='form-label' span={formItemLayout.labelCol.span}>返点：</Col>
        {!visible ? <Col span={formItemLayout.wrapperCol.span}>
            <Button type='link' onClick={() => setVisible(true)}>+添加折扣</Button>
        </Col> : <Col span={formItemLayout.wrapperCol.span} style={{ background: '#eee' }}>
                <Form.Item label='类型：' {...formItemLayout}>
                    <Radio.Group options={ruleRebate} onChange={onTypeChange} value={type} />
                </Form.Item>
                <div>
                    {type == Rule_Rebate_Ratio ? <Form.Item label='公式：' {...formItemLayout}><span>
                        执行完成订单时博主收入，返点比例为：<InputNumber max={100} style={{ width: 100 }} suffix="%" value={ratio} onChange={onRatioChange} />
                    </span></Form.Item> : type == Rule_Rebate_Numeric ? <Form.Item label='公式：' {...formItemLayout}><span>
                        执行完成订单时博主收入，返点金额为：<InputNumber style={{ width: 100 }} suffix="元" value={numeric} onChange={onNumericChange} />
                    </span></Form.Item> : <Form.Item label="公式：" {...formItemLayout}>
                                {getFieldDecorator("price", {
                                    initialValue: { rebateNumbers: [0, 9999], percentage: [] },
                                    rules: [{ validator: checkPrice }]
                                })(<LadderRatio />)}
                            </Form.Item>
                    }
                </div>
                <Button onClick={() => setVisible(false)} style={{ position: 'absolute', right: 0, top: 0 }} type="link" >删除</Button>
            </Col>
        }

    </Row>
}

export const RebateView = (props) => {
    return <div>返点：</div>
}