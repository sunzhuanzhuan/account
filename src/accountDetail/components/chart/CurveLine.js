import React, { Component } from 'react'
import { g2Tooltip, legendPosition, blueColor, greenColor } from "./config";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";
import { formatW } from "../../util";
import { Empty } from 'antd';
import numeral from 'numeral'
const colList = [
  { name: '阅读数', key: 'mediaRead' },
  { name: '点赞数', key: 'mediaLike' },
  { name: '评论数', key: 'mediaCommend' },
  { name: '粉丝累计量', key: 'followerCountFull' },
  { name: '粉丝增量', key: 'followerCountIncre' },
  { name: '评论增量', key: 'mediaCommentAvgIncre' },
  { name: '点赞增量', key: 'mediaLikeAvgIncre' },
  { name: '播放增量', key: 'mediaPlayAvgIncre' },
  { name: '互动数', key: 'mediaInteractionAvgIncre' },
  { name: '平均点赞数', key: 'mediaLikeAvgFull' },
  { name: '视频发布数', key: 'mediaCountIncre' },
]
class CurveLine extends Component {

  render() {
    // mediaCountIncre: '发布净增数' 
    // followerCountFull: '粉丝累计数',  
    // mediaLikeSumIncre: '点赞净增数',
    const { data = [],
      GreenlineName, GreenlineText,
      BluelineText, BluelineName, boxLeft, boxRight, height = 300,
    } = this.props
    const colObject = {}
    colList.forEach(item => {
      colObject[item.key] = {
        alias: item.name,
        formatter: val => {
          return formatW(val)
        }
      }
    });
    const cols = {
      dateRange: {
        tickCount: data && data.length,
      },
      ...colObject,
      interactionProportionIncre: {
        alias: '互动率',
        formatter: val => {
          return numeral(val || 0).format('0.0%')
        }
      },

    };
    return (
      data.length > 0 ? <div className='histogram-line' key={BluelineText}>
        <div className='title-line'>
          <div className='left-title' style={{ left: boxLeft }}>{BluelineText}</div>
          {GreenlineText ? <div className='right-title' style={{ right: boxRight }}>{GreenlineText}</div> : null}
        </div>
        <Chart height={height} data={data} scale={cols}
          padding={[60, 100, 60, 80]}

          forceFit>
          <Legend marker='circle' {...legendPosition}
            offsetX={70}
            offsetY={-30}
            clickable={false}
            items={[
              {
                value: BluelineText,
                marker: {
                  symbol: "circle",
                  fill: blueColor,
                  radius: 5
                }
              },
              {
                value: GreenlineText,
                marker: GreenlineText ? {
                  symbol: "circle",
                  fill: greenColor,
                  radius: 5,
                } : {}
              }
            ]}
          />
          <Tooltip name='' g2-tooltip={g2Tooltip} />
          <Axis
            name={BluelineName}
            grid={null}
          />
          <Geom
            type="line"
            position={`dateRange*${BluelineName}`}
            size={2}
            color={blueColor}
            shape={"smooth"}

          />
          <Axis
            name='dateRange'
          />

          <Axis
            key='1'
            name={GreenlineName}
            grid={null}
          />
          <Geom
            key='2'
            type="line"
            position={`dateRange*${GreenlineName}`}
            size={2}
            color={greenColor}
            shape={"smooth"}
          />
        </Chart>
      </div> : <Empty style={{ height: height, paddingTop: 80 }} />
    );
  }
}

export default CurveLine;
