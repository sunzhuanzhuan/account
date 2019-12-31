import React from 'react';
import { Table, Input, Form, Select, Button } from 'antd'
import AccountListTable from '../AccountListTable'
// import {
//     ruleDiscount,
//     Rule_Discount_Ratio,
//     Rule_Discount_Numeric,

//     ruleRebate,
//     Rule_Rebate_Ratio,
//     Rule_Rebate_Numeric,
//     Rule_Rebate_LadderRatio
// } from '../../constants/dataConfig'
const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 21 },
};
// const { Option } = Select;

export const AccountEdit = (props) => {
    const { onButtonClick, accountList = [], delAccountFromList } = props;
    // const { getFieldDecorator } = props.form;
    const { defaultCheckedList = [1, 2], setDefaultCheckedList } = props;

    const onClose = (e) => {
        const checkeList = defaultCheckedList.filter(item => item !== e);
        setDefaultCheckedList(checkeList);
    }
    console.log("delAccountFromList: ", typeof delAccountFromList)
    return <>
        <Form.Item label="账号" {...formItemLayout}>
            <Button onClick={onButtonClick}>添加账号</Button>
        </Form.Item>
        <AccountView isEdit={true} accountList={accountList} delAccountFromList={delAccountFromList} labelName=' '></AccountView>
    </>
}

export const AccountView = (props) => {
    const { accountList = [], delAccountFromList, isEdit } = props;
    const { labelName = '账号' } = props;
    return <Form.Item label={labelName} {...formItemLayout}>
        <p>已选择{accountList.length}个账号</p>
        <AccountListTable isEdit={isEdit} delAccountFromList={delAccountFromList} dataSource={accountList} />
    </Form.Item>
}