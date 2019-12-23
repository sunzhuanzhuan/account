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
import DataSet from "@antv/data-set";
import _ from 'lodash'
class Wordcloud extends React.Component {
  render() {
    const { height = '217',
      width = window.innerWidth / 7 * 3 - 40,
      data = [] } = this.props
    function getTextAttrs(cfg) {
      return _.assign(
        {},
        cfg.style,
        {
          fillOpacity: cfg.opacity,
          fontSize: cfg.origin._origin.size,
          rotate: cfg.origin._origin.rotate,
          text: cfg.origin._origin.text,
          textAlign: "center",
          fontFamily: cfg.origin._origin.font,
          fill: cfg.color,
          textBaseline: "Alphabetic"
        }
      );
    } // 给point注册一个词云的shape

    Shape.registerShape("point", "cloud", {
      drawShape(cfg, container) {
        const attrs = getTextAttrs(cfg);
        return container.addShape("text", {
          attrs: _.assign(attrs, {
            x: cfg.x,
            y: cfg.y
          })
        });
      }
    });
    const dv = new DataSet.View().source(data);
    const range = dv.range("value");
    const min = range[0];
    const max = range[1];
    dv.transform({
      type: "tag-cloud",
      fields: ["key", "value"],
      size: [width, height],
      font: "Verdana",
      padding: 0,
      timeInterval: 5000,
      // max execute time
      rotate() {
        let random = ~~(Math.random() * 4) % 4;

        if (random == 2) {
          random = 0;
        }
        return random * 90; // 0, 90, 270
      },

      fontSize(d) {
        if (d.value) {
          const divisor = (max - min) !== 0 ? (max - min) : 1;
          const fontSize = ((d.value - min) / divisor) * (30) + 14;
          return fontSize
        }
        return 0;
      }
    });
    const scale = {
      x: {
        nice: false
      },
      y: {
        nice: false
      }
    };
    return (
      <div>
        <Chart
          height={height}
          width={width}
          data={dv}
          scale={scale}
          padding={0}
          forceFit
        >
          {/* <Tooltip showTitle={false} g2-tooltip={g2Tooltip} /> */}
          <Coord reflect="y" />
          <Geom
            type="point"
            position="x*y"
            color="key"
            shape="cloud"
          />
        </Chart>
      </div>
    );
  }
}

export default Wordcloud;
