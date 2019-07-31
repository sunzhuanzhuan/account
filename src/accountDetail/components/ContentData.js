import React, { Component } from 'react'
import './ContentData.less'
import { CharTitle, CurveLine, DataBox } from "./chart";
import ButtonTab from '../base/ButtonTab'
import NewVideo from './NewVideo'
import LazyLoad from 'react-lazyload';


class ContentData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBoxProps: {
        data: []
      }
    };
  }
  componentDidMount = () => {
    const { getTrend, accountId } = this.props
    getTrend({ accountId: accountId }).then(({ data }) => {
      if (data) {
        const boxContent = data.boxContent
        this.setState({
          dataBoxProps: { data: [this.dataFormate(boxContent, 'Like', 90), this.dataFormate(boxContent, 'Like', 28)] }
        })
      }

    })
  }

  setDataBoxProps = (checkedKey) => {
    const { trendInfo } = this.props
    const data = trendInfo.boxContent
    this.setState({
      dataBoxProps: { data: [this.dataFormate(data, checkedKey, 90), this.dataFormate(data, checkedKey, 28)] }
    })
  }

  dataFormate = (data = {}, type, day) => {
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
    const { trendInfo = {}, baseInfo = {}, getNewVideo,
      newVideoList, accountId } = this.props
    const { base = {} } = baseInfo
    const { platformId } = base
    const { dataBoxProps } = this.state
    const { contentSum = [], spreadTrend = [], interactive = [] } = trendInfo
    return (
      <div className='content-data'>
        <div className='title-big' >数据趋势</div>
        <div className='content-char'>
          <ButtonTab
            buttonList={[
              { key: 1, name: '粉丝趋势' },
              { key: 2, name: '传播趋势', },
              { key: 3, name: '互动趋势', }
            ]}
            contentMap={{

              1: <div className='content-char'>
                <CharTitle title='粉丝累计量和增量趋势图' content='可观察最近10周账号粉丝累计和增量变化趋势' />
                <CurveLine data={contentSum}
                  BluelineText='粉丝累计量'
                  BluelineName='followerCountFull'
                  GreenlineText='粉丝增量'
                  GreenlineName='followerCountIncre'
                />
              </div>,
              2: <div className='content-char'>
                <CharTitle title='播放增量和评论增量趋势图' content='可观察最近10周内点赞增量和评论增量变化趋势' />
                <CurveLine data={spreadTrend}
                  BluelineText='播放增量'
                  BluelineName='mediaPlayAvgIncre'
                  GreenlineText={platformId == 115 ? '点赞增量' : '评论增量'}
                  GreenlineName={platformId == 115 ? 'mediaLikeAvgIncre' : 'mediaCommentAvgIncre'}
                />
              </div>,
              3: <div className='content-char'>
                <CharTitle title='互动数和互动率趋势图' content='可观察最近10周内互动数和互动率变化趋势' />
                <CurveLine data={interactive}
                  BluelineText='互动数'
                  BluelineName='mediaInteractionAvgFull'
                  GreenlineText={'互动率'}
                  GreenlineName={'interactionProportionIncre'}
                />
              </div>
            }}
          />
        </div>

        <div className='content-data'>
          <div className='title-big' >内容质量</div>
          <div className='content-char'>
            <CharTitle title='内容数据箱线图' />
            <div className='last-box-decide'>
              <div className='data-box-left'>
                <ButtonTab
                  buttonList={[
                    { key: 'Like', name: '点赞' },
                    { key: 'Comment', name: '评论', },
                    { key: 'Repost', name: '转发', }
                  ]}
                  onChange={this.setDataBoxProps}
                  contentMap={{
                    Like: <DataBox {...dataBoxProps} />,
                    Comment: <DataBox {...dataBoxProps} />,
                    Repost: <DataBox {...dataBoxProps} />
                  }}
                />

              </div>
              <div className='right-decide'>
                <div>
                  <div className='right-title'><a>箱线图分析说明</a></div>
                  <div className='left-content'>
                    <p>内容表现</p>
                    <div>近90天视频： 平均播放量410万，数据集中分布在240万 - 510万</div>
                    <div> 近28天视频： 平均播放量470万，数据集中分布在280万 - 520万</div>
                  </div>
                  <div className='left-content '>
                    <p>趋势说明</p>
                    <div>1.近期内容整体质量提升</div>
                    <div>2.视频的内容质量的更趋于稳定</div>
                  </div>
                </div>
              </div>
            </div>
            {/* 最新视频 */}

            <CharTitle title='近10个视频数据表现' />
            <LazyLoad once overflow>
              <NewVideo getNewVideo={getNewVideo} newVideoList={newVideoList} accountId={accountId} platformId={platformId} baseInfo={baseInfo} />
            </LazyLoad>
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
