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
import '../NewVideo.less'
import { formatW } from "../../util";
import './GroupedColumn.less'
import DataSet from "@antv/data-set";
import moment from "moment";
const deafultImg = require('../img/deafult-box.png');

const { Line } = Guide;

export default class GroupedColumn extends React.Component {
  getAvgNumber = (data = [], key) => {
    if (data.length > 0) {
      return data.reduce((pre, next) => pre + next[key], 0) / data.length;
    }
  }
  getMinNumbertoArr = (arr) => {
    return Math.min.apply(null, arr)
  }
  getMaxNumbertoArr = (arr) => {
    return Math.max.apply(null, arr)
  }
  render() {
    const { data, typeKey2 = 'mediaPlayNum', typeText2 = '播放', avgLine1, avgLine2, hotKey } = this.props
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
          [typeKey2]: typeText2
        }[d])
      },
      value: {
        min: this.getMinNumbertoArr([getMinNumber('mediaLikeNum', data), getMinNumber(typeKey2, data)]) || 0,
        max: this.getMaxNumbertoArr([getMaxNumber('mediaLikeNum', data), getMaxNumber(typeKey2, data)]),
        formatter: val => {
          return formatW(val);
        }
      }

    };
    var imageMap = {}
    data.filter(one => one.isHot == 1).map(one => {
      imageMap[one.label] = require("../img/fire.png")
    });
    //自定义x轴label
    const labelConfig = {
      htmlTemplate(text, item, index) {
        const dataItem = data.filter(one => one.label == text)[0] || {}
        return `<a class='label-box'
                    href=${dataItem.mediaUrl}
                    target="_blank">
        <div class='hover-img'>
          <div class='bottom-img'>
             <img 
               width='120px'
               height='160px'
               src=${dataItem.mediaCoverUrl ? dataItem.mediaCoverUrl : deafultImg} />
          </div>
          <div class='hover-img-show'>
          </div>
        </div>
          <div class='media-caption'>${ dataItem.mediaCaption || '-'}</div>
          <div class='media-created-time'>${
          moment(dataItem.mediaCreatedTime).format('YYYY/MM/DD hh:mm:ss')
          }</div>
        </a>`
      }
    }
    return (
      <div>
        <div className='legend-customize'>
          <div>
            <div className='block-legend fire'></div>
            <div>爆款视频</div>
          </div>
          <div>
            <div className='block-legend blue'></div>
            <div>点赞</div>
          </div>
          <div>
            <div className='block-legend green'></div>
            <div>{typeText2}</div>
          </div>
        </div>
        <Chart height={600} data={dv} scale={scale}
          padding={[60, 100, 260, 100]}
          forceFit>
          <Coord />
          <Axis name="label" label={labelConfig}


          />
          <Axis name="value" />
          <Tooltip g2-tooltip={g2Tooltip} g2-tooltip-title={{ display: 'none' }} />
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
            size={30}
            tooltip={null}
            shape={[
              ['label', 'type'],
              function (name, type) {
                if (type == hotKey) {
                  return ["image", imageMap[name]];
                }
                return ['image', null];
              }
            ]}
          />

          {/* <Guide>
            <GuideLine content='近30条视频平均点赞' middle={avgLine1} color='#3AA1FF' />
            <GuideLine content={`近30条视频平均${typeText2}`} middle={avgLine2} />

          </Guide> */}
        </Chart>
      </div>
    );
  }
}


const GuideLine = ({ middle, color = '#2fc25b', content = '平均', start, end }) => {
  return <Line
    top
    start={{ label: -0.5, value: middle }}
    end={{ label: 4.4, value: middle }}
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
