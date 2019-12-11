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
                const { keys, names } = values;
                console.log('Received values of form: ', values);
                // console.log('Merged values:', keys.map(key => names[key]));
            }
        });
    };

    const { showEditRuleModal, editRuleModalClose, type } = props;
    return <Modal width={800} onOk={handleSubmit} maskClosable={false} mask={false} visible={showEditRuleModal} onCancel={editRuleModalClose}>
        <Form onSubmit={handleSubmit}>
            {type == 'all' ?
                <PlatformEdit {...props}></PlatformEdit> :
                <AccountEdit {...props} />
            }
            <DiscountEdit {...props}></DiscountEdit>
            <RebateEdit {...props}></RebateEdit>
        </Form>
    </Modal>
}

export default Form.create()(EditRuleForm)

