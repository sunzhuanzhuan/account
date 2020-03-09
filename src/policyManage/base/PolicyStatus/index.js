/**
 * Created by lzb on 2020-03-09.
 */
import React, {  } from 'react';
import { Badge } from "antd";
import QuestionTip from "@/base/QuestionTip";

// 1: '待开始', 2: '进行中', 3: '已过期', 4: '已停用',
const POLICY_STATUS_INACTIVE = 1;
const POLICY_STATUS_ACTIVE = 2;
const POLICY_STATUS_EXPIRED = 3;
const POLICY_STATUS_STOP = 4;

const policyStatusMap = {
  [POLICY_STATUS_INACTIVE]: {
    status: 'default',
    text: '待开始'
  },
  [POLICY_STATUS_ACTIVE]: {
    status: 'processing',
    text: '进行中'
  },
  [POLICY_STATUS_EXPIRED]: {
    status: 'processing',
    text: '已过期'
  },
  [POLICY_STATUS_STOP]: {
    status: 'error',
    text: '已停用'
  }
}


const PolicyStatus = ({ status, reason }) => {
  const props = policyStatusMap[status]
  return (
    <>
      <Badge {...props} />
      {reason && status === 6 && <QuestionTip title="原因"/>}
    </>
  )
};

export default PolicyStatus;
