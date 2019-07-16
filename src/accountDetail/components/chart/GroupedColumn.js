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
import { formatW } from "../../util";
import './GroupedColumn.less'
import DataSet from "@antv/data-set";
const { Line } = Guide;
export default class GroupedColumn extends React.Component {
  getAvgNumber = (data = [], key) => {
    if (data.length > 0) {
      return data.reduce((pre, next) => pre + next[key], 0) / data.length;
    }
  }
  render() {
    const data = [
      {
        label: "Monday",
        series1: 2800,
        series2: 2260
      },
      {
        label: "Tuesday",
        series1: 1800,
        series2: 1300
      },
      {
        label: "Wednesday",
        series1: 950,
        series2: 900
      },
      {
        label: "Thursday",
        series1: 500,
        series2: 390
      },
      {
        label: "Friday",
        series1: 170,
        series2: 100
      }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["series1", "series2"],
      // 展开字段集
      key: "type",
      // key字段
      value: "value" // value字段
    });
    const scale = {
      type: { formatter: d => ({ series1: '点赞', series2: '评论' }[d]) },
    };
    var imageMap = {
      Wednesday: require("../img/fire.png"),
    };
    return (
      <div>
        <div className='legend-customize'>
          <div>
            <div className='block-legend fire'></div>
            <div>最火视频</div>
          </div>
          <div>
            <div className='block-legend blue'></div>
            <div>点赞</div>
          </div>
          <div>
            <div className='block-legend green'></div>
            <div>评论</div>
          </div>
        </div>
        <Chart height={400} data={dv} scale={scale}
          padding={[40, 80]}
          forceFit>
          <Coord />
          <Axis name="label" label={{
            offset: 12
          }}
          />
          <Tooltip />
          <Geom
            type="interval"
            position="label*value"
            color={"type"}
            adjust={[
              {
                type: "dodge",
                marginRatio: 1 / 32
              }
            ]}
          />
          <Geom
            type="point"
            position="label*series1"
            size={40}
            shape={[
              "label",
              function (name) {
                return ["image", imageMap[name]];
              }
            ]}
          />
          <Guide>
            <GuideLine content='近30条视频平均评论' middle={this.getAvgNumber(data, 'series1')} />
            <GuideLine content='近30条视频平均点赞' middle={this.getAvgNumber(data, 'series2')} color='#3AA1FF' />

          </Guide>
        </Chart>
      </div>
    );
  }
}


const GuideLine = ({ middle, color = '#2fc25b', content = '平均' }) => {
  return <Line
    top
    start={{ label: "Monday", value: middle }}
    end={{ label: "Friday", value: middle }}
    lineStyle={{
      stroke: color,
      lineDash: [0, 1, 1],
      lineWidth: 1,
    }}
    text={{
      position: 'end',
      style: {
        fill: color,
      },
      content: content,
    }}
  />

}
