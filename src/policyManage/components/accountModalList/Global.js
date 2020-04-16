/**
 * Created by lzb on 2020-04-15.
 */
import React, { useEffect, useState } from 'react';
import { Table, Icon, Badge } from "antd";
import { oneOf } from 'prop-types';
import { dateFormat, ruleDisplay, settlementDisplay } from "../../utils";

const Global = (props) => {
  const [data, setData] = useState({})
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(false)

  const handleTableChange = (pagination, filters, sorter) => {
    console.log("handleTableChange -> pagination, filters, sorter", pagination, filters, sorter)
    getList({
      page: {
        currentPage: pagination.current,
        pageSize: pagination.pageSize
      },
      form: {
        policyId: props.record.id,
        platformId: filters.platformId,
        OnShelfStatus: filters
      }
    })
  };

  useEffect(() => {
    getList()
  }, [])


  const getList = async (params = {}) => {
    setLoading(true)
    await props.action(params).then(({ data }) => {
      setData(data)
    })
    setLoading(false)
  };


  const columns = [
    {
      title: 'account_id',
      dataIndex: 'accountId',
      width: '100px',
    },
    {
      title: '全部平台',
      dataIndex: 'platformId',
      filters: [{ text: '抖音', value: 'male' }, { text: '快手', value: 'female' }],
      align: 'right',
      width: '100px',
    },
    {
      title: '账号名称',
      dataIndex: 'snsName',
      align: 'center',
      width: '100px',

    },
    {
      title: '账号ID',
      dataIndex: 'snsId'
    },
    {
      title: '粉丝数',
      dataIndex: 'followerCount'
    },
    {
      title: '上下架状态',
      dataIndex: 'onShelfStatus',
      filters: [{ text: 'A端上架', value: 1 }, { text: 'A端下架', value: 2 }],
      filterMultiple: false,
      width: '200px',
      render: (text, record) => {
        const { aOnShelfStatus, bOnShelfStatus } = text
        return <div>
          <OnShelfStatus status={aOnShelfStatus} text='A' />
          <OnShelfStatus status={bOnShelfStatus} text='B' />
        </div>
      }
    },
    {
      title: '主页链接',
      dataIndex: 'url',
      align: 'center',
      width: '80px',
      render: (url) => {
        return <a href={url} target="_blank">查看</a>
      }
    },
  ];

  const { accountList = {}, rule = { discountRule: {}, rebateRule: {} } } = data
  const {
    discountRuleLabel,
    discountRuleValue,
    rebateRuleLabel,
    rebateRuleValue
  } = ruleDisplay(rule)
  const { cycle } = settlementDisplay(rule.rebateRule)
  return (
    <div>
      <ul className="policy-account-modal-rules-container">
        {/* 使用 ruleDisplay 方法获取值 */}
        <li>
          全局规则：
          <span>{discountRuleLabel}</span>：
          <span>{discountRuleValue}</span>
         ；
          <span>{rebateRuleLabel}</span>：
          <span>{rebateRuleValue}</span>
        </li>
        <li>
          返点规则：{cycle}
        </li>
      </ul>
      <Table
        columns={columns}
        dataSource={accountList.list}
        pagination={{
          ...pagination,
          showQuickJumper: true,
          showSizeChanger: true,
          onChange: () => { },
          onShowSizeChange: () => { }
        }}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ y: 200 }}
      />
    </div>
  );
};

export default Global;
const OnShelfStatus = ({ status, text = 'A' }) => {
  return <span style={{ marginRight: 5 }}> <Badge status={status == 1 ? 'success' : 'error'} text={`${text}端${status == 1 ? '上' : '下'
    }架`} /> </span>
}
