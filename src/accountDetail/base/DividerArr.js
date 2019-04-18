import React from 'react'
import './DividerArr.less'
import { Divider } from 'antd';
import ValueFormat from "./ValueFormat";
const DividerArr = ({ list }) => {
  return <div className='divider-arr'>
    {list.map((one, index) => <div key={index} className='dicider-text'>
      {index == 0 ? null : <Divider type="vertical" style={{ marginTop: 14 }} />}<div className='text'>
        <div><img src={require(`../components/img/${one.icon}.png`)} width='14' /></div>
        <div>
          <ValueFormat value={one.number > 0 ? one.number : 0} />
        </div>
      </div>
    </div>)}
  </div>
}
export default DividerArr
