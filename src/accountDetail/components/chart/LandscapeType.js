import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label } from 'bizcharts';
import numeral from 'numeral';

// CDN START

class LandscapeType extends React.Component {
  render() {
    const { data } = this.props
    const cols = {};
    return (
      <div>
        <Chart height={600} width={800} data={data} scale={cols} padding={['auto', 100, 'auto']}>
          <Coord transpose />
          <Axis name="name" />
          <Axis name="value" visible={false} />
          <Tooltip />
          {/* 凸显类型 color={['name', '#E6F6C8-#3376CB']} */}
          <Geom type="interval" position="name*value" color={['value', '#D8E7FF-#4786F5']}>
            <Label content={['name*value', (name, value) => numeral(value || 0).format('0.0%')]} />{' '}
          </Geom>
        </Chart>
      </div>
    );
  }
}
export default LandscapeType
