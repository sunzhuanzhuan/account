import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Region,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Line
} from "bizcharts";
import DataSet from "@antv/data-set";

class Groupedcolumn extends React.Component {
  render() {
    const data = [
      {
        name: "London",
        "Jan.": 18.9,
        "Feb.": 28.8,
        "Mar.": 39.3,
        "Apr.": 81.4,
        May: 47,
        "Jun.": 20.3,
        "Jul.": 24,
        "Aug.": 35.6
      },
      {
        name: "Berlin",
        "Jan.": 12.4,
        "Feb.": 23.2,
        "Mar.": 34.5,
        "Apr.": 99.7,
        May: 52.6,
        "Jun.": 35.5,
        "Jul.": 37.4,
        "Aug.": 42.4
      }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug."],
      // 展开字段集
      key: "月份",
      // key字段
      value: "月均降雨量" // value字段
    });
    return (
      <div>
        <Chart height={400} data={dv} forceFit>
          <Axis name="月份" />
          <Axis name="月均降雨量" />
          <Legend />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="interval"
            position="月份*月均降雨量"
            color={"name"}
            adjust={[
              {
                type: "dodge",
                marginRatio: 1 / 32
              }
            ]}
          />

          {/* <Guide>
            <Line
              top={true} // 指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
              start={{ Jan: 12 }} // 辅助线起始位置，值为原始数据值，支持 callback
              end={{ Jan: 25 }} // 辅助线结束位置，值为原始数据值，支持 callback
              lineStyle={{
                stroke: '#999', // 线的颜色
                lineDash: [0, 2, 2], // 虚线的设置
                lineWidth: 3 // 线的宽度
              }} // 图形样式配置
              text={{
                position: 'end', // 文本的显示位置
                content: 'xxx', // 文本的内容
                // offsetX: { number }, // x 方向的偏移量
                //offsetY: { number } // y 方向的偏移量
              }}
            />
          </Guide> */}
        </Chart>
      </div>
    );
  }
}

export default Groupedcolumn;
