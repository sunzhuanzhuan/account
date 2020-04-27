/**
 * Created by lzb on 2020-04-23.
 */
import React, { forwardRef, useEffect, useState } from 'react';
import {
  ConfigProvider,
  Descriptions,
  Modal, Popover,
} from "antd";
import {
  POLICY_LEVEL,
} from "../constants/dataConfig";
import IconFont from "@/base/IconFont";
import { SpecialRuleView } from "./RuleModules/SpecialRules";
import { SettlementView } from "./RuleModules/Settlement";
import PolicyStatus from "@/policyManage/base/PolicyStatus";
import { ruleDisplay } from "@/policyManage/utils";
import AccountListTable from "@/policyManage/components/AccountListTable";
import Global from "@/policyManage/components/accountModalList/Global";




const PolicyViewDetails = forwardRef((props) => {

  const [ globalAccountList, setGlobalAccountList ] = useState({})
  const [ modal, setModal ] = useState()

  const { data } = props;
  const { globalAccountRule = {}, specialAccountRules = [], whiteList = {} } = data

  useEffect(() => {
    props.actions.getPlatformListByPolicy({ policyId: data.id })
    getGlobalAccountListAsync({
      page: {
        currentPage: 1,
        pageSize: 20
      },
      form: {
        policyId: data.id
      }
    })
  }, [])

  //获取全局数据
  const getGlobalAccountListAsync = (params) => {
    props.actions.getGlobalAccountList(params).then(({data}) => {
      setGlobalAccountList(data || {})
    })
  }

  const {
    discountRuleLabel,
    discountRuleValue,
    rebateRuleLabel,
    rebateRuleValue
  } = ruleDisplay(globalAccountRule)

  return (
    <div className="policy-manage-details-container-scroll" id="scroll-box">
      <ConfigProvider getPopupContainer={() => document.getElementById('scroll-box')}>
        <Descriptions column={2}>
          <Descriptions.Item label="主账号名称">
            {data.identityName || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="主账号ID">{data.mcnId}</Descriptions.Item>
          <Descriptions.Item label="政策名称">{data.policyName}</Descriptions.Item>
          <Descriptions.Item label="政策ID">{data.id}</Descriptions.Item>
          <Descriptions.Item label="政策有效期">
            {data.validStartTime}-{data.validEndTime}
          </Descriptions.Item>
          <Descriptions.Item label="政策状态">
            <PolicyStatus status={data.policyStatus} reason={data.policyStopReason} />
          </Descriptions.Item>
          <Descriptions.Item label="政策级别" span={2}>
            <Popover content={
              Object.values(POLICY_LEVEL).map(item => <div key={item.icon}>
                <IconFont type={item.icon} /> {item.text}<br />
              </div>)
            }>
              <IconFont type={POLICY_LEVEL[data.policyLevel].icon} />
            </Popover>
          </Descriptions.Item>
          <Descriptions.Item label="平台" span={2}>
            {
              (globalAccountRule.platformList || []).map(p => p.platformName).join(',')
            }
          </Descriptions.Item>
          <Descriptions.Item label="全局规则" span={2}>
            {
              discountRuleLabel && <>
                <span>{discountRuleLabel}</span><span>{discountRuleValue}</span>；
              </>
            }
            <span>{rebateRuleLabel}</span><span>{rebateRuleValue}</span>
          </Descriptions.Item>
          <Descriptions.Item label="全局账号" span={2}>
            <a onClick={setModal}>{globalAccountRule.globalAccountCount || 0}</a> 个
          </Descriptions.Item>
          <Descriptions.Item label="特殊账号" span={2} className="descriptions-item-block">
            <SpecialRuleView rules={specialAccountRules}/>
          </Descriptions.Item>
          <Descriptions.Item label="白名单账号" span={2} className="descriptions-item-block">
            <div style={{marginRight: 20}}>
              <p>共 {whiteList.whiteListCount || 0} 个账号</p>
              <AccountListTable dataSource={whiteList.accountList} />
            </div>
          </Descriptions.Item>
          {
            data.rebateSettlementCycle && <Descriptions.Item label="返点规则" span={2} className="descriptions-item-block">
              <SettlementView data={data} />
            </Descriptions.Item>
          }
        </Descriptions>
      </ConfigProvider>
      <Modal
        visible={!!modal}
        title="全局账号"
        footer={null}
        width={1000}
        destroyOnClose={true}
        bodyStyle={{ padding: "8px 13px" }}
        onCancel={() => setModal(false)}
      >
        <Global
          list={globalAccountList.accountList}
          actionSearch={getGlobalAccountListAsync}
          record={{ id: data.id }}
          platformListByPolicy={props.platformListByPolicy}
        />
      </Modal>
    </div>
  );
});

export default PolicyViewDetails;
