import React, { Component } from "react"
import { Button, Form, Input, Radio, Select, Spin } from 'antd'
import { Modal, message } from "antd";
import SimpleTag from "@/accountManage/base/SimpleTag";

@Form.create()
export class FeedbackCreate extends Component {
  state = { data: [] }

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let hide = message.loading('处理中...')
        this.props.actions.addClassifyAuditInfo(values).then(() => {
          hide()
          this.props.setModal()
          message.success('我们将在5个工作日内给您反馈，请您耐心等待', 1.5, () => {
            this.props.reload()
          })
        })
      }
    });
  };

  componentDidMount() {
    const { actions } = this.props
    actions.getAllClassifyInfos().then(({ data }) => {
      this.setState({
        data
      })
    })
  }

  render() {
    const { form, hasReason, account } = this.props
    const { getFieldDecorator } = form
    const {
      id,
      base: {
        snsName,
        platformId,
        url,
        classificationList
      }
    } = account
    return <Modal
      visible
      title='分类错误反馈'
      onCancel={() => this.props.setModal()}
      onOk={() => {
        this.submit()
      }}
      maskClosable={false}
    >
      <Form style={{ position: 'relative' }}>
        <Form.Item label='请选择您期望的分类' colon={false}>
          {
            getFieldDecorator('newClassifyKey', {
              rules: [
                { required: true, message: '请选择分类' }
              ]
            })(
              <Select placeholder='请选择分类'>
                {
                  (this.state.data || []).map(o =>
                    <Select.Option key={o.classifyKey} value={o.classifyKey}>{o.classifyName}</Select.Option>)
                }
              </Select>
            )
          }
        </Form.Item>
        {hasReason ? <Form.Item label='请选择错误原因' colon={false}>
            {
              getFieldDecorator('wrongReasonType', {
                rules: [
                  { required: true, message: '请选择错误原因' }
                ]
              })(
                <Radio.Group>
                  <Radio value={1}>与现有业务/受众不一致</Radio>
                  <br />
                  <Radio value={2}>业务/受众变更</Radio>
                </Radio.Group>
              )
            }
          </Form.Item> :
          getFieldDecorator('wrongReasonType', { initialValue: 0 })(<input type="hidden" />)
        }
        <Form.Item label='请填写您的原因' colon={false}>
          {
            getFieldDecorator('description', {
              rules: [
                { max: 100, message: '最多可输入100个字哦~' }
              ]
            })(
              <Input.TextArea
                placeholder='例：博主主做母婴领域，平台分类错误，请尽快修正'
                autosize={{ minRows: 2, maxRows: 2 }}
              />
            )
          }
        </Form.Item>
        <a
          style={{ position: "absolute", right: 0, top: '10px' }}
          onClick={() => this.props.setModal('mini')}
        >
          未找到分类名称?
        </a>
        {getFieldDecorator('accountId', { initialValue: id })(<input type="hidden" />)}
        {getFieldDecorator('snsName', { initialValue: snsName })(<input type="hidden" />)}
        {getFieldDecorator('platformId', { initialValue: platformId })(<input type="hidden" />)}
        {getFieldDecorator('url', { initialValue: url })(<input type="hidden" />)}
        {getFieldDecorator('originClassifyKey', { initialValue: classificationList[0].id })(
          <input type="hidden" />)}
      </Form>
    </Modal>
  }
}

@Form.create()
export class FeedbackMini extends Component {
  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let hide = message.loading('处理中...')
        const { actions } = this.props
        actions.addCustomClassify(values).then(() => {
          hide()
          message.info('反馈成功，我们将尽快处理', 1.5, () => {
            this.props.setModal()
          })
        })
      }
    });
  };

  render() {
    const { form, account } = this.props
    const { getFieldDecorator } = form
    const {
      id,
      base: {
        snsName,
        platformId,
        url
      }
    } = account
    return <Modal
      visible
      title='没有找到您期望的内容分类？请填写告诉我们'
      onCancel={() => this.props.setModal()}
      onOk={() => {
        this.submit()
      }}
      maskClosable={false}
    >
      <Form colon={false}>
        <Form.Item>
          {
            getFieldDecorator('classifyName', {
              validateFirst: true,
              rules: [
                { pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/, message: '请填写中英文分类名称' },
                { max: 10, min: 2, message: '请输入2~10个字' },
                { required: true, message: '请填写分类名称' }
              ]
            })(
              <Input placeholder='请填写2~10个字' />
            )
          }
        </Form.Item>
        {getFieldDecorator('accountId', { initialValue: id })(
          <input type="hidden" />)}
        {getFieldDecorator('snsName', { initialValue: snsName })(
          <input type="hidden" />)}
        {getFieldDecorator('platformId', { initialValue: platformId })(
          <input type="hidden" />)}
        {getFieldDecorator('url', { initialValue: url })(
          <input type="hidden" />)}
      </Form>
    </Modal>
  }
}

