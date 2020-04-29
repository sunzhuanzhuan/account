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
  const { record, actions, open } = props

  useEffect(() => {
    const params = {
      mcnId: record.mcnId,
      platformIdList: record.globalAccountRule?.platformList?.map(p => p.platformId)
    }

    actions.queryGlobalAccountCount(params).then(({ data }) => {
      const count = handleCount(data, record.specialAccountCount, record.whiteListCount)
      setCount(count)
      actions.syncUpdatePolicyStatus({
        key: record.id,
        globalAccountCount: count
      })
    })
  }, [])

  return <a onClick={count ? open : () => {}}>
    {count || '-'}
  </a>;
};

export default GlobalCountAsync;
