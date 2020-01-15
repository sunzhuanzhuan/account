import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Modal, Checkbox } from 'antd'

const PlatformModalFooter = (props) => {
    const { allChecked, onCheckAllChange, onOk, onCancel } = props;
    return <div>
        <Checkbox checked={allChecked} onChange={onCheckAllChange}>
            全选
        </Checkbox>
        <Button onClick={onCancel}>取消</Button>
        <Button onClick={onOk}>确定</Button>
    </div>
}
export const PlatformModal = (props) => {
    let _checkedValues;

    const { visible, setVisible, platformList, defaultCheckedList, setDefaultCheckedList } = props;
    const [checkedList, setCheckedList] = useState(defaultCheckedList);

    const allChecked = checkedList.length == platformList.length;

    useEffect(() => {
        setCheckedList(defaultCheckedList)
    }, [defaultCheckedList])

    function onChange(checkedValues) {
        setCheckedList(checkedValues)
    }
    function onOk() {
        setVisible(false);
        setDefaultCheckedList(checkedList);
    }
    function onCheckAll(e) {
        _checkedValues = e.target.checked ? platformList.map(item => item.id) : defaultCheckedList;
        setCheckedList(_checkedValues)
    }
    function onCancel() {
        setVisible(false)
        setCheckedList(defaultCheckedList)
    }

    return <Modal
        visible={visible}
        footer={
            <PlatformModalFooter
                allChecked={allChecked}
                onCheckAllChange={onCheckAll}
                onOk={onOk}
                onCancel={onCancel}
            ></PlatformModalFooter>
        }
    >
        <Checkbox.Group value={checkedList} style={{ width: '100%' }} onChange={onChange}>
            <Row>
                {
                    platformList.map(item =>
                        <Col key={item.id} span={12}>
                            <Checkbox disabled={defaultCheckedList.indexOf(item.id) !== -1} value={item.id}>{item.name}</Checkbox>
                        </Col>)
                }
            </Row>
        </Checkbox.Group>
    </Modal>
}