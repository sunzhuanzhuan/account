import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Guide,
} from "bizcharts";
import { formatW } from "../../util";
import { Empty } from "antd";
import {
  g2Tooltip
} from "./config";
import numeral from 'numeral'
class Histogram extends React.Component {
  render() {
    const { data = [], positionConfig, height = 300, textTitle, } = this.props
    const scale = {
      tgiValue: {
        // min: 0,
        alias: 'TGI',
        formatter: val => {
          return formatW(val);
        }
      },
      value: {
        alias: textTitle == 'TGI' ? 'TGI' : '占比',
        formatter: val => {
          return numeral(val).format(textTitle == 'TGI' ? '0.0' : '0.0%')
        }
      }
    }
    return (
      data.length > 0 ? <div>
        <div style={{ fontSize: 12, color: '#999', marginLeft: 55, marginTop: 20 }}>
          {textTitle}
        </div>
        <Chart
          height={height}
          data={data}
          scale={scale}
          forceFit
          padding={[20, 100, 80]}
        >
          <Axis name="sales" />
          <Axis name="name" visible={true} />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
            g2-tooltip={g2Tooltip}
          />
          <Geom
            type="interval"
            position={positionConfig}
            color="#3AA1FF"
          />
        </Chart>
      </div> : <Empty style={{ height: height + 18, paddingTop: 80 }} />
    );
  }
}

export default Histogram;
