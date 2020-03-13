import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button, Form, DatePicker, Spin, Input, message,
  Radio, Switch, InputNumber, Menu, Alert, Modal, Select
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
      nextPolicyStatus, modifiedByName,
      policyLevel
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
            <FormItem label="政策级别"  {...formItemLayout}>
              {getFieldDecorator('policyLevel', {
                rules: [{ required: true, message: '该项为必填项，请选择!' }],
                initialValue: policyLevel
              })(
                <Select style={{width: 220}} placeholder="请选择">
                  <Select.Option value={1}>
                    S：独家（1家）
                  </Select.Option>
                  <Select.Option value={2}>
                    A：小圈（≤3家）
                  </Select.Option>
                  <Select.Option value={3}>
                    B：大圈（≤6家）
                  </Select.Option>
                  <Select.Option value={4}>
                    C：平价（≥6家）
                  </Select.Option>
                </Select>
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
            <p style={{height: 28}}/>

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
          getNewToken={this.props.getNewToken}
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

