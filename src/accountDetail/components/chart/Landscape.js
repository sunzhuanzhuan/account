import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label
} from "bizcharts";
import DataSet from "@antv/data-set";
import { g2Tooltip, } from "./config";
import numeral from 'numeral'
import { Empty } from "antd";

class Landscape extends React.Component {
  render() {
    const { data = [] } = this.props
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.source(data).transform({
      type: "sort",
    });
    const cols = {
      percent: {
        formatter: val => {
          return numeral(val || 0).format('0.0%')
        }
      },
    };
    return (
      data.length > 0 ? <div>
        <Chart height={300} data={dv} forceFit scale={cols} padding={[10, 60]}>
          <Coord transpose reflect='y' />
          <Axis
            name="name"
            label={{
              offset: 12
            }}
          />
          <Axis name="value" visible={false} />
          <Tooltip g2-tooltip={g2Tooltip} />
          <Geom type="interval" position="name*value"
            color={['name', ['#0760BF', '#1680E6', '#219BDD', '#35CFC9', '#86E6C8', '#BEF7C8', '#E3F4BF']]}
            tooltip={[
              "name*value",
              (name, value) => {
                return {
                  name: name,
                  value: numeral(value || 0).format('0.0%')
                };
              }
            ]}
          >
            <Label content={["name*value", (name, value) => {
              return numeral(value || 0).format('0.0%');
            }]} />
          </Geom>
        </Chart>
      </div> : <Empty style={{ height: 304, paddingTop: 80 }} />
    );
  }
}

export default Landscape;
