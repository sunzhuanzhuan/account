import React from 'react';
import { date2moment } from "@/accountManage/util";

const ChildrenListView = ({ list = [] }) => {
  return list.length > 0 ? <div className='gray-block-container'>
    {
      list.map((item, index) => <section key={index} className='gray-block-item'>
          <strong>宝宝{index + 1}</strong>
          <p>性别： {item.gender === 1 ? '男' : '女'}</p>
          <p>生日： {date2moment(item.birthDate).format('YYYY-MM-DD')}</p>
          <p>是否出镜： {item.canOnCamera === 1 ? '是' : '否'}</p>
        </section>
      )
    }
  </div> : '暂无信息'
}


export default ChildrenListView
