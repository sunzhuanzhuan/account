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
} from '../constants/dataConfig'


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

const PlatformModalFooter = (props) => {
    const { allChecked, onCheckAllChange, onOk, onCancel } = props;
    return <div>
        <Checkbox checked={allChecked} onChange={onCheckAllChange}>
            全选
        </Checkbox>
        <Button onClick={onCancel}>取消</Button>
        <Button onClick={onOk}>确定</Button>
    </div>
}
export const PlatformModal = (props) => {
    let _checkedValues;

    const { visible, setVisible, platformList, defaultCheckedList, setDefaultCheckedList } = props;
    const [checkedList, setCheckedList] = useState(defaultCheckedList);

    const allChecked = checkedList.length == platformList.length;

    useEffect(() => {
        setCheckedList(defaultCheckedList)
    }, [defaultCheckedList])

    function onChange(checkedValues) {
        setCheckedList(checkedValues)
    }
    function onOk() {
        setVisible(false);
        setDefaultCheckedList(checkedList);
    }
    function onCheckAll(e) {
        _checkedValues = e.target.checked ? platformList.map(item => item.id) : defaultCheckedList;
        setCheckedList(_checkedValues)
    }
    function onCancel() {
        setVisible(false)
        setCheckedList(defaultCheckedList)
    }

    return <Modal
        visible={visible}
        footer={
            <PlatformModalFooter
                allChecked={allChecked}
                onCheckAllChange={onCheckAll}
                onOk={onOk}
                onCancel={onCancel}
            ></PlatformModalFooter>
        }
    >
        <Checkbox.Group value={checkedList} style={{ width: '100%' }} onChange={onChange}>
            <Row>
                {
                    platformList.map(item =>
                        <Col key={item.id} span={12}>
                            <Checkbox disabled={defaultCheckedList.indexOf(item.id) !== -1} value={item.id}>{item.name}</Checkbox>
                        </Col>)
                }
            </Row>
        </Checkbox.Group>
    </Modal>
}