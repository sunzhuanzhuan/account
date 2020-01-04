import React from 'react';
import { Card, Button, Modal } from 'antd'
const { confirm } = Modal;

export default (props) => {
  const { title, onDelBtnClick, onEditBtnClick, disable } = props;
  function showDeleteConfirm() {
    confirm({
      title: '确定删除?',
      onOk() {
        onDelBtnClick()
      },
      onCancel() {
      },
    });
  }
  const extra = !disable ? <>
    <Button onClick={() => { onEditBtnClick() }} type='primary' style={{ marginRight: 10 }}>编辑</Button>
    <Button onClick={showDeleteConfirm}>删除</Button>
  </> : null
  return <Card title={title} bordered={true} extra={extra}>
    {props.children}
  </Card>
}
