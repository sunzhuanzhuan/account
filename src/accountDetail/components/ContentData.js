import React, { Component } from 'react'
import './ContentData.less'
import { CharTitle, CurveLine, HistogramLine, DataBox } from "./chart";
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class ContentData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBoxProps: {}
    };
  }
  componentDidMount = () => {
    console.log('加载数据内容数据服务-粉丝点赞趋势图')
    const { getTrend } = this.props
    getTrend().then(res => {
      const data = res.data.boxContent
      this.setState({
        dataBoxProps: { data: [this.dataFormate(data, 'Like', 90), this.dataFormate(data, 'Like', 28)] }
      })
    })
  }

  setDataBoxProps = (e) => {
    const { trendInfo } = this.props
    const type = e.target.value
    const data = trendInfo.boxContent
    this.setState({
      dataBoxProps: { data: [this.dataFormate(data, type, 90), this.dataFormate(data, type, 28)] }
    })
  }
  dataFormate = (data, type, day) => {
    return {
      x: `${day}天总视频`,
      low: data[`media${type}Min${day}d`],
      q1: data[`media${type}LowerQuartileNum${day}d`],
      median: data[`media${type}MedianNum${day}d`],
      q3: data[`media${type}UpperQuartileNum${day}d`],
      high: data[`media${type}Max${day}d`]
    }
  }
  render() {
    const { trendInfo = {} } = this.props
    const { dataBoxProps } = this.state
    return (
      <div className='content-data'>
        <div className='title-big' >内容数据服务</div>
        <div className='content-char-box'>
          <div className='content-char'>
            <CharTitle title='内容累计趋势图' content='可观察最近90天账号基础数据趋势表现' />
            <CurveLine data={trendInfo.contentSum} />
          </div>
          <div className='content-char'>
            <CharTitle title='粉丝点赞趋势图' content='可观察最近90天内粉丝质量变化趋势' />
            <HistogramLine data={trendInfo.like} positionConfig='dateRange*mediaLikeSumIncre' lineText='点赞净增数' boxText='粉丝累计数' />
          </div>
          <div className='content-char'>
            <CharTitle title='粉丝互动率趋势图' content='可观察最近90天内内容质量变化趋势' />
            <HistogramLine data={trendInfo.interactive} positionConfig='dateRange*interactionProportionIncre' lineText='平均互动率' boxText='发布净增数' />
          </div>
          <div className='content-char'>
            <CharTitle title='内容数据箱线图' />
            <div className='last-box-decide'>
              <div className='data-box-left'>
                <div style={{ marginTop: 16, textAlign: "center" }}>
                  <RadioGroup defaultValue="Like" onChange={this.setDataBoxProps}>
                    <RadioButton value="Like">点赞</RadioButton>
                    <RadioButton value="Comment">评论</RadioButton>
                    <RadioButton value="Repost">转发</RadioButton>
                  </RadioGroup>
                </div>
                <DataBox {...dataBoxProps} />
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
