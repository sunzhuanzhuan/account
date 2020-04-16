import React, { useEffect, useRef, useState } from 'react';
import * as commonActions from '@/actions';
import { bindActionCreators } from "redux";
import actions from "../actions";
import { connect } from "react-redux";
import {
  Alert,
  Button,
  Checkbox,
  Form,
  Pagination,
  Tabs,
  Spin,
  message,
  Table,
  Divider, PageHeader, Popover, Icon, List
} from "antd";

import PolicyAllFilterForm from "../components/PolicyAllFilterForm";
import PolicyCard from "../components/PolicyCard";
import PolicyStatus, {
  POLICY_STATUS_ACTIVE,
  POLICY_STATUS_INACTIVE, POLICY_STATUS_STOP,
  policyStatusMap
} from "../base/PolicyStatus";
import PolicyAccountModal from "../components/PolicyAccountModal";
import _merge from 'lodash/merge'
import StopReasonModal from "../components/StopReasonModal";
import { dateFormat, ruleDisplay, settlementDisplay } from "../utils";
import OwnerInfos from "@/policyManage/components/OwnerInfos";
import { POLICY_LEVEL } from "@/policyManage/constants/dataConfig";
import IconFont from "@/base/IconFont";
import QuestionTip from "@/base/QuestionTip";
import Yuan from "@/base/Yuan";


const { TabPane } = Tabs;


