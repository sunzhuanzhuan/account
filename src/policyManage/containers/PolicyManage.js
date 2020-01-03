import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button, Icon, Form, DatePicker, Spin, Input, message,
  Radio, Switch, InputNumber, Menu, Alert
} from 'antd';

// import CommonTitle from "../components/CommonTitle";
// import RulesWrapper from "../components/RulesWrapper";
// import WhiteList from "../components/WhiteList";
import PageInfo from "../components/PageInfo";
import StopReasonModal from "../components/StopReasonModal";
import moment from 'moment';
import actions from '../actions';
import './PolicyManage.less';
import qs from 'qs';
import { ModuleHeader } from '@/components/ModuleHeader';
import WhiteList from '../components/WhiteList';
import RuleModule from '../components/RuleModule'
import EditRuleForm from '../components/RuleModules/EditRuleForm'
// import AddAccountModal from '../components/RuleModules/AddAccountModal'
import { transBool, POLICYSTATUS } from '../constants/dataConfig'

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
class PolicyManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stopModal: false,
      showEditRuleModal: false
    }
    const search = this.props.location.search.substring(1);
    this.mcnId = qs.parse(search)['userId'];
    this.policyPeriodIdentity = qs.parse(search)['policyPeriodIdentity'] || 1
  }

  componentDidMount() {
    this.getPolicyInfoByMcnId();
    this.props.getNewBPlatforms({ version: '1.1' });
  }
  getPolicyInfoByMcnId = () => {
    const { policyInfo = {} } = this.props;
    const { id } = policyInfo;
    const { mcnId, policyPeriodIdentity } = this;

    this.props.getPolicyInfoByMcnId({ mcnId, id, policyPeriodIdentity });
  }

  // componentDidUpdate(prevProps) {
  //   const { progress: prevProgress } = prevProps;
  //   const { errorMsg = '操作失败', newPolicyId, progress, msg = '操作成功' } = this.props;

  //   if (prevProgress !== progress && progress === 'fail') {
  //     this.getErrorTips(errorMsg, 'error');
  //   } else if (prevProgress !== progress && progress === 'saveSuccess') {
  //     this.getErrorTips(msg, 'success');
  //     if (newPolicyId) {
  //       this.props.history.replace(`/account/policy?id=${newPolicyId}`)
  //       window.location.reload();
  //     }
  //   }
  // }

  // getErrorTips = (msg, type = 'error') => {
  //   try {
  //     if (typeof message.destroy === 'function') {
  //       message.destroy();
  //     }
  //     message[type](msg);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // getDisabledDate = (current) => {
  //   const { timeRange = [] } = this.state;

  //   if (timeRange[0])
  //     // return !(!(current && current <= moment().subtract(1, 'days').endOf('day')) && current.diff(timeRange[0], 'days') > 60); //60天内不可选
  //     return current && current <= moment().subtract(1, 'days').endOf('day');
  // }

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

      const _values = Object.keys(values).reduce((acc, cur) => {
        if (values[cur]) {
          acc[cur] = values[cur]
          return acc;
        }
        return acc;
      }, {})
      this.props.saveProcurementPolicyInfo(_values)
    })
  }

  // handleChangeDate = (timeRange) => {
  //   this.setState({ timeRange });
  // }

  // handleChangeDateRange = () => {
  //   this.setState({ timeRange: [] })
  // }

  isShowStopModal = () => {
    this.setState({ stopModal: !this.state.stopModal })
  }

  handleStopPolicy = ({ policyStopReason }) => {
    const { id } = this.getDefaultQuery();

    this.props.stopPolicy({ id, policyStopReason })
    this.isShowStopModal();
  }
  handleStartPolicy = () => {
    const { id } = this.getDefaultQuery();
    this.props.startPolicy({ id })
  }
  // normFile = e => {
  //   console.log('Upload event:', e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // };
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
  saveAccountRule = (type, values) => {
    const { id, mcnId, policyPeriodIdentity } = this.getDefaultQuery();
    const { currentRuleId: ruleId } = this.state;
    const query = { ...values, mcnId, ruleId, id, policyPeriodIdentity }

    const saveAccountRule = this.props[type == 'global' ? 'saveGlobalAccountRule' : 'saveSpecialAccountRule']
    saveAccountRule(query).then(() => {
      this.getPolicyInfoByMcnId();
      this.editRuleModalClose()
    })
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
  delWhiteListAccount = async (accountId) => {
    const { id, mcnId, policyPeriodIdentity } = this.getDefaultQuery();
    await this.props.delWhiteListAccount({ id, mcnId, policyPeriodIdentity, accountId })
    this.getPolicyInfoByMcnId();
  }
  onMenuClick = ({ key }) => {
    this.props.history.replace(`/account/policy?userId=${this.mcnId}&policyPeriodIdentity=${key}`);
    window.location.reload();
  }

  render() {
    const { mcnId } = this;
    const { form, policyInfo = {}, progress, newBPlatforms } = this.props;
    const { getAccountInfoByIds } = this.props;
    const { stopModal, policyId, showEditRuleModal, editRuleModalType, currentRuleId } = this.state;
    const isEdit = policyId !== undefined;
    const { policyStatus, identityName,
      validStartTime, validEndTime, modifyName = '未知', id, modifiedAt, stopReason,
      globalAccountRules = [], specialAccountRules = [], whiteList = [],
      isDraft,
      nextPolicyStatus
    } = policyInfo;

    const currentRule = (editRuleModalType == 'global' ? globalAccountRules : specialAccountRules).filter(item => item.ruleId == currentRuleId)
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    };

    const menuSelectedKeys = [String(this.policyPeriodIdentity)]


    const contractUploadProps = {
      name: 'file',
      multiple: true,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    const nextPolicyStatusName = this.policyPeriodIdentity == 2 ? POLICYSTATUS[nextPolicyStatus] : POLICYSTATUS[policyStatus]
    return [
      // <h2 key='policyHeader' className='policyHeader'>
      // 	{isEdit ? '修改政策' : '新增政策'}
      // 	<Button>当期政策</Button>
      // </h2>,
      <div key="alertMessage">{isDraft == 1 ? <Alert message="当前为草稿状态" type="warning" /> : null}</div>,
      <Menu key='policyMenu' mode="horizontal" onClick={this.onMenuClick} selectedKeys={menuSelectedKeys}>
        <Menu.Item key="1">本期政策</Menu.Item>
        <Menu.Item key="2">下期政策({nextPolicyStatusName})</Menu.Item>
        {/* <Menu.Item key="3">往期政策</Menu.Item> */}
      </Menu>,
      <div key='policyWrapper' className='policyWrapper'>
        <Spin spinning={progress === 'loading'}>
          {isEdit ? <PageInfo policyId={id} status={policyStatus} stopReason={stopReason} editor={modifyName} editTime={moment(modifiedAt).format('YYYY-MM-DD HH:mm:ss')} /> : null}
          <Form>
            <FormItem label='主账号名称' {...formItemLayout}>
              {/* {isEdit ? identityName : userName || '未知'} */}
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
                // disabledDate={this.getDisabledDate} 
                />
              )}
            </FormItem>

            <ModuleHeader title="全局账号设置"></ModuleHeader>
            <div>政策规则：<Button onClick={() => this.addRule('global')} type="link">+添加</Button></div>
            <RuleModule
              key='globalAccountRules'
              data={globalAccountRules}
              type='global'
              editRule={this.editRule}
              delRule={this.delRule}
              form={form}
            ></RuleModule>

            <ModuleHeader title="特殊账号设置"></ModuleHeader>
            <div>政策规则：<Button onClick={() => this.addRule('special')} type="link">+添加</Button></div>
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
                  <Switch checkedChildren="开" unCheckedChildren="关" />
                )
              }
            </FormItem>
            <FormItem label='保底金额' {...formItemLayout}>
              {
                getFieldDecorator('guaranteedMinAmount', { initialValue: policyInfo.guaranteedMinAmount })(
                  <InputNumber style={{ width: 100 }} max={999999999} suffix="元" />
                )
              }
            </FormItem>
            <FormItem label='保底备注' {...formItemLayout}>
              {
                getFieldDecorator('guaranteedRemark', { initialValue: policyInfo.guaranteedRemark })(
                  <Input.TextArea rows={4} style={{ width: 100 }} suffix="元" />
                )
              }
            </FormItem>
            {/* <Form.Item label="合同附件" {...formItemLayout} {...contractUploadProps}>
							{getFieldDecorator('contractFileUrl', {
								valuePropName: 'fileList',
								getValueFromEvent: this.normFile,
								// initialValue: policyInfo.contractFileUrl
							})(
								<Upload.Dragger name="files" action="/upload.do">
									<p className="ant-upload-drag-icon">
										<Icon type="inbox" />
									</p>
									<p className="ant-upload-text">Click or drag file to this area to upload</p>
									<p className="ant-upload-hint">Support for a single or bulk upload.</p>
								</Upload.Dragger>,
							)}
						</Form.Item> */}
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
          policyPeriodIdentity={this.policyPeriodIdentity}
          currentRule={currentRule[0]}
          getAccountInfoByIds={getAccountInfoByIds}
          saveAccountRule={this.saveAccountRule}
          // saveSpecialAccountRule={this.props.saveSpecialAccountRule}
          // saveGlobalAccountRule={this.props.saveGlobalAccountRule}
          // delSpecialRuleAccountById={this.props.delSpecialRuleAccountById}
          type={editRuleModalType}
          showEditRuleModal={showEditRuleModal}
          editRuleModalClose={this.editRuleModalClose}
          newBPlatforms={newBPlatforms}
        ></EditRuleForm>}

      </div >
    ]
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
