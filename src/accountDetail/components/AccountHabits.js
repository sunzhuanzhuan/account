import React, { useEffect, useState } from 'react'
import { CharTitle, Histogram } from "./chart";
import './AccountHabits.less'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
function AccountHabits(props) {
  const [data, setData] = useState({})
  useEffect(() => {
    getDispatchHabit()
  }, [])
  //获取数据
  async function getDispatchHabit() {
    const param = props.location.search
    const { data } = await axios.get('http://yapi.ops.tst-weiboyi.com/mock/129/api/operator-gateway/accountDetail/v1/getDispatchHabit')
    setData(data.data)
  }
  return (
    <div className='account-habits'>
      <CharTitle title='账号发文习惯' />
      <div className='account-habits-two'>
        <div className='account-habits-item'>
          <Histogram
            height={400}
            data={data.mediaHourPatternDraw}
            positionConfig='name*value'
            textTitle='时段分布 -- 天'
          />
        </div>
        <div className='account-habits-item'>
          <Histogram
            height={400}
            data={data.mediaWeeknoPatternDraw}
            positionConfig='name*value'
            textTitle='每周分布 -- 周'
          />
        </div>
      </div>
    </div>
  )
}

export default withRouter(AccountHabits)
