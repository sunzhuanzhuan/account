import React from "react"
import { Badge, Tooltip, Icon, Form, DatePicker, Radio, Input } from 'antd'
import CommonTitle from "../components/CommonTitle";
import PolicyRulesComp from "../components/PolicyRulesWrapper";
import WhiteList from "../components/WhiteList";

import './PolicyManage.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class PolicyManage extends React.Component {
	constructor(props) {
		super(props)
		this.rateOption = [
			{ label: '未知', value: 0 },
			{ label: '月', value: 1 },
			{ label: '季', value: 2 },
			{ label: '半年', value: 3 },
			{ label: '年', value: 4 },
		];
	}

	render() {
		const { form } = this.props;
		const { getFieldDecorator } = form;
		const formItemLayout = {
            labelCol: {span: 2},
            wrapperCol: {span: 22},
        };

		return (
			<div className='policyWrapper'>
				<div className='policyHeader'><Icon type="left-circle" />新增政策</div>
				<Form>
					<FormItem label='主账号名称' {...formItemLayout}>
						主账号名称
					</FormItem>
					<FormItem label="政策有效期"  {...formItemLayout}>
						{getFieldDecorator('policyTime', {
							rules: [{
								required: true,
								message: '请添加政策有效期',
							}],
						})(
							<RangePicker />
						)}
					</FormItem>
					<FormItem label="返点结算频次"  {...formItemLayout}>
						{getFieldDecorator('settleRate', {
							initialValue: 0
						})(
							<RadioGroup options={this.rateOption}/>
						)}
					</FormItem>
					<CommonTitle title='全局账号设置'/>
					<FormItem label='政策规则' {...formItemLayout}>
						<PolicyRulesComp />
					</FormItem>
					<CommonTitle title='特殊账号设置'/>
					<FormItem label='政策规则' {...formItemLayout}>
						<PolicyRulesComp />
					</FormItem>
					<CommonTitle title='白名单'/>
					<WhiteList />
					<FormItem label="备注"  {...formItemLayout}>
						{getFieldDecorator('remarks')(
							<TextArea className='remarksText' />
						)}
					</FormItem>
				</Form>
			</div>
		)
	}
}



export default Form.create()(PolicyManage);
