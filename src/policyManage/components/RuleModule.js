import React from 'react';

import RuleCard from './RuleCard'
import { PlatformView } from '../components/RuleModules/Platform'
import { AccountView } from '../components/RuleModules/Account'
import { DiscountView } from '../components/RuleModules/Discount'
import { RebateView } from '../components/RuleModules/Rebate'
import './RuleModule.less'
const RuleModule = (props) => {
  const { type, data = [], editRule, delRule, disable } = props;
  return <div>
    {
      data.map(item => <RuleCard
        disable={disable}
        key={item.ruleId}
        title={`规则ID: ${item.ruleId}`}
        onDelBtnClick={() => delRule(type, item.ruleId)}
        onEditBtnClick={() => editRule(type, item.ruleId)}
      >
        {type == 'global' ? <PlatformView data={item.platformList}></PlatformView> :
          <AccountView accountList={item.accountList} ></AccountView>
        }
        {item.discountRule && <DiscountView data={item.discountRule}></DiscountView>}
        {item.rebateRule && <RebateView data={item.rebateRule}></RebateView>}
      </RuleCard>)
    }
  </div>
}

export default RuleModule
