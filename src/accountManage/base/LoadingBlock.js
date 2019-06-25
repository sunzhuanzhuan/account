import React from "react"
import { Alert, Spin } from 'antd'

const style = {
  textAlign: "center",
  background: "rgba(0, 0, 0, 0.03)",
  borderRadius: "4px",
  marginBottom: "20px",
  padding: "50px 0"
}

const LoadingBlock = props => {
  if (props.error) {
    return <Alert
      message="错误!"
      description={props.error.info || '未知错误!'}
      type={props.error.type || "warning"}
      showIcon
    />
  } else if (props.loading) {
    return <div style={style}>
      <Spin tip={'加载中...'} />
    </div>
  }
}

export default LoadingBlock


