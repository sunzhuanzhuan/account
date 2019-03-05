import React, { Component } from 'react'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";
import { g2Tooltip, legendPosition } from "./config";

class PieChart extends Component {
  render() {
    const { DataView } = DataSet;
    const data = [
      {
        item: "IOS",
        count: 40
      },
      {
        item: "安卓",
        count: 60
      },

    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      },

    };
    const { isThree = false } = this.props
    const colorArr = isThree ? ['#4980ff', '#4466b0', '#b1c7ff'] : ['#4980ff', '#b1c7ff']
    return (
      <div>
        <Chart
          height={300}
          data={dv}
          scale={cols}
          padding={[30]}
          forceFit
        >
          <Coord type="theta" radius={0.8} />
          <Axis name="percent" />
          <Legend position='right'
            offsetY={-window.innerHeight / 2 + 120}
            offsetX={-70} />
          <Tooltip
            g2-tooltip={g2Tooltip}
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Geom
            type="intervalStack"
            position="percent"
            color={['item', colorArr]}
            tooltip={[
              "item*percent",
              (item, percent) => {
                percent = percent * 100 + "%";
                return {
                  name: item,
                  value: percent
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="percent"
              offset={-40}
              textStyle={{
                rotate: 0,
                textAlign: "center",
                shadowBlur: 2,
                shadowColor: "rgba(0, 0, 0, .45)"
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default PieChart;
