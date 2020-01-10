import React from "react";
import { Form, Modal, Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
class StopReasonModal extends React.Component {

  judgeInputLenth = (_, value, callback) => {
    if (value && value.trim() !== "" && value.length <= 200) {
      callback();
    } else if (!value || !(value.trim())) {
      callback('请输入停用原因')
    } else if (value.length > 200) {
      callback('停用原因最多可输入200字')
    }
  }

  handleOk = () => {
    const { onOk, form } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      onOk(values)
    })
  }

  render() {
    const { onCancel, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        destroyOnClose
        visible
        className='ruleModal'
        title='请输入停用原因'
        width={700}
        onCancel={() => { onCancel() }}
        onOk={this.handleOk}
      >
        <Form>
          <FormItem>
            {getFieldDecorator('policyStopReason', {
              rules: [
                { required: true, message: ' ' },
                { validator: this.judgeInputLenth }
              ],
            })(
              <TextArea className='remarksText' />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(StopReasonModal);
