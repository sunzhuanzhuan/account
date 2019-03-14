import React, { Component } from 'react'
const { AMap, AMapUI } = window;

import {
  Chart, Axis, View, Geom, Tooltip, Label
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
var dataChina = [
  { name: "北京市", valueNum: 3 },
  { name: "天津市", valueNum: 42 },
  { name: "河北", valueNum: 55 },
  { name: "山西", valueNum: 81 },
  { name: "内蒙古", valueNum: 47 },
  { name: "辽宁", valueNum: 200 },
  { name: "吉林", valueNum: 82 },
  { name: "黑龙江", valueNum: 66 },
  { name: "上海", valueNum: 24 },
  { name: "江苏", valueNum: 92 },
  { name: "浙江", valueNum: 114 },
  { name: "安徽", valueNum: 109 },
  { name: "福建", valueNum: 116 },
  { name: "江西", valueNum: 91 },
  { name: "山东", valueNum: 119 },
  { name: "河南", valueNum: 137 },
  { name: "湖北", valueNum: 116 },
  { name: "湖南", valueNum: 114 },
  { name: "重庆", valueNum: 91 },
  { name: "四川", valueNum: 125 },
  { name: "贵州", valueNum: 62 },
  { name: "云南", valueNum: 83 },
  { name: "西藏", valueNum: 9 },
  { name: "陕西", valueNum: 80 },
  { name: "甘肃", valueNum: 56 },
  { name: "青海", valueNum: 10 },
  { name: "宁夏", valueNum: 18 },
  { name: "新疆", valueNum: 67 },
  { name: "广东", valueNum: 123 },
  { name: "广西", valueNum: 59 },
  { name: "海南", valueNum: 14 },
];
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
          one.valueNum = item.valueNum
        }
      })
    })

    const geoDv = new DataSet.View().source(geoData, {
      type: 'GeoJSON',
    });
    return geoDv;
  }

  render() {
    const { chinaGeo } = this.state;
    if (!chinaGeo) {
      return '数据加载中...'
    }

    const data = this.processGeoData(chinaGeo, dataChina);

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
          style={{lineWidth: 1, stroke: "white"}}
          // color={['valueNum', ['#31c5f8', '#61d3f8', '#89dcfd', '#b0e8f8', '#d8f3ff']]}
          color={['valueNum', ['#d9f4ff', '#33c5f6']]}
          tooltip={['name*valueNum', (name, valueNum) => {
            return {
              name: name,
              value: valueNum
            }
          }]}
        >
          <Label content="" offset={0} />
          <Tooltip showTitle={false} />
        </Geom>
      </Chart>);
  }
}

export default MapChart
