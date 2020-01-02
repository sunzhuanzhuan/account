
//折扣配置
export const Rule_Discount_Ratio = 1;
export const Rule_Discount_Numeric = 2;

export const ruleDiscount = [
    { label: '固定比例', value: Rule_Discount_Ratio },
    { label: '固定扣减', value: Rule_Discount_Numeric },
]

//返点配置
/**
 * Rule_Rebate_Ratio 固定比例
 */
export const Rule_Rebate_Ratio = 1;
/**固定扣减 */
export const Rule_Rebate_Numeric = 2;
/**阶梯比例 */
export const Rule_Rebate_LadderRatio = 3;
export const ruleRebate = [
    { label: '固定比例', value: Rule_Rebate_Ratio },
    { label: '固定扣减', value: Rule_Rebate_Numeric },
    { label: '阶梯比例', value: Rule_Rebate_LadderRatio },
]
export const platformListOptions = [
    { id: 1, name: '新浪微博' },
    { id: 2, name: '微信' },
    { id: 3, name: '秒拍' },
    { id: 4, name: '美拍' },
    { id: 5, name: '今日头条' },
    { id: 6, name: '小红书' }
];

export const Boolean_MAP = {
    TRUE: 1,
    FALSE: 2
}

export const transBool = (value) => {
    return value == 1 ? true : false
}

export const POLICYSTATUS = {
    "-1": "未添加",
    1: "待开始",
    2: "进行中",
    3: "已过期",
    4: "已停用",
}