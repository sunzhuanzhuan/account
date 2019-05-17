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


class CurveLine extends Component {

  render() {
    // mediaCountIncre: '发布净增数' 
    // followerCountFull: '粉丝累计数', 
    // mediaLikeSumIncre: '点赞净增数',
    const { data = [],
      GreenlineName, GreenlineText,
      BluelineText, BluelineName, boxLeft, boxRight, height = 300 } = this.props
    const cols = {
      followerCountFull: {
        alias: '粉丝累计数',
        formatter: val => {
          return formatW(val)
        }
      },
      followerCountIncre: {
        alias: '粉丝净增数',
        formatter: val => {
          return formatW(val);
        }
      },
      mediaLikeAvgFull: {
        alias: '平均点赞数',
        formatter: val => {
          return formatW(val);
        }
      },
      mediaCountIncre: {
        alias: '视频发布数',
        formatter: val => {
          return formatW(val)
        }
      },
      mediaInteractionAvgFull: {
        alias: '平均互动数',
        formatter: val => {
          return formatW(val);
        }
      },
      interactionProportionIncre: {
        alias: '平均互动率',
        formatter: val => {
          return formatW(val)
        }
      },
    };
    return (
      data.length > 0 ? <div className='histogram-line'>
        <div className='title-line'>
          <div className='left-title' style={{ left: boxLeft }}>{BluelineText}</div>
          <div className='right-title' style={{ right: boxRight }}>{GreenlineText}</div>
        </div>
        <Chart height={height} data={data} scale={cols}
          padding={[60, 100, 60, 80]}
          forceFit>
          <Legend marker='circle' {...legendPosition}
            offsetX={70}
            offsetY={-30}
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
                marker: {
                  symbol: "circle",
                  fill: greenColor,
                  radius: 5,
                }
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
            name={GreenlineName}
            grid={null}
          />
          <Geom
            type="line"
            position={`dateRange*${GreenlineName}`}
            size={2}
            color={greenColor}
            shape={"smooth"}
          />


        </Chart>
      </div> : <Empty style={{ height: 418, paddingTop: 80 }} />
    );
  }
}

export default CurveLine;
