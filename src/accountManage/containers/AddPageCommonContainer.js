import React, { Component } from "react"
import AffixNav from "../components/AffixNav";
import MainAccountInfos from "../components/MainAccountInfos";
import { scroll } from "../components/ScrollWrap"
import { Form, Button } from 'antd';
import { WrapPanel } from "../components";
import { policyRuleType } from "@/accountManage/constants";

const FormItem = Form.Item;

const scrollConf = {
  scrollElementSelector: '#app-content-children-id',
  targetsSelector: '.J-scroll-follow-nav'
}
@scroll(scrollConf)
export default class AddPageCommonContainer extends Component {
  render() {
    const { data: { accountInfo, priceInfo }, submitLoading } = this.props.params
    const {
      policyId,
      ruleType,
      ruleId
    } = priceInfo;
    return <div className='account-info-container add-page'>
      <h2>
        账号入库
      {policyId ?
          <small className='policyInfo-id-display'>
            价格政策ID: <a target='_blank' href={"/account/policy?id=" + policyId}>{policyId}-{policyRuleType[ruleType]}-{ruleId}</a></small>
          : null}
      </h2>
      <div>
        <WrapPanel header='主账号信息' navId='mainAccountInfos'>
          <MainAccountInfos accountInfo={accountInfo} />
        </WrapPanel>
        {this.props.children}
      </div>
      {this.props.sidebarData.length ?
        <AffixNav current={this.props.navCurrent} dataSource={this.props.sidebarData} onToggle={this.props.toggle} /> : null}
      <FormItem>
        <p className='block-submit-button'>
          <Button
            block
            loading={submitLoading}
            type="primary"
            htmlType="submit"
            disabled={!(accountInfo.hasAddSubmit)}
          >提交</Button>
        </p>
      </FormItem>
    </div>
  }
}

