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
    const { onButtonClick, accountList = [] } = props;
    // const { getFieldDecorator } = props.form;
    const { defaultCheckedList = [1, 2], setDefaultCheckedList } = props;

    const onClose = (e) => {
        const checkeList = defaultCheckedList.filter(item => item !== e);
        setDefaultCheckedList(checkeList);
    }
    return <>
        <Form.Item label="账号" {...formItemLayout}>
            <Button onClick={onButtonClick}>添加账号</Button>
        </Form.Item>
        <AccountView accountList={accountList} labelName=' '></AccountView>
    </>
}

export const AccountView = (props) => {
    const { accountList = [] } = props;
    const { labelName = '账号' } = props;
    const columns = [
        {
            title: 'account_id',
            dataIndex: 'accountId',
            key: 'accountId',
        },
        {
            title: '平台',
            dataIndex: 'platformName',
            key: 'platformName',
        },
        {
            title: '账号名称',
            dataIndex: 'snsName',
            key: 'snsName',
        },
        {
            title: '账号ID',
            dataIndex: 'snsId',
            key: 'snsId',
        },
        {
            title: '粉丝数',
            dataIndex: 'followerCount',
            key: 'followerCount',
        },
    ]
    return <Form.Item label={labelName} {...formItemLayout}>
        <p>已选择{accountList.length}个账号</p>
        <AccountListTable dataSource={accountList} columns={columns} />
    </Form.Item>
}