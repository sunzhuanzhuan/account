const deafultImg = require('../img/deafult-box.png');
import moment from "moment";
const videoLabel = (dataItem) => {
  return `<a class='label-box'
href=${dataItem.mediaUrl}
target="_blank">
<div class='hover-img'>
<div class='bottom-img'>
<img 
width='120px'
height='160px'
src=${dataItem.mediaCoverUrl ? `http://api-webroot.api.weiboyi.com/pic.php?picurl=${dataItem.mediaCoverUrl}` : deafultImg} onerror="this.src='${deafultImg}'; this.onerror=null" />
</div>
<div class='hover-img-show'>
</div>
</div>
<div class='media-caption'>${ dataItem.mediaCaption || '-'}</div>
<div class='media-created-time'>${
    moment(dataItem.mediaCreatedTime).format('YYYY/MM/DD hh:mm:ss')
    }</div>
</a>`}
const sinaLabel = (dataItem) => { }
const weChatLabel = (dataItem) => { }
const redBookLabel = (dataItem) => { }

//页面根据平台获取相应配置信息
const getLabelConfig = (platformId, item) => {
  switch (platformId) {
    case 1:
      return sinaLabel(item)
    case 9:
      return weChatLabel(item)
    case 93:
      return redBookLabel(item)
    default:
      return videoLabel(item)
  }
}
export default getLabelConfig
