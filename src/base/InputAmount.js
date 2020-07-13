import React, { Component } from 'react'
import { Input, Popover } from 'antd';
import './style.less'

function formatNumber(value) {
  value += '';
  const unit = [ '零', '个', '十', '百', '千', '万', '十万', '百万', '千万', '亿', '十亿' ]
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return [
    unit[list[0].length],
    `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`
  ];
}

export default class InputAmount extends Component {
  onChange = (e) => {
    const { value } = e.target;
    // const reg = /^-?(0|[1-9][0-9]*)$/;
    const reg = /^([1-9][0-9]*)$/;
    if ((!isNaN(value) && reg.test(value)) || value === '') {
      this.triggerChange(value);
    }
  }

  onBlur = () => {
    let { value = '', onBlur } = this.props;
    if (String(value).charAt(value.length - 1) === '.') {
      this.triggerChange(value.slice(0, -1));
    }
    let { min, max } = this.props;
    if (min > max) {
      [ min, max ] = [ max, min ]
    }

    if (value > max) {
      value = max
      this.triggerChange(value);
    }

    if (value < min) {
      value = min
      this.triggerChange(value);
    }

    if (onBlur) {
      onBlur();
    }
  }


  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }


  render() {
    let { value = '', ...others } = this.props;
    value = value || ''
    const [ _title, _content ] = formatNumber(value)
    const title = value ? (
      <span className="input-amount-popover-unit">
        {value !== '-' ? _title : '零'}
      </span>) : '暂无';
    const content = <div>
      {
        value ? (
          <div className="input-amount-popover-number">
            {value !== '-' ? _content : '-'}
          </div>) : '请输入价格'
      }
    </div>
    return (
      <Popover
        trigger={[ 'focus' ]}
        title={title}
        content={content}
        placement="top"
      >
        <Input
          value={value}
          {...others}
          onChange={this.onChange}
          placeholder="请输入"
          maxLength={10}
          onBlur={this.onBlur}
        />
      </Popover>
    );
  }
}
