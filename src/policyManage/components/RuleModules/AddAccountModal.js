import React, { useState } from 'react';
import { Form, Button, Modal, Input } from 'antd';
// import { PlatformView, PlatformEdit } from './Platform'
// import { AccountView, AccountEdit } from './Account'
// import { DiscountView, DiscountEdit } from './Discount'
// import { RebateView, RebateEdit } from './Rebate'
const { _ } = window;
const AddAccountModal = (props) => {
    const {
        setAddAccountModalVisible,
        updateSelectedIds,
        allSelectedIds,
        updateAccountList
    } = props;

    const { getFieldDecorator } = props.form;
    const { visible, onOk } = props;
    const [selectedIds, setSelectedIds] = useState('');

    // let selectedIds = [];
    const onCancel = () => {
        // ref.current.textAreaRef.value = ''
        setSelectedIds('')
        setAddAccountModalVisible(false);
    }
    const onModalOk = () => {
        const _selectedIds = _.uniq(_.trim(selectedIds).split('\n')).filter(item => item && allSelectedIds.indexOf(item) == -1);
        updateSelectedIds(_selectedIds);
        if (_selectedIds.length == 0) {
            Modal.warning({
                title: '警告',
                content: '以下账号已经被添加' + selectedIds
            });
            return;
        }
        props.getAccountInfoByIds({ accountIds: _selectedIds }).then((data) => {
            const { accountList, notExistAccountIds = [], notExistAccountIdsByMcnId = [] } = data.data;

            (notExistAccountIds.length > 0 || notExistAccountIdsByMcnId.length > 0) && Modal.confirm({
                title: '以下账号ID不存在',
                content: <div>{notExistAccountIds.length > 0 && <p>不存在的accountId: {notExistAccountIds}</p>}
                    {notExistAccountIdsByMcnId.length > 0 && <p>不在该主账号旗下的accountId: {notExistAccountIdsByMcnId}</p>}</div>,
                onOk() {
                    onCancel();
                    updateAccountList(accountList);
                }
            });
        })
    }
    const onChange = (e) => {
        setSelectedIds(e.target.value)
    }

    return <Modal
        title='添加账号'
        visible={visible}
        onOk={onModalOk}
        onCancel={onCancel}
    >
        <Input.TextArea value={selectedIds} onChange={onChange} rows={10} placeholder='请输入账号account_id,多个通过【换行隔开】'></Input.TextArea>
    </Modal>
}

export default AddAccountModal