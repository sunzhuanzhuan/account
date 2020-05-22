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
    props.actions.getPlatformListByPolicy({ policyId: record.id })
  }, [record.id])
  useEffect(() => {
    handleTabChange(active)
    searchAsync(active)
  }, [active])

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

  };
  const searchAsync = (key) => {
    setLoading(true)
    if (key === 'global') {
      getGlobalAccountListAsync(defaultParams)
    }
    if (key === 'specific') {
      getSpecialAccountListAsync(defaultParams)
    }
    if (key === 'whiteList') {
      getWhiteListAccountListAsync(defaultParams)
    }
    setLoading(false)
  }

  //获取全局数据
  const getGlobalAccountListAsync = async (params) => {
    const { data } = await props.actions.getGlobalAccountList(params)
    setData(data || {})
  }
  //获取特殊数据
  const getSpecialAccountListAsync = async (params) => {
    const { data = {} } = await props.actions.getSpecialAccountList(params)
    setData(data)
  }
  //获取白名单数据
  const getWhiteListAccountListAsync = async (params) => {
    const { data = {} } = await props.actions.getWhiteListAccountList(params)
    setData(data)
  }
  const { rule = {},settlement={}, accountList = {}, ruleList = [] } = data
  const {
    discountRuleLabel,
    discountRuleValue,
    rebateRuleLabel,
    rebateRuleValue
  } = ruleDisplay(rule)
  const { cycle, type, guarantee } = settlementDisplay(settlement)
  const commonProps = {
    record,
    platformListByPolicy: props.platformListByPolicy
  }
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
      <Tabs activeKey={active} onChange={handleTabChange} animated={false}>
        <TabPane tab={<span>全局账号 <b>{record.globalAccountCount}</b></span>} key="global">
          <ul className="policy-account-modal-rules-container">
            {/* 使用 ruleDisplay 方法获取值 */}
            <li>
              全局规则： <span>{discountRuleLabel}</span><span>{discountRuleValue}</span>
              {discountRuleLabel && rebateRuleLabel ? <span>；</span> : null}
              <span>{rebateRuleLabel}</span><span>{rebateRuleValue}</span>
            </li>
            {cycle && <li>
              返点规则：{cycle} {type} 返点金额{guarantee}
            </li>}
          </ul>
          <Global list={accountList} actionSearch={getGlobalAccountListAsync}  {...commonProps} />
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
              return <li key={index}>
                规则{role.ruleId}（{role.accountNumber}个号）<span>{discountRuleLabel}</span><span>{discountRuleValue}</span>
               ； <span>{rebateRuleLabel}</span> <span>{rebateRuleValue}</span>
              </li>
            })}
          </ul>
          <Global key="specific" isRuleId={true} list={accountList} actionSearch={getSpecialAccountListAsync}  {...commonProps} ruleList={ruleList} />
        </TabPane>
        <TabPane tab={<span>白名单 <b>{record.whiteListCount}</b></span>} key="whiteList">
          <Global list={data} actionSearch={getWhiteListAccountListAsync}{...commonProps} key="whiteList" />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default PolicyAccountModal;
