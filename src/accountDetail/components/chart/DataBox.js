import React, { Component } from 'react'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";
import DataSet from "@antv/data-set";
import { g2Tooltip, } from "./config";

class DataBox extends Component {
  render() {
    const { data = [] } = this.props
    const { DataView } = DataSet;
    const dataDefault = [
      {
        x: "Oceania",
        low: 1,
        q1: 9,
        median: 16,
        q3: 22,
        high: 24
      }
    ];
    const dv = new DataView().source(data);
    dv.transform({
      type: "map",
      callback: obj => {
        obj.range = [obj.low, obj.q1, obj.median, obj.q3, obj.high];
        return obj;
      }
    });
    const cols = {
      range: {
        max: 35
      }
    };
    return (
      <div>
        <Chart
          height={400}
          data={dv}
          scale={cols}
          padding={[20, 120, 95]}
          forceFit
        >
          <Axis name="x" />
          <Axis name="range" />
          <Tooltip
            showTitle={false}
            g2-tooltip={g2Tooltip}
            crosshairs={{
              type: "rect",
              style: {
                fill: "#E4E8F1",
                fillOpacity: 0.43
              }
            }}
            itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/><span style=&quot;padding-left: 16px&quot;>最大值：{high}</span><br/><span style=&quot;padding-left: 16px&quot;>上四分位数：{q3}</span><br/><span style=&quot;padding-left: 16px&quot;>中位数：{median}</span><br/><span style=&quot;padding-left: 16px&quot;>下四分位数：{q1}</span><br/><span style=&quot;padding-left: 16px&quot;>最小值：{low}</span><br/></li>"
          />

          <Geom
            type="schema"
            position="x*range"
            shape="box"
            color={'#1990ff'}
            tooltip={[
              "x*low*q1*median*q3*high",
              (x, low, q1, median, q3, high) => {
                return {
                  name: x,
                  low,
                  q1,
                  median,
                  q3,
                  high
                };
              }
            ]}

            style={{
              stroke: "rgba(0, 0, 0, 0.45)",
              fill: "#1990ff",
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default DataBox;
