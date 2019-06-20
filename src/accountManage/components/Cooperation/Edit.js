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
import { Button, Divider, Form, message } from "antd";
import update from "immutability-helper";
import { configItemKeyToField } from "@/accountManage/constants/packageConfig";
import { uploadUrl } from "@/accountManage/util";
import visibility, {
  advertisingFields,
  cooperateNoticeFields
} from "@/accountManage/reducer/visibility";

@Form.create()
export default class CooperationEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitLoading: false
    }
    // window注入组件
    window.__UpdateAccountReactComp__.cooperation = this
  }

  componentDidMount() {
    const { actions, data: { account, options, visibility } } = this.props
    // 获取字段配置项 - 合作须知/广告服务
    Object.keys(visibility.cooperateNoticeFields).length === 0 &&
    actions.getCooperateNoticeFieldConfig({ platformId: account.base.platformId })
    Object.keys(visibility.advertisingFields).length === 0 &&
    actions.getAdvertisingFieldConfig({ platformId: account.base.platformId })

    // 获取配置项 - 可提供的广告服务
    options.adServiceItems.length === 0 && actions.getAdvertisingOfferServices({ platformId: account.base.platformId })
    // 获取配置项 - 可选择的平台
    options.platforms.length === 0 && actions.getAvailablePlatformList()
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
        actions.updateCooperationInfo(values).then(() => {
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
      cooperation: { modifiedAt } // 信息修改时间
    } = data.account || {}
    const {
      submitLoading
    } = this.state
    const {
      options: asyncOptions,
      visibility
    } = data
    const asyncVisibility = {
      ...visibility.cooperateNoticeFields,
      ...visibility.advertisingFields
    }
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
