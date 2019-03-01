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
        b: 30
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
      value: "score" // value字段
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
          height={200}
          data={dv}
          padding={[60, 10, 20, 20]}
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
          <Tooltip />
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
