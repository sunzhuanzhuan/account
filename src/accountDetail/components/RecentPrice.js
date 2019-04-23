import React, { Component } from 'react'
import { List, message, Spin, Row, Col, Alert, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import "./RecentPrice.less"
import qs from "qs";
import { Route, withRouter } from 'react-router-dom'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import * as commonAction from "@/actions";

class RecentPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      hasMore: true,
      page: 0,
      visable: true,
      bigLoading: true,
      warnMessage: false,
      account_id: qs.parse(window.location.search.substring(1)).accountId
    };
  }
  componentDidMount = () => {
    this.props.actions.getRecentReservationOrderPriceList({ account_id: this.state.account_id, page: 1, page_size: 10 }).then((res) => {
      this.setState({
        bigLoading: false,
      });
    });
  }
  handleClose = () => {
    this.setState({ visable: false })
  }
  handleInfiniteOnLoad = (value) => {
    this.setState({
      loading: true,
    });
    this.props.actions.AddGetPriceList({ account_id: this.state.account_id, page: value, page_size: 10 }).then((res) => {
      if (res.data.length < 10) {
        this.setState({
          hasMore: false,
          loading: false,
          warnMessage: true
        });
        return;
      }
      this.setState({
        loading: false,
      });
    });
  }
  render() {
    const { visable, bigLoading, warnMessage } = this.state
    const { accountDetail: { recentReservationOrderPriceList }, cooperationTips } = this.props

    return (
      <div className="recent-price-wxy">
        <div>
          <span style={{ color: '#999', paddingLeft: 30 }}>
            合作须知：
          </span>
          {cooperationTips}
        </div>
        {visable ? <Alert message="说明:本页展示该账号最近半年在微播易平台的应约时间,价格名称,应约价" type="warning" showIcon closable afterClose={this.handleClose} style={{ marginTop: 20 }} /> : null}
        <div style={{ marginTop: 20 }}>
          <div>
            <Row className="price-table-row title">
              <Col span={8}>应约时间</Col>
              <Col span={8}>价格名称</Col>
              <Col span={8}>应约价(元)</Col>
            </Row>
          </div>
          <Spin spinning={bigLoading} >
            <div style={{ height: 300, overflowY: "auto" }}>
              {recentReservationOrderPriceList.length > 0 ? <InfiniteScroll
                initialLoad={false}
                pageStart={1}
                loadMore={this.handleInfiniteOnLoad}
                hasMore={!this.state.loading && this.state.hasMore}
                useWindow={false}
              >
                <List
                  itemLayout="vertical"
                  dataSource={recentReservationOrderPriceList}
                  renderItem={(item, index) => (
                    <List.Item key={index} style={{ marginTop: 16 }}>
                      <Row className="price-table-row">
                        <Col span={8}>
                          {item.created_time}
                        </Col>
                        <Col span={8}>
                          {item.price_label}
                        </Col>
                        <Col span={8}>
                          {item.deal_price}
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                >
                  {this.state.loading && this.state.hasMore && (
                    <div style={{ textAlign: "center" }}>
                      <Spin />
                    </div>
                  )}
                  {warnMessage ? <div style={{ textAlign: "center", paddingTop: 10 }}>已经加载到底部了</div> : null}
                </List>
              </InfiniteScroll> : <div style={{ textAlign: "center", color: "#ccc", paddingTop: 30 }}> 暂无数据</div>}
            </div>
          </Spin>
        </div>

      </div >

    );
  }
}

const mapStateToProps = (state) => {
  return {
    accountDetail: state.accountDetailReducer
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...commonAction, ...action }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RecentPrice))

