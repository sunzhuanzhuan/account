import React, { Component } from 'react'

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
    const data = [
      {
        month: "10.15-10.21",
        fansNum: 7.0,
        numberAdd: 1.2,
        upNumber: 3.9
      },
      {
        month: "10.22-10.28",
        fansNum: 6.9,
        numberAdd: 11.2,
        upNumber: 4.2
      },
      {
        month: "10.29-11.04",
        fansNum: 9.5,
        numberAdd: 18.2,
        upNumber: 5.7
      },
      {
        month: "11.05-11.11",
        fansNum: 14.5,
        numberAdd: 11.2,
        upNumber: 8.5
      },
      {
        month: "11.12-11.18",
        fansNum: 18.4,
        numberAdd: 11.2,
        upNumber: 11.9
      }];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["fansNum", "upNumber", 'numberAdd'],
      // 展开字段集
      key: "city",
      // key字段
      value: "temperature" // value字段
    });
    console.log(dv);
    const cols = {
      month: {
        range: [0, 1]
      },
      city: { formatter: d => ({ fansNum: '粉丝累计数', upNumber: '点赞净增数', numberAdd: '发布净增数' }[d]) }
    };
    return (
      <div>
        <Chart height={400} data={dv} scale={cols} forceFit>
          <Legend />
          <Axis name="month" />
          <Axis
            name="temperature"
            label={{
              formatter: val => `${val}°C`
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="month*temperature"
            size={2}
            color={"city"}
            shape={"smooth"}
          />
          <Geom
            type="point"
            position="month*temperature"
            size={4}
            shape={"circle"}
            color={"city"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default CurveLine;
