import React from "react"
import './style.less'

const   CheckTag = props => {

  return <div className={'check-tag ' + (props.checked ? 'checked' : '')} onClick={e => {
    e && e.stopPropagation()
    props.onChange && props.onChange(e)
  }}>
    {props.children}
  </div>
}

export default CheckTag
