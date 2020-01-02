import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Tag, Modal, Checkbox, Radio, Input, Icon, InputNumber, Form, Select } from 'antd'

import {
    ruleDiscount,
    Rule_Discount_Ratio,
    Rule_Discount_Numeric,

    ruleRebate,
    Rule_Rebate_Ratio,
    Rule_Rebate_Numeric,
    Rule_Rebate_LadderRatio,
    platformListOptions
} from '../../constants/dataConfig'
const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};

const { Option } = Select;

export const PlatformEdit = (props) => {
    const { newBPlatforms } = props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
    const { addPlatform, defaultCheckedList = [1, 2], setDefaultCheckedList, currentRule = {} } = props;
    // const platformListMap = platformList.reduce((obj, item) => {
    //     obj[item.id] = item;
    //     return obj;
    // }, {})
    const { platformList = [] } = currentRule
    console.log("currentRule", currentRule, props.newBPlatforms)
    const onClose = (e) => {
        const checkeList = defaultCheckedList.filter(item => item !== e);
        setDefaultCheckedList(checkeList);
    }
    return <Form.Item label="平台" {...formItemLayout}>
        {getFieldDecorator(`platformIds`, {
            initialValue: platformList.map(item => item.platformId),
            rules: [
                { required: true, message: '请选择平台', type: 'array' },
            ],
        })(
            <Select mode="multiple" placeholder="请选择平台">
                {newBPlatforms.map(item => <Option key={item.id} value={item.id}>{item.platformName}</Option>)}
            </Select>
        )}
    </Form.Item>
}
export const PlatformView = (props) => {
    return <Form.Item label="平台" {...formItemLayout}>
        <div>{props.data.map(item => item.platformName)}</div>
    </Form.Item>
}