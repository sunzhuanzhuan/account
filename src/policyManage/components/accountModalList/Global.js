/**
 * Created by lzb on 2020-04-15.
 */
import React, { useEffect, useState } from 'react';
import { Table, Icon, Badge, List } from "antd";
import { oneOf } from 'prop-types';

const Global = (props) => {
  const [loading, setLoading] = useState(false)
  const handleTableChange = (pagination, filters, sorter) => {
    setLoading(true)
    props.actionSearch({
      page: {
        currentPage: pagination.current,
        pageSize: pagination.pageSize
      },
      form: {
        policyId: props.record.id,
        platformId: filters.platformId,
        onShelfStatus: filters.onShelfStatus,
        ruleId: filters.ruleId
      }
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
  const { list = {}, isRuleId, ruleList = [] } = props

  const ruleIdCol = {
    title: '规则ID',
    dataIndex: 'ruleId',
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
          current: pageNum,
          showQuickJumper: true,
          showSizeChanger: true,
          onChange: () => { },
          onShowSizeChange: () => { }
        }}
        onChange={handleTableChange}
        scroll={{ y: 360 }}
      />
    </div>
  );
};

export default Global;
const OnShelfStatus = ({ status, text = 'A' }) => {
  return <span style={{ marginRight: 5 }}> <Badge status={status == 1 ? 'success' : 'error'} text={`${text}端${status == 1 ? '上' : '下'
    }架`} /> </span>
}
