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
const platformList = [
    { id: 1, name: '新浪微博' },
    { id: 2, name: '微信' },
    { id: 3, name: '秒拍' },
    { id: 4, name: '美拍' },
    { id: 5, name: '今日头条' },
    { id: 6, name: '小红书' }
];
const { Option } = Select;

export const PlatformEdit = (props) => {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
    const { addPlatform, defaultCheckedList = [1, 2], setDefaultCheckedList } = props;
    const platformListMap = platformList.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
    }, {})
    const onClose = (e) => {
        const checkeList = defaultCheckedList.filter(item => item !== e);
        setDefaultCheckedList(checkeList);
    }
    return <Form.Item label="平台" {...formItemLayout}>
        {getFieldDecorator(`platform`, {
            rules: [
                { required: true, message: '请选择平台', type: 'array' },
            ],
        })(
            <Select mode="multiple" placeholder="请选择平台">
                {platformList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
        )}
    </Form.Item>
}
export const PlatformView = (props) => {
    return <Select mode="multiple" placeholder="请选择平台">
        {[{ name: 'weixin' }].map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
    </Select>
}