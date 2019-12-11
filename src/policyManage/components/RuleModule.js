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

import { PlatformView, PlatformEdit } from '../components/RuleModules/Platform'
import { AccountView, AccountEdit } from '../components/RuleModules/Account'
import { DiscountView, DiscountEdit } from '../components/RuleModules/Discount'
import { RebateView, RebateEdit } from '../components/RuleModules/Rebate'

// let ruleID = 1;
const RuleModule = (props) => {
    const { type } = props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
    const [showPlatformModal, setShowPlatformModal] = useState(false);
    const [showAddRuleModal, setshowAddRuleModal] = useState(false);
    const [defaultCheckedList, setDefaultCheckedList] = useState([1, 2]);
    const [rules, setRules] = useState([]);
    const [ruleID, setRuleID] = useState(1);
    const { Option } = Select;
    const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 21 },
    };

    const addRule = () => {
        const _rules = [...rules];
        if (_rules.length <= 3) {
            _rules.push(ruleID)

            setRuleID(ruleID + 1);
            setRules(_rules);
        } else {
            //最多可以添加3个规则
        }
    }
    const delRule = (ruleID) => {
        let _rules = [];
        if (rules.length > 1) {
            _rules = rules.filter(item => ruleID !== item)
            setRules(_rules);
        } else {
            //至少保留一个规则
        }
    }
    return <div>
        {/* <div>政策规则：<Button type="link" onClick={addRule}>+添加</Button></div> */}
        {/* <Modal visible={showAddRuleModal} onClose={() => setshowAddRuleModal(false)}> */}
        {/* <Platform
                platformList={platformList}
                defaultCheckedList={defaultCheckedList}
                addPlatform={() => setShowPlatformModal(true)}
                setDefaultCheckedList={setDefaultCheckedList}
            ></Platform> */}
        {/* <Form {...formItemLayout} onSubmit={handleSubmit}>
                
            </Form> */}
        {/* <PlatformModal
                visible={showPlatformModal}
                setVisible={setShowPlatformModal}
                defaultCheckedList={defaultCheckedList}
                platformList={platformList}
                setDefaultCheckedList={setDefaultCheckedList}
            ></PlatformModal> */}

        {/* </Modal> */}
        {
            rules.map(item => <RuleCard key={item} title={`规则${item}`} onDelBtnClick={() => delRule(item)}>
                {type == 'all' ? <PlatformView></PlatformView> :
                    <AccountView></AccountView>
                }
                <DiscountView></DiscountView>
                <RebateView></RebateView>
                {/* <Discount {...props} index={item}></Discount> */}
                {/* <Rebate {...props} index={item}></Rebate> */}
            </RuleCard>)
        }

    </div >
}

export default RuleModule