const auditTypeMap = {
  '1': {
    code: 1,
    text: '待处理',
    desc: '我们将尽快处理您提交的需求，请耐心等待'
  },
  '2': {
    code: 2,
    text: '已更新',
    desc: '感谢您的反馈，给您造成的不便我们深表歉意~'
  },
  '3': {
    code: 3,
    text: '已驳回',
    desc: '如您对反馈处理结果不满意，您可联系产品'
  }
}

export class FeedbackDetail extends Component {
  state = {
    loading: true
  }

  showContact = () => {
    Modal.info({
      title: '直接添加客服QQ号',
      content: this.state.customerQq || '3460666273'
    })
  }

  componentDidMount() {
    const { actions, classifyAuditInfoId } = this.props
    actions.getAuditDialogInfo({ classifyAuditInfoId }).then(({ data }) => {
      this.setState({
        ...data,
        loading: false
      })
    })
  }

  render() {
    const {
      loading,
      wrongReasonType,
      newClassifyName,
      auditType = 1,
      classifyAuditDialogList = []
    } = this.state
    return <Modal
      visible
      title='反馈进度'
      onCancel={() => this.props.setModal()}
      footer={null}
      maskClosable={false}
    >
      <Spin spinning={loading}>
        <div className='category-feedback-detail-wrapper'>
          <header>
            当前反馈状态: {auditTypeMap[auditType].text}
          </header>
          <div className='category-content'>
            期望分类: <SimpleTag>{newClassifyName}</SimpleTag>
          </div>
          <div className='category-desc'>
            {auditTypeMap[auditType].desc}
            {/*{auditType === 3 &&
            <a onClick={this.showContact} style={{ marginLeft: '6px' }}>联系客服</a>}*/}
          </div>
          <main>
            <header>协商历史</header>
            {
              classifyAuditDialogList.map((data, n) => {
                return data.sourceType === 2 ? <div className='category-history-item' key={n}>
                    <div className='image-wrapper'>
                      <img src="http://img.weiboyi.com/vol1/1/102/124/g/o/s27023837qs711r99p5o506o4op229o2/%E5%AE%A1%E6%A0%B8%E5%91%98.png" alt="" />
                    </div>
                    <div className='content-wrapper'>
                      <div className='info name'>
                        {data.adminRealName}
                        <b>{data.createdAt}</b>
                      </div>
                      {
                        auditType === 2 && <div className='info'>
                          内容分类更新为【{newClassifyName}】
                        </div>
                      }
                      {
                        auditType === 3 && <div className='info'>
                          审核失败
                        </div>
                      }
                      {
                        auditType === 3 && <div className='info'>
                          审核失败原因: {data.description}
                        </div>
                      }
                    </div>
                  </div> :
                  <div className='category-history-item' key={n}>
                    <div className='image-wrapper'>
                      <img src="http://img.weiboyi.com/vol1/1/102/124/e/d/s35886957qs711r99p5o506o4op229o2/%E7%94%B3%E8%AF%B7%E4%BA%BA.png" alt="" />
                    </div>
                    <div className='content-wrapper'>
                      <div className='info name'>
                        {data.createdFrom === 1 ? data.adminRealName : '博主'}
                        <b>{data.createdAt}</b>
                      </div>
                      {wrongReasonType ? <div className='info'>
                        错误原因: {wrongReasonType === 1 ? "与现有业务/受众不一致" : wrongReasonType === 2 ? "业务/受众变更" : '--'}
                      </div> : null}
                      <div className='info'>
                        期望分类: {newClassifyName}
                      </div>
                      <div className='info'>
                        原因: {data.description}
                      </div>
                    </div>
                  </div>
              })
            }
          </main>
        </div>
      </Spin>
    </Modal>
  }
}
