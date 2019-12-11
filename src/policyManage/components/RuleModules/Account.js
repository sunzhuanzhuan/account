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
    wrapperCol: { span: 21 },
};
const { Option } = Select;

export const AccountEdit = (props) => {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
    const { addPlatform, platformList, defaultCheckedList = [1, 2], setDefaultCheckedList } = props;
    const platformListMap = platformList.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
    }, {})
    const onClose = (e) => {
        const checkeList = defaultCheckedList.filter(item => item !== e);
        setDefaultCheckedList(checkeList);
    }
    return <Form.Item label="账号" {...formItemLayout}>
        {
            getFieldDecorator(`account`, {
                rules: [
                    { required: true, message: '请输入账号的account_id', type: 'array' },
                ],
            })(
                <Input placeholder='请输入账号的account_id，多个通过【空格隔开】' />
            )
        }
    </Form.Item>
}

export const AccountView = (props) => {
    return <Form.Item label="账号" {...formItemLayout}>
        <Input disabled placeholder='请输入账号的account_id，多个通过【空格隔开】' />
    </Form.Item>
}