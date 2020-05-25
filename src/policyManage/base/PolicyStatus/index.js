/**
 * Created by lzb on 2020-03-09.
 */
import React, {  } from 'react';
import { Badge } from "antd";
import QuestionTip from "@/base/QuestionTip";
import {
  POLICY_STATUS_ACTIVE,
  POLICY_STATUS_EXPIRED,
  POLICY_STATUS_INACTIVE, POLICY_STATUS_STOP
} from "@/policyManage/constants/dataConfig";


export const policyStatusMap = {
  [POLICY_STATUS_INACTIVE]: {
    status: 'default',
    text: '待开始',
    field: 'waitBeginCount'
  },
  [POLICY_STATUS_ACTIVE]: {
    status: 'processing',
    text: '进行中',
    field: 'persistingCount'
  },
  [POLICY_STATUS_EXPIRED]: {
    status: 'default',
    text: '已过期',
    field: 'expireCount'
  },
  [POLICY_STATUS_STOP]: {
    status: 'error',
    text: '已停用',
    field: 'stopCount'
  }
}


const PolicyStatus = ({ status, reason }) => {
  const props = policyStatusMap[status]
  return (
    <>
      <Badge {...props} />
      {reason && status === POLICY_STATUS_STOP && <QuestionTip title="原因" content={reason}/>}
    </>
  )
};

export default PolicyStatus;
