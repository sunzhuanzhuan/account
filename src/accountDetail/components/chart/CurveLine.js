import React, { Component } from 'react'
import { g2Tooltip, legendPosition } from "./config";
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
    const { data = [], GreenlineName, GreenlineText, BluelineText, BluelineName, boxLeft, boxRight, height = 300 } = this.props
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    const fieldsMap = {

    }
    const cols = {
      followerCountFull: {
        alias: BluelineText,
        formatter: val => {
          return formatW(val);
        }
      },
      mediaLikeSumIncre: {
        alias: GreenlineText,
        formatter: val => {
          return formatW(val)
        }
      }
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
                  fill: "#39a0ff",
                  radius: 5
                }
              },
              {
                value: GreenlineText,
                marker: {
                  symbol: "circle",
                  fill: "#29c056",
                  radius: 5,
                }
              }
            ]}
          />

          <Axis
            name='followerCountFull'
            grid={null}
          />
          <Axis
            name='mediaLikeSumIncre'
            grid={null}
          />
          <Tooltip name='d' g2-tooltip={g2Tooltip} />
          <Geom
            type="line"
            position={`dateRange*${BluelineName}`}
            size={2}
            color="#29c056"
            shape={"smooth"}
          />
          <Geom
            type="line"
            position={`dateRange*${GreenlineName}`}
            size={2}
            color="#39a0ff"
            shape={"smooth"}
          />
        </Chart>
      </div> : <Empty style={{ height: 418, paddingTop: 80 }} />
    );
  }
}

export default CurveLine;
