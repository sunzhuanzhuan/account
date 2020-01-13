import React, { useState } from 'react';
import { Form, Modal } from 'antd';
import { PlatformEdit } from './Platform'
import { AccountEdit } from './Account'
import { DiscountEdit } from './Discount'
import { RebateEdit } from './Rebate'
import AddAccountModal from './AddAccountModal'
const { _ } = window;
const EditRuleForm = (props) => {
  const { form, editRuleModalClose, type, mcnId, id, currentRule = {}, policyPeriodIdentity } = props;
  const [addAccountModalVisible, setAddAccountModalVisible] = useState(false);
  const [accountList, setAccountList] = useState(currentRule.accountList || [])
  // const [selectedIds, setSelectedIds] = useState([]);
  const allSelectedIds = accountList.map(item => item.accountId)
  const { ruleId } = currentRule;
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
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
        if (_rebateStepRules.length > 0) {
          rebateRule.rebateStepRules = _rebateStepRules;
        }
        delete rebateRule.rebateNumbers
        delete rebateRule.percentage
        console.log("=====", allSelectedIds, accountList)
        values.accountIds = allSelectedIds;

        if (!values.discountRule && !values.rebateRule) {
          Modal.error({
            title: '错误',
            content: '折扣和返点必须填写一个'
          })
          return;
        }
        if (type == 'global') {
          delete values.accountIds;
        } else {
          delete values.platform;
          if (values.accountIds.length > 20) {
            Modal.error({ content: '每个规则最多添加20个账号' })
            return;
          }
        }

        props.saveAccountRule(type, values)
        // editRuleModalClose();
        // console.log('Merged values:', keys.map(key => names[key]));
      }
    });
  };
  const updateAccountList = (newAccountList) => {
    const _accountList = [...accountList, ...newAccountList]
    setAccountList(_.uniqBy(_accountList, 'accountId'));
  }
  const delWhiteListAccount = (accountId) => {
    const newAccountList = accountList.filter(item => item.accountId != accountId);
    setAccountList(newAccountList)
  }
  const cleanWhiteListAccount = () => {
    setAccountList([])
  }

  const addAccount = () => {
    setAddAccountModalVisible(true);
  }

  return <div>
    {
      <Modal
        key={ruleId}
        title={`${ruleId ? '修改' : '新增'}规则`}
        width={1000}
        onOk={handleSubmit}
        maskClosable={true}
        mask={false}
        visible={true}
        onCancel={editRuleModalClose}
      >
        <Form onSubmit={handleSubmit}>
          {type == 'global' ?
            <PlatformEdit {...props}></PlatformEdit> :
            <AccountEdit
              {...props}
              accountList={accountList}
              delWhiteListAccount={delWhiteListAccount}
              onButtonClick={addAccount}
              cleanWhiteListAccount={cleanWhiteListAccount}
            />
          }
          <DiscountEdit {...props}></DiscountEdit>
          <RebateEdit {...props}></RebateEdit>
        </Form>
        <AddAccountModal
          form={form}
          mcnId={mcnId}
          allSelectedIds={allSelectedIds}
          // updateSelectedIds={updateSelectedIds}
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

