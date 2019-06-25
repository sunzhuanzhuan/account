import React, { Component, PureComponent } from "react";
import './style.less'
import { moduleStatus } from "@/accountManage/reducer";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    md: { span: 4 },
    lg: { span: 3 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 20 },
    lg: { span: 21 }
  }
};
const halfWrapCol = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    md: { span: 4 },
    lg: { span: 3 }
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 9 },
    md: { span: 10 },
    lg: { span: 10 }
  }
}

/**
 * 数据模块
 */
export default class Module extends Component {
  render() {
    const { anchorId: key, component: C } = this.props.module
    const { moduleStatus } = this.props.data
    return <article id={"navLink-" + key} className='module-item-wrap'>
      {C && <C {...this.props} layout={{
        full: formItemLayout,
        half: halfWrapCol
      }} moduleStatus={moduleStatus[key]} />}
    </article>
  }
}
