/**
 * 策略信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import {} from "@/accountManage/components/common/Fields";
import { Button, Divider, Form, message } from "antd";
import { OnSaleInfo } from "@/accountManage/components/common/Fields";
import { MaxOrderCount } from "@/accountManage/components/common/Fields";
import { Strategy } from "@/accountManage/components/common/Fields";

@Form.create()
export default class StrategyEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitLoading: false
    }
    // window注入组件
    window.__UpdateAccountReactComp__.strategy = this
  }

  // 处理提交数据
  handleSubmitValues = (values) => {
    const { data: { account } } = this.props;
    values['id'] = account.id;
    // values.base['platformId'] = platformId;
    let strategy = { ...values.strategyInfo.strategy || {} };
    const { isFinite, isLeave } = values['_client'];
    if (!isFinite) {
      values.strategyInfo.maxOrderCount = 0
      values.strategyInfo.maxOrderCountNote = ''
    }
    if (!isLeave) {
      strategy = {};
    }
    const {
      startTimeOfTime,
      endTimeOfTime,
      otherTime
    } = strategy
    if (otherTime && otherTime.length > 0) {
      const [startTimeOfDate, endTimeOfDate] = otherTime
      strategy.startTimeOfDate = startTimeOfDate
      strategy.endTimeOfDate = endTimeOfDate
      delete strategy.otherTime
    }

    if (startTimeOfTime) {
      strategy.startTimeOfTime = startTimeOfTime.format('HH:mm:ss');
    }
    if (endTimeOfTime) {
      strategy.endTimeOfTime = endTimeOfTime.format('HH:mm:ss');
    }
    values.strategyInfo['strategy'] = strategy
    delete values['_client']
    return values;
  };

  submit = (e) => {
    e && e.preventDefault();
    const { actions, form, reload, onModuleStatusChange } = this.props
    this.setState({ submitLoading: true });
    form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        let values = this.handleSubmitValues(fieldsValue)
        actions.updateStrategyInfo(values).then(() => {
          // reload(() => onModuleStatusChange('view'))
          message.success('更新账号成功');
        }).finally(() => {
          this.setState({
            submitLoading: false
          });
        });
      } else {
        this.setState({ submitLoading: false });
      }
    });
  }

  render() {
    const {
      layout,
      data,
      actions,
      form,
      module: configureModule, platform: configurePlatform
    } = this.props
    const fieldProps = { layout, data, form, actions }
    const {
      isFamous,
      strategyInfo: { modifiedAt } // 信息修改时间
    } = data.account || {}
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: {modifiedAt || '--'}</span>
      <Button htmlType='submit' type='primary' loading={this.state.submitLoading}>保存</Button>
    </div>;
    return <Form className='module-item-container' onSubmit={this.submit} colon={false} hideRequiredMark>
      <ModuleHeader title={configureModule.title} right={right} />
      <ul className='content-wrap'>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>上架信息</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <OnSaleInfo {...fieldProps} />
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>接单策略</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <Strategy {...fieldProps} />
            <MaxOrderCount {...fieldProps} />
          </div>
        </li>
      </ul>
    </Form>
  }
}
