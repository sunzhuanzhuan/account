import React, { useState } from 'react';
import { Form, Button, Modal } from 'antd';
import { PlatformView, PlatformEdit } from './Platform'
import { AccountView, AccountEdit } from './Account'
import { DiscountView, DiscountEdit } from './Discount'
import { RebateView, RebateEdit } from './Rebate'
import AddAccountModal from './AddAccountModal'
const EditRuleForm = (props) => {
    const { form, showEditRuleModal, editRuleModalClose, type, userId, currentRule } = props;
    const [addAccountModalVisible, setAddAccountModalVisible] = useState(false);
    const [accountList, setAccountList] = useState([])
    const [selectedIds, setSelectedIds] = useState([]);
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

                values.accountIds = selectedIds;

                if (!values.discountRule && !values.rebateRule) {
                    Modal.error({
                        title: '错误',
                        content: '折扣和返点必须填写一个'
                    })
                }
                if (type == 'global') {
                    props.saveGlobalAccountRule({ ...values, mcnId: userId })
                } else {
                    props.saveSpecialAccountRule({ ...values, mcnId: userId, })
                }
                // debugger;
                // !values.accountIds && delete values.accountIds;
                // !values.platform && delete values.platform;
                console.log('Received values of form: ', values);
                // console.log('Merged values:', keys.map(key => names[key]));
            }
        });
    };
    const updateAccountList = (newAccountList) => {
        setAccountList([...accountList, ...newAccountList]);
    }
    const updateSelectedIds = (ids) => {
        const newIds = Array.from(new Set([...selectedIds, ...ids]));
        setSelectedIds(newIds)
    }
    const addAccount = () => {
        setAddAccountModalVisible(true);
    }
    console.log("currentRule====", currentRule)
    return <div>
        {
            showEditRuleModal && <Modal title={'修改规则'} width={1000} onOk={handleSubmit} maskClosable={false} mask={false} visible={true} onCancel={editRuleModalClose}>
                <Form onSubmit={handleSubmit}>
                    {type == 'global' ?
                        <PlatformEdit {...props}></PlatformEdit> :
                        <AccountEdit {...props} accountList={accountList} onButtonClick={addAccount} />
                    }
                    <DiscountEdit {...props}></DiscountEdit>
                    <RebateEdit {...props}></RebateEdit>
                </Form>
                <AddAccountModal
                    form={form}
                    allSelectedIds={selectedIds}
                    updateSelectedIds={updateSelectedIds}
                    getAccountInfoByIds={props.getAccountInfoByIds}
                    visible={addAccountModalVisible}
                    setAddAccountModalVisible={setAddAccountModalVisible}
                    updateAccountList={updateAccountList}
                ></AddAccountModal>
            </Modal>
        }
    </div>
}

export default Form.create()(EditRuleForm)

