import React from 'react';
import { Typography } from 'antd'
const { Paragraph } = Typography;

const CooperationCasesView = ({ list = [] }) => {
  return list.length > 0 ? <div className='gray-block-container'>
    {
      list.map((item, index) => <section key={item.sort} className='gray-block-item'>
          <strong>案例{index + 1}</strong>
          <p>合作品牌： {item.brand}</p>
          <p>合作链接： <a target="_blank" href={item.link} className='url'>{item.link}</a></p>
          <Paragraph style={{wordBreak: "break-all"}}  ellipsis={{ rows: 3, expandable: true }}>
            合作效果： {item.content}
          </Paragraph>

        </section>
      )
    }
  </div> : null
}


export default CooperationCasesView
