/**
 * 订单信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { Statistic, Row, Col, Empty, Table, Alert } from "antd";
import OrderFilterForm from "@/accountManage/components/common/OrdersFilterForm";
import ScrollTable from '@/components/Scolltable'

// 需求详情
const requirementPath = (id, hash = '') => {
  const babysitterHost = window.bentleyConfig.babysitter_host.value || 'http://toufang.weiboyi.com';
  return `${babysitterHost}/pack/order/infoformanager/order_id/${id}?no_conversation`
  // #${hash}
}
const columns = [
  {
    title: '需求名称',
    dataIndex: 'requirement_name',
    render: (text, record) => {
      return text || '-'
    }
  },
  {
    title: '需求/订单ID',
    dataIndex: 'requirement_id',
    render: (data, record) => {
      return <div>
        需求：{data}
        <br />
        订单：<a target="_blank" href={requirementPath(record.order_id)}>{record.order_id}</a>
      </div>
    }
  },
  {
    title: '需求/回复',
    dataIndex: 'execution_evidence_code',
    render: (data, record) => {
      return <div>
        <a target="_blank" href={requirementPath(record.order_id, 'reservationDocument')}>查看需求描述</a>
        <br />
        <a target="_blank" href={requirementPath(record.order_id, 'requireDescription')}>查看应约回复</a>
      </div>
    }
  },
  {
    title: '订单状态',
    dataIndex: 'reservation_status_name',
    render: (text, record) => {
      return <div>
        预约状态：{text}
        <br />
        客户确认状态：{record.customer_confirmation_status_name}
        <br />
        执行状态：{record.execution_status_name}
      </div>
    }
  },
  {
    title: '执行价格名称',
    dataIndex: 'accept_reservation_chosen_price',
    render: (name, record) => {
      return <div>
        {name || '-'}
      </div>
    }
  },
  {
    title: '账号报价（元）',
    dataIndex: 'quoted_price',
    render: (num, record) => {
      return <div>
        {num || '-'}
      </div>
    }
  },
  {
    title: '订单成本价（元）',
    dataIndex: 'price',
    render: (num, record) => {
      return <div>
        {num || '-'}
      </div>
    }
  },
  {
    title: '销售/执行人/BP',
    dataIndex: 'owner_admin_name',
    render: (name, record) => {
      return <div>
        销售：{name || '-'}
        <br />
        执行人：{record.executor_admin_name || '-'}
        <br />
        BP：{record.bp_name || "-"}
      </div>
    }
  },
  {
    title: '时间',
    dataIndex: 'created_time',
    render: (date, record) => {
      return <div>
        创建时间：{date}
        <br />
        应约或者拒约的时间：{record.accept_reservation_time || record.reject_reservation_time || '-'}
        <br />
        回填执行链接时间：{record.execution_completed_time || '-'}
      </div>
    }
  },
  {
    title: '公司简称/项目/品牌',
    dataIndex: 'company_name',
    render: (name, record) => {
      return <div>
        公司简称：{name || '-'}
        <br />
        项目名称：{record.project_name || '-'}
        <br />
        品牌名称：{record.brand_name || '-'}
      </div>
    }
  }
]

export default class Orders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: {
        page: 1,
        pageSize: 50,
        account_id: props.data.account.id,
        reservation_status: ['2']
      }
    }
  }

  getList = (params = {}) => {
    const { actions } = this.props
    let search = { ...this.state.search, ...params }
    this.setState({ listLoading: true, search })
    actions.getOrdersByAccount(search).finally(() => {
      this.setState({ listLoading: false })
    })
  }

  componentDidMount() {
    const { actions } = this.props
    actions.getOrdersFilterItem()
    this.getList()
  }

  render() {
    const {
      data,
      actions,
      module: configureModule, platform: configurePlatform
    } = this.props
    const { options, orders: { list, source, total, page, pageSize } } = data
    const pagination = {
      total,
      pageSize: parseInt(pageSize),
      current: page,
      showSizeChanger: true,
      pageSizeOptions: ["50", "100", "200"],
      onShowSizeChange: (current, pageSize) => {
        this.getList({ page: 1, pageSize })
      },
      onChange: (current) => {
        this.getList({ page: current })
      }

    }

    const listScrollWidth = list.length ? 1800 : 100
    return <div className='module-item-container'>
      <ModuleHeader title={configureModule.title} />
      <section className='content-wrap'>
        <div className='orders-filter-container'>
          <OrderFilterForm
            loading={this.state.listLoading}
            options={options.orderFilterOptions}
            actions={actions}
            search={this.state.search}
            getList={this.getList}
          />
        </div>
        <Alert message={'订单数量：' + total} style={{ marginBottom: 12 }} />
        <div>
          <ScrollTable scrollClassName='.ant-table-body' widthScroll={listScrollWidth}>
            <Table
              loading={this.state.listLoading}
              dataSource={list.map(key => source[key])}
              pagination={pagination}
              scroll={list.length ? { x: listScrollWidth } : {x: listScrollWidth}}
              columns={columns}
            />
          </ScrollTable>
        </div>
      </section>
    </div>
  }
}
