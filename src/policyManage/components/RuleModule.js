import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Tag, Modal, Checkbox, Radio, Input, Icon, InputNumber, Form } from 'antd'
import { ModuleHeader } from '@/components/ModuleHeader';
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

]

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
const PlatformModal = (props) => {
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

const Discount = (props) => {
    const { getFieldDecorator } = props.form;
    const [type, useType] = useState(Rule_Discount_Ratio)

    const onDiscountRatioChange = e => {
        useType(e.target.value)
    }
    return <Row className='platform-wrap'>
        <span style={{ float: 'left' }}>折扣：</span>
        <Button style={{ float: 'right' }} type="link" >删除</Button>
        <div style={{ overflow: 'hidden', background: '#eee' }}>
            <Form.Item label="类型：">
                {getFieldDecorator('rule.type', {
                    initialValue: Rule_Discount_Ratio,
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Radio.Group options={ruleDiscount} onChange={onDiscountRatioChange} />
                )}
            </Form.Item>
            <Form.Item>
                <span>公式：</span>
                {type == Rule_Discount_Ratio ? <span>
                    刊例价 X {
                        getFieldDecorator('rule.ratio', {})(
                            <InputNumber max={100} style={{ width: 100 }} suffix="%" />
                        )
                    } = 账号报价
                </span> : <span>
                        刊例价 - {
                            getFieldDecorator('rule.numeric', {})(
                                <InputNumber style={{ width: 100 }} suffix="元" />
                            )
                        } = 账号报价
                </span>}
            </Form.Item>
        </div>
    </Row>
}

const Rebate = (props) => {
    const [type, useType] = useState(Rule_Rebate_Ratio)
    const [ratio, useRatio] = useState();
    const [numeric, useNumeric] = useState();
    const onTypeChange = e => {
        console.log('onTypeChange', e.target.value);
        useType(e.target.value)
    }
    const onRatioChange = e => {
        console.log('onRatioChange', e.target.value);
        useRatio(e.target.value)
    };
    const onNumericChange = e => {
        console.log('onNumericChange', e.target.value);
        useNumeric(e.target.value)
    }
    return <Row className='platform-wrap'>
        <span style={{ float: 'left' }}>折扣：</span>
        <Button style={{ float: 'right' }} type="link" >删除</Button>
        <div style={{ overflow: 'hidden', background: '#eee' }}>
            <div>
                <span>类型：</span>
                <span>
                    <Radio.Group options={ruleRebate} onChange={onTypeChange} value={type} />
                </span>
            </div>
            <div>
                {type == Rule_Rebate_Ratio ? <span>
                    执行完成订单时博主收入，返点比例为：<InputNumber max={100} style={{ width: 100 }} suffix="%" value={ratio} onChange={onRatioChange} />
                </span> : type == Rule_Rebate_Numeric ? <span>
                    执行完成订单时博主收入，返点金额为：<InputNumber style={{ width: 100 }} suffix="元" value={numeric} onChange={onNumericChange} />
                </span> : <div>
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
        </div>
    </Row>
}



const RuleModule = (props) => {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
    const [visible, setVisible] = useState(false);
    const [defaultCheckedList, setDefaultCheckedList] = useState([1, 2])
    return <div>
        <ModuleHeader title="全局账号设置"></ModuleHeader>
        <div>政策规则：<Button type="link">+添加</Button></div>
        <RuleCard title='规则1'>
            <Platform
                platformList={platformList}
                defaultCheckedList={defaultCheckedList}
                addPlatform={() => setVisible(true)}
                setDefaultCheckedList={setDefaultCheckedList}
            ></Platform>
            <Discount {...props}></Discount>
            <Rebate {...props}></Rebate>
            <PlatformModal
                visible={visible}
                setVisible={setVisible}
                defaultCheckedList={defaultCheckedList}
                platformList={platformList}
                setDefaultCheckedList={setDefaultCheckedList}
            ></PlatformModal>
        </RuleCard>
    </div>
}

export default RuleModule