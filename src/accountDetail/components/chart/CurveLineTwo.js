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


class CurveLine extends Component {

  render() {
    // 'mediaCountIncre'   mediaCountIncre: '发布净增数' 
    const { data = [] } = this.props
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    const fieldsMap = { followerCountFull: '粉丝累计数', mediaLikeSumIncre: '点赞净增数', }
    dv.transform({
      type: "fold",
      fields: ["followerCountFull", "mediaLikeSumIncre",],
      // 展开字段集
      key: "city",
      // key字段
      value: "temperature" // value字段
    });
    const cols = {
      dateRange: {
        range: [0, 1]
      },
      city: { formatter: d => (fieldsMap[d]) },

    };
    return (
      <div>
        <Chart height={400} data={dv} scale={cols}
          padding={[50, 160, 50, 80]}
          forceFit>
          <Legend marker='circle' {...legendPosition} offsetX={140} />
          <Axis name="dateRange" />
          <Axis
            name="temperature"
            label={{
              formatter: val => formatW(val)
            }}
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
            tooltip={[
              "city*temperature",
              (city, temperature) => {
                return {
                  name: fieldsMap[city],
                  value: formatW(temperature)
                }
              }]}
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
