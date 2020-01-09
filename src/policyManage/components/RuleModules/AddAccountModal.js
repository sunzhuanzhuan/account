import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { NotExistModalContent } from '../../components'
const { _ } = window;
const AddAccountModal = (props) => {
  const {
    mcnId,
    setAddAccountModalVisible,
    allSelectedIds,
    updateAccountList
  } = props;

  const { visible } = props;
  const [selectedIds, setSelectedIds] = useState('');

  const onCancel = () => {

    setSelectedIds('')
    setAddAccountModalVisible(false);
  }
  const onModalOk = () => {

    const _selectedIds = _.uniq(_.trim(selectedIds).split('\n')).filter(item => item && allSelectedIds.indexOf(item) == -1);
    if (_selectedIds.length == 0) {
      Modal.warning({
        title: '警告',
        content: '添加账号不能为空',
      });
      return;
    }
    const notExist = (data) => {
      const { accountList, notExistAccountIds = [], notExistAccountIdsByMcnId = [], alreadyHaveRuleAccountIds } = data.data;
      const notExistModalContentProps = {
        accountList,
        notExistAccountIds,
        notExistAccountIdsByMcnId,
        alreadyHaveRuleAccountIds
      }
      Modal.confirm({
        content: <NotExistModalContent {...notExistModalContentProps} />,
        onOk() {
          onCancel();
          updateAccountList(accountList);
        }
      });
    }

    props.getAccountInfoByIds({ mcnId, accountIds: _selectedIds.join(",") }).then((data) => {
      notExist(data);
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
