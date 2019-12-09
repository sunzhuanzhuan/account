
//折扣配置
export const Rule_Discount_Ratio = 1;
export const Rule_Discount_Numeric = 2;

export const ruleDiscount = [
    { label: '固定比例', value: Rule_Discount_Ratio },
    { label: '固定扣减', value: Rule_Discount_Numeric },
]

//返点配置
export const Rule_Rebate_Ratio = 1;
export const Rule_Rebate_Numeric = 2;
export const Rule_Rebate_LadderRatio = 3;
export const ruleRebate = [
    { label: '固定比例', value: Rule_Rebate_Ratio },
    { label: '固定扣减', value: Rule_Rebate_Numeric },
    { label: '阶梯比例', value: Rule_Rebate_LadderRatio },
]