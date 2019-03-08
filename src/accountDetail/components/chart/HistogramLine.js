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
    const data = [
      {
        time: "美容美妆",
        call: 4,
        waiting: 2,
        people: 2
      }, {
        time: "美容美妆1",
        call: 24,
        waiting: 22,
        people: 2
      }, {
        time: "美容美妆2",
        call: 4,
        waiting: 12,
        people: 22
      },
      {
        time: "旅游",
        call: 2,
        waiting: 6,
        people: 3
      }, {
        time: "旅游2",
        call: 12,
        waiting: 6,
        people: 3
      }, {
        time: "旅游1",
        call: 2,
        waiting: 6,
        people: 13
      },
      {
        time: "美食",
        call: 13,
        waiting: 2,
        people: 5
      }, {
        time: "美食2",
        call: 13,
        waiting: 12,
        people: 5
      }, {
        time: "美食23",
        call: 13,
        waiting: 2,
        people: 15
      },
    ];
    const scale = {
      call: {
        min: 0
      },
      people: {
        min: 0,
        alias: 'TGl'
      },
      waiting: {
        min: 0,
        alias: '兴趣爱好'
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
                value: "兴趣爱好",
                marker: {
                  symbol: "square",
                  fill: "#39a0ff",
                  radius: 5
                }
              },
              {
                value: "TGl",
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
          <Geom type="interval" position="time*waiting" color="#39a0ff" />
          <Geom
            type="line"
            position="time*people"
            color="#29c056"
            size={3}
          />
          <Geom
            type="point"
            position="time*people"
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
