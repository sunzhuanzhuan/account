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
import getLabelConfig from './ColumnPointConfig'
import { formatW } from "../../util";
class ColumnPoint extends React.Component {
  render() {
    const { data,
      dataKey = 'mediaLikeNum',
      platformId,
      padding = [60, 100, 280, 100],
      fireText, dataText } = this.props
    //自定义x轴label
    const labelConfig = {
      htmlTemplate(text, item, index) {
        const dataItem = data.filter(one => one.label == text)[0] || {}
        return getLabelConfig(platformId, dataItem)
      }
    }
    const cols = {
      [dataKey]: {
        formatter: val => {
          return formatW(val);
        }
      }
    }
    var imageMap = {}
    data.filter(one => one.isHot == 1).map(one => {
      imageMap[one.label] = require("../img/fire.png")
    });
    return (
      <div >
        <div className='legend-customize'>
          {fireText ? <div>
            <div className='block-legend fire'></div>
            <div>{fireText}</div>
          </div> : null}
          <div>
            <div className='block-legend blue'></div>
            <div>{dataText}</div>
          </div>
        </div>
        <Chart height={600} data={data} scale={cols} forceFit padding={padding}
        >
          <Axis name="label" label={labelConfig} />
          <Axis name={dataKey} />
          {/* <Tooltip crosshairs={{  type: "y" }} /> */}
          <Geom type="interval" position={`label*${dataKey}`} size={50} />
          <Geom
            type="point"
            position={`label*${dataKey}`}
            size={30}
            tooltip={null}
            shape={[
              ['label', dataKey],
              function (name) {
                return ["image", imageMap[name]];
              }
            ]}
          />
        </Chart>
      </div>
    );
  }
}

export default ColumnPoint;
