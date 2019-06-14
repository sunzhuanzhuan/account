/**
 * 合作信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import {
  DirectItems,
  RefuseBrands,
  ManuscriptModificationLimit,
  VideoShotArea,
  LiveArea,
  CooperationTips,
  CooperationCases,
  AdServiceItems,
  PostPlatform,
  ProductPlacementType
} from "@/accountManage/components/common/Fields";
import { Button, Divider, Form } from "antd";
import update from "immutability-helper";
import { configItemKeyToField } from "@/accountManage/constants/packageConfig";

@Form.create()
export default class CooperationEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      asyncVisibility: {},
      asyncOptions: {
        adServiceItems: [],
        platforms: []
      },
      submitLoading: false
    }
  }

  componentDidMount() {
    const { actions, form, data: { account } } = this.props
    // 获取字段配置项 - 合作须知/广告服务
    Promise.all([
      actions.getCooperateNoticeFieldConfig({ accountId: account.id }),
      actions.getAdvertisingFieldConfig({ accountId: account.id })
    ]).then((data) => {
      data = data.reduce((ary, item) => {
        ary = ary.concat(item.data)
        return ary
      }, [])
      this.setState(update(this.state, {
        asyncVisibility: {
          verified: {
            $set: data.reduce((obj, item) => {
              let key = configItemKeyToField[item.itemKey]
              if (key) {
                obj[key] = true
              }
              return obj
            }, this.state.asyncVisibility)
          }
        }
      }))
    })
    // 获取配置项 - 可提供的广告服务
    actions.getAdvertisingOfferServices({ accountId: account.id }).then(({ data }) => {
      this.setState(update(this.state, {
        asyncOptions: {
          adServiceItems: {
            $set: data.map(item => ({
              id: item.itemKey,
              adServiceItemName: item.itemValue
            }))
          }
        }
      }))
    })
    // 获取配置项 - 可选择的平台
    actions.getAvailablePlatformList().then(({ data }) => {
      this.setState(update(this.state, {
        asyncOptions: {
          platforms: {
            $set: data
          }
        }
      }))
    })
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        console.log('Received values of form: ', fieldsValue);
        this.setState({
          submitLoading: true
        })
        setTimeout(() => {
          this.setState({
            submitLoading: false
          })
          this.props.reload(() => this.props.onModuleStatusChange('view'))
        }, 2000);
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
      cooperation: { modifiedAt } // 信息修改时间
    } = data.account || {}
    const {
      asyncVisibility,
      asyncOptions,
      submitLoading
    } = this.state
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: {modifiedAt || '--'}</span>
      <Button htmlType='submit' type='primary' loading={submitLoading}>保存</Button>
    </div>;
    return <Form className='module-item-container' onSubmit={this.submit} colon={false}>
      <ModuleHeader title={configureModule.title} right={right} />
      <ul className='content-wrap'>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>合作须知</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            {asyncVisibility.isAcceptHardAd && asyncVisibility.isAcceptProductUse &&
            <DirectItems {...fieldProps} />}
            {asyncVisibility.refuseBrands && <RefuseBrands {...fieldProps} />}
            {asyncVisibility.manuscriptModificationLimit &&
            <ManuscriptModificationLimit {...fieldProps} />}
            {asyncVisibility.videoShotArea && <VideoShotArea {...fieldProps} />}
            {asyncVisibility.liveArea && <LiveArea {...fieldProps} />}
            <Divider dashed />
            <CooperationTips {...fieldProps} />
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>合作案例</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <CooperationCases {...fieldProps} configurePlatform={configurePlatform} />
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>广告服务</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <AdServiceItems {...fieldProps} options={asyncOptions.adServiceItems} />
            {asyncVisibility.postPlatform &&
            <PostPlatform {...fieldProps} options={asyncOptions.platforms} />}
            {asyncVisibility.productPlacement && <ProductPlacementType {...fieldProps} />}
          </div>
        </li>
      </ul>
    </Form>
  }
}