const PolicyList = (props) => {

  const { keys, source, total, pageNum, pageSize } = props.policyList

  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const [stopModal, setStopModal] = useState(false)

  const [accountModal, setAccountModal] = useState({
    active: "global",
    record: {}
  })


  const search = useRef({
    page: {
      currentPage: 1,
      pageSize: 20
    }
  })

  const paginationProps = {
    total,
    pageSize,
    current: pageNum,
    onChange: (currentPage) => {
      getList({
        page: { currentPage }
      })
    }
  }
  const rowSelectionProps = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  useEffect(() => {
    getList()
    getStatistics()
    props.actions.queryMediums()
    props.actions.getGlobalRulePlatforms()
  }, [])

  const getList = ({ page, form } = {}) => {
    const { actions } = props
    search.current = {
      page: Object.assign({}, search.current.page, page),
      form: Object.assign({}, search.current.form, form)
    }
    setLoading(true)
    actions.policyAllList(search.current).then(() => {
      setLoading(false)
      setSelectedRowKeys([])
    }).catch(() => setLoading(false))
  }

  const getStatistics = (form) => {
    const { actions } = props
    actions.procurementPolicyStatistics(form).then(() => {
      setLoading(false)
    })
  }

  const onTabChange = active => {
    getList({
      form: {
        policyStatus: active === "0" ? undefined : active
      }
    })
  };


  // 停用
  const stopPolicy = (id) => {
    setStopModal(id)
  }

  // 停用原因提交
  const stopReasonSubmit = ({ policyStopReason }) => {
    return props.actions.stopPolicy({ id: stopModal, policyStopReason }).then(({ data }) => {
      message.success('操作成功')
      setStopModal()
      props.actions.syncUpdatePolicyStatus({
        key: data.id,
        policyStatus: POLICY_STATUS_STOP,
        policyStopReason,
        ...data
      })
    })
  }

  // 启用
  const startPolicy = (id) => {
    const { actions } = props
    const hide = message.loading('处理中...')
    actions.startPolicy({ id }).then(({ data }) => {
      message.success('操作成功')
      hide()
      actions.syncUpdatePolicyStatus({
        key: data.id,
        policyStatus: POLICY_STATUS_ACTIVE,
        ...data
      })
    })
  }
  //下载
  const downMcnPolicyData = (list) => {
    actions.downMcnPolicyData(
      { policyIdList: list }
    )
  }
  const columns = [
    {
      title: '政策名称/ID',
      dataIndex: 'policyName',
      render: (name, record) => {
        return <>
          <a>{name}</a>
          <br />
          <span>ID: {record.id}</span>
        </>
      }
    },
    {
      title: '状态/有效期',
      dataIndex: 'policyStatus',
      render: (status, record) => {
        return <>
          <PolicyStatus status={status} reason={record.policyStopReason} />
          <br />
          <span>{dateFormat(record.validStartTime, 'YYYY.M.D')} - {dateFormat(record.validEndTime, 'YYYY.M.D')}</span>
        </>
      }
    },
    {
      title: <span>级别<QuestionTip content={
        Object.values(POLICY_LEVEL).map(item => <div key={item.icon}>
          <IconFont type={item.icon} /> ：{item.text}<br />
        </div>)
      } /></span>,
      width: 64,
      dataIndex: 'policyLevel',
      render: (level) => {
        return <IconFont type={POLICY_LEVEL[level].icon} />
      }
    },
    {
      title: '主账号',
      dataIndex: 'identityName',
      render: (name, record) => {
        return <>
          <a>{name}</a>
          <br />
          <span>ID: {record.mcnId}</span>
        </>
      }
    },
    {
      title: '平台',
      dataIndex: 'platformNames',
      render: (names) => {
        return <>
          {names}
        </>
      }
    },
    {
      title: '全局规则/账号',
      dataIndex: 'globalAccountRule',
      render: (rule, record) => {
        const {
          discountRuleLabel,
          discountRuleValue,
          rebateRuleLabel,
          rebateRuleValue
        } = ruleDisplay(rule)
        return <>
          <span>{discountRuleLabel}</span>：
          <span>{discountRuleValue}</span>
          <br />
          <span>{rebateRuleLabel}</span>：
          <span>{rebateRuleValue}</span>
          <br />
          <span>账号数</span>：
          <a onClick={() => setAccountModal({
            active: "global",
            record
          })}>{record.globalAccountCount}</a>
        </>
      }
    },
    {
      title: '特殊规则/账号',
      dataIndex: 'specialAccountRulesCount',
      render: (count, record) => {
        return <>
          <span>特殊规则</span>：
          <span>{count || 0}个</span>
          <br />
          <span>账号数</span>：
          <a onClick={() => setAccountModal({
            active: "specific",
            record
          })}>{record.specialAccountCount}</a>
        </>
      }
    },
    {
      title: '白名单',
      dataIndex: 'whiteListCount',
      render: (count, record) => {
        return <>
          <span>账号数</span>：
          <a onClick={() => setAccountModal({
            active: "whiteList",
            record
          })}>{count}</a>
        </>
      }
    },
    {
      title: '返点规则',
      dataIndex: 'isGuaranteed',
      render: (bool, record) => {
        const {
          cycle,
          type,
          guarantee
        } = settlementDisplay(record)
        return <>
          <span>{cycle}</span>
          <br />
          <span>{type}</span>
          <br />
          {!!guarantee && <>
            <span>保底金额</span>：
            <span>{guarantee}</span>
          </>}
        </>
      }
    },
    {
      title: '执行订单数',
      dataIndex: 'globalAccountRule',
      key: 'orderNumber',
      render: ({ executionStatisticsInfo }, record) => {
        return <>
          <span>预约</span>：
          <span>{executionStatisticsInfo.executionReservationOrderCount}</span>
          <br />
          <span>派单</span>：
          <span>{executionStatisticsInfo.executionCampaignOrderCount}</span>
        </>
      }
    },
    {
      title: '执行金额',
      dataIndex: 'globalAccountRule',
      key: 'orderAmount',
      render: ({ executionStatisticsInfo }) => {
        return <>
          <span>预约</span>：
          <Yuan className='text-black' value={executionStatisticsInfo.executionReservationOrderAmount} format='0,0' />
          <br />
          <span>派单</span>：
          <Yuan className='text-black' value={executionStatisticsInfo.executionCampaignOrderAmount} format='0,0' />
        </>
      }
    },
    {
      title: '创建人/时间',
      dataIndex: 'createdByName',
      render: (name, record) => {
        return <>
          <span>{name}</span>
          <br />
          <span>{record.createdAt}</span>
        </>
      }
    },
    {
      title: '修订人/时间',
      dataIndex: 'modifiedByName',
      render: (name, record) => {
        return <>
          <span>{name}</span>
          <br />
          <span>{record.modifiedAt}</span>
        </>
      }
    },
    {
      title: '资源媒介',
      dataIndex: 'ownerAdminName'
    },
    {
      title: '操作',
      dataIndex: 'id',
      width: 110,
      fixed: 'right',
      align: 'center',
      render: (id, record) => {
        return <div>
          {
            (record.policyStatus === POLICY_STATUS_INACTIVE ||
              record.policyStatus === POLICY_STATUS_ACTIVE) &&
            <>
              <a onClick={() => stopPolicy(id)}>停用</a>
              <Divider type="vertical" />
            </>
          }
          {
            (record.policyStatus === POLICY_STATUS_STOP) &&
            <>
              <a onClick={() => startPolicy(id)}>启用</a>
              <Divider type="vertical" />
            </>
          }
          <a onClick={() => downMcnPolicyData([id])}>下载</a>
          {/* <a>删除</a> */}
        </div>
      }
    }
  ]

  const dataSource = keys.map(key => source[key])


  return (
    <div className="policy-manage-list-container">
      <PageHeader
        onBack={false}
        title="采购政策列表"
        subTitle="This is a subtitle"
      />
      <PolicyAllFilterForm actions={props.actions} getList={getList} getStatistics={getStatistics} globalRulePlatforms={props.globalRulePlatforms}
        queryMediumsList={props.queryMediumsList} />
      <Tabs onChange={onTabChange} animated={false}>
        <TabPane tab={<span>全部 <span>{props.statistics.allCount}</span></span>} key="0" />
        {
          Object.entries(policyStatusMap).map(([key, { text, field }]) => <TabPane tab={
            <span>{text} <span>{props.statistics[field]}</span></span>} key={key} />)
        }
      </Tabs>
      <Alert message={<div className='policy-list-statistics-container'>
        <span className='fields-item-'>
          政策数：400
        </span>
        <span className='fields-item-'>
          预约执行金额（元）：7000.00万
        </span>
        <span className='fields-item-'>
          预约执行订单数量：80024
        </span>
        <span className='fields-item-'>
          派单执行金额（元）：30.00万
        </span>
        <span className='fields-item-'>
          预约执行订单数量：20025
        </span>
      </div>} />
      <Button style={{ margin: 10 }}
        type="primary"
        disabled={selectedRowKeys.length == 0} ghost
        onClick={() => downMcnPolicyData(selectedRowKeys)}>批量下载政策</Button>
      <Table
        loading={loading}
        dataSource={dataSource}
        pagination={paginationProps}
        columns={columns}
        rowSelection={rowSelectionProps}
        scroll={{ x: 2400 }}
        rowKey="id"
      />
      <PolicyAccountModal modal={accountModal} setModal={setAccountModal} actions={props.actions} />
      {stopModal ? <StopReasonModal onCancel={stopPolicy} onOk={stopReasonSubmit} /> : null}
    </div >
  );
};

const mapStateToProps = (state) => ({
  common: state.commonReducers,
  policyList: state.pricePolicyReducer.policyAllList,
  statistics: state.pricePolicyReducer.policyAllStatistics,
  globalRulePlatforms: state.pricePolicyReducer.globalRulePlatforms,
  queryMediumsList: state.pricePolicyReducer.queryMediumsList,
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...commonActions,
    ...actions
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(PolicyList))
