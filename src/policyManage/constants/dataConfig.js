//折扣配置

export const RULE_DISCOUNT_RATIO = 1;
export const RULE_DISCOUNT_NUMERIC = 2;

export const ruleDiscount = [
  { label: '固定比例', value: RULE_DISCOUNT_RATIO },
  { label: '固定扣减', value: RULE_DISCOUNT_NUMERIC }
]

// 返点类型 - 固定比例
export const RULE_REBATE_RATIO = 1;
// 返点类型 - 固定扣减
export const RULE_REBATE_NUMERIC = 2;
// 返点类型 - 阶梯比例
export const RULE_REBATE_LADDER = 3;


export const ruleRebate = [
  { label: '固定比例', value: RULE_REBATE_RATIO },
  { label: '固定扣减', value: RULE_REBATE_NUMERIC },
  { label: '阶梯比例', value: RULE_REBATE_LADDER }
]


// 政策状态 - 1: '待开始', 2: '进行中', 3: '已过期', 4: '已停用',
export const POLICY_STATUS_INACTIVE = 1;
export const POLICY_STATUS_ACTIVE = 2;
export const POLICY_STATUS_EXPIRED = 3;
export const POLICY_STATUS_STOP = 4;

// 筛选项 - 包含规则类型列表
export const FILTER_INCLUDE_RULE_TYPES = {
  "1": "折扣固定比例",
  "2": "折扣固定扣减",
  "3": "返点固定比例",
  "4": "返点固定扣减",
  "5": "返点阶梯比例",
}

// 政策级别
export const POLICY_LEVEL = {
  "1": {
    icon: "icon-level_S",
    text: "独家（1家）"
  },
  "2": {
    icon: "icon-level_A",
    text: "小圈（≤3家）"
  },
  "3": {
    icon: "icon-level_B",
    text: "大圈（≤6家）"
  },
  "4": {
    icon: "icon-level_C",
    text: "平价（≥6家）"
  }
}
// 返点结算周期
export const REBATE_SETTLEMENT_CYCLE = {
  "1": '月', "2": '季', "3": '半年', "4": '年'
}
// 阶梯返点结算类型
export const STEP_REBATE_SETTLEMENT_TYPES = {
  "1": '阶梯收入计算', "2": '全量收入计算'
}


// 规则/账号 数量限制 TODO: 200 / 20 / 20
export const SPECIAL_ACCOUNTS_LIMIT = 10
export const SPECIAL_RULES_LIMIT = 5
export const WHITE_LIST_ACCOUNTS_LIMIT = 10
