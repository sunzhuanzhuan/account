/**
 * Created by lzb on 2020-04-15.
 */
import React, { useEffect, useState } from 'react';
import { Table, Icon, Badge } from "antd";
import { getFollowerCount } from "@/policyManage/utils";

const Global = (props) => {
  const [loading, setLoading] = useState(false)
  const { platformListByPolicy = [] } = props
  const handleTableChange = (pagination, filters, sorter) => {
    setLoading(true)
    props.actionSearch({
      page: {
        currentPage: pagination.current,
        pageSize: pagination.pageSize
      },
      form: {
        policyId: props.record.id,
        platformId: filters.platformId?.join(','),
        aOnShelfStatus: filters.aOnShelfStatus?.join(','),
        bOnShelfStatus: filters.bOnShelfStatus?.join(','),
        ruleId: filters.ruleId?.join(',')
      }
    }).finally(() => setLoading(false))
  };
  const columns = [
    {
      title: 'account_id',
      dataIndex: 'accountId',
      render: (id, record) => {
        return <span>{id}{record.isDeleted === 1 ? "(已删除)" : ""}</span>
      }
    },
    {
      title: '全部平台',
      dataIndex: 'platformId',
      filterMultiple: false,
      filters: platformListByPolicy.map(one => ({ text: one.platformName, value: one.id })),
      align: 'right',
      width: '100px',
      render: (text, record) => <div style={{textAlign: 'center'}}>
        {record.platformName}
      </div>
    },
    {
      title: '账号名称',
      dataIndex: 'snsName',
      align: 'center',
    },
    {
      title: '账号ID',
      dataIndex: 'snsId',
      align: 'center'
    },
    {
      title: '粉丝数',
      dataIndex: 'followerCount',
      width: '120px',
      align: 'center',
      render: text => getFollowerCount(text)
    },
    {
      title: 'A端上架状态',
      dataIndex: 'onShelfStatus',
      key: 'aOnShelfStatus',
      filters: [
        { text: '上架', value: 1 },
        { text: '下架', value: 2 },
      ],
      filterMultiple: false,
      align: 'center',
      width: '120px',
      render: (status) => {
        return status ? <OnShelfStatus status={status.aOnShelfStatus} text='A' />: '-'
      }
    },
    {
      title: 'B端上架状态',
      dataIndex: 'onShelfStatus',
      key: 'bOnShelfStatus',
      filters: [
        { text: '上架', value: 1 },
        { text: '下架', value: 2 },
      ],
      filterMultiple: false,
      align: 'center',
      width: '120px',
      render: (status) => {
        return status ? <OnShelfStatus status={status.bOnShelfStatus} text='B' /> : '-'
      }
    },
    {
      title: '主页链接',
      dataIndex: 'url',
      align: 'center',
      width: '100px',
      render: (url) => {
        return url && <a href={url} target="_blank" >主页链接</a>
      }
    },
  ];
  const { list = {}, isRuleId, ruleList = [] } = props

  const ruleIdCol = {
    title: '规则ID',
    dataIndex: 'ruleId',
    align: "center",
    filterMultiple: false,
    filters: ruleList.map(one => ({ text: `规则${one.ruleId}`, value: one.ruleId })),
    width: '100px',
  }
  const {
    total, pageSize, pageNum
  } = list
  return (
    <div>
      <Table
        loading={loading}
        columns={isRuleId ? [ruleIdCol, ...columns] : columns}
        dataSource={list.list}
        pagination={{
          total,
          pageSize,
          pageSizeOptions: ['10', ' 20', ' 50', ' 100'],
          current: pageNum,
          showQuickJumper: true,
          showSizeChanger: true,
          onChange: () => { },
          onShowSizeChange: () => { }
        }}
        onChange={handleTableChange}
        scroll={{ y: 360 }}
        rowKey="accountId"
      />
    </div>
  );
};

export default Global;
export const OnShelfStatus = ({ status, text = 'A' }) => {
  return <span style={{ marginRight: 5 }}> <Badge status={status == 1 ? 'success' : 'error'} text={`${text}端${status == 1 ? '上' : '下'
    }架`} /> </span>
}
