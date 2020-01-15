/**
 * Created by lzb on 2019-11-04.
 */
import React from "react"
import { Popover, Icon } from "antd"
import "./index.less"
const QuestionTip = props => {
  const { title, content, type = "click" } = props
  return (
    <span className="question-wrapped">
      <Popover
        arrowPointAtCenter
        placement="topLeft"
        title={ title }
        content={ content }
        trigger={ type }
      >
        <Icon className="tip-icon" type="question-circle-o" />
      </Popover>
    </span>
  )
}

export default QuestionTip
