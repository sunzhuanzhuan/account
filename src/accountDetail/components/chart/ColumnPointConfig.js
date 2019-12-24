const deafultImg = require('../img/deafult-box.png');
import { formatW } from "../../util";
import moment from "moment";
const likeItem = (item) => `<div class='item'>
<div><img src='${require('../img/like.png')}' width='16'/></div>
<div>${formatW(item.mediaLikeNum)}</div>
</div>`
const commentItem = (item) => `<div class='item'>
<div><img src='${require('../img/comment.png')}' width='16'/></div>
<div>${formatW(item.mediaCommentNum)}</div>
</div>`
const forwardItem = (item) => `<div class='item'>
<div><img src='${require('../img/forward.png')}' width='16'/></div>
<div>${formatW(item.mediaRepostNum)}</div>
</div>`
const readItem = (item) => `<div class='item'>
<div><img src='${require('../img/read.png')}' width='16'/></div>
<div>${formatW(item.mediaReadNum)}</div>
</div>`
const collectItem = (item) => `<div class='item'>
<div><img src='${require('../img/favorite.png')}' width='16'/></div>
<div>${formatW(item.mediaCollectNum)}</div>
</div>`
const playItem = (item) => `<div class='item'>
<div><img src='${require('../img/play.png')}' width='16'/></div>
<div>${formatW(item.mediaPlayNum)}</div>
</div>`
const createdTime = (dataItem) => `<div class='media-created-time'>${
  moment(dataItem.mediaCreatedTime).format('YYYY/MM/DD hh:mm:ss')
  }</div>`
//视频封面 
const imgCover = (dataItem) => `<div class='hover-img'>
<div class='bottom-img'>
<img 
  width='120px'
  height='160px'
  src=${dataItem.mediaCoverUrl ? `http://api-webroot.api.weiboyi.com/pic.php?picurl=${dataItem.mediaCoverUrl}` : deafultImg} onerror="this.src='${deafultImg}'; this.onerror=null" />
</div>
<div class='hover-img-show'>
</div>
</div>`
const mediaCaption = (dataItem) => `<div class='media-caption'>${dataItem.mediaCaption || '-'}</div>`
const videoLabel = (dataItem, isDouyin) => {
  return `
<a class='label-box' href=${dataItem.mediaUrl} target="_blank">
      ${imgCover(dataItem)}
      ${mediaCaption(dataItem)}
      ${createdTime(dataItem)}
      <div class='media-data'>
        ${likeItem(dataItem)}
        <div class='line'>|</div>
        ${isDouyin ? commentItem(dataItem) : playItem(dataItem)}
      </div>
</a>`}
const weChatLabel = (dataItem) => {
  return `
  <a class='label-box' href=${dataItem.mediaUrl} target="_blank">
        ${imgCover(dataItem)}
        ${mediaCaption(dataItem)}
        <div class='media-created-time'>${dataItem.mediaIndexName}</div>
        ${createdTime(dataItem)}
        <div class='media-data'>
          ${readItem(dataItem)}
          <div class='line'>|</div>
          ${likeItem(dataItem)}
        </div>
  </a>`
}

const sinaLabel = (dataItem) => {
  return `
<a class='label-box sina-box' href=${dataItem.mediaUrl} target="_blank">
      ${mediaCaption(dataItem)}
      <div class='media-created-time'>图文微博${dataItem.mediaIsDirect == 0 ? '转发' : '直发'}</div>
      ${createdTime(dataItem)}
      <div class='media-data'>
        ${commentItem(dataItem)}
        <div class='line'>|</div>
        ${likeItem(dataItem)}
        <div class='line'>|</div>
        ${forwardItem(dataItem)}
      </div>
</a>`
}
const redBookLabel = (dataItem) => {
  return `
  <a class='label-box' href=${dataItem.mediaUrl} target="_blank">
        ${imgCover(dataItem)}
        ${mediaCaption(dataItem)}
        <div class='media-created-time'>${dataItem.mediaType == 'picture' ? '图文' : '视频'}笔记</div>
        ${createdTime(dataItem)}
        <div class='media-data'>
           ${commentItem(dataItem)}
          <div class='line'>|</div>
          ${likeItem(dataItem)}
          <div class='line'>|</div>
          ${collectItem(dataItem)}
        </div>
  </a>`
}
const douyinLabel = (dataItem) => {
  return videoLabel(dataItem, true)
}
//页面根据平台获取相应配置信息
const getLabelConfig = (platformId, item) => {
  switch (platformId) {
    case 1:
      return sinaLabel(item)
    case 9:
      return weChatLabel(item)
    case 93:
      return redBookLabel(item)
    case 115:
      return douyinLabel(item)
    default:
      return videoLabel(item)
  }
}
export default getLabelConfig
