/**
 * 策略信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { Button, Form, Tooltip } from "antd";
import FieldView from "@/accountManage/base/FeildView";
import { handleReason, weeksToNames } from "@/accountManage/util";

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
        approvedStatus,
        strategy = {},
        maxOrderCount,
        maxOrderCountNote,
        strategyModifiedAt // 信息修改时间
      }
    } = data.account || {}
    const right = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近更新于: {strategyModifiedAt || '--'}</span>
      <Button type='primary' onClick={() => onModuleStatusChange('edit')}>编辑</Button>
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
        approvedText = '未审核'
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
                <FieldView width={70} title="审核状态" value={approvedText} />
                <FieldView width={70} title="是否上架" value={aOnShelfStatus && <div>
                  {aOnShelfStatus === 2 && <span>否</span>}
                  {aOnShelfStatus === 2 && aOffShelfReasonStringList &&
                  <Tooltip title={handleReason(aOffShelfReasonStringList)}>
                    <a style={{ marginLeft: '20px' }}>显示原因</a>
                  </Tooltip>
                  }
                  {aOnShelfStatus === 1 && <span>是</span>}
                </div>
                } />
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
                    {strategy.type === 3 && <FieldView width={70} title="暂离时间" value={
                      `${strategy.startTimeOfDate} - ${strategy.endTimeOfDate}`
                    } />}
                    <FieldView width={70} title="备注" value={strategy.comment} />
                  </div> : '无'
                } />
                <FieldView width={70} title="接单策略" value={
                  maxOrderCount > 0 ? <div>
                    <div style={{ paddingBottom: "8px" }}>
                      每日最大接单数 {maxOrderCount}
                    </div>
                    <FieldView width={70} title="备注" value={maxOrderCountNote} />
                  </div> : '无'
                } />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  }
}
