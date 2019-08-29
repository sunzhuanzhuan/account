import React from 'react'
import './HoverImg.less'

const HoverImg = ({ url }) => {
  return <img width='60' height='60' style={{ borderRadius: 30 }} src={url ? `http://api-webroot.api.weiboyi.com/pic.php?picurl=${url}` : require('./img/default.jpg')} alt={url} onError={(e) => e.target.src = require('./img/default.jpg')} />
}
export default HoverImg
