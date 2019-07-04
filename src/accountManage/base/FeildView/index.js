import React from "react"
import './style.less'

const FieldView = props => {
  return props.value ? <div className='view-field-wrap'>
    <div className='title' style={{ width: props.width ? props.width : '90px' }}>{props.title}</div>
    <div className='value'>{props.value || '--'}</div>
  </div> : null
}

export default FieldView
