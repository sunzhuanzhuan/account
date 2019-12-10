import React, { useState, useEffect } from 'react'
import './ContentData.less'
import { CharTitle, DataBox } from "./chart";
import ButtonTab from '../base/ButtonTab'
import { formatWNumber } from "../util";
import api from '../../api'
const typeMap = { Play: '播放', Like: '点赞', Comment: '评论' }

const dataFormate = (data = {}, type, day) => {
  const low = data[`media${type}Min${day}d`]
  const high = data[`media${type}Max${day}d`]
  const avg = data[`media${type}Avg${day}d`]
  const q1 = data[`media${type}LowerQuartileNum${day}d`]
  const q3 = data[`media${type}UpperQuartileNum${day}d`]
  return {
    x: `${day}天总视频`,
    low: low,
    q1: q1,
    median: data[`media${type}MedianNum${day}d`],
    q3: q3,
    high: high,
    textContent: `近${day}天视频：平均${typeMap[type]}量${formatWNumber(avg)}，数据集中分布在${formatWNumber(q1)} - ${formatWNumber(q3)}`,
    avg: avg,
    q3Lessq1: q3 - q1
  }
}
function ContentQuality(props) {
  const [dataBoxProps, setDataBoxProps] = useState({ data: [] })
  useEffect(() => {
    getTrend()
  }, [])
  //获取趋势数据
  async function getTrend() {
    const { data } = await api.get(`/operator-gateway/accountDetail/v1/getTrend?accountId=${props.accountId}`)
    setDataBoxProps({ data: [dataFormate(data.boxContent, 'Like', 90), dataFormate(data.boxContent, 'Like', 28)] })
  }
  const { baseInfo = {} } = props
  const { base = {} } = baseInfo
  const { platformId } = base


  const commonButtonList = [
    { key: 'Like', name: '点赞' },
    { key: 'Comment', name: '评论' }]

  const buttonList = platformId == 115 ? commonButtonList
    : [...commonButtonList, { key: 'Play', name: '播放' }]
  const data90 = dataBoxProps && dataBoxProps.data[0]
  const data28 = dataBoxProps && dataBoxProps.data[1]
  //箱子图文案判断
  const avgText = (data28 && data28.avg || 0) > (data90 && data90.avg || 0) ? '上升' : '下降'
  const q3Lessq1Text = (data28 && data28.q3Lessq1 || 0) < (data90 && data90.q3Lessq1 || 0) ? '更趋于稳定' : '波动性更大'
  return (
    <div>
      <div className='content-data'>
        <div className='title-big' >内容质量</div>
        <div className='content-char'>
          <CharTitle title='内容数据箱线图' />
          <div className='last-box-decide'>
            <div className='data-box-left'>
              <ButtonTab
                key={JSON.stringify(buttonList)}
                buttonList={buttonList}
                contentMap={{
                  Play: <DataBox {...dataBoxProps} />,
                  Like: <DataBox {...dataBoxProps} />,
                  Comment: <DataBox {...dataBoxProps} />
                }}
              />

            </div>
            <div className='right-decide' >
              <div>
                <div className='right-title'><a>箱线图分析说明</a></div>
                <div className='left-content'>
                  <p>内容表现</p>
                  {dataBoxProps.data.map(one => <div key={one.x}>
                    {one.textContent}
                  </div>)}
                </div>
                <div className='left-content '>
                  <p>趋势说明</p>
                  <div>1.近期内容整体质量{avgText
                  }
                  </div>
                  <div>2.视频的内容质量的{
                    q3Lessq1Text
                  }</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default ContentQuality

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
