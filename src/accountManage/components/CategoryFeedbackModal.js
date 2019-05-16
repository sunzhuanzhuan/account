import React, { Component } from "react"
import { Button, Form, Input, Radio, Select } from 'antd'
import { Modal, message } from "antd";
import SimpleTag from "@/accountManage/base/SimpleTag";

@Form.create()
export class FeedbackCreate extends Component {
  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        message.info('我们将在5个工作日内给您反馈，请您耐心等待', 1.5)
        this.props.setModal()
      }
    });
  };

  render() {
    const { form, hasReason } = this.props
    const { getFieldDecorator } = form
    return <Modal
      visible
      title='分类错误反馈'
      onCancel={() => this.props.setModal()}
      onOk={() => {
        this.submit()
      }}
      maskClosable={false}
    >
      <Form style={{ position: 'relative' }} colon={false}>
        <Form.Item label='请选择你期望的分类'>
          {
            getFieldDecorator('create', {
              rules: [
                { required: true, message: '请选择分类' }
              ]
            })(
              <Select placeholder='请选择分类' />
            )
          }
        </Form.Item>
        {hasReason && <Form.Item label='请选择错误原因'>
          {
            getFieldDecorator('create2', {
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
        </Form.Item>}
        <Form.Item label='请填写您的原因'>
          {
            getFieldDecorator('create3', {
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
      </Form>
    </Modal>
  }
}

@Form.create()
export class FeedbackMini extends Component {
  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        message.info('反馈成功，我们将尽快处理', 1.5)
        this.props.setModal()
      }
    });
  };

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    return <Modal
      visible
      title='没有找到你内容分类？填写告诉我们'
      onCancel={() => this.props.setModal()}
      onOk={() => {
        this.submit()
      }}
      maskClosable={false}
    >
      <Form colon={false}>
        <Form.Item>
          {
            getFieldDecorator('create4', {
              validateFirst: true,
              rules: [
                { pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/, message: '请填写中英文分类名称' },
                { max: 10, min: 2, message: '最多可输入2~10个字' },
                { required: true, message: '请填写分类名称' }
              ]
            })(
              <Input placeholder='请填写2~10个字' />
            )
          }
        </Form.Item>
      </Form>
    </Modal>
  }
}

const status = {
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
    desc: '如您对反馈处理结果不满意，您可'
  }
}

export class FeedbackDetail extends Component {
  showContact = () => {
    Modal.info({
      title: '直接添加客服QQ号',
      content: '3460666273'
    })
  }
  render() {
    return <Modal
      visible
      title='反馈进度'
      onCancel={() => this.props.setModal()}
      onOk={() => {

      }}
      maskClosable={false}
    >
      <div className='category-feedback-detail-wrapper'>
        <header>
          当前反馈状态: 待处理
        </header>
        <div className='category-content'>
          期望分类: <SimpleTag>美食</SimpleTag>
        </div>
        <div className='category-desc'>
          如您对反馈处理结果不满意，您可联系客服
          <a onClick={this.showContact} style={{marginLeft: '6px'}}>联系客服</a>
        </div>
        <main>
          <header>协商历史</header>
          <div className='category-history-item'>
            <div className='image-wrapper'>
              <img src="" alt="" />
            </div>
            <div className='content-wrapper'>
              <div className='info name'>
                系统
                <b>2019-04-26 17:05:47</b>
              </div>
              <div className='info'>
                审核失败
              </div>
              <div className='info'>
                失败原因: 业务/受众变更
              </div>
              <div className='info'>
                内容分类更新为【美食】
              </div>
            </div>
          </div><
          div className='category-history-item'>
            <div className='image-wrapper'>
              <img src="" alt="" />
            </div>
            <div className='content-wrapper'>
              <div className='info name'>
                夫人爱吃鱼
                <b>2019-04-26 17:05:47</b>
              </div>
              <div className='info'>
                错误原因: 业务/受众变更
              </div>
              <div className='info'>
                期望分类: 服饰
              </div>
              <div className='info'>
                原因: 我主要经营服饰..
              </div>
            </div>
          </div>
        </main>
      </div>
    </Modal>
  }
}
