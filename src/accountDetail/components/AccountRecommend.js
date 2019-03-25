import React, { Component } from 'react'
import "./AccountRecommend.less";
import { Avatar } from 'antd';
class AccountRecommend extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { list = [{ id: 1, name: '清风美食厨房', url: 'dd', lable: '连续3个月畅销' },
    { id: 2, name: '清风美食厨房清风美食厨房', url: 'dd', lable: '连续3个月畅销' },
    { id: 3, name: '清风美食厨房', url: 'dd', lable: '连续3个月畅销' },
    { id: 4, name: '清风美食厨房', url: 'dd', lable: '连续3个月畅销' },
    { id: 5, name: '清风美食厨房', url: 'dd', lable: '连续3个月畅销' },
    { id: 6, name: '清风美食厨房', url: 'dd', lable: '连续3个月畅销' },
    { id: 7, name: '清风美食厨房', url: 'dd', lable: '连续3个月畅销' }] } = this.props
    return (
      <div className='account-recommend'>
        <div className='title-big'>账号推荐</div>
        <div className='recommed-box'>
          {list.map(one => <div key={one.id} className='recommed-item'>
            <div className='img-avatar'>
              <Avatar size={100} src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2924416775,758818339&fm=26&gp=0.jpg" />
            </div>
            <div className='account-name'>{one.name}</div>
            <div className='account-lable'>{one.lable}</div>
          </div>
          )}
        </div>
      </div>
    );
  }
}

export default AccountRecommend;
