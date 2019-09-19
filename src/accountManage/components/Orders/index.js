/**
 * 订单信息
 */
import React, { Component } from "react"
import { ModuleHeader } from "@/accountManage/components/common/ModuleHeader";
import { Statistic, Row, Col, Empty, Table, Alert } from "antd";
import OrderFilterForm from "@/accountManage/components/common/OrdersFilterForm";

const columns = [
  {
    title: '需求名称',
    dataIndex: 'execution_evidence_code',
    fixed: 'left',
    render: (text, record) => {
      return text
    }
  },
  {
    title: '需求/订单ID',
    dataIndex: 'execution_evidence_code',
    render: (data, record) => {
      return <div>
        需求：11111
        <br />
        订单：<a target="_blank" href={data}>{data}</a>
      </div>
    }
  },
  {
    title: '需求/回复',
    dataIndex: 'execution_evidence_code',
    render: (data, record) => {
      return <div>
        <a target="_blank" href={record.po_path}>查看需求描述</a>
        <br />
        <a target="_blank" href={record.po_path}>查看应约回复</a>
      </div>
    }
  },
  {
    title: '订单状态',
    dataIndex: 'execution_evidence_code',
    render: (data, record) => {
      return <div>
        预约状态：
        <br />
        客户确认状态：
        <br />
        执行状态：
      </div>
    }
  },
  {
    title: '执行价格名称',
    dataIndex: 'execution_evidence_code',
    render: (data, record) => {
      return <div>
        展示该订单客户确认的价格名称
      </div>
    }
  },
  {
    title: '账号报价（元）',
    dataIndex: 'execution_evidence_code',
    render: (num, record) => {
      return <div>
        {num}
      </div>
    }
  },
  {
    title: '订单成本价（元）',
    dataIndex: 'execution_evidence_code',
    render: (num, record) => {
      return <div>
        {num}
      </div>
    }
  },
  {
    title: '销售/执行人/BP',
    dataIndex: 'execution_evidence_code',
    render: (data, record) => {
      return <div>
        销售：
        <br />
        执行人：
        <br />
        BP：
      </div>
    }
  },
  {
    title: '时间',
    dataIndex: 'execution_evidence_code',
    render: (data, record) => {
      return <div>
        创建时间：
        <br />
        应约或者拒约的时间：
        <br />
        回填执行链接时间：
      </div>
    }
  },
  {
    title: '公司简称/项目/品牌',
    dataIndex: 'execution_evidence_code',
    render: (data, record) => {
      return <div>
        公司简称：
        <br />
        项目名称：
        <br />
        品牌名称：
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
        pageSize: 50
      }
    }
  }

  getList = (params = {}) => {
    const { actions } = this.props
    let search = { ...this.state.search, ...params }
    this.setState({ listLoading: true, search })
    /*actions.getSummaryListByOrder(search).finally(() => {
      this.setState({ listLoading: false })
    })*/
  }

  componentDidMount() {
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
      pageSize,
      current: page,
      onChange: (current) => {
        this.getList({ page: current })
      }
    }
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
        <Alert message={'订单数量：' + total} />
        <div style={{width: 1200}}>
          <Table
            // loading={this.state.listLoading}
            dataSource={list.map(key => source[key])}
            pagination={pagination}
            columns={columns}
          />
        </div>
      </section>
    </div>
  }
}
