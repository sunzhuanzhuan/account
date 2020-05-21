/**
 * Created by lzb on 2020-03-10.
 */
import React from 'react';
import moment from 'moment';
import numeral from 'numeral'
import { Popover } from "antd";
import { REBATE_SETTLEMENT_CYCLE } from "@/policyManage/constants/dataConfig";

/**
 * 处理moment 或者 [moment,...] 为 'YYYY-MM-DD HH:mm:ss'
 */
export function moment2dateStr(datetime) {
  if (!datetime) return datetime;
  if (Array.isArray(datetime)) {
    return datetime.map(m => {
      return moment2dateStr(m);
    });
  }
  if (moment(datetime).isValid()) {
    return moment(datetime).format('YYYY-MM-DD HH:mm:ss');
  }
  return datetime;
}
/**
 * 处理批量查询
 */
export function batchText2Array(batchText, notNumber) {
  // /\s+|,|，/g
  if (!batchText) return batchText;
  if (typeof batchText === 'string') {
    let filterFn;
    if (notNumber) {
      filterFn = Boolean
    } else {
      filterFn = (id) => /^\d+$/.test(id)
    }
    return batchText.trim().split(/\s+/g).filter(filterFn)
  }
  return batchText;
}
/**
 * 时间格式化
 */
export const dateFormat = (date, format = "YYYY-MM-DD HH:mm:ss") => {
  if (!date || date === '1970-01-01 08:00:00') {
    return ''
  }
  return moment(date).format(format)
}

/**
 * 时间展示态
 */
export const dateDisplay = (date, len = 16) => {
  if(date === '1970-01-01 08:00:00'){
    return  ''
  }
  return date ? date.slice(0, len) : ''
}

/**
 * 政策规则展示
 * @param data
 * @returns {{rebateRuleLabel: string, rebateRuleValue: string, discountRuleLabel: string, discountRuleValue: string}}
 */
export const ruleDisplay = (data) => {
  const { discountRule = {}, rebateRule = {} } = data

  const {
    discountRuleLabel,
    discountRuleValue,
  } = discountRuleDisplay(discountRule)

  const {
    rebateRuleLabel,
    rebateRuleValue
  } = rebateRuleDisplay(rebateRule)


  return {
    discountRuleLabel,
    discountRuleValue,
    rebateRuleLabel,
    rebateRuleValue
  }
}

export const discountRuleDisplay = (discountRule = {}) => {
  let discountRuleLabel = "", discountRuleValue = ""

  if (discountRule.discountType === 1) {
    discountRuleLabel = "折扣-固定比例"
    discountRuleValue = numeral(discountRule.discountFixedRatio).format('0%')
  }
  if (discountRule.discountType === 2) {
    discountRuleLabel = "折扣-固定扣减"
    discountRuleValue = discountRule.discountFixedAmount + "元"
  }

  return {
    discountRuleLabel,
    discountRuleValue,
  }
}

export const rebateRuleDisplay = (rebateRule = {}) => {
  let rebateRuleLabel = "", rebateRuleValue = ""

  if (rebateRule.rebateType === 1) {
    rebateRuleLabel = "返点-固定比例"
    rebateRuleValue = numeral(rebateRule.rebateFixedRatio).format('0%')
  }
  if (rebateRule.rebateType === 2) {
    rebateRuleLabel = "返点-固定扣减"
    rebateRuleValue = rebateRule.rebateFixedAmount + "元"
  }
  if (rebateRule.rebateType === 3) {
    rebateRuleLabel = "返点-阶梯比例"
    rebateRuleValue = <Popover title={rebateRuleLabel} content={
      rebateRule.rebateStepRules.map(item => <div key={item.amountLowLimit}>
        大于{item.amountLowLimit} 且小于等于{item.amountHighLimit}， 比例{numeral(item.rebateRatio).format('0%')}<br />
      </div>)
    }>
      <a style={{marginLeft: 6}}>查看</a>
    </Popover>
  }

  return {
    rebateRuleLabel,
    rebateRuleValue
  }
}


/**
 * 结算规则展示
 * @param data
 * @returns {{guarantee: string, type: string, cycle: string}}
 */
export const settlementDisplay = (data = {}) => {
  let cycle = "", type = "", guarantee = ""

  cycle = data.rebateSettlementCycle > 0 ? `${REBATE_SETTLEMENT_CYCLE[data.rebateSettlementCycle] || '-'}结` : ""
  if (data.stepRebateSettlementType === 1) {
    type = "阶梯收入计算"
  }
  if (data.stepRebateSettlementType === 2) {
    type = "全量收入计算"
  }
  if (data.isGuaranteed === 1) {
    guarantee = data.guaranteedMinAmount + "元"
  }

  return {
    cycle,
    type,
    guarantee
  }
}
