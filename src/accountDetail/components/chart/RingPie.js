import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";
import numeral from 'numeral'


class RingPie extends React.Component {
  render() {
    const { data = [] } = this.props
    const { DataView } = DataSet;
    const { Html } = Guide;
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
          val = numeral(val).format('0.00%')
          return val;
        }
      }
    };
    return (
      <div>
        <Chart
          height={300}
          data={dv}
          scale={cols}
          padding={[20, 100, 50, 50]}
          forceFit
        >
          <Coord type={"theta"} radius={0.65} innerRadius={0.6} />
          <Axis name="percent" />
          <Legend
            position="right-top"
            //offsetY={-120}
            offsetX={30}
          />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Guide>
            <Html
              position={["50%", "50%"]}
              html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>年龄分布</div>"
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color="name"
            tooltip={[
              "name*percent",
              (item, percent) => {
                percent = numeral(percent).format('0.00%')
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
              htmlTemplate={(text, item, index) => {
                var point = item.point; // 每个弧度对应的点
                var percentName = point.name;
                return `<div style="width:80px;text-align:center"}>${percentName}<div>
                        <div style="width:80px;text-align:center">${ text}<div>`
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default RingPie;
