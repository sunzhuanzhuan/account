import React, { Component } from 'react'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";
import './CompositeRadar.less'
import numeral from 'numeral'
import { g2Tooltip, legendPosition } from "./config";
class CompositeRadar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { DataView } = DataSet;
    const { data = [], legendType } = this.props
    const dataForMap = data.reduce((obj, item) => {
      obj[item.name] = item.value
      return obj
    }, {})
    const dv = new DataView().source(data);
    dv.transform({
      type: "fold",
      fields: ["value", "avgValue"],
      // 展开字段集
      key: "user",
      // key字段
      value: "score", // value字段
      callback: obj => {
        obj.range = [obj.value, obj.avgValue, obj.list];
        return obj;
      }
    });
    const scale = {
      user: { formatter: d => ({ value: '该账号', avgValue: `${legendType[1]}分类平均值` }[d]) },
    };
    const toopicConfig = [
      "value*avgValue*list",
      (value, avgValue, list) => {
        return {
          name: value,
          avgValue,
          list,
        }
      }]

    return (
      <div>
        <Chart
          height={240}
          data={dv}
          padding={[70, 30, 40, 30]}
          scale={scale}
          forceFit

        >
          <Coord type="polar" />
          <Axis
            name="name"
            line={null}
            tickLine={null}
            label={{
              htmlTemplate(text, item, index) {
                const value = numeral(dataForMap[text] || 0).format('0')
                return `<div style='width:100px;text-align:center'>${text}  <span style="color:#333;font-size:14px;font-weight:400;">${value}</span></div>`
              }
            }}
            grid={{
              lineStyle: {
                lineDash: null
              },
              hideFirstLine: false
            }}

          />
          <Tooltip
            g2-tooltip={g2Tooltip}
            inPlot={false}
            useHtml={true}
            htmlContent={function (title, items) {
              const { list = [] } = items[0]
              return `<div class='custom-tooltip'>
              <div class='custom-tooltip-head-box'>
                <div class='custom-tooltip-head-title-first' >该账号</div>
                <div class='custom-tooltip-head-title'>平均值</div>
                <div class='custom-tooltip-head-title' style="width:80px">与同分类相比</div>
             </div>
             <div class='custom-tooltip-head'>
              ${list.map((one, index) => `<div  class='${index == 0 ? 'data-line-first' : 'data-line'}' key={index}>
                           <div class="${index == 0 ? 'data-item-first-border' : 'data-item-first'}">
                               ${one.name} <div class='span-wihte'>${one.value ? one.value : '-'}</div>
                           </div>
                           <div style="color: ${index == 0 ? '#fff' : '#999'}" class='data-item'>${one.avgValue ? one.avgValue : '-'}</div>
                          ${one.compare ? `<div style="color: ${one.compare > 0 ? '#EF554A' : '#7ED321'}" class='data-item'>
                           <img width='10px' src='${require(one.compare > 0 ? "../img/up-red.png" : "../img/down-green.png")}'/>${numeral(Math.abs(one.compare)).format('0.0%')}
                            </div>`: "<div class='data-item' style='color:#999'>-</div>"}
                        <div/>` ).join('')}
             </div>
      </div>`
            }}
          />
          <Axis
            name="score"
            line={null}
            label={null}
            tickLine={null}
            grid={{
              type: "polygon",
              lineStyle: {
                lineDash: null
              },
              alternateColor: "rgba(0, 0, 0, 0.04)"
            }}
          />
          <Legend name="user" marker="circle" offsetY={-30} position='top-center' data={['环节一', '环节二']} />
          <Geom type="line"
            position="name*score"
            tooltip={false}
            color={['user', ['#1990FF', '#FACC14']]}
            size={2}
          />
          <Geom
            tooltip={toopicConfig}
            type="point"
            position="name*score"
            shape="circle"
            size={5}
            color={['user', ['#1990FF', '#FACC14']]}
            style={{
              stroke: "#fff",
              lineWidth: 1,
              fillOpacity: 1
            }}
          />
        </Chart>
      </div >
    );
  }
}


export default CompositeRadar;
