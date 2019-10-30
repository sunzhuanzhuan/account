import React from "react"
import './style.less'

const FieldView = props => {

  return <div className='view-field-wrap'>
    <div className='title' style={{ width: props.width ? props.width : '90px' }}>{props.title}</div>
    <div className='value'>{props.value === 0 ? '0' : (props.value || '--')}</div>
  </div>
}

export default FieldView
