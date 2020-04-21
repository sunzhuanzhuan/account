/**
 * Created by lzb on 2020-04-17.
 */
import React, { useState } from 'react';
import { DiscountEdit } from '../RuleModules/Discount'
import { RebateEdit } from '../RuleModules/Rebate'


const Global = (props) => {

  return (
    <div>
      折扣与返点至少填一项
      <DiscountEdit form={props.form} rule={{}} fieldKeyPrefix="globalAccountRule."/>
      <RebateEdit form={props.form} rule={{}} fieldKeyPrefix="globalAccountRule."/>
    </div>
  );
};

export default Global;
