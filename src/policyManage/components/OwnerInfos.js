/**
 * Created by lzb on 2020-04-10.
 */
import React, { useEffect, useState } from 'react';
import { Descriptions, Icon, Modal, Table, Divider } from "antd";
import { OssUpload } from "wbyui";
const { confirm } = Modal;

const OwnerInfos = (props) => {

  // 图片上传Token
  const [uploadToken, setUploadToken] = useState("")
  const [uploadFile, setUploadFile] = useState([])
  const [modal, setModal] = useState(false)
  const { actions } = props
  const pathName = window.location.pathname
  const mcnId = pathName.substring(pathName.lastIndexOf('/') + 1)//获取路径中的mcnId
  const [searchParams, setSearchParams] = useState({})
  const [lateUploadId, setLateUploadId] = useState(0)
  useEffect(() => {

    // 获取上传图片token
    props.actions.getNewToken().then(({ data: authToken }) => {
      setUploadToken(authToken)
    })
    // 获取全部合同列表
    getList(1)
    // 获取最新合同
    getLatestUploadAsync()
  }, [])
  async function getLatestUploadAsync() {
    const { data = {} } = await actions.getLatestUpload({ mcnId: mcnId })
    const { contractInfo } = data
    if (contractInfo) {
      const initFile = [{
        status: "done",
        name: contractInfo.contractFileName,
        uid: contractInfo.id,
        url: contractInfo.contractFileUrl
      }]
      setUploadFile(initFile)
      setLateUploadId(contractInfo.id)
    }
  }
  function showConfirm() {
    confirm({
      title: '确认删除合同吗?',
      content: <div>删除后将无法恢复</div>,
      onOk() {
        contractDeleteAsync(lateUploadId)
        setUploadFile([])
        getLatestUploadAsync()
      },
    });
  }
  const uploadChange = ({ file }) => {
    if (file.percent > 90) {
      file.percent = 90
    }
    if (file.status === "removed") {
      showConfirm()
    }
    if (file.status === "done") {
      file.status = "uploading"
      // TODO: 提交合同接口
      contractAddAsync()
      file.percent = 100
      file.status = "done"
      file.url = file.response.url
      setUploadFile([file])
      console.log("uploadChange -> file", file)
    }
    setUploadFile([file])
  }
  //添加合同
  const contractAddAsync = async (file = {}) => {
    const { url, name, } = file
    const { data } = await actions.contractAdd({
      contractFileUrl: url,
      contractFileName: name,
      mcnId: mcnId
    })
    setLateUploadId(data)
  }
  const columns = [
    {
      title: '合同名称',
      dataIndex: 'contractFileName'
    },
    {
      title: '添加人',
      dataIndex: 'createdByName',
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
          <a onClick={() => {
            contractDeleteAsync(id)
            getList(searchParams)
          }}>删除</a>
          <Divider type="vertical" />
          <a href={record.contractFileUrl} download={record.contractFileName} target="_blank">下载</a>
        </div>
      }
    }
  ]

  const getList = (pageNum = 1, pageSize = 10) => {

    actions.contractListByOwner({
      pageNum,
      pageSize,
      mcnId: mcnId
    })
  }

  const { keys, source, total, pageNum, pageSize } = props.list

  const paginationProps = {
    total,
    pageSize,
    current: pageNum,
    onChange: (currentPage) => {
      getList(currentPage)
      setSearchParams(currentPage)
    }
  }

  const dataSource = keys.map(key => source[key])

  const contractDeleteAsync = async (id) => {
    await actions.contractDelete({ id: id })
  }


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
              max: 50,
              suffix: '.pdf,.docx,.doc,.dot,.dotx'
            }}
            tipContent="支持PDF、DOCX、DOC、DOT、DOTX格式，小于50M的文件上传"
            onChange={uploadChange}
          >
            <a><Icon type="upload" /> 上传合同</a>
          </OssUpload>
          <a className="more-btn" onClick={() => setModal(!modal)}>全部合同</a>
        </Descriptions.Item>
      </Descriptions>
      <Modal visible={modal} title="查看全部合同"
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}>
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
