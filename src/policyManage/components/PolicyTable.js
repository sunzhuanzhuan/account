import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  message,
  Table,
  Divider,
  Popover
} from "antd";
import PolicyStatus from "../base/PolicyStatus";
import {
  POLICY_STATUS_ACTIVE,
  POLICY_STATUS_INACTIVE,
  POLICY_STATUS_STOP,
  POLICY_LEVEL
} from "../constants/dataConfig";
import PolicyAccountModal from "../components/PolicyAccountModal";
import StopReasonModal from "../components/StopReasonModal";
import { dateFormat, ruleDisplay, settlementDisplay } from "../utils";
import IconFont from "@/base/IconFont";
import QuestionTip from "@/base/QuestionTip";
import Yuan from "@/base/Yuan";
import './PolicyTable.less'
import { Link } from "react-router-dom";

const PolicyTable = (props) => {
  const [ accountModal, setAccountModal ] = useState({
    active: "",
    record: {}
  })
  const [ selectedRowKeys, setSelectedRowKeys ] = useState([])

  const [ stopModal, setStopModal ] = useState(false)
  const { policyList = {}, getList, dataSource = [], noColumnArr = [], isPolicy, platformListByPolicy, pageSizeOptions } = props
  const { total, pageNum, pageSize } = policyList

  const paginationProps = {
    total,
    pageSize,
    current: pageNum,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: pageSizeOptions,
    onChange: (currentPage, pageSize) => {
      getList({
        page: { currentPage: currentPage, pageSize }
      })
    },
    onShowSizeChange: (current, size) => {
      getList({
        page: { currentPage: 1, pageSize: size }
      })
    }
  }
  const rowSelectionProps = isPolicy ? {
    rowSelection: {
      selectedRowKeys,
      onChange: (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys)
      }
    }
  } : {}

  useEffect(() => {
    props.actions.getMediumsForAuth()
  }, [])


  // 停用
  const stopPolicy = (id) => {
    setStopModal(id)

  }

  // 停用原因提交
  const stopReasonSubmit = async ({ policyStopReason }) => {
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
    props.actions.downMcnPolicyData(
      { policyIdList: list }
    )
  }
  const delPolicyAsync = async (id) => {
    props.actions.delPolicy({ id: id })
    message.success('删除成功')
    getList()
  }

  const columns = [
    {
      title: '政策名称/ID',
      dataIndex: 'policyName',
      width: '240px',
      render: (name, record) => {
        return <div className='cursor-pointer'>
          <Popover trigger='hover' placement='topLeft' content={name}>
            <Link to={`/account/policy/details/${record.id}`} className='nowrap-ellipsis mw-15'>
              {name}
            </Link>
          </Popover>
          <span>ID: {record.id}</span>
        </div>
      }
    },
    {
      title: '状态/有效期',
      dataIndex: 'policyStatus',
      width: '180px',
      render: (status, record) => {
        return <>
          <PolicyStatus status={status} reason={record.policyStopReason} />
          <br />
          <span>{dateFormat(record.validStartTime, 'YYYY.M.D')} - {dateFormat(record.validEndTime, 'YYYY.M.D')}</span>
        </>
      }
    },
    {
      title: <span>政策级别<QuestionTip content={
        Object.values(POLICY_LEVEL).map(item => <div key={item.icon}>
          <IconFont type={item.icon} /> ：{item.text}<br />
        </div>)
      } /></span>,
      width: 90,
      align: 'center',
      dataIndex: 'policyLevel',
      render: (level) => {
        return <IconFont type={POLICY_LEVEL[level].icon} />
      }
    },
    {
      title: '主账号',
      dataIndex: 'identityName',
      render: (name, record) => {
        return <div>
          <Link className='nowrap-ellipsis' to={`/account/owner/update/${record.mcnId}`}>{name}</Link>
          <div className='cursor-pointer'>ID: {record.mcnId}</div>
        </div>
      }
    },
    {
      title: '平台',
      dataIndex: 'platformNames',
      render: (names, record) => {
        return record.globalAccountRule.platformList.map(p => p.platformName).join(',')
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
          {discountRuleLabel && <div>
            <span>{discountRuleLabel}</span>：
            <span>{discountRuleValue}</span>
          </div>}
          {rebateRuleLabel && <div>
            <span>{rebateRuleLabel}</span>：
            <span>{rebateRuleValue}</span>
          </div>}
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
          {isPolicy ?
            <a onClick={() => downMcnPolicyData([ id ])}>下载</a>
            : <a onClick={() => delPolicyAsync(id)}>删除</a>}
        </div>
      }
    }
  ].filter((one) => !noColumnArr.includes(one.dataIndex))
  return (
    <div className='policy-table-box'>
      {isPolicy ? <Button style={{ margin: 10 }}
        type="primary"
        disabled={selectedRowKeys.length == 0} ghost
        onClick={() => downMcnPolicyData(selectedRowKeys)}>批量下载政策</Button> : null}
      <Table
        dataSource={dataSource}
        pagination={paginationProps}
        columns={columns}
        {...rowSelectionProps}
        scroll={{ x: 2400 }}
        rowKey="id"
      />
      {accountModal.active ?
        <PolicyAccountModal modal={accountModal} setModal={setAccountModal} actions={props.actions} platformListByPolicy={platformListByPolicy} /> : null}
      {stopModal ? <StopReasonModal onCancel={stopPolicy} onOk={stopReasonSubmit} /> : null}
    </div>
  );
};


export default PolicyTable
