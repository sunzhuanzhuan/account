/**
 * 账号报价
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { Button, Form, message, Modal } from "antd";
import { FamousPrice, NamelessPrice } from "../common/AccountPrice";
import { IsAcceptHardAd, PriceInclude, ReferencePrice } from "../common/Fields";
import { checkVal } from "@/accountManage/util";

@Form.create()
export default class PriceEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handlePrice = (skuList, price_now = {}, price_next = {}) => {
    return skuList.map(item => {
      let obj = { ...item };
      let key = obj['skuTypeId'];
      obj.costPriceRaw = price_now[key] || 0;
      obj.nextCostPriceRaw = price_next[key] || 0;
      return obj;
    });
  };

  handleSubmitValues = (values) => {
    const { data: { account, priceInfo } } = this.props;
    const { skuList } = priceInfo;
    const {
      id, base: { isFamous, platformId }
    } = account;
    let { price_now, price_next } = values;
    values['skuList'] = this.handlePrice(skuList, price_now, price_next);
    values['isPreventShielding'] = checkVal(values['isPreventShielding']);
    values['isSupportTopicAndLink'] = checkVal(values['isSupportTopicAndLink']);
    values['is_flowunit_off_shelf'] = checkVal(values['is_flowunit_off_shelf']);
    values['forceSaleStatus'] = checkVal(values['forceSaleStatus']);
    values['isAcceptHardAd'] = checkVal(values['isAcceptHardAd']);
    values['id'] = id;
    values['productLineId'] = isFamous;
    values['platformId'] = platformId;
    delete values['price_now'];
    delete values['price_next'];
    // values.base['platformId'] = platformId;
    return values
  };
  submit = (e) => {
    e && e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        let values = this.handleSubmitValues(fieldsValue)
        this.showConfirm(values);
      }
    });
  };
  showConfirm = (values) => {
    const { actions: { saveSku }, data: { account }, reload, onModuleStatusChange } = this.props;
    const { isFamous } = account.base;
    Modal.confirm({
      title: '提交价格信息?',
      content: (isFamous == 1) ? '提交成功后，下个价格有效期和报价将无法修改' : '',
      onOk() {
        return saveSku(values).then(() => {
          message.success('更新报价信息成功', 1.3, () => {
            reload(() => onModuleStatusChange('view'))
          });

        });
      },
      onCancel() { }
    });
  };


  render() {
    const {
      layout,
      data,
      actions,
      form,
      module: configureModule, platform: configurePlatform
    } = this.props
    const fieldProps = { layout, data, form, actions, ...form }
    const {
      isFamous
    } = data.account.base || {}
    const {
      skuList,
      modifiedAt // 信息修改时间
    } = data.priceInfo || {};
    const priceKeys = skuList ? skuList.map(({ skuTypeId, skuTypeName }) => ({
      key: skuTypeId, name: skuTypeName
    })) : [];
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: {modifiedAt || '--'}</span>
      <Button htmlType='submit' type='primary' loading={this.state.submitLoading}>保存</Button>
    </div>;

    return <Form className='module-item-container' onSubmit={this.submit} colon={false}>
      <ModuleHeader title={configureModule.title} right={right} />
      <section className='content-wrap'>
        {isFamous === 1 ?
          <FamousPrice {...fieldProps} priceKeys={priceKeys}>
            {configurePlatform.visibility.fields.referencePrice &&
            <ReferencePrice  {...fieldProps} />}
            {configurePlatform.visibility.fields.priceInclude &&
            <PriceInclude  {...fieldProps} />}
            <IsAcceptHardAd {...fieldProps} />
          </FamousPrice>
          :
          <NamelessPrice isUpdate={true} {...fieldProps} priceKeys={priceKeys}>
            {configurePlatform.visibility.fields.referencePrice &&
            <ReferencePrice  {...fieldProps} />}
            <IsAcceptHardAd {...fieldProps} />
          </NamelessPrice>
        }
      </section>
    </Form>
  }
}
