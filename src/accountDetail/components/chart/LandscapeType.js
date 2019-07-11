import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label } from 'bizcharts';
import numeral from 'numeral';
import { Empty } from 'antd';

// CDN START

class LandscapeType extends React.Component {
  render() {
    const { data = [], height = 600 } = this.props
    const cols = {};
    return (
      data.length > 0 ? <div>
        <Chart height={height} data={data} scale={cols}
          padding={['auto', 100, 'auto']}>
          <Coord transpose />
          <Axis name="name" />
          <Axis name="value" visible={false} />
          <Tooltip />
          {/* 凸显类型 color={['name', '#E6F6C8-#3376CB']} */}
          <Geom type="interval" position="name*value" color={['value', '#D8E7FF-#4786F5']}>
            <Label content={['name*value', (name, value) => numeral(value || 0).format('0.0%')]} />{' '}
          </Geom>
        </Chart>
      </div> : <Empty style={{ height: height + 18, paddingTop: height / 2 }} />
    );
  }
}
export default LandscapeType
