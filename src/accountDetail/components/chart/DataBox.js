import React, { Component } from 'react'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";
import DataSet from "@antv/data-set";
import { g2Tooltip, } from "./config";
import { Empty } from 'antd';
import { formatW } from "../../util";
import './CompositeRadar.less'

class DataBox extends Component {
  render() {
    const { data = [], afterText } = this.props
    const { DataView } = DataSet;
    const dataDefault = [
      {
        x: "Oceania",
        low: 1,
        lowerQuartile: 9,
        median: 16,
        upperQuartile: 22,
        max: 24
      }
    ];
    const dv = new DataView().source(data);
    dv.transform({
      type: "map",
      callback: obj => {
        obj.range = [obj.low, obj.lowerQuartile, obj.median, obj.upperQuartile, obj.max];
        return obj;
      }
    });
    const cols = {
      // range: {
      //   max: 35
      // }
    };
    return (
      <div style={{ height: 300 }}>
        {data.length > 0 ? <Chart
          height={300}
          data={dv}
          scale={cols}
          padding={[20, 80, 45]}
          forceFit
        >
          <Axis name="x" label={{
            formatter(text) {
              let arr = text.split(' ');
              return `近${arr[0]}${afterText}`;
            }
          }} />
          <Axis name="range" label={{
            formatter(text) {
              let arr = text.split(' ');
              return formatW(arr[0]);
            }
          }} />
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
            htmlContent={function (title, items) {
              const { name, max, upperQuartile, median, lowerQuartile, low } = items && items[0]
              return `<div class='custom-tooltip' style='width:160px;padding:10px'>
              <div data-index={index} style=&quot;margin-bottom:2px;&quot;>
              <span style=&quot;padding-left: 16px&quot;>
                最大值：${formatW(max)}
              </span><br/>
              <span style=&quot;padding-left: 16px&quot;>
                上四分位数：${formatW(upperQuartile)}
              </span><br/>
              <span style=&quot;padding-left: 16px&quot;>
                中位数：${formatW(median)}</span>
              <br/>
              <span style=&quot;padding-left: 16px&quot;>
                下四分位数：${formatW(lowerQuartile)}
              </span><br/>
              <span style=&quot;padding-left: 16px&quot;>
                最小值：${formatW(low)}
              </span><br/>
              </div>
              </div>`
            }}

          />

          <Geom
            type="schema"
            position="x*range"
            shape="box"
            color={'#1990ff'}
            tooltip={[
              "x*low*lowerQuartile*median*upperQuartile*max",
              (x, low, lowerQuartile, median, upperQuartile, max) => {
                return {
                  name: x,
                  low,
                  lowerQuartile,
                  median,
                  upperQuartile,
                  max
                };
              }
            ]}

            style={{
              stroke: "rgba(0, 0, 0, 0.45)",
              fill: "#1990ff",
            }}
          />
        </Chart> : <Empty style={{ height: 318, paddingTop: 80 }} />}
      </div>
    );
  }
}

export default DataBox;
