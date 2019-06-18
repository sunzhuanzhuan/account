/**
 * 其他信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { IsLowQuality, MediaTeamNote } from "@/accountManage/components/common/Fields";
import { Button, Form, message } from "antd";

@Form.create()
export default class Other extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitLoading: false
    }
    // window注入组件
    window.__UpdateAccountReactComp__.other = this
  }
  // 处理提交数据
  handleSubmitValues = (values) => {
    const { data: { account } } = this.props;
    values['id'] = account.id;
    // values.base['platformId'] = platformId;
    delete values['_case']
    return values;
  };

  submit = (e) => {
    e && e.preventDefault();
    const { actions, form, reload, onModuleStatusChange } = this.props
    this.setState({ submitLoading: true });
    form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        let values = this.handleSubmitValues(fieldsValue)
        actions.updateOtherInfo(values).then(() => {
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
      otherInfo: { otherInfoModifiedAt }
      // 信息修改时间
    } = data.account || {}
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: {otherInfoModifiedAt || '--'}</span>
      <Button htmlType='submit' type='primary'>保存</Button>
    </div>;

    return <Form className='module-item-container' onSubmit={this.submit} colon={false}>
      <ModuleHeader title={configureModule.title} right={right} />
      <section className='content-wrap'>
        {configurePlatform.visibility.fields.isLowQuality && <IsLowQuality {...fieldProps} />}
        <MediaTeamNote {...fieldProps} />
      </section>
    </Form>
  }
}
