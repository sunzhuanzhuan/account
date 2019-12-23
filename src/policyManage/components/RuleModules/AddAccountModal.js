import React from 'react';
import { Form, Button, Modal, Input } from 'antd';
// import { PlatformView, PlatformEdit } from './Platform'
// import { AccountView, AccountEdit } from './Account'
// import { DiscountView, DiscountEdit } from './Discount'
// import { RebateView, RebateEdit } from './Rebate'
const AddAccountModal = (props) => {
    const { form } = props;
    console.log("AddAccountModal", form)
    const { getFieldDecorator } = props.form;
    const { visible, onOk } = props;
    let selectedIds = [];
    const onCancel = () => {
        form.setFieldsValue({
            accoundIds: null
        })
    }
    const onChange = (e) => {
        console.log("onchange", e.target.value);
        selectedIds = new Set(e.target.value.split('\n'));
        selectedIds = Array.from(selectedIds);
        console.log('selectedId', selectedIds)
    }

    // const { showEditRuleModal, editRuleModalClose, type } = props;
    return <Modal
        title='添加账号'
        visible={visible}
        onOk={() => onOk(selectedIds)}
        onCancel={onCancel}
    >
        <Input.TextArea onChange={onChange} rows={10} placeholder='请输入账号account_id,多个通过【换行隔开】'></Input.TextArea>

    </Modal>
}

export default AddAccountModal