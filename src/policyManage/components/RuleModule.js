import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Tag, Modal, Checkbox } from 'antd'
import { ModuleHeader } from '@/components/ModuleHeader';
import RuleCard from './RuleCard'

const platformList = [
    { id: 1, name: '新浪微博' },
    { id: 2, name: '微信' },
    { id: 3, name: '秒拍' },
    { id: 4, name: '美拍' },
    { id: 5, name: '今日头条' },
    { id: 6, name: '小红书' }

]

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
const PlatformModal = (props) => {
    let _checkedValues;

    const { visible, setVisible, platformList, defaultCheckedList, setDefaultCheckedList } = props;
    const [checkedList, setCheckedList] = useState(() => defaultCheckedList);

    const allChecked = checkedList.length == platformList.length;
    console.log("defaultCheckedList3", defaultCheckedList, checkedList)

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


export const Platform = (props) => {
    const { addPlatform, platformList, defaultCheckedList = [1, 2], setDefaultCheckedList } = props;
    const platformListMap = platformList.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
    }, {})
    const onClose = (e) => {
        console.log(e, "onclose")
        const checkeList = defaultCheckedList.filter(item => item !== e);
        console.log("defaultCheckedList1", checkeList)
        setDefaultCheckedList(checkeList);
    }
    return <Row className='platform-wrap'>
        <Col>平台：</Col>
        <Col>
            {defaultCheckedList.map(item => <Tag closable onClose={() => onClose(item)} key={item}>{platformListMap[item].name}</Tag>)}
            <Button onClick={addPlatform}>+</Button>
        </Col>
    </Row>
}



export default (props) => {
    const [visible, setVisible] = useState(false);
    const [defaultCheckedList, setDefaultCheckedList] = useState([1, 2])
    console.log("defaultCheckedList2", defaultCheckedList)
    return <div>
        <ModuleHeader title="全局账号设置"></ModuleHeader>
        <RuleCard title='规则1'>
            <Platform
                platformList={platformList}
                defaultCheckedList={defaultCheckedList}
                addPlatform={() => setVisible(true)}
                setDefaultCheckedList={setDefaultCheckedList}
            ></Platform>
            <PlatformModal
                visible={visible}
                setVisible={setVisible}
                defaultCheckedList={defaultCheckedList}
                platformList={platformList}
                setDefaultCheckedList={setDefaultCheckedList}
            ></PlatformModal>
        </RuleCard>
    </div>
}