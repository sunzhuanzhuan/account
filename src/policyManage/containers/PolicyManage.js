import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button, Form, DatePicker, Spin, Input, message,
  Radio, Switch, InputNumber, Menu, Alert, Modal
} from 'antd';
import request from '@/api'
import { OssUpload } from 'wbyui'

import PageInfo from "../components/PageInfo";
import StopReasonModal from "../components/StopReasonModal";
import moment from 'moment';
import actions from '../actions';
import * as commonActions from '@/actions';
import './PolicyManage.less';
import qs from 'qs';
import { ModuleHeader } from '@/components/ModuleHeader';
import WhiteList from '../components/WhiteList';
import RuleModule from '../components/RuleModule'
import EditRuleForm from '../components/RuleModules/EditRuleForm'
import { transBool, POLICYSTATUS } from '../constants/dataConfig'
import { NotExistModalContent } from '../components'
import common from "@/reducers/common";
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
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
    this.policyPeriodIdentity = qs.parse(search)['policyPeriodIdentity'] || 1
  }

  componentDidMount() {
    this.getPolicyInfoByMcnId().then((data) => {
      const { isGuaranteed = {} } = data.data
      this.setState({ isGuaranteedStatus: transBool(isGuaranteed) })
    })
    this.props.getNewBPlatforms();
    this.getToken().then(token => {
      this.setState({ token: token })
    })
  }
  getPolicyInfoByMcnId = (props) => {
    const { policyInfo = {} } = this.props;
    const { id } = policyInfo;
    const { mcnId, policyPeriodIdentity } = this;

    return this.props.getPolicyInfoByMcnId({ mcnId, id, policyPeriodIdentity, props });
  }
  //上传获取token接口请求
  getToken = () => {
    return request.get('/toolbox-gateway/file/v1/getToken').then(({ data }) => {
      return data
    })
  }

  notExist = async (data) => {
    const { accountList, notExistAccountIds = [], notExistAccountIdsByMcnId = [], alreadyHaveRuleAccountIds } = data.data;
    const notExistModalContentProps = {
      accountList,
      notExistAccountIds,
      notExistAccountIdsByMcnId,
      alreadyHaveRuleAccountIds
    }
    return new Promise((resolve, reject) => {
      Modal.confirm({
        content: <NotExistModalContent {...notExistModalContentProps} />,
        onOk() {
          if (accountList.length != 0) {
            resolve();
          } else {
            reject();
          }
        },
        onCancel() {
          reject()
        }

      });
    })
  }
  //提交全部表单
  handleSavePolicy = () => {
    const { form, policyInfo = {} } = this.props;
    const { id } = policyInfo;
    const { mcnId, policyPeriodIdentity } = this;
    form.validateFields((err, values) => {
      if (err) return;
      const { policyTime = [] } = values;
      values.validStartTime = policyTime[0].format('YYYY-MM-DD 00:00:00');
      values.validEndTime = policyTime[1].format('YYYY-MM-DD 00:00:00');
      delete values.policyTime;

      values.policyPeriodIdentity = policyPeriodIdentity;
      values.mcnId = mcnId;
      values.id = id;
      const item = values.contractFile && values.contractFile[0] || {}
      values.contractFileUrl = item.url || ''
      values.contractFileName = item.name || ''
      values.isGuaranteed = values.isGuaranteed ? 1 : 2;

      this.props.saveProcurementPolicyInfo(values).then(() => {
        this.getPolicyInfoByMcnId();
        Modal.success({ content: '政策保存成功' })
      })
    })
  }

  isShowStopModal = () => {
    this.setState({ stopModal: !this.state.stopModal })
  }
  //停用原因提交操作
  handleStopPolicy = async ({ policyStopReason }) => {
    const { id } = this.getDefaultQuery();
    await this.props.stopPolicy({ id, policyStopReason })
    message.success('操作成功')
    this.isShowStopModal();
    this.getPolicyInfoByMcnId();
  }
  handleStartPolicy = async () => {
    const { id } = this.getDefaultQuery();
    await this.props.startPolicy({ id })
    message.success('操作成功')
    this.getPolicyInfoByMcnId();
  }

  addRule = (type) => {
    this.setState({ showEditRuleModal: true, editRuleModalType: type, currentRuleId: null })
  }
  editRule = (type, currentRuleId) => {

    this.setState({ showEditRuleModal: true, editRuleModalType: type, currentRuleId })
  }
  delRule = (type, ruleId) => {
    const { id, mcnId, policyPeriodIdentity } = this.getDefaultQuery();
    const delRuleById = type == 'global' ? this.props.delGlobalRuleById : this.props.delSpecialRuleById
    delRuleById({ id, mcnId, ruleId, policyPeriodIdentity }).then(() => {
      this.getPolicyInfoByMcnId();
    })
  }
  editRuleModalClose = () => {
    this.setState({ showEditRuleModal: false })
  }
  getDefaultQuery = () => {
    const { mcnId, policyPeriodIdentity } = this;
    const { currentRuleId } = this.state;
    const { policyInfo = {} } = this.props;
    const { id } = policyInfo;
    return { id, mcnId, currentRuleId, policyPeriodIdentity }
  }
  saveAccountRule = async (type, values) => {
    const { id, mcnId, policyPeriodIdentity } = this.getDefaultQuery();
    const { currentRuleId: ruleId } = this.state;
    const query = { ...values, mcnId, ruleId, id, policyPeriodIdentity }

    const saveAccountRule = this.props[type == 'global' ? 'saveGlobalAccountRule' : 'saveSpecialAccountRule']
    const data = await saveAccountRule(query);
    if (type == 'special') {
      await this.notExist(data);
    }
    this.getPolicyInfoByMcnId();
    this.editRuleModalClose()
  }
  saveWhiteAccount = async (ids = []) => {
    const { id, mcnId, policyPeriodIdentity } = this.getDefaultQuery();
    const { policyInfo = {} } = this.props;
    const { whiteList = {} } = policyInfo;
    const whiteAccountList = whiteList.accountList || [];
    const accountIds = whiteAccountList.map(item => item.accountId).concat(ids)
    await this.props.saveWhiteList({ id, mcnId, policyPeriodIdentity, accountIds })
    this.getPolicyInfoByMcnId();
  }
  delWhiteListAccount = (accountId) => {
    const { id, mcnId, policyPeriodIdentity } = this.getDefaultQuery();
    Modal.confirm({
      title: '确定删除？',
      onOk: async () => {
        await this.props.delWhiteListAccount({ id, mcnId, policyPeriodIdentity, accountId })
        this.getPolicyInfoByMcnId();
      }
    })

  }
  onMenuClick = ({ key }) => {
    if (key == 3) {
      this.props.history.push(`/account/policyList?userId=${this.mcnId}`)
      return false;
    } else {
      this.props.history.replace(`/account/policy?userId=${this.mcnId}&policyPeriodIdentity=${key}`);
      window.location.reload();
    }

  }
  onGuaranteedChange = (checked) => {
    this.setState({ isGuaranteedStatus: checked })
  }

  render() {
    const { mcnId } = this;
    const { form, policyInfo = {}, progress, newBPlatforms } = this.props;
    const { getAccountInfoByIds } = this.props;
    const { stopModal, showEditRuleModal, editRuleModalType, currentRuleId, token, isGuaranteedStatus } = this.state;

    const { policyStatus, identityName,
      validStartTime, validEndTime, id, modifiedAt, policyStopReason,
      globalAccountRules = [], specialAccountRules = [], whiteList = [],
      isDraft, selectedPlatformIds,
      nextPolicyStatus, modifiedByName
    } = policyInfo;
    const isEdit = id !== undefined;
    const currentRule = (editRuleModalType == 'global' ? globalAccountRules : specialAccountRules).filter(item => item.ruleId == currentRuleId)
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    };

    const menuSelectedKeys = [String(this.policyPeriodIdentity)]
    const nextPolicyStatusName = this.policyPeriodIdentity == 1 ? POLICYSTATUS[nextPolicyStatus] : POLICYSTATUS[policyStatus]
    return <>
      <div key="alertMessage">{isDraft == 1 ? <Alert message="当前为草稿状态" type="warning" /> : null}</div>
      <Menu key='policyMenu' mode="horizontal" onClick={this.onMenuClick} selectedKeys={menuSelectedKeys}>
        <Menu.Item key="1">本期政策</Menu.Item>
        <Menu.Item key="2">下期政策({nextPolicyStatusName || "未添加"})</Menu.Item>
        <Menu.Item key="3">往期政策</Menu.Item>
      </Menu>
      <div key='policyWrapper' className='policyWrapper'>
        <Spin spinning={progress === 'loading'}>
          {isEdit && <PageInfo policyId={id} status={policyStatus} stopReason={policyStopReason} editor={modifiedByName} editTime={moment(modifiedAt).format('YYYY-MM-DD HH:mm:ss')} />}
          <Form>
            <FormItem label='主账号名称' {...formItemLayout}>
              {identityName}
            </FormItem>
            <FormItem label="政策有效期"  {...formItemLayout}>
              {getFieldDecorator('policyTime', {
                rules: [{ type: 'array', required: true, message: 'Please select time!' }],
                initialValue: [moment(validStartTime), moment(validEndTime)]
              })(
                <RangePicker
                  className='policyTime'
                  onCalendarChange={this.handleChangeDate}
                  onChange={this.handleChangeDateRange}
                />
              )}
            </FormItem>

            <ModuleHeader title="全局账号设置"></ModuleHeader>
            <div>政策规则：
            {globalAccountRules.length < 6 ?
                <Button onClick={() => this.addRule('global')} type="link">+添加</Button> : null}
            </div>
            <RuleModule
              key='globalAccountRules'
              data={globalAccountRules}
              type='global'
              editRule={this.editRule}
              delRule={this.delRule}
              form={form}
            ></RuleModule>

            <ModuleHeader title="特殊账号设置"></ModuleHeader>
            <div>政策规则：{specialAccountRules.length < 20 ?
              <Button onClick={() => this.addRule('special')} type="link">+添加</Button>
              : null}</div>
            <RuleModule
              key='specialAccountRules'
              data={specialAccountRules}
              type='special'
              editRule={this.editRule}
              delRule={this.delRule}
              form={form}
            ></RuleModule>

            <ModuleHeader title="白名单"></ModuleHeader>
            <WhiteList
              mcnId={mcnId}
              key={whiteList.length}
              whiteList={whiteList}
              saveWhiteAccount={this.saveWhiteAccount}
              getAccountInfoByIds={this.props.getAccountInfoByIds}
              delWhiteListAccount={this.delWhiteListAccount}
            ></WhiteList>

            <ModuleHeader title="返点规则"></ModuleHeader>
            <FormItem label='返点结算周期' {...formItemLayout}>
              {
                getFieldDecorator('rebateSettlementCycle', {
                  initialValue: policyInfo.rebateSettlementCycle
                })(
                  <Radio.Group options={[{ label: '月', value: 1 }, { label: '季', value: 2 }, { label: '半年', value: 3 }, { label: '年', value: 4 }]} />
                )
              }
            </FormItem>
            <FormItem label='阶梯返点结算' {...formItemLayout}>
              {
                getFieldDecorator('stepRebateSettlementType', {
                  initialValue: policyInfo.stepRebateSettlementType
                })(<Radio.Group options={[{ label: '阶梯收入计算', value: 1 }, { label: '全量收入计算', value: 2 }]} />)
              }
              <cite className='eg-explain'>例：0-100返点3%，100及以上返点5%，博主总收入150<br />
                阶梯收入计算=（100*3%）+（50*5%）<br />
                全量收入计算=150*5%
							</cite>

            </FormItem>
            <FormItem label='保底政策' {...formItemLayout}>
              {
                getFieldDecorator('isGuaranteed', {
                  initialValue: transBool(policyInfo.isGuaranteed),
                  valuePropName: 'checked'
                })(
                  <Switch onChange={this.onGuaranteedChange} checkedChildren="开" unCheckedChildren="关" />
                )
              }
            </FormItem>
            {isGuaranteedStatus && <FormItem label='保底金额' {...formItemLayout}>
              {
                getFieldDecorator('guaranteedMinAmount', { initialValue: policyInfo.guaranteedMinAmount })(
                  <InputNumber style={{ width: 400 }} max={9999999999} suffix="元" />
                )
              }
            </FormItem>}
            {isGuaranteedStatus && <FormItem label='保底备注' {...formItemLayout}>
              {
                getFieldDecorator('guaranteedRemark', { initialValue: policyInfo.guaranteedRemark })(
                  <Input.TextArea rows={4} style={{ width: 400 }} suffix="元" />
                )
              }
            </FormItem>}
            <Form.Item label='合同附件' {...formItemLayout}>
              {getFieldDecorator('contractFile', {
                valuePropName: 'fileList',
                getValueFromEvent: e => e && e.fileList,
                initialValue: policyInfo.contractFileUrl ?
                  [{
                    uid: '-1',
                    name: policyInfo.contractFileName,
                    status: 'done',
                    url: policyInfo.contractFileUrl,
                  }] : null
              })(
                <OssUpload
                  authToken={token}
                  rule={{
                    bizzCode: 'MCN_PROCUREMENT_POLICY_CONTRACT',
                    max: 50,
                    suffix: 'pdf,docx,doc,dot,dotx'
                  }}
                  len={1}//可以上传几个
                  tipContent={() => '支持pdf,docx,doc,dot,dotx格式,小于50M的文件上传'}
                />
              )}
            </Form.Item>
            <FormItem label="备注"  {...formItemLayout}>
              {getFieldDecorator('remark', { initialValue: policyInfo.remark })(
                <TextArea className='remarksText' max={1000} />
              )}
            </FormItem>

            <FormItem className='policyFooter'>
              {
                policyStatus == 1 || policyStatus == 2 ?
                  <Button type='primary' onClick={this.isShowStopModal}>停用</Button> : policyStatus == 4 ?
                    <Button type='primary' onClick={this.handleStartPolicy}>启用</Button> : null
              }
              {policyStatus != 4 ? <Button type='primary' onClick={this.handleSavePolicy}>提交</Button> : null}
            </FormItem>
          </Form>
        </Spin>
        {stopModal ? <StopReasonModal onCancel={this.isShowStopModal} onOk={this.handleStopPolicy} /> : null}

        {showEditRuleModal && <EditRuleForm
          mcnId={mcnId}
          policyId={id}
          selectedPlatformIds={selectedPlatformIds}
          policyPeriodIdentity={this.policyPeriodIdentity}
          currentRule={currentRule[0]}
          getAccountInfoByIds={getAccountInfoByIds}
          saveAccountRule={this.saveAccountRule}
          type={editRuleModalType}
          editRuleModalClose={this.editRuleModalClose}
          newBPlatforms={newBPlatforms}
        ></EditRuleForm>}
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
    ...commonActions,
    ...actions,
  }, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(PolicyManage))

