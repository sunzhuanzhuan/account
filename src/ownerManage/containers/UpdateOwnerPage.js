/**
 * 更新主账号信息
 * Created by lzb on 2019-11-04.
 */
import React, { useState, useRef, useEffect } from 'react';
import OwnerForm from "../components/UpdateOwnerForm";
import { Modal, Table } from "antd";
import { bindActionCreators } from "redux";
import * as commonAction from "@/actions";
import * as action from "../actions";
import { connect } from "react-redux";
import LoadingWrapped from "@/base/LoadingWrapped";

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

const UpdateOwnerPage = (props) => {
  const [modal, setModal] = useState(null)
  const [dataForMedia, setMediaData] = useState({})
  const [dataForPhone, setPhoneData] = useState([])
  const [listLoading, setListLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const { id } = props.match.params


  const modalProps = {
    footer: null,
    bodyStyle: { padding: 10, maxHeight: 400, overflow: "auto" },
    maskClosable: false,
    onCancel: () => setModal(null)
  }

  // 获取媒介列表账号详情
  useEffect(() => {
    setPageLoading(true)
    props.actions.getMediums({ mcnId: id })
    props.actions.getOwnerDetail({ id }).then(() => {
      setPageLoading(false)
    }).catch((err) => {
      setPageLoading(err)
    })

  }, [id])

  // 弹窗
  useEffect(() => {
    if (modal === "media") {
      getMediaList()
    } else if (modal === "cellPhone") {
      getPhoneList()
    }
  }, [modal])

  const getMediaList = (currentPage = 1, pageSize = 10) => {
    setListLoading(true)
    props.actions.mcnAdminUpdateHistory({
      page: { currentPage, pageSize },
      form: { mcnId: 1 }
    }).then(({ data }) => {
      setMediaData(data)
    }).finally(() => {
      setListLoading(false)
    })
  }
  const getPhoneList = () => {
    setListLoading(true)
    props.actions.phoneUpdateHistory({ mcnId: 1 })
      .then(({ data }) => {
        setPhoneData(data)
      })
      .finally(() => {
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
  return (
    <LoadingWrapped loading={pageLoading}>
      <div className="update-owner-page-container">
        <h2>
          修改主账号
        </h2>
        <OwnerForm setModal={setModal} {...props.ownerInfo} mediumsOptions={props.mediums}/>
        <Modal {...modalProps} title="媒介修改历史" visible={modal === "media"}>
          <Table
            size="small"
            columns={mediaColumns}
            listLoading={listLoading}
            dataSource={dataForMedia.list}
            pagination={mediaPagination}
            rowKey="id"
          />
        </Modal>
        <Modal {...modalProps} title="修改历史" visible={modal === "cellPhone"}>
          <Table
            size="small"
            columns={cellPhoneColumns}
            listLoading={listLoading}
            dataSource={dataForPhone}
            pagination={false}
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
    userInfo: state.loginReducer.userLoginInfo.user_info
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...commonAction, ...action }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateOwnerPage);
