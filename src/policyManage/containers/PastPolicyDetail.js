import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Menu, Button, Icon } from 'antd';
import request from '@/api'

import actions from '../actions';
import './PolicyManage.less';
import qs from 'qs';
import { ModuleHeader } from '@/components/ModuleHeader';
import WhiteList from '../components/WhiteList';
import RuleModule from '../components/RuleModule'

import { transBool, POLICYSTATUS, REBATE_SETTLEMENT_CYCLE } from '../constants/dataConfig'
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
    // this.props.getNewBPlatforms({ version: '1.1' });
    // this.getToken().then(token => {
    //   this.setState({ token: token })
    // })
  }
  _getPolicyInfoById = () => {
    // const { policyInfo = {} } = this.props;
    const { id } = this;
    // const { mcnId, policyPeriodIdentity } = this;
    this.props.getPolicyInfoById({ id });
  }
  //上传获取token接口请求
  // getToken = () => {
  //   return request.get('/toolbox-gateway/file/v1/getToken').then(({ data }) => {
  //     return data
  //   })
  // }

  onMenuClick = ({ key }) => {
    if (key == 3) {
      this.props.history.push('/account/policyList')
      return false;
    }
    this.props.history.replace(`/account/policy?userId=${this.mcnId}&policyPeriodIdentity=${key}`);
    window.location.reload();
  }

  render() {
    const { mcnId } = this;
    const { form, pastPolicyDetail = {}, progress, newBPlatforms } = this.props;


    const { policyStatus, identityName,
      validStartTime, validEndTime,
      globalAccountRules = [], specialAccountRules = [], whiteList = [],
      nextPolicyStatus
    } = pastPolicyDetail;

    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    };
    return <>
      <h2>    <Link to={`/account/policyList?userId=${this.mcnId}`}>往期政策<Icon type="left" /></Link>往期政策详情</h2>
      <div key='policyWrapper' className='policyWrapper'>
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

          <ModuleHeader title="返点规则"></ModuleHeader>
          <FormItem label='返点结算周期' {...formItemLayout}>
            {
              REBATE_SETTLEMENT_CYCLE[pastPolicyDetail.rebateSettlementCycle]
            }

          </FormItem>
          <FormItem label='阶梯返点结算' {...formItemLayout}>
            {pastPolicyDetail.stepRebateSettlementType == 1 ? '阶梯收入计算' : '全量收入计算'}
            <cite className='eg-explain'>例：0-100返点3%，100及以上返点5%，博主总收入150<br />
              阶梯收入计算=（100*3%）+（50*5%）<br />
              全量收入计算=150*5%
							</cite>
          </FormItem>
          <FormItem label='保底政策' {...formItemLayout}>
            {transBool(pastPolicyDetail.isGuaranteed) ? '开' : '关'}
          </FormItem>
          <FormItem label='保底金额' {...formItemLayout}>
            {pastPolicyDetail.guaranteedMinAmount}元
            </FormItem>
          <FormItem label='保底备注' {...formItemLayout}>
            {pastPolicyDetail.guaranteedRemark}
          </FormItem>
          <Form.Item label='合同附件' {...formItemLayout}>
            <a href={pastPolicyDetail.contractFileUrl}>{pastPolicyDetail.contractFileName}</a>
          </Form.Item>
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
  // const { policyInfo, newBPlatforms, newPolicyId, progress, errorMsg, msg, id } = pricePolicyReducer;

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

