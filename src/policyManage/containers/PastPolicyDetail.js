import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Icon } from 'antd';

import moment from 'moment';
import actions from '../actions';
import './PolicyManage.less';
import qs from 'qs';
import { ModuleHeader } from '@/components/ModuleHeader';
import WhiteList from '../components/WhiteList';
import RuleModule from '../components/RuleModule'
import PageInfo from "../components/PageInfo";

import { transBool, REBATE_SETTLEMENT_CYCLE } from '../constants/dataConfig'
import { Link } from "react-router-dom";

const FormItem = Form.Item;

class PolicyManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stopModal: false,
      showEditRuleModal: false,
      token: ''
    }
    const search = this.props.location.search.substring(1);
    this.mcnId = qs.parse(search)['userId'];
    this.id = qs.parse(search)['id'];
    this.policyPeriodIdentity = qs.parse(search)['policyPeriodIdentity'] || 1
  }

  componentDidMount() {
    this._getPolicyInfoById();
  }
  _getPolicyInfoById = () => {
    const { id } = this;
    this.props.getPolicyInfoById({ id });
  }

  onMenuClick = ({ key }) => {
    if (key == 3) {
      this.props.history.push('/account/policyList')
      return false;
    }
    this.props.history.push(`/account/policy?userId=${this.mcnId}&policyPeriodIdentity=${key}`);
  }

  render() {
    const { mcnId } = this;
    const { form, pastPolicyDetail = {} } = this.props;
    const { policyStatus, identityName,
      validStartTime, validEndTime,
      globalAccountRules = [], specialAccountRules = [], whiteList = [],
      id, policyStopReason, modifiedByName, modifiedAt
    } = pastPolicyDetail;
    const isGuaranteedBool = transBool(pastPolicyDetail.isGuaranteed);
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    };
    return <>
      <h2>    <Link to={`/account/policyList?userId=${this.mcnId}`}>往期政策<Icon type="left" /></Link>往期政策详情</h2>
      <div key='policyWrapper' className='policyWrapper'>
        <PageInfo policyId={id} status={policyStatus} stopReason={policyStopReason} editor={modifiedByName} editTime={moment(modifiedAt).format('YYYY-MM-DD HH:mm:ss')} />
        <Form>
          <FormItem label='主账号名称' {...formItemLayout}>
            {identityName}
          </FormItem>
          <FormItem label="政策有效期"  {...formItemLayout}>
            {validStartTime} ~ {validEndTime}
          </FormItem>

          <ModuleHeader title="全局账号设置"></ModuleHeader>
          <RuleModule
            disable={true}
            key='globalAccountRules'
            data={globalAccountRules}
            type='global'
            form={form}
          ></RuleModule>

          <ModuleHeader title="特殊账号设置"></ModuleHeader>

          <RuleModule
            disable={true}
            key='specialAccountRules'
            data={specialAccountRules}
            type='special'
            form={form}
          ></RuleModule>

          <ModuleHeader title="白名单"></ModuleHeader>
          <WhiteList
            disable={true}
            mcnId={mcnId}
            key={whiteList.length}
            whiteList={whiteList}
          ></WhiteList>

          <FormItem label="备注"  {...formItemLayout}>
            {pastPolicyDetail.remark}
          </FormItem>
        </Form>
      </div >
    </>
  }
}

const mapStateToProps = (state) => {
  const { pricePolicyReducer = {} } = state;
  return pricePolicyReducer;
}

const mapDispatchToProps = (dispatch) => (

  bindActionCreators({
    ...actions
  }, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(PolicyManage))

