/* 价格标准化新增
 * 包括价格及价格的权益等标识
*/
import React, { useEffect, useState } from 'react'
import './SkuPriceList.less'
import HocPopover from '../base/HocPopover'
import { Tag } from 'antd'
import api from '@/api'
import numeral from 'numeral'
function SkuPriceList({ list = [], equitiesIdListAsync, getPrice }) {
  return (
    <div className='sku-price-list'>
      {list.map(item => {

        return <div key={item.skuTypeId} className='sku-price-item'>
          <div className='sku-type-name'>
            {item.skuTypeName}
            {item.isSpecial == 1 ?
              <HocPopover content={'该参考报价为防屏蔽的报价'}>
                <img src={require('./img/isSpecial.png')} width='16px' className='is-special' />
              </HocPopover> : null}
          </div>
          <div className='equities-id-list'>
            {getPrice(item.openQuotePrice)}
            {/* <span className='unit'>{item.openQuotePrice > 0 || openQuotePrice == 0 ? '元' : ''}</span> */}
          </div>
          <EquitiesList list={item.equitiesIdList} />
        </div>
      })}
    </div>
  )
}
export function EquitiesList({ list }) {
  const [eqList, setEqList] = useState([])
  async function hoverEquity() {
    const { data } = await api.get('/operator-gateway/equities/v1/getEquitiesListByEquitiesIds', { params: { equitiesIdList: list.join(',') } })
    setEqList(data)
  }
  return list.length > 0 ? <div className='equities-list'>
    <HocPopover content={<div >{eqList.map(one => <Tag key={one.equitiesId} color="blue">{one.equitiesName}</Tag>)}</div>}>
      <img src={require('./img/equity.png')} height='18px' width='40px' onMouseOver={hoverEquity} />
    </HocPopover>
  </div> : null
}
export default SkuPriceList
