import React, { useEffect, useRef, useState } from 'react';
import * as commonActions from '@/actions';
import { bindActionCreators } from "redux";
import actions from "../actions";
import { connect } from "react-redux";
import {
  Alert,
  Button,
  Checkbox,
  Form,
  Pagination,
  Tabs,
  Spin,
  message,
  PageHeader,
  Input,
  DatePicker, Select, Radio, Col
} from "antd";

import { policyStatusMap } from "@/policyManage/base/PolicyStatus";
import OwnerInfos from "@/policyManage/components/OwnerInfos";
import moment from "moment";
import { POLICY_LEVEL } from "@/policyManage/constants/dataConfig";
import IconFont from "@/base/IconFont";
import Global from "@/policyManage/components/ruleFieldFormItem/Global";


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { RangePicker } = DatePicker;


const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 }
};


const PolicyCreate = (props) => {


  useEffect(() => {

  }, [])

  const { getFieldDecorator, getFieldValue } = props.form;

  return (
    <div className="policy-manage-create-container">
      <PageHeader
        onBack={() => {
          console.log('-----');
        }}
        title="添加政策"
        subTitle="This is a subtitle"
      />
      <Form {...formItemLayout}>
        <FormItem label='主账号名称'>
          2222
        </FormItem>
        <FormItem label='主账号ID'>
          2222
        </FormItem>
        <FormItem label='政策名称'>
          {getFieldDecorator('policyStopReason', {
            rules: [
              { required: true, message: ' ' }
            ]
          })(
            <Input placeholder='请输入' style={{width: 330}}/>
          )}
        </FormItem>
        <FormItem label="政策有效期">
          {getFieldDecorator('policyTime', {
            rules: [
              { type: 'array', required: true, message: '请添加政策有效期' }
            ],
            initialValue: []
          })(
            <RangePicker />
          )}
        </FormItem>
        <FormItem label="政策级别"  {...formItemLayout}>
          {getFieldDecorator('policyLevel', {
            rules: [ { required: true, message: '该项为必填项，请选择!' } ],
            initialValue: undefined
          })(
            <RadioGroup>
              {
                Object.entries(POLICY_LEVEL).map(([ key, item ]) =>
                  <Radio key={key} value={parseInt(key)}>
                    <IconFont type={item.icon} /> {item.text}
                  </Radio>)
              }
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label='平台'>
          <Col span={20}>
            {getFieldDecorator(`platformIds`, {
              initialValue: [],
              rules: [
                { required: true, message: '请选择平台' }
              ]
            })(
              <Select mode="multiple" placeholder="请选择平台">
                {[].map(item =>
                  <Option
                    disabled={false}
                    key={item.id}
                    value={item.id}
                  >{item.platformName}</Option>)
                }
              </Select>
            )}
          </Col>
          <Col offset={1} span={3}>
            <Checkbox>全选</Checkbox>
          </Col>
        </FormItem>
        <FormItem label='设置全局规则'>
          <Global form={props.form}/>
        </FormItem>
      </Form>
      <FormItem className="policy-manage-create-container-footer">
        <Button type="primary">添加政策</Button>
      </FormItem>
    </div>
  );
};

const mapStateToProps = (state) => ({
  common: state.commonReducers
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...commonActions,
    ...actions
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(PolicyCreate))
