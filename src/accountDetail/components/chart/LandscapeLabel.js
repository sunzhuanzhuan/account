import React from 'react';
import numeral from 'numeral';
import { Empty } from 'antd';
import './Landscape.less'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label
} from "bizcharts";
import { g2Tooltip, } from "./config";
class BarLabel extends React.Component {
  render() {
    const { data = [] } = this.props

    const cols = {
      percent: {
        formatter: val => {
          return numeral(val || 0).format('0.0%')
        }
      },
    };
    //自定义y轴label
    const labelConfig = {
      htmlTemplate(text, item, index) {
        let dataItem = data.filter(one => one.key == text)[0]
        return `<div  class='label-sex-type'>
        <div class='sex-type'>
          <div class='sex-box'>${dataItem && dataItem.key}</div>
          <div class='type-box'>${dataItem && dataItem.typeName}</div>
          </div>
        </div>`
      }
    }
    return data.length > 0 ? <div style={{ marginLeft: 50, marginTop: 20, display: 'flow-root' }}>
      <div className='title-header'>
        <div className='title-box'>
          <div>名称</div>
          <div>分类</div>
          <div>占比</div>
        </div>
      </div>
      <Chart height={440} forceFit data={data} scale={cols} padding={['auto', 100, 'auto', 200,]}>
        <Coord transpose />
        <Axis name="key" label={labelConfig} />
        <Axis name="value" label={null} />
        <Tooltip g2-tooltip={g2Tooltip} />
        {
          /* 凸显类型 color={['age', '#E6F6C8-#3376CB']} */
        }
        <Geom type="interval" position="key*value"
          color={['value', '#D8E7FF-#4786F5']}
          tooltip={[
            "key*value",
            (key, value) => {
              return {
                name: key,
                value: numeral(value || 0).format('0.0%')
              };
            }
          ]}>
          <Label content={['key*value', (key, value) => numeral(value || 0).format('0.0%')]} />{' '}
        </Geom>
      </Chart>
    </div> : <Empty style={{ height: 500 + 18, paddingTop: 180 }} />;
  }

}
export default BarLabel;
