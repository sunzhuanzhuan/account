/**
 * 报价信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { Button, Divider, Form, Tag } from "antd";
import FieldView from "@/accountManage/base/FeildView";
import {
  FamousPrice, FamousPriceView,
  NamelessPrice, NamelessPriceView,
  PriceTable
} from "@/accountManage/components/common/AccountPrice";
import {
  IsAcceptHardAd,
  PriceInclude,
  ReferencePrice
} from "@/accountManage/components/common/Fields";

@Form.create()
export default class PriceView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      layout,
      data,
      actions,
      form,
      module: configureModule, platform: configurePlatform,
      onModuleStatusChange
    } = this.props
    const fieldProps = { layout, data, form, actions }
    const {
      isFamous
    } = data.account.base || {}
    const {
      isSupportTopicAndLink,
      isPreventShielding,
      skuList,
      isAcceptHardAd,
      isAcceptHardAdDescription,
      modifiedAt // 信息修改时间
    } = data.priceInfo || {};
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: {modifiedAt || '--'}</span>
      <Button type='primary' onClick={() => onModuleStatusChange('edit')}>编辑</Button>
    </div>;
    const priceKeys = skuList ? skuList.map(({ skuTypeId, skuTypeName }) => ({
      key: skuTypeId, name: skuTypeName
    })) : [];
    return <div className='module-item-container'>
      <ModuleHeader title={configureModule.title} right={right} />
      <section className='content-wrap'>
        <div className="view-fields-container">
          <div className='right-wrap'>
            <section className='content-wrap'>
              {isFamous === 1 ?
                <FamousPriceView {...fieldProps} priceKeys={priceKeys}>
                  {configurePlatform.visibility.fields.referencePrice &&
                  <ReferencePrice  {...fieldProps} />}
                  {configurePlatform.visibility.fields.priceInclude &&
                  <FieldView width={80} title="报价包含" value={
                    (isPreventShielding === 1 || isSupportTopicAndLink === 1) ? <div>
                      {isPreventShielding === 1 && <Tag>防屏蔽（博主可自行下微任务/接WEIQ订单）</Tag>}
                      {isSupportTopicAndLink === 1 && <Tag>话题/@/链接</Tag>}
                    </div> : '--'
                  } />}
                  <FieldView width={80} title="接硬广" value={
                    <div>
                      <span>{isAcceptHardAd === 1 ? '是' : '否'}</span>
                      {
                        isAcceptHardAdDescription &&
                        <div style={{paddingTop: 10}}>
                          <span className='gray-text'>备注: </span>{isAcceptHardAdDescription}
                        </div>
                      }
                    </div>
                  } />
                </FamousPriceView>
                :
                <NamelessPriceView {...fieldProps} priceKeys={priceKeys}>
                  {configurePlatform.visibility.fields.referencePrice &&
                  <ReferencePrice  {...fieldProps} />}
                  <FieldView width={80} title="接硬广" value={
                    <div>
                      <span>{isAcceptHardAd === 1 ? '是' : '否'}</span>
                      {
                        isAcceptHardAdDescription &&
                        <div style={{paddingTop: 10}}>
                          <span className='gray-text'>备注: </span>{isAcceptHardAdDescription}
                        </div>
                      }
                    </div>
                  } />
                </NamelessPriceView>
              }
            </section>
          </div>
        </div>
      </section>
    </div>
  }
}
