/**
 * Created by lzb on 2020-04-29.
 */
import React, { useEffect, useState } from 'react';


function handleCount(c1 = 0, c2 = 0, c3 = 0) {

  let result = c1 - c2 - c3

  return result > 0 ? result : '0'

}

const GlobalCountAsync = (props) => {
  const [ count, setCount ] = useState("0")
  const { record, action } = props

  useEffect(() => {
    const params = {
      mcnId: record.mcnId,
      platformIdList: record.globalAccountRule?.platformList?.map(p => p.platformId)
    }

    action(params).then(({ data }) => {
      setCount(handleCount(data, record.specialAccountCount, record.whiteListCount))
    })
  }, [])

  return <span>
    {count || '-'}
  </span>;
};

export default GlobalCountAsync;
