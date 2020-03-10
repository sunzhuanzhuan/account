import React, {} from 'react';
import * as commonActions from '@/actions';
import { bindActionCreators } from "redux";
import actions from "../actions";
import { connect } from "react-redux";
import { Alert, Button, Checkbox, Form, Pagination, Tabs } from "antd";

import PolicyAllFilterForm from "../components/PolicyAllFilterForm";
import PolicyCard from "../components/PolicyCard";
import './PolicyAll.less'
const { TabPane } = Tabs;


const PolicyAll = (props) => {
  return (
    <div>

      <PolicyAllFilterForm actions={props.actions}/>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Tab 1" key="1">
        </TabPane>
        <TabPane tab="Tab 2" key="2">
        </TabPane>
        <TabPane tab="Tab 3" key="3">
        </TabPane>
      </Tabs>
      <Alert message={"政策数：400        预约执行金额（元）：7000.00万        预约执行订单数量：80024           派单执行金额（元）：30.00万        预约执行订单数量：20025           "}/>
      <Checkbox>全选</Checkbox> <Button style={{margin: 10}} type="primary" ghost>批量下载政策</Button>
      <PolicyCard />
      <Pagination
        style={{float: 'right'}}
        showSizeChanger
        defaultCurrent={3}
        total={500}
      />
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
