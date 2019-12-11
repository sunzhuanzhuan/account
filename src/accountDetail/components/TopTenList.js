import React, { useState, useEffect } from 'react'
import ColumnPoint from './chart/ColumnPoint'
import { CharTitle } from "./chart";
import api from '../../api'
import { Empty, Icon } from 'antd'
import './NewVideo.less'
import getTopTenConfig from '../constants/TopTenListConfig'
export default function TopTenList(props) {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(5)
  const [list, setList] = useState([])
  useEffect(() => {
    getVideoList()
  }, [])
  async function getVideoList() {
    const { data } = await api.get(`/operator-gateway/accountDetail/v1/getNewVideo?accountId=${props.accountId}`)
    setList(data.map((one, index) => ({
      ...one,
      label: 'label' + index//添加唯一标识位置
    })))
  }
  function setIndex() {
    setStart(start == 0 ? 5 : 0)
    setEnd(end == 5 ? 10 : 5)
  }
  const topTenConfig = getTopTenConfig(props.platformId)
  return (
    <div>
      <CharTitle title={topTenConfig.title} />
      {list.length > 0 ?
        <div className='new-video-box'>
          {list.length > 5 ?
            <div className="grouped-left-direction">
              <Icon type="left-circle" onClick={setIndex} />
            </div> : null}
          <ColumnPoint
            data={list.slice(start, end)}
            {...topTenConfig}
            platformId={props.platformId}
          />
          {list.length > 5 ?
            <div className="grouped-right-direction">
              <Icon type="right-circle" onClick={setIndex} />
            </div> : null
          }
        </div>
        : <Empty style={{ padding: "30px", margin: '0px auto' }} />
      }

    </div>
  )
}
