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
    const { data = [] } = this.props
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    const fieldsMap = {

    }
    const cols = {
      followerCountFull: {
        // min: 0,
        alias: '粉丝累计数',
        formatter: val => {
          return formatW(val);
        }
      },
      mediaLikeSumIncre: {
        // min: 0,
        alias: '点赞净增数',
        formatter: val => {
          return formatW(val)
        }
      }
    };
    return (
      data.length > 0 ? <div>
        <Chart height={300} data={data} scale={cols}
          padding={[50, 160, 50, 80]}
          forceFit>
          <Legend marker='circle' {...legendPosition}
            offsetX={140}
            items={[
              {
                value: '粉丝累计数',
                marker: {
                  symbol: "circle",
                  fill: "#39a0ff",
                  radius: 5
                }
              },
              {
                value: '点赞净增数',
                marker: {
                  symbol: "circle",
                  fill: "#29c056",
                  radius: 5,
                }
              }
            ]}
          />
          <Axis name="number" />
          <Tooltip name='d' g2-tooltip={g2Tooltip} />
          <Geom
            type="line"
            position="dateRange*followerCountFull"
            size={2}
            color="#39a0ff"
            shape={"smooth"}
          />
          <Geom
            type="line"
            position="dateRange*mediaLikeSumIncre"
            size={2}
            color="#29c056"
            shape={"smooth"}
          />
        </Chart>
      </div> : <Empty style={{ height: 418, paddingTop: 80 }} />
    );
  }
}

export default CurveLine;
