import React from "react";

import { Button, InputNumber } from "antd";

export class LadderRatioEdit extends React.PureComponent {
  static getDerivedStateFromProps(nextProps) {
    if ("value" in nextProps) {
      return {
        ...(nextProps.value || {})
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      rebateNumbers: value.rebateNumbers || [0, 9999],
      percentage: value.percentage || []
    };
  }
  //这里采用了直接修改数据的方法
  //相关资料可以查看：https://zh-hans.reactjs.org/tutorial/tutorial.html#why-immutability-is-important
  addRule = index => {
    const rebateNumbers = this.state.rebateNumbers;
    rebateNumbers.splice(index, 0, rebateNumbers[index]);
    this.setState({
      rebateNumbers
    });
    this.triggerChange({ rebateNumbers });
  };
  delRule = index => {
    const { rebateNumbers, percentage } = this.state;
    rebateNumbers.splice(index, 1);
    percentage.splice(index, 1);
    const replaceState = { rebateNumbers, percentage };
    this.setState(replaceState);
    this.triggerChange(replaceState);
  };

  handleRatioChange = (e, index) => {
    const rebateNumbers = [...this.state.rebateNumbers];
    const number = parseInt(e || 0, 10);
    if (isNaN(number)) {
      return;
    }
    rebateNumbers[index] = number;

    if (!("value" in this.props)) {
      this.setState({ rebateNumbers });
    }
    this.triggerChange({ rebateNumbers });
  };
  handlePercentageChange = (e, index) => {
    const { percentage } = this.state;
    const number = parseInt(e || 0, 10);
    percentage[index] = number;
    if (!("value" in this.props)) {
      this.setState({ percentage });
    }
    this.triggerChange({ percentage: [...percentage] });
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange({
        ...this.state,
        ...changedValue
      });
    }
  };

  render() {
    const { rebateNumbers, percentage } = this.state;
    return (
      <div>
        <p>公式（是否满足阶梯【例0-100】：按照订单回填执行结果当时的博主收入金额，为计算基础）</p>
        <ul>
          {rebateNumbers.slice(1).map((item, index) => (
            <li key={index}>
              大于<span className="rule-number">{rebateNumbers[index]}</span>
              且小于等于
                            <span className="rule-input">
                <InputNumber
                  disabled={rebateNumbers.length - 2 == index}
                  onChange={e => this.handleRatioChange(e, index + 1)}
                  value={item}
                />
              </span>
              时,返点比例为：
                            <span className="rule-input">
                <InputNumber
                  onChange={e => this.handlePercentageChange(e, index)}
                  value={percentage[index]}
                /> %
              </span>
              {rebateNumbers.length <= 10 && <Button type="link" onClick={() => this.addRule(index + 1)}>添加</Button>}
              {index !== 0 && (
                <Button type="link" onClick={() => this.delRule(index)}>删除</Button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export const LadderRatioView = (props) => {
  const { rebateNumbers, percentage } = props;
  return <div>
    <p>公式（是否满足阶梯【例0-100】：按照订单回填执行结果当时的博主收入金额，为计算基础）</p>
    <ul>
      {rebateNumbers.slice(1).map((item, index) => (
        <li key={index}>
          大于<span className="rule-number">{rebateNumbers[index]}</span>
          且小于等于<span className="rule-input">{item}</span>
          时,返点比例为：<span className="rule-input">{percentage[index]}%</span>
        </li>
      ))}
    </ul>
  </div>
}


