import React, { useState } from 'react';
import { Form, Button, Modal } from 'antd';
import { PlatformView, PlatformEdit } from './Platform'
import { AccountView, AccountEdit } from './Account'
import { DiscountView, DiscountEdit } from './Discount'
import { RebateView, RebateEdit } from './Rebate'
import AddAccountModal from './AddAccountModal'
const EditRuleForm = (props) => {
    const { form, showEditRuleModal, editRuleModalClose, type } = props;
    const [addAccountModalVisible, setAddAccountModalVisible] = useState(false);
    const [accountInfo, setAccountInfo] = useState([])
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
                // debugger;
                // !values.accountIds && delete values.accountIds;
                // !values.platform && delete values.platform;
                console.log('Received values of form: ', values);
                // console.log('Merged values:', keys.map(key => names[key]));
            }
        });
    };
    const addAccount = () => {
        setAddAccountModalVisible(true);
    }
    const confirmAddAccount = (value) => {

        props.getAccountInfoByIds({ accountIds: value }).then((data) => {
            const { accountList, notExistAccountIds = [], notExistAccountIdsByMcnId = [] } = data.data;

            (notExistAccountIds.length > 0 || notExistAccountIdsByMcnId.length > 0) && Modal.confirm({
                title: 'Do you Want to delete these items?',
                content: <div>{notExistAccountIds.length > 0 && <p>不存在的accountId: {notExistAccountIds}</p>}
                    {notExistAccountIdsByMcnId.length > 0 && <p>不在该主账号旗下的accountId: {notExistAccountIdsByMcnId}</p>}</div>,
                onOk() {
                    setAddAccountModalVisible(false);
                    setAccountInfo(accountList);
                },
                onCancel() {
                    // console.log('Cancel');
                    // setAddAccountModalVisible(false);
                },
            });
        })
    }

    return <div>
        {
            showEditRuleModal && <Modal title={'修改规则'} width={1000} onOk={handleSubmit} maskClosable={false} mask={false} visible={true} onCancel={editRuleModalClose}>
                <Form onSubmit={handleSubmit}>
                    {type == 'global' ?
                        <PlatformEdit {...props}></PlatformEdit> :
                        <AccountEdit {...props} accountList={accountInfo} onButtonClick={addAccount} />
                    }
                    <DiscountEdit {...props}></DiscountEdit>
                    <RebateEdit {...props}></RebateEdit>
                </Form>
                <AddAccountModal
                    form={form}
                    onOk={confirmAddAccount}
                    visible={addAccountModalVisible}
                ></AddAccountModal>
            </Modal>
        }
    </div>
}

export default Form.create()(EditRuleForm)

