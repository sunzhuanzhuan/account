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
import numeral from 'numeral'
import { Empty } from 'antd';

class PieChart extends Component {
  render() {
    const { DataView } = DataSet;
    const { isThree = false, data = [] } = this.props
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "value",
      dimension: "name",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          return numeral(val || 0).format('0.0%')
        }
      },
    };
    const colorArr = isThree ? ['#3AA1FF', '#F4655B', '#FCD435'] : ['#3AA1FF', '#F4655B']
    return (
      <div>
        {data.length > 0 ? <Chart
          height={300}
          data={dv}
          scale={cols}
          padding={[50]}
          forceFit
        >
          <Coord type="theta" radius={0.9} />
          <Axis name="percent" />
          <Legend position='right-top' offsetX={-40} />
          <Tooltip
            g2-tooltip={g2Tooltip}
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Geom
            type="intervalStack"
            position="percent"
            color={['name', colorArr]}
            tooltip={[
              "name*percent",
              (name, percent) => {
                return {
                  name: name,
                  value: numeral(percent || 0).format('0.0%')
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
        </Chart> : <Empty style={{ height: 304, paddingTop: 80 }} />}
      </div>
    );
  }
}

export default PieChart;
