import React from 'react';
import { dateDisplay } from "@/accountManage/util";

const ChildrenListView = ({ list = [] }) => {
  return list.length > 0 ? <div className='gray-block-container'>
    {
      list.map((item, index) => <section key={index} className='gray-block-item'>
          <strong>宝宝{index + 1}</strong>
          <p>性别： {item.gender === 1 ? '男' : '女'}</p>
          <p>生日： {dateDisplay(item.birthDate, 10)}</p>
          <p>是否出镜： {item.canOnCamera === 1 ? '是' : '否'}</p>
        </section>
      )
    }
  </div> : null
}


export default ChildrenListView
