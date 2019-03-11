import React, { Component } from 'react'
import { g2Tooltip, legendPosition } from "./config";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,

} from "bizcharts";

class HistogramLine extends Component {
  render() {
    // const data = [
    //   {
    //     dateRange: "美容美妆",
    //     followerCountFull: 4,
    //     mediaLikeSumIncre: 2,
    //     people: 2
    //   }
    // ];
    const { data = [], positionConfig, lineText, boxText } = this.props
    const scale = {
      followerCountFull: {
        min: 0
      },
      mediaCountIncre: {
        min: 0,
        alias: lineText
      },
      mediaLikeSumIncre: {
        min: 0,
        alias: boxText
      },
    };
    let chartIns = null;
    const {
      height = 400
    } = this.props
    return (

      <div>
        <Chart
          height={height}
          scale={scale}
          padding={[50, 90]}
          forceFit
          data={data}
          onGetG2Instance={chart => {
            chartIns = chart;
          }}
        >
          <Legend
            {...legendPosition}
            custom={true}
            allowAllCanceled={true}
            items={[
              {
                value: boxText,
                marker: {
                  symbol: "square",
                  fill: "#39a0ff",
                  radius: 5
                }
              },
              {
                value: lineText,
                marker: {
                  symbol: "hyphen",
                  stroke: "#29c056",
                  radius: 5,
                  lineWidth: 3
                }
              }
            ]}
            onClick={ev => {
              const item = ev.item;
              const value = item.value;
              const checked = ev.checked;
              const geoms = chartIns.getAllGeoms();

              for (let i = 0; i < geoms.length; i++) {
                const geom = geoms[i];

                if (geom.getYScale().field === value) {
                  if (checked) {
                    geom.show();
                  } else {
                    geom.hide();
                  }
                }
              }
            }}
          />
          <Axis
            name="people"
            grid={null}
            label={{
              textStyle: {
                fill: "#29c056"
              }
            }}
          />
          <Tooltip name='' g2-tooltip={g2Tooltip} />
          <Geom type="interval" position={positionConfig} color="#39a0ff" />
          <Geom
            type="line"
            position={positionConfig}
            color="#29c056"
            size={3}
          />
          <Geom
            type="point"
            position={positionConfig}
            color="#29c056"
            size={3}
            shape="circle"
          />
        </Chart>
      </div>
    );
  }
}

export default HistogramLine;
