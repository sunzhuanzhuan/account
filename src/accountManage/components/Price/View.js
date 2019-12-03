/**
 * 报价信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { Button, Icon, Form, Tag } from "antd";
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
import { dateDisplay } from "@/accountManage/util";
import moment from "moment";

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
    const {
      priceMicroTaskTweet,
      priceMicroTaskRetweet,
      priceWeiqTweet,
      priceWeiqRetweet,
      weitaskFetchedTime
    } = data.feature || {};
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: {dateDisplay(modifiedAt) || '--'}</span>
      {this.props.readOnly ? null :
        <a onClick={() => onModuleStatusChange('edit')} style={{ fontSize: '14px' }}>
          <Icon type="edit" style={{ marginRight: '6px' }} />
          编辑
        </a>}
      {/*<Button type='primary' onClick={() => onModuleStatusChange('edit')}>编辑</Button>*/}
    </div>;
    const priceKeys = skuList ? skuList.map(({ skuTypeId, skuTypeName }) => ({
      key: skuTypeId, name: skuTypeName
    })) : [];
    return <div className='module-item-container'>
      <ModuleHeader title={configureModule.title} right={right} />
      <section className='content-wrap'>
        <div className="view-fields-container">
          <section className='content-wrap'>
            {isFamous === 1 ?
              <FamousPriceView {...fieldProps} priceKeys={priceKeys}>
                {configurePlatform.visibility.fields.referencePrice &&
                <FieldView width={80} title="报价包含" value={
                  <div style={{ lineHeight: "40px" }}>
                    <div className='sina-reference-table'>
                      <table>
                        <tbody>
                        <tr>
                          <th>微任务原发价</th>
                          <td>{priceMicroTaskTweet || '--'}</td>
                        </tr>
                        <tr>
                          <th>微任务转发价</th>
                          <td>{priceMicroTaskRetweet || '--'}</td>
                        </tr>
                        <tr>
                          <th>WEIQ原发价</th>
                          <td>{priceWeiqTweet || '--'}</td>
                        </tr>
                        <tr>
                          <th>WEIQ转发价</th>
                          <td>{priceWeiqRetweet || '--'}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className='input-desc-bottom'>微任务,
                      WEIQ价格更新时间: <span>{weitaskFetchedTime ? moment(weitaskFetchedTime).format('YYYY-MM-DD') : '--'}</span>
                    </p>
                  </div>
                } />}
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
                      <div style={{ paddingTop: 10 }}>
                        <span className='gray-text'>备注: </span>{isAcceptHardAdDescription}
                      </div>
                    }
                  </div>
                } />
              </FamousPriceView>
              :
              <NamelessPriceView {...fieldProps} priceList={skuList}>
                {configurePlatform.visibility.fields.referencePrice &&
                <ReferencePrice  {...fieldProps} />}
                <FieldView width={80} title="接硬广" value={
                  <div>
                    <span>{isAcceptHardAd === 1 ? '是' : '否'}</span>
                    {
                      isAcceptHardAdDescription &&
                      <div style={{ paddingTop: 10 }}>
                        <span className='gray-text'>备注: </span>{isAcceptHardAdDescription}
                      </div>
                    }
                  </div>
                } />
              </NamelessPriceView>
            }
          </section>
        </div>
      </section>
    </div>
  }
}
