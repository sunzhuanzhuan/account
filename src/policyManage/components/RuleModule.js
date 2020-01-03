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
import './RuleModule.less'
// let ruleID = 1;
const RuleModule = (props) => {
    const { type, data = [], editRule, delRule, disable } = props;
    console.log("rule, ", typeof delRule, props)

    return <div>
        {
            data.map(item => <RuleCard
                disable={disable}
                key={item.ruleId}
                title={`规则ID: ${item.ruleId}`}
                onDelBtnClick={() => delRule(type, item.ruleId)}
                onEditBtnClick={() => editRule(type, item.ruleId)}
            >
                {type == 'global' ? <PlatformView data={item.platformList}></PlatformView> :
                    <AccountView accountList={item.accountList}></AccountView>
                }
                {item.discountRule && <DiscountView data={item.discountRule}></DiscountView>}
                {item.rebateRule && <RebateView data={item.rebateRule}></RebateView>}
            </RuleCard>)
        }
    </div>
}

export default RuleModule