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
    wrapperCol: { span: 21 },
};

export const RebateEdit = (props) => {
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
    return <Row className='platform-wrap'>
        <Col className='form-label' span={2}>返点：</Col>
        {!visible ? <Col span={19}>
            <Button type='link' onClick={() => setVisible(true)}>+添加折扣</Button>
        </Col> : <Col span={19} style={{ background: '#eee' }}>
                <Form.Item label='类型：' {...formItemLayout}>
                    <Radio.Group options={ruleRebate} onChange={onTypeChange} value={type} />
                </Form.Item>
                <div>
                    {type == Rule_Rebate_Ratio ? <Form.Item label='公式：' {...formItemLayout}><span>
                        执行完成订单时博主收入，返点比例为：<InputNumber max={100} style={{ width: 100 }} suffix="%" value={ratio} onChange={onRatioChange} />
                    </span></Form.Item> : type == Rule_Rebate_Numeric ? <Form.Item label='公式：' {...formItemLayout}><span>
                        执行完成订单时博主收入，返点金额为：<InputNumber style={{ width: 100 }} suffix="元" value={numeric} onChange={onNumericChange} />
                    </span></Form.Item> : <div>
                                <p>公式（是否满足阶梯【例0-100】：按照订单回填执行结果当时的博主收入金额，为计算基础）</p>
                                <ul>
                                    {
                                        [0, 100, 200, 9999].reduce((arr, cur) => {
                                            console.log(arr, cur)
                                            arr.push(cur);
                                            return arr;
                                        }, [])
                                    }
                                </ul>
                            </div>
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