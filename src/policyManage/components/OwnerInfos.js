/**
 * Created by lzb on 2020-04-10.
 */
import React, { useEffect, useState } from 'react';
import { Descriptions, Icon, Modal, Table, Divider } from "antd";
import { OssUpload } from "wbyui";

const { confirm } = Modal;

const OwnerInfos = (props) => {

  // 文件上传Token
  const [ uploadToken, setUploadToken ] = useState("")
  const [ uploadFile, setUploadFile ] = useState([])
  const [ modal, setModal ] = useState(false)
  const { actions } = props
  const [ lateUploadId, setLateUploadId ] = useState(0)
  useEffect(() => {

    // 获取上传文件token
    props.actions.getNewToken().then(({ data: authToken }) => {
      setUploadToken(authToken)
    })

    // 获取最新合同
    getLatestUploadAsync()
  }, [])

  useEffect(() => {
    // 获取全部合同列表
    modal && getList(1)
  }, [modal])

  async function getLatestUploadAsync() {
    const { data = {} } = await actions.getLatestUpload({ mcnId: mcnId })
    if (data.id) {
      const initFile = [ {
        status: "done",
        name: data.contractFileName,
        uid: data.id,
        url: data.contractFileUrl
      } ]
      setUploadFile(initFile)
      setLateUploadId(data.id)
    }else {
      setUploadFile([])
      setLateUploadId(0)
    }
  }
  function showConfirm() {
    confirm({
      title: '确认删除合同吗?',
      content: <div>删除后将无法恢复</div>,
      onOk() {
        contractDeleteAsync(lateUploadId).then(() => {
          getLatestUploadAsync()
        })
      }
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
      actions.contractAdd({
        contractFileUrl: file.response.url,
        contractFileName: file.name,
        mcnId: mcnId
      }).then(({ data }) => {
        file.percent = 100
        file.status = "done"
        file.url = file.response.url
        setUploadFile([ file ])
        setLateUploadId(data)
      }).catch(({ errorMsg }) => {
        file.percent = 100
        file.status = "error"
        file.response = "错误: " + (errorMsg || '合同上传失败')
        setUploadFile([ file ])
        setLateUploadId(null)
      })
    }
    setUploadFile([ file ])
  }

  const columns = [
    {
      title: '合同名称',
      dataIndex: 'contractFileName'
    },
    {
      title: '添加人',
      dataIndex: 'createdByName'
    },
    {
      title: '添加时间',
      dataIndex: 'createdAt'
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (id, record, index) => {
        return <div>
          <a onClick={() => {
            contractDeleteAsync(id).then(() => {
              getList()
              if(index === 0){
                getLatestUploadAsync()
              }
            })
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
    }
  }

  const dataSource = keys.map(key => source[key])

  const contractDeleteAsync = (id) => {
    return actions.contractDelete({ id: id })
  }

  const { mcnId, identityName } = props.data

  return (
    <div className="policy-manage-owner-infos-container">
      <Descriptions column={1}>
        <Descriptions.Item label="主账号名称">{mcnId}</Descriptions.Item>
        <Descriptions.Item label="主账号ID">{identityName}</Descriptions.Item>
        <Descriptions.Item label="合同附件" className="align-top">
          <OssUpload
            authToken={uploadToken}
            fileList={uploadFile}
            rule={{
              bizzCode: 'MCN_PROCUREMENT_POLICY_CONTRACT',
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
      <Modal
        visible={modal}
        title="查看全部合同"
        width={660}
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
