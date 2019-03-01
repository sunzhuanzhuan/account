import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
} from "bizcharts";
import DataSet from "@antv/data-set";

class Landscape extends React.Component {
  render() {
    const data = [
      {
        country: "18-24",
        population: 12
      },
      {
        country: "25-34",
        population: 13
      },
      {
        country: "35-44",
        population: 15
      },
      {
        country: "45-54",
        population: 13
      },
      {
        country: "55-64",
        population: 33
      }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.source(data).transform({
      type: "sort",

      callback(a, b) {
        // 排序依据，和原生js的排序callback一致
        return a.population - b.population > 0;
      }
    });
    return (
      <div>
        <Chart height={400} data={dv} forceFit>
          <Coord transpose />
          <Axis
            name="country"
            label={{
              offset: 12
            }}
          />
          <Axis name="population" />
          <Tooltip />
          <Geom type="interval" position="country*population" />
        </Chart>
      </div>
    );
  }
}

export default Landscape;
