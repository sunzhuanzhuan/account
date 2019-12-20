import React from 'react';
import { Form, Button, Modal } from 'antd';
import { PlatformView, PlatformEdit } from './Platform'
import { AccountView, AccountEdit } from './Account'
import { DiscountView, DiscountEdit } from './Discount'
import { RebateView, RebateEdit } from './Rebate'
const EditRuleForm = (props) => {
    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                const { rebateRule = {} } = values;
                const { rebateStepRules = {} } = rebateRule;
                const { rebateNumbers = [], percentage = [] } = rebateStepRules;
                const _rebateStepRules = [];
                for (let index = 0; index < rebateNumbers.length - 1; index++) {
                    _rebateStepRules.push({
                        amountLowLimit: rebateNumbers[index],
                        amountHighLimit: rebateNumbers[index + 1],
                        rebateRatio: percentage[index]
                    })
                }
                rebateRule.rebateStepRules = _rebateStepRules;
                delete rebateRule.rebateNumbers
                delete rebateRule.percentage
                console.log('Received values of form: ', values);
                // console.log('Merged values:', keys.map(key => names[key]));
            }
        });
    };

    const { showEditRuleModal, editRuleModalClose, type } = props;
    return <Modal title={'修改规则'} width={1000} onOk={handleSubmit} maskClosable={false} mask={false} visible={showEditRuleModal} onCancel={editRuleModalClose}>
        <Form onSubmit={handleSubmit}>
            {type == 'global' ?
                <PlatformEdit {...props}></PlatformEdit> :
                <AccountEdit {...props} />
            }
            <DiscountEdit {...props}></DiscountEdit>
            <RebateEdit {...props}></RebateEdit>
        </Form>
    </Modal>
}

export default Form.create()(EditRuleForm)

