import React, { Component } from 'react'
import {
  g2Tooltip
} from "./config";
import {
  Chart, Geom, Tooltip, Legend, Guide
} from "bizcharts";
import numeral from 'numeral'
import DataSet from "@antv/data-set";
const { AMap, AMapUI } = window;

const constructGeoJSON = (features) => {
  if (!features) return false;
  if (Array.isArray(features)) {
    return {
      type: 'FeatureCollection',
      features: [...features],
    };
  }
  return features;
};

/*
* 传入adcode获取geojson，部分数据需要处理一下
*/
const getGeojsonByCode = (adcode = 100000, withSub = true) => {
  const { AMapUI } = window;
  if (!AMapUI) {
    return Promise.reject();
  }

  // 文档：https://lbs.amap.com/api/javascript-api/reference-amap-ui/geo/district-explorer
  return new Promise((resolve, reject) => {
    AMapUI.load("ui/geo/DistrictExplorer", DistrictExplorer => {
      const districtExplorer = new DistrictExplorer();
      districtExplorer.loadAreaNode(adcode, (error, areaNode) => {
        if (error) {
          reject();
        }

        let res = null;
        if (withSub) {
          res = areaNode.getSubFeatures();
        } else {
          res = areaNode.getParentFeature();
        }
        resolve(constructGeoJSON(res));
      });
    });
  });
};

// 绘制思路
// 前提：页面加载高德地图及其UI的SDK，参考html页面
// 1、通过高德的数据接口获取geojson数据
// 2、通过Dataset进行数据处理
// 3、绘制


class MapChart extends Component {
  state = {
    chinaGeo: null,
  }
  componentDidMount() {
    getGeojsonByCode(100000, true).then(res => {
      this.setState({
        chinaGeo: res,
      });
    });
  }

  processGeoData = (geoData, dataValue) => {

    const { features } = geoData
    features.map((one) => {
      const name = one.properties.name
      dataValue.map((item) => {
        if (name.includes(item.name)) {
          one.value = item.value
          one.tgiValue = item.tgiValue
        }
      })
    })

    const geoDv = new DataSet.View().source(geoData, {
      type: 'GeoJSON',
    });
    return geoDv;
  }

  render() {
    const { area } = this.props
    const { chinaGeo } = this.state;
    if (!chinaGeo) {
      return '数据加载中...'
    }

    const data = this.processGeoData(chinaGeo, area);
    const scale = {
      latitude: {
        sync: true,
        nice: false,
      },
      longitude: {
        sync: true,
        nice: false,
      },
      value: {
        formatter: val => {
          return numeral(val || 0).format('0.0%')
        }
      },
    };
    const { Image } = Guide;
    return (
      <div style={{ position: "relative" }}>
        <Chart height={500} width={645} scale={scale} data={data} padding={[0, 0, 0, 90]}>
          <Geom type="polygon" position="longitude*latitude"
            style={{ lineWidth: 1, stroke: "white" }}
            // color={['value', ['#31c5f8', '#61d3f8', '#89dcfd', '#b0e8f8', '#d8f3ff']]}
            color={['value', ['#d9f4ff', '#33c5f6']]}
          >
            <Tooltip g2-tooltip={g2Tooltip} useHtml={true}
              htmlContent={
                function (title, items) {
                  const { name, tgiValue, value } = items[0].point._origin
                  const { color } = items[0].point
                  return `<div class='custom-tooltip' style="width:160px;padding: 5px 10px">
                <div>
                <span style="background-color:${color};width:6px;height:6px;border-radius:50%;display:inline-block;margin-right:6px;margin-bottom:2px;">
                </span>${name}
                </div>
                <div>占比：${numeral(value).format('0.0%')}</div>
                <div>TGI：${ numeral(value).format('0.0')}</div>
                </div>`
                }} />
            <Legend position='bottom-left'
              offsetY={-130}
              offsetX={-60}
              slidable={false}
              width={320}
            />

          </Geom>

        </Chart>
        <div style={{ position: "absolute", bottom: 100, right: 0 }}>
          <img height='58' width='42'
            src={require('../img/map-line.png')} />
        </div>
      </div>
    );
  }
}

export default MapChart
