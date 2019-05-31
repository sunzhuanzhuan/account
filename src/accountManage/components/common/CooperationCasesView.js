import React from 'react';

const CooperationCasesView = ({ list = [] }) => {
  return <div className='gray-block-container'>
    {
      list.map(item => <section key={item.cooperationCaseId} className='gray-block-item'>
          <p>合作品牌： {item.brand}</p>
          <p>合作链接： <a href={item.link} className='url'>{item.link}</a></p>
          <p>合作效果： {item.content}</p>
        </section>
      )
    }
  </div>
}


export default CooperationCasesView
