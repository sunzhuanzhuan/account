/**
 * 内容相关
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import {
  ContentForms,
  ContentFeatures,
  ContentStyles
} from "@/accountManage/components/common/Fields";
import { Button, Form, message } from "antd";
import update from "immutability-helper";
import { configItemKeyToField } from "@/accountManage/constants/packageConfig";

@Form.create()
export default class ContentEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitLoading: false
    }
    // window注入组件
    window.__UpdateAccountReactComp__.content = this
  }

  componentDidMount() {
    const { actions, data: { account, options } } = this.props
    // 获取配置项
    options.forms.length === 0 && actions.getContentForm({ accountId: account.id })
    options.features.length === 0 && actions.getContentFeature({ accountId: account.id })
    options.styles.length === 0 && actions.getContentStyle({ accountId: account.id })
  }

  // 处理提交数据
  handleSubmitValues = (values) => {
    const { data: { account } } = this.props;
    const { form, feature, style } = values['_client']
    return {
      id: account.id,
      content: {
        forms: form.defaultItems,
        customForm: form.custom,
        features: feature.defaultItems,
        customFeature: feature.custom,
        styles: style.defaultItems,
        customStyle: style.custom
      }
    };
  };

  submit = (e) => {
    e && e.preventDefault();
    const { actions, form, reload, onModuleStatusChange } = this.props
    this.setState({ submitLoading: true });
    form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        let values = this.handleSubmitValues(fieldsValue)
        actions.updateContentInfo(values).then(() => {
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
      content: { modifiedAt } // 信息修改时间
    } = data.account || {}
    const {
      options: asyncOptions,
    } = data
    const {
      submitLoading,
    } = this.state
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: {modifiedAt || '--'}</span>
      <Button htmlType='submit' type='primary' loading={submitLoading}>保存</Button>
    </div>;
    return <Form className='module-item-container' onSubmit={this.submit} colon={false}>
      <ModuleHeader title={configureModule.title} right={right} />
      <section className='content-wrap'>
        <ContentForms {...fieldProps} options={asyncOptions.forms} />
        <ContentStyles {...fieldProps} options={asyncOptions.styles} />
        <ContentFeatures {...fieldProps} options={asyncOptions.features} />
      </section>
    </Form>
  }
}
