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
import {
  g2Tooltip, getMinNumber, getMaxNumber
} from "./config";
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
    const { data, typeKey2 = 'mediaCommentNum' } = this.props
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["mediaLikeNum", typeKey2],
      // 展开字段集
      key: "type",
      // key字段
      value: "value", // value字段
      callback: obj => {
        obj.value = [obj.mediaLikeNum, obj[typeKey2]];
        return obj;
      }
    });
    const scale = {
      type: {
        formatter: d => ({
          mediaLikeNum: '点赞',
          [typeKey2]: '评论'
        }[d])
      },
      value: {
        min: getMinNumber('mediaLikeNum', data) > getMinNumber(typeKey2, data) ? getMinNumber(typeKey2, data) : getMinNumber('mediaLikeNum', data),
        max: getMaxNumber('mediaLikeNum', data) > getMaxNumber(typeKey2, data) ? getMaxNumber('mediaLikeNum', data) : getMaxNumber(typeKey2, data),
        formatter: val => {
          return formatW(val);
        }
      }

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
          padding={60}
          forceFit>
          <Coord />
          <Axis name="label" visible={false}
          />
          <Axis name="value" />
          <Tooltip g2-tooltip={g2Tooltip} />
          <Geom
            type="interval"
            position="label*value"
            color={'type'}
            adjust={[
              {
                type: "dodge",
                marginRatio: 1 / 32
              }
            ]}
          />
          <Geom
            type="point"
            position="label*value"
            size={40}
            shape={[
              ['label', 'type'],
              function (name, type) {
                if (type == 'mediaLikeNum') {
                  return ["image", imageMap[name]];
                }
                return ['image', null];
              }
            ]}
          />

          <Guide>
            <GuideLine content='近30条视频平均评论' middle={this.getAvgNumber(data, 'mediaLikeNum')} />
            <GuideLine content='近30条视频平均点赞' middle={this.getAvgNumber(data, typeKey2)} color='#3AA1FF' />

          </Guide>
        </Chart>
      </div>
    );
  }
}


const GuideLine = ({ middle, color = '#2fc25b', content = '平均' }) => {
  return <Line
    top
    start={{ label: -0.5, value: middle }}
    end={{ label: 4.2, value: middle }}
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
