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
    const tooltipCfg = {
      custom: true,
      containerTpl: '<div class="ac-tooltip" style="position:absolute;visibility: hidden;background: rgba(255, 44, 52, 0.5);color: #fff;border-radius: 50%;padding: 10px 20px;text-align: center;"><h4 class="ac-title" style="margin: 0;padding: 5px 0;border-bottom: 1px solid #fff;"></h4><table class="ac-list custom-table" style="padding: 5px 0;"></table></div>',
      itemTpl: '<tr><td style="display:none">{index}</td><td style="color:{color}">{b}</td><td>{value}k</td></tr>'
    };
    return (
      <div>
        <Chart
          height={300}
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
            useHtml
            {...tooltipCfg}
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
