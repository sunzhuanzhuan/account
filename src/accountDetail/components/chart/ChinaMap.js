import React, { Component } from 'react'
const { AMap, AMapUI } = window;

import {
  Chart, Axis, View, Geom, Tooltip, Label, Legend
} from "bizcharts";
import DataSet from "@antv/data-set";
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
    };

    return (
      <Chart height={500} width={645} scale={scale} data={data} padding={[0, 0, 0, 90]}>
        <Geom type="polygon" position="longitude*latitude"
          style={{ lineWidth: 1, stroke: "white" }}
          // color={['value', ['#31c5f8', '#61d3f8', '#89dcfd', '#b0e8f8', '#d8f3ff']]}
          color={['value', ['#d9f4ff', '#33c5f6']]}
          tooltip={['name*value', (name, value) => {
            return {
              name: name,
              value: value
            }
          }]}
        >
          <Label content="" offset={0} />
          <Tooltip showTitle={false} />
          <Legend position='left-bottom'
            offsetY={-50} />
        </Geom>
      </Chart>);
  }
}

export default MapChart
