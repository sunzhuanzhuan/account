import React, { Component } from 'react'
import { Avatar, Button, Icon } from "antd";
import './BaseInfo.less'
import { WBYPlatformIcon } from "wbyui"
import numeralExpand from '../../util/numeralExpand'
import { platformView } from "../../accountManage/constants/platform";
class BaseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { selectCarEdit, isExistCar, baseInfo, setShowModal } = this.props
    const { base = {}, skuList = [] } = baseInfo
    const { avatarUrl, snsName, followerCount, platformId = 0, cooperationTips, } = base
    return (
      <div className='floating-base-info'>
        <div className='floating-base-info-flex'>
          <div className='floating-base-info-flex'>
            <div className='img'>
              <div className='radius-box'>
                <Avatar size={60} src={avatarUrl} />
              </div>
            </div>
            <div className='detail'>
              <div className='account-name'>
                <span style={{ padding: '0px 2px 2px 0px' }}> <WBYPlatformIcon
                  weibo_type={platformId}
                  widthSize={16}
                /> </span>{snsName}</div>
              <div className='fans'>粉丝数：{followerCount ? numeralExpand(followerCount).format('0aw') : '-'}</div>
            </div>
          </div>
          <div className='floating-base-info-flex'>
            <div className='floating-base-info-flex'>
              {skuList.length > 0 ? skuList.map(one => <div key={one.skuId} className='sku-item'>
                <div className='sku-name'>{one.skuTypeName} </div>
                <div className='sku-price'>¥{one.openQuotePrice} </div>
              </div>) : null}
            </div>
            <div className='car-button'>
              <div className='cooperation-tips' onClick={() => setShowModal(true, {
                content: <div>{cooperationTips || '暂无数据'}</div>, title: '合作须知', width: 500
              })}>
                <Icon type="exclamation-circle" style={{ color: '#FAAD14', marginRight: 4 }} theme="filled" />
                合作须知
               </div>
              {isExistCar ? <Button className='add-select-car-button' type='primary' onClick={() => selectCarEdit(true)}>加入选号车</Button> :
                <Button className='remove-select-car-button' onClick={() => selectCarEdit(false)}>移出选号车</Button>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BaseInfo;
