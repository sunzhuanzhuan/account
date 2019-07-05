/**
 * 三方报价相关
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import {
  IsLowQuality,
  MediaTeamNote,
  TrinityConfigAndPrice, trinityIsPreventShieldingTip
} from "@/accountManage/components/common/Fields";
import { Button, Form, message } from "antd";
import LoadingBlock from "@/accountManage/base/LoadingBlock";

@Form.create()
export default class Trinity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitLoading: false,
      loading: true
    }
    // window注入组件
    window.__UpdateAccountReactComp__.other = this
  }

  reload = (cb) => {
    const { actions, data: { account } } = this.props
    actions.getAccountTrinitySkuInfo({
      accountId: account.id,
      platformId: account.base.platformId
    }).finally(() => {
      cb && cb()
    })
  }

  componentDidMount() {
    const { actions, data: { account } } = this.props
    actions.getAccountTrinitySkuInfo({
      accountId: account.id,
      platformId: account.base.platformId
    }).finally(() => {
      this.setState({ loading: false })
    })
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
    const {
      actions,
      form,
      reload,
      onModuleStatusChange,
      data: { account, priceInfo: { isPreventShielding } }
    } = this.props
    this.setState({ submitLoading: true });
    form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        let trinitySkuInfoVOS = fieldsValue.trinitySkuInfoVOS.reduce((ary, cur) => {
          (cur.list || []).forEach(sku => {
            (sku.publicCostPrice === 0 || sku.publicCostPrice) && ary.push({
              ...sku,
              trinityPlatformCode: cur.trinityPlatformCode,
              publicCostPrice: sku.publicCostPrice
            });
          });
          return ary;
        }, []);
        let trinityIsPreventShieldingManual = fieldsValue.trinityIsPreventShieldingManual || 0;
        trinityIsPreventShieldingTip({
          accountValue: trinityIsPreventShieldingManual > 0 ? trinityIsPreventShieldingManual :
            fieldsValue.trinityIsPreventShieldingAutomated,
          skuValue: isPreventShielding,
          platformId: account.base.platformId
        }, () => {
          return actions.addOrUpdateAccountTrinitySkuInfo({
            trinityPlaceOrderType: 2,
            ...fieldsValue,
            trinitySkuInfoVOS,
            trinityIsPreventShieldingManual,
            platformId: account.base.platformId,
            itemId: account.id
          }).then(() => {
            const { reload } = this.props;
            message.success('保存成功!', 1.3, () => {
              reload();
            });
          });
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
      module: configureModule, platform: configurePlatform
    } = this.props
    const fieldProps = { layout, data, form, actions }
    const {
      isFamous,
      trinityPriceInfo: {
        cooperationPlatformResVOS = []
      } = {}
      // 信息修改时间
    } = data.account || {}
    const right = <div className='wrap-panel-right-content'>
      {/*<span className='gray-text'>最近更新于: {otherInfoModifiedAt || '--'}</span>*/}
      <Button htmlType='submit' type='primary' loading={this.state.submitLoading}>保存</Button>
    </div>;

    return this.state.loading ?
      <LoadingBlock loading /> : (isFamous === 1 && cooperationPlatformResVOS.length) ?
        <Form className='module-item-container' onSubmit={this.submit} colon={false}>
          <ModuleHeader title={configureModule.title} right={right} />
          <section className='content-wrap'>
            <TrinityConfigAndPrice {...fieldProps} reload={this.reload} />
          </section>
        </Form> : null
  }
}
