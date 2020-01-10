import React, { useState } from 'react';
import { Form, Select, Checkbox } from 'antd'

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 20 },
};

const { Option } = Select;

export const PlatformEdit = (props) => {

  const { newBPlatforms } = props;
  const { getFieldDecorator } = props.form;
  const { currentRule = {}, selectedPlatformIds = {} } = props;
  const { platformList = [] } = currentRule;

  const _selectedPlatformIds = { ...selectedPlatformIds }

  const currentSelectedIds = platformList.map(item => item.platformId)
  currentSelectedIds.forEach(element => {
    _selectedPlatformIds[element] = false;
  });
  const [disabledSelectedIds, setDisabledSelectedIds] = useState(_selectedPlatformIds)
  const onDeselect = (value) => {
    setDisabledSelectedIds({ ...disabledSelectedIds, [value]: false })
  }
  const ableSelectIds = newBPlatforms.map(item => item.id).filter(item => !disabledSelectedIds[item]);

  const onChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      props.form.setFieldsValue({
        platformIds: ableSelectIds
      })
    } else {
      props.form.setFieldsValue({
        platformIds: []
      })
    }
  }
  return <>
    <Checkbox
      style={{
        float: 'right',
        padding: '10px 0'
      }} onChange={onChange}>全选</Checkbox>
    <Form.Item label="平台" {...formItemLayout}>
      {getFieldDecorator(`platformIds`, {
        initialValue: currentSelectedIds,
        rules: [
          { required: true, message: '请选择平台' },
        ],
      })(
        <Select mode="multiple"
          onDeselect={onDeselect} placeholder="请选择平台"
        >
          {newBPlatforms.map(item =>
            <Option
              disabled={disabledSelectedIds[item.id]}
              key={item.id}
              value={item.id}

            >{item.platformName}</Option>)
          }
        </Select>
      )}
    </Form.Item>
  </>
}
export const PlatformView = (props) => {
  return <Form.Item label="平台" {...formItemLayout}>
    <div>{props.data.map(item => item.platformName).join(", ")}</div>
  </Form.Item>
}
