import React, { Component } from 'react'
import "./Composite.less"
import CompositeRadar from "./chart/CompositeRadar";
class Composite extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='composite-exponent'>
        <div className='head-center'>
          <div className='text'>综合指数</div>
          <div className='score'>85</div>
          <span className='lable'>美妆第一名</span>
        </div>

        <div>
          <CompositeRadar />
        </div>
      </div>
    );
  }
}

export default Composite;
