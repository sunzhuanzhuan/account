import React, {} from 'react';
import * as commonActions from '@/actions';
import { bindActionCreators } from "redux";
import actions from "../actions";
import { connect } from "react-redux";
import { Alert, Button, Checkbox, Form, Pagination, Tabs } from "antd";

import PolicyAllFilterForm from "../components/PolicyAllFilterForm";
import PolicyCard from "../components/PolicyCard";
import './PolicyAll.less'
import { policyStatusMap } from "@/policyManage/base/PolicyStatus";
import PolicyAccountModal from "@/policyManage/components/PolicyAccountModal";

const { TabPane } = Tabs;


const PolicyAll = (props) => {
  return (
    <div>
      <PolicyAllFilterForm actions={props.actions} />
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span>全部 <b>100</b></span>} key="0">
        </TabPane>
        {
          Object.entries(policyStatusMap).map(([key, { text }]) => <TabPane tab={text} key={key} />)
        }
      </Tabs>
      <Alert message={<div>
        <span>
          政策数：400
        </span>
        <span>
          预约执行金额（元）：7000.00万
        </span>
        <span>
          预约执行订单数量：80024
        </span>
        <span>
          派单执行金额（元）：30.00万
        </span>
        <span>
          预约执行订单数量：20025
        </span>
      </div>} />
      <Checkbox>全选</Checkbox> <Button style={{ margin: 10 }} type="primary" ghost>批量下载政策</Button>
      <PolicyCard />
      <Pagination
        style={{ float: 'right' }}
        showSizeChanger
        defaultCurrent={3}
        total={500}
      />
      <PolicyAccountModal/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  common: state.commonReducers,
  taskPoolData: state.pricePolicyReducer
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...commonActions,
    ...actions
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(PolicyAll))
