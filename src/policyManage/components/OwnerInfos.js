/**
 * Created by lzb on 2020-04-10.
 */
import React, { useEffect, useState } from 'react';
import { Descriptions, Icon, Modal, Table, Divider } from "antd";
import { OssUpload } from "wbyui";

const OwnerInfos = (props) => {

  // 图片上传Token
  const [ uploadToken, setUploadToken ] = useState("")
  const [ uploadFile, setUploadFile ] = useState([])
  const [ modal, setModal ] = useState(false)

  useEffect(() => {
    // 获取最新合同

    // 获取上传图片token
    props.actions.getNewToken().then(({ data: authToken }) => {
      setUploadToken(authToken)
    })

    // 获取全部合同列表
    getList(1)

  }, [])


  const uploadChange = ({ file }) => {
    if (file.percent > 90) {
      file.percent = 90
    }
    if (file.status === "removed") {
      setTimeout(() => {
        setUploadFile([])
      }, 1000);
    }
    if (file.status === "done") {
      file.status = "uploading"
      // TODO: 提交合同接口
      setTimeout(() => {
        file.percent = 100
        file.status = "done"
        setUploadFile([ file ])
      }, 2000);
    }
    setUploadFile([ file ])
  }

  const columns = [
    {
      title: '合同名称',
      dataIndex: 'adOrderNumber'
    },
    {
      title: '添加人',
      dataIndex: 'createdName',
    },
    {
      title: '添加时间',
      dataIndex: 'createdAt',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (id, record) => {
        return <div>
          <a>删除</a>
          <Divider type="vertical" />
          <a>下载</a>
        </div>
      }
    }
  ]

  const getList = (pageNum = 1, pageSize = 10) => {
    const { actions } = props
    actions.contractListByOwner({
      pageNum,
      pageSize,
      mcnId: 122
    })
  }

  const {  keys, source, total, pageNum, pageSize } = props.list

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

  const dataSource = keys.map(key => source[key])


  return (
    <div className="policy-manage-owner-infos-container">
      <Descriptions column={1}>
        <Descriptions.Item label="主账号名称">cceshitest</Descriptions.Item>
        <Descriptions.Item label="主账号ID">1810000000</Descriptions.Item>
        <Descriptions.Item label="合同附件" className="align-top">
          <OssUpload
            authToken={uploadToken}
            fileList={uploadFile}
            rule={{
              bizzCode: 'FWP_QUALIFICATIONS_UPLOAD',
              max: 50
            }}
            tipContent="支持PDF、DOCX、DOC、DOT、DOTX格式，小于50M的文件上传"
            onChange={uploadChange}
          >
            <a><Icon type="upload" /> 上传合同</a>
          </OssUpload>
          <a className="more-btn" onClick={() => setModal(!modal)}>全部合同</a>
        </Descriptions.Item>
      </Descriptions>
      <Modal visible={modal} title="查看全部合同" onCancel={() => setModal(!modal)}>
        <Table
          dataSource={dataSource}
          pagination={paginationProps}
          columns={columns}
          scroll={{ x: columns.scrollX }}
        />
      </Modal>
    </div>
  );
};

export default OwnerInfos;
