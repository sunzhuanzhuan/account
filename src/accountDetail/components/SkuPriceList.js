/* 价格标准化新增
 * 包括价格及价格的权益等标识
*/
import React from 'react'
import './SkuPriceList.less'
function SkuPriceList({ list = [] }) {
  return (
    <div className='sku-price-list'>
      {list.map(item => <div key={item.skuTypeId} className='sku-price-item'>
        <div className='sku-type-name'>
          {item.skuTypeName}
          {item.isSpecial == 1 ? null : <img src={require('./img/isSpecial.png')} width='16px' className='is-special' />}
        </div>
        <div className='equities-id-list'>
          {item.openQuotePrice}<span className='unit'>元</span>
        </div>
        <EquitiesList list={item.equitiesIdList} />
      </div>)}
    </div>
  )
}
function EquitiesList({ list = ['1'] }) {
  return list.length > 0 ? <div className='equities-list'><img src={require('./img/equity.png')} height='18px' width='40px' /> </div> : null
}
export default SkuPriceList
