/**
 * 更新主账号信息
 * Created by lzb on 2019-11-04.
 */
import React, { useState, useRef, useEffect } from 'react';
import OwnerForm from "../components/UpdateOwnerForm";
import { Button, Dropdown, Modal, Table, Icon, Menu } from "antd";
import { bindActionCreators } from "redux";
import * as commonAction from "@/actions";
import * as action from "../actions";
import { connect } from "react-redux";
import LoadingWrapped from "@/base/LoadingWrapped";
import { Link } from "react-router-dom";

const mediaColumns = [
  {
    title: "修改时间",
    dataIndex: "createdAt"
  },
  {
    title: "操作人",
    dataIndex: "createdName"
  },
  {
    title: "资源媒介",
    dataIndex: "afterColumnValueName"
  }
]
const cellPhoneColumns = [
  {
    title: "修改时间",
    dataIndex: "createAt"
  },
  {
    title: "操作人",
    dataIndex: "createByName"
  },
  {
    title: "手机号",
    dataIndex: "cellPhone"
  },
  {
    title: "修改原因",
    dataIndex: "reason"
  }
]
const paymentColumns = [
  {
    title: "修改时间",
    dataIndex: "createdAt",
    align: "center"
  },
  {
    title: "修改人",
    dataIndex: "createdByName",
    align: "center"
  },
  {
    title: "操作端口",
    dataIndex: "createdFromName",
    align: "center",
    width: 60
  },
  {
    title: "修改结果",
    dataIndex: "contentName"
  }
]


