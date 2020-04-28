/**
 * Created by lzb on 2020-03-09.
 */
import React, { useState } from 'react';
import { Checkbox, Icon, message, Popconfirm, Popover, Spin } from "antd";

import './PolicyCard.less'
import PolicyStatus from "../base/PolicyStatus";
import Yuan from "@/base/Yuan";
import IconFont from "@/base/IconFont";
import {
  POLICY_LEVEL,
  REBATE_SETTLEMENT_CYCLE,
  POLICY_STATUS_ACTIVE,
  POLICY_STATUS_INACTIVE,
  POLICY_STATUS_STOP
} from "@/policyManage/constants/dataConfig";
import { dateFormat } from "@/policyManage/utils";
import StopReasonModal from "@/policyManage/components/StopReasonModal";
import { id } from "@/accountManage/reducer/account";


const CardRule = props => {

  let discountText = ""
  if (props.discountRule.discountType === 1) {
    discountText = "固定比例" + props.discountRule.discountFixedRatio * 100 + "%"
  }
  if (props.discountRule.discountType === 2) {
    discountText = "固定扣减" + props.discountRule.discountFixedAmount + "元"
  }

  let rebateText = "", more = false
  if (props.rebateRule.rebateType === 1) {
    rebateText = "固定比例" + props.rebateRule.rebateFixedRatio * 100 + "%"
  }
  if (props.rebateRule.rebateType === 2) {
    rebateText = "固定扣减" + props.rebateRule.rebateFixedAmount + "元"
  }
  if (props.rebateRule.rebateType === 3) {
    rebateText = "阶梯比例"
    more = true
  }
  if (props.isGlobal) {
    rebateText += `（${REBATE_SETTLEMENT_CYCLE[props.rebateRule.rebateSettlementCycle]}结）`
  }

  return <li className='rule'>
    规则{props.index + 1}：<br />
    折扣{discountText}<br />
    返点{rebateText}<br />
    {more && <Popover title={rebateText} content={
      props.rebateRule.rebateStepRules.map(item => <div key={item.amountLowLimit}>
        大于{item.amountLowLimit} 且小于等于{item.amountHighLimit}， 比例{item.rebateRatio * 100}%<br />
      </div>)
    }>
      <a>查看</a>
    </Popover>}
  </li>
}

const PolicyCard = (props) => {
  const { data } = props

  const [ stopModal, setStopModal ] = useState(false)

  // 停用
  const stopPolicy = () => {
    setStopModal(!stopModal)
  }

  // 停用原因提交
  const stopReasonSubmit = ({ policyStopReason }) => {
    const { stopPolicy, syncUpdatePolicyStatus } = props.actions
    return stopPolicy({ id: props.data.id, policyStopReason }).then(() => {
      message.success('操作成功')
      setStopModal()
      syncUpdatePolicyStatus({
        key: props.data.id,
        policyStatus: POLICY_STATUS_STOP,
        policyStopReason
      })
    })
  }

  // 启用
  const startPolicy = () => {
    const { startPolicy, syncUpdatePolicyStatus } = props.actions
    const hide = message.loading('处理中...')
    startPolicy({ id: props.data.id }).then(() => {
      message.success('操作成功')
      hide()
      syncUpdatePolicyStatus({ key: props.data.id, policyStatus: POLICY_STATUS_ACTIVE })
    })
  }

  return (
    <div className='policy-card-container'>
      <section className='policy-card-container-prefix'>
        <Checkbox value={data.key} />
      </section>
      <section className='policy-card-container-main'>
        <header className='policy-card-container-main-header'>
          <div className="header-left">
            <PolicyStatus status={data.policyStatus} reason={data.policyStopReason} />
          </div>
          <ul className='header-center'>
            <li>政策ID：<a>{data.id}</a></li>
            <li>政策级别：<Popover content={
              Object.values(POLICY_LEVEL).map(item => <div key={item.icon}>
                <IconFont type={item.icon} /> {item.text}<br />
              </div>)
            }>
              <IconFont type={POLICY_LEVEL[data.policyLevel].icon} />
            </Popover></li>
            <li>主账号：<a>{data.identityName}</a></li>
            <li>主账号ID：<span className="text-black">{data.mcnId}</span></li>
            <li>有效期：<span className="text-black">{dateFormat(data.validStartTime, 'YYYY.M.D')} - {dateFormat(data.validEndTime, 'YYYY.M.D')}</span>
            </li>
          </ul>
          <div className='header-right'>
            {
              (data.policyStatus === POLICY_STATUS_INACTIVE ||
                data.policyStatus === POLICY_STATUS_ACTIVE) &&
              <a onClick={setStopModal}>
                <Icon type="poweroff" />
                <span>停用</span>
              </a>
            }
            {
              (data.policyStatus === POLICY_STATUS_STOP) &&
              <a onClick={startPolicy}>
                <Icon type="poweroff" />
                <span>启用</span>
              </a>
            }
            <a onClick={() => {}}>
              <Icon type="download" />
              <span>下载</span>
            </a>
          </div>
        </header>
        <ul className='policy-card-container-main-center'>
          <li className='main-item-first'>
            <div className='fields-item-'>
              预约执行订单：
              {data.executionStatisticsInfo.executionReservationOrderCount}
            </div>
            <div className='fields-item-'>
              预约执行金额：
              <Yuan className='text-red' value={data.executionStatisticsInfo.executionReservationOrderAmount} format='0,0.00' />
            </div>
            <div className='fields-item-'>
              派单执行订单：
              {data.executionStatisticsInfo.executionCampaignOrderCount}
            </div>
            <div className='fields-item-'>
              派单执行金额：
              <Yuan className='text-red' value={data.executionStatisticsInfo.executionCampaignOrderAmount} format='0,0.00' />
            </div>
          </li>
          <li className='main-item-center'>
            <p className='fields-item-'>
              全局账号：
              <a>{data.globalAccountCount}</a>
              {data.globalAccountRules.length > 2 && <a className='more-btn'>查看全部</a>}
            </p>
            <ul className='fields-item-rules'>
              {
                data.globalAccountRules.slice(0, 2).map((item, n) =>
                  <CardRule key={item.ruleId} {...item} index={n} isGlobal />
                )
              }
            </ul>
          </li>
          <li className='main-item-center'>
            <p className='fields-item-'>
              特殊账号：
              <a>{data.specialAccountCount}</a>
            </p>
            <ul className='fields-item-rules'>
              {
                data.specialAccountRules.slice(0, 2).map((item, n) =>
                  <CardRule key={item.ruleId} {...item} index={n} />
                )
              }
            </ul>
          </li>
          <li className='main-item-last'>
            <p className='fields-item-'>
              白名单：
              <a>{data.whiteListCount}</a>
            </p>
          </li>
        </ul>
        <footer className='policy-card-container-main-footer'>
          <span className='fields-item-'>资源媒介：{data.ownerAdminName}</span>
          <span className='fields-item-'>创建人：{data.createdByName}</span>
          <span className='fields-item-'>创建于：{data.createdAt}</span>
          {data.modifiedByName && <span className='fields-item-'>修改人：{data.modifiedByName}</span>}
          {data.modifiedByName && <span className='fields-item-'>修改于：{data.modifiedAt}</span>}
        </footer>
      </section>
      {stopModal ? <StopReasonModal onCancel={stopPolicy} onOk={stopReasonSubmit} /> : null}
    </div>
  );
};

export default PolicyCard;
