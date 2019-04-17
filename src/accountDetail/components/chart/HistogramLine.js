import React, { Component } from 'react'
import { g2Tooltip, legendPosition } from "./config";
import { events } from '@/util'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,

} from "bizcharts";
import numeral from 'numeral'

import { formatW } from "../../util";
import './HistogramLine.less'
class HistogramLine extends Component {
  componentDidMount() {

    events.on('message', (value) => {
      window.dispatchEvent(new Event('resize'))
    })
  }
  render() {
    // const data = [
    //   {
    //     dateRange: "美容美妆",
    //     followerCountFull: 4,
    //     mediaLikeSumIncre: 2,
    //     people: 2
    //   }
    // ];
    const { data = [], positionConfig, lineText, boxText, positionIntervalConfig, type = 4 } = this.props
    const scale = {

      followerCountFull: {
        // min: 0,
        alias: '粉丝累计数',
        formatter: val => {
          return formatW(val);
        }
      },
      mediaCountIncre: {
        // min: 0,
        alias: '发布净增数',
        formatter: val => {
          return formatW(val);
        }
      },
      mediaLikeSumIncre: {
        // min: 0,
        alias: '点赞净增数',
        formatter: val => {
          return formatW(val);
        }
      },
      interactionProportionIncre: {
        // min: 0,
        alias: '平均互动率',
        formatter: val => {
          return formatW(val);
        }
      },
      tgiValue: {
        // min: 0,
        alias: 'TGL',
        formatter: val => {
          return formatW(val);
        }
      },
      value: {
        // min: 0,
        alias: '兴趣爱好',
        formatter: val => {
          return numeral(val || 0).format('0.0%')
        }
      },
    };
    let chartIns = null;
    const {
      height = 400
    } = this.props

    return (

      <div className='histogram-line'>
        <div className='title-line'>
          <div className='left-title'>{boxText}</div>
          <div className='right-title'>{lineText}</div>
        </div>
        <Chart
          height={height}
          scale={scale}
          padding={[60, 100, 60, 80]}
          forceFit
          data={data}
          ref={node => this.chart = node}
          onGetG2Instance={chart => {
            chartIns = chart;
            chart.forceFit()
          }}

        >
          <Legend
            {...legendPosition}
            offsetY={-30}
            offsetX={70}
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
          <Geom type="interval" position={positionIntervalConfig} color="#39a0ff" />
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
