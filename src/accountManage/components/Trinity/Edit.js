/**
 * 三方报价相关
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import {
  TrinityConfigAndPrice,
  trinityIsPreventShieldingTip
} from "@/accountManage/components/common/Fields";
import { Button, Form, message } from "antd";
import LoadingBlock from "@/accountManage/base/LoadingBlock";

@Form.create()
export default class Trinity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitLoading: false
    }
  }

  // 处理提交数据
  handleSubmitValues = (values) => {
    const { data: { account } } = this.props;
    let trinitySkuInfoVOS = values.trinitySkuInfoVOS.reduce((ary, cur) => {
      (cur.list || []).forEach(sku => {
        (sku.publicCostPrice === 0 || sku.publicCostPrice) && ary.push({
          ...sku,
          trinityPlatformCode: cur.trinityPlatformCode,
          publicCostPrice: sku.publicCostPrice
        });
      });
      return ary;
    }, []);
    let trinityIsPreventShieldingManual = values.trinityIsPreventShieldingManual || 0;
    return {
      trinityPlaceOrderType: 2,
      ...values,
      trinitySkuInfoVOS,
      trinityIsPreventShieldingManual,
      platformId: account.base.platformId,
      itemId: account.id
    }
  };

  submit = (e) => {
    e && e.preventDefault();
    const {
      actions,
      form,
      reload,
      // onModuleStatusChange,
    } = this.props
    form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        let values = this.handleSubmitValues(fieldsValue)
        this.setState({ submitLoading: true });
        trinityIsPreventShieldingTip(actions.addOrUpdateAccountTrinitySkuInfo, values, () => {
          return message.success('保存成功!', 1.3, () => {
            reload();
            this.setState({ submitLoading: false });
          });
        }, (e) => {
          message.error(e.errorMsg)
          this.setState({ submitLoading: false });
        });
      }
    });
  }

  render() {
    const {
      layout,
      data,
      actions,
      form,
      module: configureModule, platform: configurePlatform, reload
    } = this.props
    const fieldProps = { layout, data, form, actions }
    const right = <div className='wrap-panel-right-content'>
      {/*<span className='gray-text'>最近更新于: {otherInfoModifiedAt || '--'}</span>*/}
      <Button htmlType='submit' type='primary' loading={this.state.submitLoading}>保存</Button>
    </div>;
    return <Form className='module-item-container' onSubmit={this.submit} colon={false}>
      <ModuleHeader title={configureModule.title} right={right} />
      <section className='content-wrap'>
        <TrinityConfigAndPrice {...fieldProps} reload={reload} />
      </section>
    </Form>
  }
}
