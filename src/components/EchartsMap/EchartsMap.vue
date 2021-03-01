<template>
  <div>
    <div id="mapMainBox"></div>
    <!-- <div class="chinamapLegend2"></div> -->
  </div>
</template>

<script>
import OffestLabel from "../../../static/GeoJson/offsetLabel";
import * as echarts from "echarts";

const _fontSize = 6;

export default {
  name: "EchartsMap",
  data() {
    return {
      mapChart: null,
      adcode: "",
      provName: "",
      geoData: [],
    };
  },
  methods: {
    matchNams(geoJson, provName) {
      const ary = geoJson.features;
      let str;
      let matchStr;
      let curItem;
      const offset = new OffestLabel(provName);

      for (let i = 0; i < ary.length; i++) {
        curItem = ary[i].properties;
        str = ary[i].properties.name;
        // str=str.replace('市',"");
        // str=str.replace('地区',"");
        // str=str.replace('自治州',"");
        if (str == "三沙") {
          ary.splice(i, 1);
          // console.log('展示海南三沙市小地图');
          // special();
          continue;
        }

        offset.reset(curItem);
        // curItem.name=short.correct(provName,curItem.name);
      }
      // console.log(geoJson);
    },
    getGeoJson(geoJson, provName, data) {
      this.mapChart.showLoading();
      this.matchNams(geoJson, provName);
      this.mapChart.hideLoading();
      echarts.registerMap("hf", geoJson);
      const option = {
        tooltip: {
          trigger: "item",
          // formatter: "{b}<br/>{c} (人)",
          formatter: function (params) {
            let res = params.name;
            const myseries = option.series;
            for (let i = 0; i < myseries.length; i++) {
              for (let k = 0; k < myseries[i].data.length; k++) {
                if (myseries[i].data[k].name == params.name) {
                  if (0) {
                    res += `：${myseries[i].data[k].value}累计确诊`;
                  } else {
                    res += `：${myseries[i].data[k].value}现有确诊`;
                  }
                }
              }
            }
            return res;
          },
        },
        series: [
          {
            name: "",
            type: "map",
            mapType: "hf", // 自定义扩展图表类型
            zoom: 1.2,
            // roam: true,
            label: {
              show: true,
              color: "black",
              fontSize: "8",
              fontFamily: "Microsoft YaHei",
              postion: "bottom",
            },
            labelLayout: {
              moveOverlap: "", // shiftY
              // draggable: true,
            },
            itemStyle: {
              normal: {
                areaColor: "#e4e8f3",
                color: "#000000",
                borderWidth: 0.8,
                borderColor: "rgba(255,255,255,1)",
              },
              emphasis: {
                areaColor: "#FFE766",
                borderWidth: 0.8,
                borderColor: "rgba(255,255,255,1)",
                label: {
                  show: true,
                  textStyle: {
                    color: "#000000",
                    fontSize: _fontSize,
                  },
                },
              },
            },
            data: data,
            select: {
              itemStyle: {
                borderColor: "black",
                borderWidth: 1,
                label: {
                  color: "#000000",
                },
              },
            },
          },
        ],
      };

      if (option && typeof option === "object") {
        this.mapChart.setOption(option);
      }
    },
    createMap(adcode, provName, data) {
      const dom = document.getElementById("mapMainBox");
      if (this.mapChart) {
        this.mapChart.dispose();
        this.mapChart = null;
      }
      this.mapChart = echarts.init(dom);
      //
      this.adcode = adcode;
      this.provName = provName;
      const geoJson = require(`../../../static/GeoJson/${adcode}.json`);
      // console.log(geoJson); // 输出geojson 行政区
      // geoJson.features.forEach((f) => {
      //   console.log(f.properties.name);
      // });
      // console.log(
      //   "================================================================"
      // );
      this.createGeoData(data, provName);
      this.getGeoJson(geoJson, provName, this.geoData);
    },
    createGeoData(details, provName) {
      const that = this;
      details.forEach((detail) => {
        const item = {
          name: that.getStrictName(detail.name, provName),
          value: detail.nowConfirm,
          itemStyle: {
            areaColor: that.getFillColor(detail.nowConfirm),
          },
          select: {
            itemStyle: {
              areaColor: that.getFillColor(detail.nowConfirm),
            },
          },
        };
        that.geoData.push(item);
      });
    },
    getFillColor(num) {
      num = parseInt(num);
      let color = "#e4e7f3";
      if (num >= 1 && num <= 9) {
        color = "#ffe7b8";
      } else if (num >= 10 && num <= 49) {
        color = "#ffdab3";
      } else if (num >= 10 && num <= 49) {
        color = "#ffdab3";
      } else if (num >= 50 && num <= 99) {
        color = "#ffc89e";
      } else if (num >= 100 && num <= 499) {
        color = "#ffaa80";
      } else if (num >= 500 && num <= 999) {
        color = "#ff7050";
      } else if (num >= 1000 && num <= 9999) {
        color = "#f04141";
      } else if (num >= 10000) {
        color = "#cc1e1e";
      }
      return color;
    },
    getStrictName(name, provName) {
      let result = name;
       if (provName.includes("新疆") || provName.includes('香港') || provName.includes('澳门')) {
        // console.log(result);
        return result;
      }
      if (provName.includes("青海")) {
        if (result.includes("市")) {
          result = result.replace(/市/g, "");
        }
        // console.log(result);
        return result;
      }
      if (provName.includes("西藏")) {
        // console.log(result);
        return result;
      }
      if (provName === "重庆") {
        if (
          "沙坪坝区,南岸区,九龙坡区,璧山区,大渡口区,巴南区,南川区,渝中区,江北区".includes(
            result
          )
        ) {
          result = result.replace("区", "");
        }
        if (result === "两江新区") {
          result = result.replace("新区", "");
        }
        // console.log(result);
        return result;
      }
      if (result.includes("市")) {
        result = result.replace(/市/g, "");
      }
      if (result.endsWith("林区")) {
        result = result.replace(/林区/g, "");
      }
      if (result.endsWith("新区")) {
        result = result.replace(/新区/g, "");
      }
      if (result.endsWith("地区")) {
        result = result.replace(/地区/g, "");
      }
      if (result.endsWith("区")) {
        result = result.replace(/区/g, "");
      }
      if (result.includes("藏族羌族自治州")) {
        result = result.replace("藏族羌族自治州", "");
      }
      if (result.includes("彝族自治州")) {
        result = result.replace("彝族自治州", "");
      }
      if (result.includes("藏族自治州")) {
        result = result.replace("藏族自治州", "");
      }
      if (result === "迪庆") {
        result += "藏族自治州";
      }
      if (result === "西双版纳傣族自治州") {
        result = "西双版纳";
      }
      if (result === "大理白族自治州") {
        result = "大理";
      }
      if (result === "红河哈尼族") {
        result = "红河";
      }
      // console.log(result);
      return result;
    },
  },
  mounted() {
    // console.log(this.mapChart);
    // const dom = document.getElementById("mapMainBox");
    // this.mapChart = echarts.init(dom);
    // let json = require("../../../static/GeoJson/130000.json");
    // this.getGeoJson(json, "河北");
  },
};
</script>

<style scoped>
#mapMainBox {
  width: 100%;
  height: 100vw;
}

.chinamapLegend2 {
  position: absolute;
  width: 10.133vw;
  height: 14.667vw;
  top: 135vw;
  /* bottom: 0; */
  right: 2.667vw;
  background: url(https://mat1.gtimg.com/news/feiyanarea/mapright_v2.png)
    no-repeat 50%;
  background-size: 100% 100%;
  display: none;
}
</style>