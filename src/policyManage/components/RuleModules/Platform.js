import React, { useState } from 'react';
import { Form, Select } from 'antd'

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

const { Option } = Select;

export const PlatformEdit = (props) => {

  const { newBPlatforms } = props;
  const { getFieldDecorator } = props.form;
  const { currentRule = {}, selectedPlatformIds } = props;
  const { platformList = [] } = currentRule;

  const currentSelectedIds = platformList.map(item => item.platformId)
  currentSelectedIds.forEach(element => {
    selectedPlatformIds[element] = false;
  });
  const [selectedIds, setSelectedIds] = useState(selectedPlatformIds)

  const onDeselect = (value) => {
    setSelectedIds({ ...selectedIds, [value]: false })
  }
  return <Form.Item label="平台" {...formItemLayout}>
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
            disabled={selectedIds[item.id]}
            key={item.id}
            value={item.id}

          >{item.platformName}</Option>)
        }
      </Select>
    )}
  </Form.Item>
}
export const PlatformView = (props) => {
  return <Form.Item label="平台" {...formItemLayout}>
    <div>{props.data.map(item => item.platformName).join(", ")}</div>
  </Form.Item>
}
