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


class CurveLine extends Component {

  render() {
    // const data = [
    //   {
    //     month: "10.15-10.21",
    //     followerCountFull: 7.0,
    //     mediaCountIncre: 1.2,
    //     mediaLikeSumIncre: 3.9
    //   },
    // ];
    const { data = [] } = this.props
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["followerCountFull", "mediaLikeSumIncre", 'mediaCountIncre'],
      // 展开字段集
      key: "city",
      // key字段
      value: "temperature" // value字段
    });
    const cols = {
      dateRange: {
        range: [0, 1]
      },
      city: { formatter: d => ({ followerCountFull: '粉丝累计数', mediaLikeSumIncre: '点赞净增数', mediaCountIncre: '发布净增数' }[d]) },

    };
    return (
      <div>
        <Chart height={400} data={dv} scale={cols}
          padding={[50, 160, 50, 40]}
          forceFit>
          <Legend marker='circle' {...legendPosition} offsetX={140} />
          <Axis name="dateRange" />
          <Axis
            name="temperature"
            visible={false}
          // label={{
          //   formatter: val => `${val}°C`
          // }}
          />
          <Tooltip
            g2-tooltip={g2Tooltip}
            crosshairs={{
              type: "y",//rect: 矩形框,x: 水平辅助线,y: 垂直辅助线,cross: 十字辅助线。
            }}
          />
          <Geom
            type="line"
            position="dateRange*temperature"
            size={2}
            color={"city"}
            shape={"smooth"}
          />
          {/* <Geom
            type="point"
            position="month*temperature"
            size={4}
            shape={"circle"}
            color={"city"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          /> */}
        </Chart>
      </div>
    );
  }
}

export default CurveLine;
