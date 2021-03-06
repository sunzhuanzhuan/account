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
import { Empty } from "antd";
import {
  blueColor,
  greenColor,
  pinkColor, g2Tooltip
} from "./config";
import './RingPie.less'


class RingPie extends React.Component {
  render() {
    const { data = [], height = 300, padding = [30, 50], isOneLine } = this.props
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
          val = numeral(val).format('0.0%')
          return val;
        }
      }
    };

    return (
      <div >
        {data.length > 0 ? <Chart
          height={height}
          data={dv}
          scale={cols}
          padding={padding}
          forceFit
        >
          <Coord type={"theta"} radius={1} innerRadius={0.8} />
          <Axis name="percent" />
          {/* <Legend
            position="right-top"
            //offsetY={-120}
            offsetX={30}
          /> */}
          <Tooltip
            g2-tooltip={g2Tooltip}
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          {/* <Guide>
            <Html
              position={["50%", "50%"]}
              html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>年龄分布</div>"
              alignX="middle"
              alignY="middle"
            />
          </Guide> */}
          <Geom
            type="intervalStack"
            position="percent"
            color={['name', [pinkColor, blueColor, greenColor]]}
            tooltip={[
              "name*percent",
              (item, percent) => {
                percent = numeral(percent).format('0.0%')
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
                const { name, tgiValue } = point;
                return isOneLine ? `<div class='one-line-width'><span class='title'>${name}</span>：${text}</div>` : `<div class='ring-title'}>${name}<div>
                        <div class='ring-content'>占比：${text}<div>
                        <div class='ring-content'>${tgiValue ? `TGI：${numeral(tgiValue).format('0.0')}` : ''}<div>`
              }}
            />
          </Geom>
        </Chart> : <Empty style={{ height: height + 18, paddingTop: 80 }} />}
      </div>
    );
  }
}

export default RingPie;
