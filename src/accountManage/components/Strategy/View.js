/**
 * 策略信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { Button, Form, Tooltip, Icon } from "antd";
import FieldView from "@/accountManage/base/FeildView";
import { booleanDisplay, handleReason, weeksToNames } from "@/accountManage/util";
import { dateDisplay } from "../../util";

@Form.create()
export default class StrategyView extends Component {
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
      isFamous,
      strategyInfo: {
        onShelfStatus: {
          aOnShelfStatus,
          aOffShelfReasonStringList,
          bOnShelfStatus,
          bOffShelfReasonStringList
        } = {},
        disapprovalReason,
        isContacted,
        isSignedOff,
        isOnline,
        isOpen,
        isShielded,
        approvedStatus,
        strategy = {},
        maxOrderCount,
        maxOrderCountNote,
        strategyModifiedAt // 信息修改时间
      }
    } = data.account || {}
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: {dateDisplay(strategyModifiedAt) || '--'}</span>
      {this.props.readOnly ? null : <a onClick={() => onModuleStatusChange('edit')} style={{ fontSize: '14px' }}>
        <Icon type="edit" style={{ marginRight: '6px' }} />
        编辑
      </a>}
      {/*<Button type='primary' onClick={() => onModuleStatusChange('edit')}>编辑</Button>*/}
    </div>;

    let approvedText
    switch (parseInt(approvedStatus)) {
      case 1:
        approvedText = '未审核'
        break;
      case 2:
        approvedText = '审核成功'
        break;
      case 3:
        approvedText = '审核失败'
        break;
      default:
        approvedText = '--'
        break
    }
    return <div className='module-item-container'>
      <ModuleHeader title={configureModule.title} right={right} />
      <ul className='content-wrap'>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>上架信息</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <div className="view-fields-container">
              <div className='right-wrap'>
                <FieldView width={120} title="审核状态" value={approvedText} />
                <FieldView width={120} title="是否与博主联系" value={booleanDisplay(isContacted)} />
                <FieldView width={120} title="是否在C端已注销" value={booleanDisplay(isSignedOff)} />
                <FieldView width={120} title="是否可售卖" value={booleanDisplay(isOnline)} />
                <FieldView width={120} title="是否公开" value={booleanDisplay(isOpen)} />
                <FieldView width={120} title="是否被官方屏蔽" value={booleanDisplay(isShielded)} />
                <FieldView width={120} title="可在A端上架" value={booleanDisplay(aOnShelfStatus)} />
                <FieldView width={120} title="可在B端上架" value={booleanDisplay(bOnShelfStatus)} />
              </div>
            </div>
          </div>
        </li>
        <li className='subclass-item-wrap'>
          <h4 className='subclass-head'>
            <span className='text'>接单策略</span>
            <small className='line' />
          </h4>
          <div className='subclass-content'>
            <div className="view-fields-container">
              {
                (Object.keys(strategy).length > 0 || maxOrderCount > 0) ?
                  <div className='right-wrap'>
                    <FieldView width={70} title="暂离策略" value={
                      Object.keys(strategy).length > 0 ? <div>
                        <div style={{ paddingBottom: "8px" }}>
                          暂离
                          {strategy.type === 1 && "（每日）"}
                          {strategy.type === 2 && `（每周：${weeksToNames(strategy.weeks).join('，')}）`}
                        </div>
                        {(strategy.type === 1 || strategy.type === 2) &&
                        <FieldView width={70} title="暂离时间" value={
                          `${strategy.startTimeOfTime} - ${strategy.endTimeOfTime}`
                        } />}
                        {strategy.type === 3 &&
                        <FieldView width={70} title="暂离时间" value={
                          `${strategy.startTimeOfDate} - ${strategy.endTimeOfDate}`
                        } />}
                        <FieldView width={40} title="备注" value={strategy.comment} />
                      </div> : ''
                    } />
                    <FieldView width={70} title="接单策略" value={
                      maxOrderCount > 0 ? <div>
                        <div style={{ paddingBottom: "8px" }}>
                          每日最大接单数 {maxOrderCount}
                        </div>
                        <FieldView width={40} title="备注" value={maxOrderCountNote} />
                      </div> : ''
                    } />
                  </div> : <div className='right-wrap'>--</div>
              }
            </div>
          </div>
        </li>
      </ul>
    </div>
  }
}
