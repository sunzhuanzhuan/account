import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Tag, Modal, Checkbox, Radio, Input, Icon, InputNumber, Form, Select } from 'antd'

import RuleCard from './RuleCard'
import {
    ruleDiscount,
    Rule_Discount_Ratio,
    Rule_Discount_Numeric,

    ruleRebate,
    Rule_Rebate_Ratio,
    Rule_Rebate_Numeric,
    Rule_Rebate_LadderRatio
} from '../../constants/dataConfig'


export const Platform = (props) => {
    const { addPlatform, platformList, defaultCheckedList = [1, 2], setDefaultCheckedList } = props;
    const platformListMap = platformList.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
    }, {})
    const onClose = (e) => {
        const checkeList = defaultCheckedList.filter(item => item !== e);
        setDefaultCheckedList(checkeList);
    }
    return <Row className='platform-wrap'>
        <span>平台：</span>
        {defaultCheckedList.map(item => <Tag className='platform-tag' closable onClose={() => onClose(item)} key={item}>{platformListMap[item].name}</Tag>)}
        <Button type="dashed" onClick={addPlatform}>+</Button>
    </Row>
}