const UpdateOwnerPage = (props) => {
  const [modal, setModal] = useState(null)
  const [dataForMedia, setMediaData] = useState({})
  const [dataForPhone, setPhoneData] = useState([])
  const [dataForPayment, setPaymentData] = useState([])
  const [listLoading, setListLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const [showButton, setShowButton] = useState({})
  const { id } = props.match.params


  const modalProps = {
    footer: null,
    bodyStyle: { padding: 10, maxHeight: 400, overflow: "auto" },
    maskClosable: false,
    onCancel: () => setModal(null)
  }

  // 获取基本信息
  useEffect(() => {
    setPageLoading(true)
    // 媒介列表
    props.actions.getMediums({ mcnId: id })
    // 顶部按钮类型
    props.actions.isCanUpdateUserInfo({ mcnId: id }).then(({ data }) => {
      setShowButton(data)
    })
    // 主账号详情
    props.actions.getOwnerDetail({ id }).then(() => {
      setPageLoading(false)
    }).catch((err) => {
      setPageLoading(err)
    });
    //主账号类型
    props.actions.getOwnerTypes();

  }, [id])

  // 弹窗
  useEffect(() => {
    if (modal === "media") {
      getMediaList()
    } else if (modal === "cellPhone") {
      getPhoneList()
    }else if (modal === "payment") {
      getPaymentList()
    }
  }, [modal])

  const getMediaList = (currentPage = 1, pageSize = 10) => {
    setListLoading(true)
    props.actions.mcnAdminUpdateHistory({
      page: { currentPage, pageSize },
      form: { mcnId: linkUserId }
    }).then(({ data }) => {
      setMediaData(data)
    }).finally(() => {
      setListLoading(false)
    })
  }
  const getPhoneList = () => {
    setListLoading(true)
    props.actions.phoneUpdateHistory({ mcnId: linkUserId })
      .then(({ data }) => {
        setPhoneData(data)
      })
      .finally(() => {
        setListLoading(false)
      })
  }
  const getPaymentList = (pageNum = 1, pageSize = 10) => {
    setListLoading(true)
    props.actions.listMcnPaymentInfo({
      pageNum, pageSize,
      mcnId: linkUserId
    }).then(({ data }) => {
      setPaymentData(data)
    }).finally(() => {
      setListLoading(false)
    })
  }

  const mediaPagination = {
    total: dataForMedia.total,
    pageSize: dataForMedia.pageSize,
    current: dataForMedia.pageNum,
    onChange: (currentPage) => {
      getMediaList(currentPage)
    }
  }
  const paymentPagination = {
    total: dataForPayment.total,
    pageSize: dataForPayment.pageSize,
    current: dataForPayment.pageNum,
    onChange: (currentPage) => {
      getPaymentList(currentPage)
    }
  }

  let linkUserId = props.ownerInfo.userId
  let linkUserName = props.ownerInfo.identityName
  let linkHost = props.config.babysitterHost

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a onClick={() => {
          if (props.ownerInfo.paymentInfoIsComplete === 1) {
             window.open(`/account/manage/platform/${linkUserId}`)
          }else {
            Modal.info({
              title: "支付信息未完善",
              content: "当前主账号的支付信息未完善，无法添加账号，请先完善支付信息后再添加账号！"
            })
          }
        }}>增加账号</a>
      </Menu.Item>
      {showButton.policy  &&
      <Menu.Item key="2">
        <Link target="_blank" to={`/account/policy/list/${linkUserId}`}>采购政策</Link>
      </Menu.Item>}
      {showButton.channelDiscount > 0 &&
      <Menu.Item key="4">
        <Link target="_blank" to={`/account/discount?userId=${linkUserId}`}>修改渠道折扣</Link>
      </Menu.Item>}
      {showButton.channelDiscount < 0 &&
      <Menu.Item key="5">
        <Link target="_blank" to={`/account/discount?userId=${linkUserId}&name=${linkUserName}`}>添加渠道折扣</Link>
      </Menu.Item>}
    </Menu>
  );

  return (
    <LoadingWrapped loading={pageLoading}>
      <div className="update-owner-page-container">
        <h2 className="update-owner-page-title">
          修改主账号
          <div>
            {showButton.grossPayment > 0 &&
            <Button type="primary" target="_blank" href={`${linkHost}/payment/manager/paymentlist/serviceProvider/1/userId/${linkUserId}`}>修改自营支付方式</Button>}
            {showButton.grossPayment < 0 &&
            <Button type="primary" target="_blank" href={`${linkHost}/payment/manager/paymentlist/serviceProvider/1/userId/${linkUserId}`}>添加自营支付方式</Button>}
            {showButton.netPayment > 0 &&
            <Button type="primary" target="_blank" href={`${linkHost}/payment/manager/paymentlist/serviceProvider/2/userId/${linkUserId}`}>修改直供支付方式</Button>}
            {showButton.netPayment < 0 &&
            <Button type="primary" target="_blank" href={`${linkHost}/payment/manager/paymentlist/serviceProvider/2/userId/${linkUserId}`}>添加直供支付方式</Button>}
            <Dropdown overlay={menu} trigger={['click']}>
              <Button>
                其他操作 <Icon type="down" />
              </Button>
            </Dropdown>
          </div>
        </h2>
        <OwnerForm
          setModal={setModal}
          {...props.ownerInfo}
          mediumsOptions={props.mediums}
          actions={props.actions}
          config={props.config}
          auth={props.auth}
          ownerTypesOptions={props.ownerTypes}
        />
        <Modal {...modalProps} title="媒介修改历史" visible={modal === "media"}>
          <Table
            size="small"
            columns={mediaColumns}
            loading={listLoading}
            dataSource={dataForMedia.list}
            pagination={mediaPagination}
            rowKey="id"
          />
        </Modal>
        <Modal {...modalProps} title="修改历史" visible={modal === "cellPhone"}>
          <Table
            size="small"
            columns={cellPhoneColumns}
            loading={listLoading}
            dataSource={dataForPhone}
            pagination={false}
            rowKey="id"
          />
        </Modal>
        <Modal {...modalProps} title="修改历史" visible={modal === "payment"}>
          <Table
            size="small"
            columns={paymentColumns}
            loading={listLoading}
            dataSource={dataForPayment.list}
            pagination={paymentPagination}
            rowKey="id"
          />
        </Modal>
      </div>
    </LoadingWrapped>
  );
};

const mapStateToProps = (state) => {
  return {
    ownerInfo: state.ownerManageReducer.ownerInfo,
    mediums: state.ownerManageReducer.mediums,
    auth: state.authorizationsReducers.authVisibleList,
    userInfo: state.loginReducer.userLoginInfo.user_info,
    config: state.commonReducers.config,
    ownerTypes: state.ownerManageReducer.ownerTypes
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...commonAction, ...action }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateOwnerPage);
