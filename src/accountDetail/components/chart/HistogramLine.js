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
import { Empty } from 'antd';
class HistogramLine extends Component {
  componentDidMount() {

    events.on('message', (value) => {
      window.dispatchEvent(new Event('resize'))
    })
  }
  getMinNumber = (key) => {
    const { data = [] } = this.props
    const min = Math.min.apply(Math, data.map(function (item) { return item[key] }))
    return min - min / 100
  }
  getMaxNumber = (key) => {
    const { data = [] } = this.props
    return Math.max.apply(Math, data.map(function (item) { return item[key] }))
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
    const { data = [], positionConfig, lineText, boxText, positionIntervalConfig, type = 4, boxLeft, boxRight, paddingConfig = [60, 60, 50, 60] } = this.props

    const scale = {
      followerCountFull: {
        min: this.getMinNumber('followerCountFull'),
        max: this.getMaxNumber('followerCountFull'),
        alias: '粉丝累计数',
        formatter: val => {
          return formatW(val);
        }
      },
      mediaCountIncre: {
        min: this.getMinNumber('mediaCountIncre'),
        max: this.getMaxNumber('mediaCountIncre'),
        alias: '发布净增数',
        formatter: val => {
          return formatW(val);
        }
      },
      mediaLikeSumIncre: {
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
        alias: 'TGI',
        formatter: val => {
          return formatW(val);
        }
      },
      value: {
        // min: 0,
        alias: '占比',
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
      data.length > 0 ? <div className='histogram-line'>
        <div className='title-line'>
          <div className='left-title' style={{ left: boxLeft }}>{boxText}</div>
          <div className='right-title' style={{ right: boxRight }}>{lineText}</div>
        </div>
        <Chart
          height={height}
          scale={scale}
          padding={paddingConfig}
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
            clickable={false}
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

          />
          <Axis
            name={`${positionIntervalConfig.split('*')[1]}`}
            grid={null}
          />
          <Axis
            name={`${positionConfig.split('*')[1]}`}
            grid={null}
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
      </div> : <Empty style={{ height: height + 18, paddingTop: 80 }} />
    );
  }
}

export default HistogramLine;
