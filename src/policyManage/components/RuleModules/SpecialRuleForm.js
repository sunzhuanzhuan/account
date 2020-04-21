import React, { useState } from 'react';
import { Alert, Button, Form, Icon, Modal, Popconfirm } from "antd";
import { AccountEdit } from "@/policyManage/components/RuleModules/Account";
import { DiscountEdit } from "@/policyManage/components/RuleModules/Discount";
import { RebateEdit } from "@/policyManage/components/RuleModules/Rebate";
import { PlatformEdit } from "@/policyManage/components/RuleModules/Platform";
import AddAccountModal from "@/policyManage/components/RuleModules/AddAccountModal";
import AccountListTable from "@/policyManage/components/AccountListTable";


const formItemLayout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 23 }
};

const SpecialRuleForm = (props) => {
  const { form, editRuleModalClose, type, mcnId, id, currentRule = {}, policyPeriodIdentity } = props;
  const [ addAccountModalVisible, setAddAccountModalVisible ] = useState(false);
  const [ accountList, setAccountList ] = useState(currentRule.accountList || [])
  // const [selectedIds, setSelectedIds] = useState([]);
  const allSelectedIds = accountList.map(item => item.accountId)
  const { ruleId } = currentRule;
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };
  const updateAccountList = (newAccountList) => {
    const _accountList = [ ...accountList, ...newAccountList ]
    setAccountList(window._.uniqBy(_accountList, 'accountId'));
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

  return (
    <Modal
      visible
      title="新增规则"
      width={1000}
      bodyStyle={{ maxHeight: 380, overflowY: "auto" }}
      onOk={handleSubmit}
      maskClosable={true}
      mask={false}
      onCancel={editRuleModalClose}
    >
      <Form onSubmit={handleSubmit} {...formItemLayout}>
        <Form.Item label="账号">
          {accountList.length < 20 && <Button>添加账号</Button>}
          <Alert style={{margin: "6px 0 10px"}} message={<div>
            已选择{accountList.length}个账号
            <Popconfirm
              title="是否清空所有账号?"
            >
              <a href="#" style={{ float: "right" }}><Icon type="rest" />清空</a>
            </Popconfirm>
          </div>} />
          <AccountListTable isEdit delWhiteListAccount={delWhiteListAccount} dataSource={accountList} />
        </Form.Item>
        <DiscountEdit form={props.form} rule={{}} />
        <RebateEdit form={props.form} rule={{}} />
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
      />
    </Modal>
  );
};

export default Form.create()(SpecialRuleForm);
