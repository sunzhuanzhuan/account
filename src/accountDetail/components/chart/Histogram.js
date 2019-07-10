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

class Histogram extends React.Component {
  render() {
    const { data, positionConfig, height = 300 } = this.props
    const scale = {
      tgiValue: {
        // min: 0,
        alias: 'TGI',
        formatter: val => {
          return formatW(val);
        }
      }
    }
    return (
      <div>
        <Chart
          height={height}
          data={data}
          scale={scale}
          forceFit
          padding={[50, 80]}
        >
          <Axis name="sales" />
          <Axis name="name" visible={true} />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="interval"
            position={positionConfig}
            color="#3AA1FF"
          />
        </Chart>
      </div>
    );
  }
}

export default Histogram;
