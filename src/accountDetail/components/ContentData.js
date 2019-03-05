import React, { Component } from 'react'
import './ContentData.less'
import { CharTitle, CurveLine, HistogramLine, DataBox } from "./chart";
class ContentData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='content-data'>
        <div className='title-big' >内容数据服务</div>
        <div className='content-char-box'>
          <div className='content-char'>
            <CharTitle title='内容累计趋势图' />
            <CurveLine />
          </div>
          <div className='content-char'>
            <CharTitle title='粉丝点赞趋势图' />
            <HistogramLine />
          </div>
          <div className='content-char'>
            <CharTitle title='粉丝互动率趋势图' />
            <HistogramLine />
          </div>
          <div className='content-char'>
            <CharTitle title='内容数据箱线图' />
            <div className='last-box-decide'>
              <div className='data-box-left'>
                <DataBox />
              </div>
              <div className='right-decide'>
                <DecideBox img='up' leftText='程' middleText='上升' middleText2='趋势' rightText='有上升' />
                <DecideBox img='horiz' leftText='间越' middleText='平缓' middleText2='' rightText='越稳定' />
                <DecideBox img='down' leftText='程' middleText='下降' middleText2='趋势' rightText='有下降' />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const DecideBox = ({ img, leftText, middleText, middleText2, rightText }) => {
  return <div className='decide-box' >
    <div className='img-box'>
      <img width='100' src={require(`./img/${img}.png`)} />
    </div>
    <div className='text'>
      <span className='small-text'>箱体{leftText}</span>
      <span className='big-text'>{middleText}</span>
      <span className='small-text'>{middleText2}，代表博主</span>
      <span className='big-text'>内容质量{rightText}</span>
    </div>
  </div>
}
export default ContentData;
