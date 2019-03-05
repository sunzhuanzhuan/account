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
        d: 90,
        e: 85,
        f:'11%',
      },
      {
        item: "SNBT指数",
        a: 60,
        b: 70
      },
      {
        item: "黑马指数",
        a: 50,
        b: 60
      },
      {
        item: "互动指数",
        a: 40,
        b: 50
      },
      {
        item: "配合度指数",
        a: 60,
        b: 70
      },
      {
        item: "服务指数",
        a: 70,
        b: 50
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
        obj.range = [obj.a, obj.b, obj.c, obj.d, obj.e];
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
            itemTpl="<li data-index={index} 
            style=&quot;margin-bottom:4px;&quot;>{a}<br/>
             <span style=&quot;padding-left: 16px&quot;>{c}：{b}</span><br/>
             <span style=&quot;padding-left: 16px&quot;>上四分位数：{c}</span><br/>
             <span style=&quot;padding-left: 16px&quot;>中位数：{d}</span><br/>
             <span style=&quot;padding-left: 16px&quot;>下四分位数：{e}</span><br/>
             <span style=&quot;padding-left: 16px&quot;>最小值：{low}</span><br/></li>"
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
          <Geom type="line" position="item*score" color="user" size={2} />
          <Geom
            type="point"
            position="item*score"
            color="user"
            shape="circle"
            size={4}
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
