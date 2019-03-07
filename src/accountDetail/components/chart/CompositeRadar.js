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
import { g2Tooltip, legendPosition } from "./config";
class CompositeRadar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { DataView } = DataSet;
    const data = [
      {
        item: "内容传播指数",
        a: 70,
        b: 30,
        c: '服务指数',
        d: [
          { name: '哈哈哈', value: 'ssss', value2: '333', up: 20 },
          { name: '服务', value: 'ssss', value2: '333', up: 20 },
          { name: '订单打分', value: 'ssss', value2: '333', up: 30 },
          { name: '拉黑比例', value: 'ssss', value2: '333', up: 32 }]
      },
      {
        item: "SNBT指数",
        a: 60,
        b: 70,
        c: '服务指数',
        d: [
          { name: '哈哈哈', value: 'ssss', value2: '333', up: 20 },
          { name: '哈哈哈', value: 'ssss', value2: '333', up: '' },
          { name: '哈哈哈', value: 'ssss', value2: '333', up: 30 },
          { name: '哈哈哈', value: 'ssss', value2: '333', up: '' }]
      },
      {
        item: "黑马指数",
        a: 50,
        b: 60,
        c: '服务指数',
        d: [
          { name: '哈哈哈', value: 'ssss', value2: '333', up: 20 },
          { name: '哈哈哈', value: 'ssss', value2: '333', up: -20 },
          { name: '哈哈哈', value: 'ssss', value2: '333', up: 30 },
          { name: '哈哈哈', value: 'ssss', value2: '333', up: -32 }]
      },
      {
        item: "互动指数",
        a: 40,
        b: 50,
        c: '服务指数',
        d: [
          { name: '哈哈哈', value: 'ssss', value2: '333', up: 20 },
          { name: '哈哈哈', value: 'ssss', value2: '333', up: -20 },
          { name: '哈哈哈', value: 'ssss', value2: '333', up: 30 },
          { name: '哈哈哈', value: 'ssss', value2: '333', up: -32 }]
      },
      {
        item: "配合度指数",
        a: 60,
        b: 70,
        c: '服务指数',
        d: [
          { name: '哈哈哈', value: 'ssss', value2: '333', up: 20 },
          { name: '哈哈哈', value: 'ssss', value2: '333', up: -20 },
          { name: '哈哈哈', value: 'ssss', value2: '333', up: 30 },
          { name: '哈哈哈', value: 'ssss', value2: '333', up: -32 }]
      },
      {
        item: "服务指数",
        a: 70,
        b: 50,
        c: '服务指数',
        d: [
          { name: '哈哈哈', value: 'ssss', value2: '333', up: 20 },
          { name: '哈哈哈', value: 'ssss', value2: '333', up: -20 },
          { name: '哈哈哈', value: 'ssss', value2: '333', up: 30 },
          { name: '哈哈哈', value: 'ssss', value2: '333', up: -32 }]
      },
    ];
    const dv = new DataView().source(data);
    dv.transform({
      type: "fold",
      fields: ["a", "b"],
      // 展开字段集
      key: "user",
      // key字段
      value: "score", // value字段
      callback: obj => {
        obj.range = [obj.a, obj.b, obj.c, obj.d];
        return obj;
      }
    });
    const scale = {
      score: {
        min: 0,
        max: 80
      },
      user: { formatter: d => ({ a: '该账号', b: '美妆分类平均值' }[d]) }
    };
    const toopicConfig = [
      "a*b*c*d",
      (a, b, c, d) => {
        return {
          name: a,
          b,
          c,
          d,
        }
      }]

    return (
      <div>
        <Chart
          height={240}
          data={dv}
          padding={[50, 10, 20, 20]}
          scale={scale}
          forceFit

        >
          <Coord type="polar" radius={0.9} />
          <Axis
            name="item"
            line={null}
            tickLine={null}
            grid={{
              lineStyle: {
                lineDash: null
              },
              hideFirstLine: false
            }}

          />
          <Tooltip
            g2-tooltip={g2Tooltip}
            crosshairs={{
              type: "rect",
            }}
            inPlot={true}
            useHtml={true}
            htmlContent={function (title, items) {
              const { d = [] } = items[0]
              return `<div class='custom-tooltip'>
              <div class='custom-tooltip-head-box'>
                <div class='custom-tooltip-head-title-first' >该账号</div>
                <div class='custom-tooltip-head-title'>平均值</div>
                <div class='custom-tooltip-head-title' style="width:80px">与同分类相比</div>
             </div>
             <div class='custom-tooltip-head'>
              ${d.map((one, index) => `<div  class='${index == 0 ? 'data-line-first' : 'data-line'}' key={index}>
                           <div class="${index == 0 ? 'data-item-first-border' : 'data-item-first'}">
                               ${one.name} <div class='span-wihte'>${one.value}</div>
                           </div>
                           <div style="color: ${index == 0 ? '#fff' : '#999'}" class='data-item'>${one.value2}</div>
                          ${one.up ? `<div style="color: ${one.up > 0 ? '#EF554A' : '#7ED321'}" class='data-item'>
                           <img width='12px' src='${require(one.up > 0 ? "../img/up-red.png" : "../img/down-green.png")}'/>${one.up}
                            </div>`: "<div class='data-item'style='color:#999'>-</div>"}
                        <div/>` ).join('')}
             </div>
      </div>`
            }}
          />
          <Axis
            name="score"
            line={null}
            tickLine={null}
            grid={{
              type: "polygon",
              lineStyle: {
                lineDash: null
              },
              alternateColor: "rgba(0, 0, 0, 0.04)"
            }}
          />
          <Legend name="user" marker="circle" offset={30} position='top-center' data={['环节一', '环节二']} />
          <Geom type="line"
            position="item*score"
            color={['user', ['#1990FF', '#FACC14']]}
            size={2}
            tooltip={toopicConfig} />
          <Geom
            type="point"
            position="item*score"
            shape="circle"
            size={4}
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
