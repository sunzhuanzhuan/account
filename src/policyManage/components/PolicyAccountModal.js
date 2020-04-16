/**
 * Created by lzb on 2020-03-09.
 */
import React, { useEffect, useState } from 'react';
import { Table, Icon, Modal, Popconfirm, Popover, Tabs, Spin } from "antd";
import Global from "@/policyManage/components/accountModalList/Global";
import { dateFormat, ruleDisplay, settlementDisplay } from "../utils";

const { TabPane } = Tabs
const data = {}


const PolicyAccountModal = (props) => {
  const [data, setData] = useState({})
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)
  const { active, record = {} } = props.modal
  useEffect(() => {
    setLoading(true)
    handleTabChange(active)
    setLoading(false)
  }, [])
  const defaultParams = {
    page: {
      currentPage: 1,
      pageSize: 20
    },
    form: {
      policyId: record.id
    }
  }

  const handleTabChange = (key) => {
    props.setModal({
      active: key,
      record
    })
    if (key === 'global') {
      getGlobalAccountList(defaultParams)
    }
    if (key === 'specific') {
      getSpecialAccountList(defaultParams)
    }
    if (key === 'whiteList') {
      getWhiteListAccountList(defaultParams)
    }
  };
  //获取全局数据
  const getGlobalAccountList = async (params) => {
    const { data } = await props.actions.getGlobalAccountList(params)
    setData(data)
  }
  //获取特殊数据
  const getSpecialAccountList = async (params) => {
    const { data } = await props.actions.getSpecialAccountList(params)
    setData(data)
  }
  //获取白名单数据
  const getWhiteListAccountList = async (params) => {
    const { data } = await props.actions.getWhiteListAccountList(params)
    setData(data)
  }
  const { rule = { discountRule: {}, rebateRule: {} }, accountList = {}, ruleList = [] } = data
  const {
    discountRuleLabel,
    discountRuleValue,
    rebateRuleLabel,
    rebateRuleValue
  } = ruleDisplay(rule)
  const { cycle } = settlementDisplay(rule.rebateRule)
  return (
    <Modal
      visible={!!active}
      title="政策包含账号"
      footer={null}
      width={1000}
      destroyOnClose={true}
      bodyStyle={{ padding: "8px 13px" }}
      onCancel={() => props.setModal({})}
    >

      <Tabs activeKey={active} onChange={handleTabChange}>
        <TabPane tab={<span>全局账号 <b>{record.globalAccountCount}</b></span>} key="global">
          <ul className="policy-account-modal-rules-container">
            {/* 使用 ruleDisplay 方法获取值 */}
            <li>
              全局规则： <span>{discountRuleLabel}</span><span>{discountRuleValue}</span>
              ；<span>{rebateRuleLabel}</span><span>{rebateRuleValue}</span>
            </li>
            <li>
              返点规则：{cycle}
            </li>
          </ul>
          <Global list={accountList} actionSearch={getGlobalAccountList} record={record} />
        </TabPane>
        <TabPane tab={<span>特殊账号 <b>{record.specialAccountCount}</b></span>} key="specific">
          <ul className="policy-account-modal-rules-container">
            {ruleList.map((role, index) => {
              const {
                discountRuleLabel,
                discountRuleValue,
                rebateRuleLabel,
                rebateRuleValue
              } = ruleDisplay(role)
              const { cycle } = settlementDisplay(role.rebateRule)
              return <li key={index}>
                规则{role.ruleId}（{role.accountNumber}个号）<span>{discountRuleLabel}</span><span>{discountRuleValue}</span>
               ； <span>{rebateRuleLabel}</span> <span>{rebateRuleValue}</span>（{cycle}）
              </li>
            })}
          </ul>
          <Global key="specific" isRuleId={true} list={accountList} actionSearch={getSpecialAccountList} record={record} ruleList={ruleList} />
        </TabPane>
        <TabPane tab={<span>白名单 <b>{record.whiteListCount}</b></span>} key="whiteList">
          <Global list={data} actionSearch={getWhiteListAccountList} record={record} key="whiteList" />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default PolicyAccountModal;
