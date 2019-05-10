import React from "react"
import './style.less'

const FieldView = props => {
  return <div className='view-field-wrap'>
    <div className='title'>{props.title}</div>
    <div className='value'>{props.value || '--'}</div>
  </div>
}

export default FieldView
