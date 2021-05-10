<template>
  <div class="worldMapDiv">
    <div id="worldMainBox"></div>
    <div class="legend"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import SetColor from "../setColor";
import vaccineHelper from "../vaccineHelper";
import NameMap from "../nameMap.js";

const _fontSize = 6;

export default {
  name: "WorldMap",
  data() {
    return {
      mapChart: null,
      provName: "",
      geoData: [],
    };
  },
  methods: {
    getGeoJson(geoJson, data) {
      echarts.registerMap("worldvaccine", geoJson);
      const option = {
        tooltip: {
          show: true,
          borderRadius: 4,
          backgroundColor: "rgba(0,0,0,0.7)",
          backgroundRadio: 4,
          padding: [8, 8, 8, 8],
          textStyle: {
            color: "#fff",
            fontSize: 10,
          },
          trigger: "item",
          triggerOn: "mousemove|click",
          formatter: function (params) {
            // console.log("-------", params);
            if (!params.value) return;
            if (params.data.descStr) {
              return params.data.descStr;
            }
            let html = ``;
            let res = `<a style="font-size:12px;">${params.data.cnName}</a><br>`;
            const myseries = option.series;
            for (let i = 0; i < myseries.length; i++) {
              for (let k = 0; k < myseries[i].data.length; k++) {
                if (myseries[i].data[k].name == params.name) {
                  res += `<p>累计接种：${vaccineHelper.dataCount(
                    myseries[i].data[k].value
                  )}${vaccineHelper.dataUnit(myseries[i].data[k].value)}</p>`;
                  res += `<p>每百人接种：${vaccineHelper.dataCount(
                    myseries[i].data[k].perhb
                  )}${vaccineHelper.dataUnit(myseries[i].data[k].perhb)}</p>`;
                }
              }
            }
            // console.log(res);
            html = `<div style="text-align:left">${res}</div>`;
            return html;
          },
        },
        series: [
          {
            name: "",
            type: "map",
            mapType: "worldvaccine", // 自定义扩展图表类型
            roam: false, // 拖动
            zoom: 1.2,
            scaleLimit: {
              min: 1,
              max: 6,
            },
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                // areaColor: "#C8CDD5",
                areaColor: "#ffffff",
                color: "#000000",
                borderWidth: 1,
                // borderColor: "rgba(255,255,255,1)",
                borderColor: "#4dccff",
              },
              emphasis: {
                // areaColor: "#C8CDD5",
                areaColor: "#68D8FF",
                borderWidth: 1,
                // borderColor: "rgba(255,255,255,1)",
                borderColor: "#4dccff",
                label: {
                  show: false,
                  textStyle: {
                    color: "#000000",
                    fontSize: 10,
                  },
                },
              },
            },
            data: data,
          },
        ],
      };

      if (option && typeof option === "object") {
        this.mapChart.setOption(option);
      }
    },
    createMap(data) {
      const dom = document.getElementById("worldMainBox");
      if (this.mapChart) {
        this.mapChart.dispose();
        this.mapChart = null;
      }
      this.mapChart = echarts.init(dom);
      //
      const geoJson = require(`../../../static/world_geo.json`);
      this.mapChart.showLoading("default", {
        text: "loading",
        color: "#D8D8D8",
        textColor: "#000",
        maskColor: "rgba(255, 255, 255, 0.8)",
        zlevel: 0,
      });
      this.createGeoData(data);
      this.mapChart.hideLoading();
      this.getGeoJson(geoJson, this.geoData);
    },
    createGeoData(details) {
      this.geoData = [];
      const ary = details;
      const setColors = new SetColor();
      const nameMap = new NameMap();

      for (let i = 0; i < ary.length; i++) {
        const curItem = ary[i];
        const obj = {};
        obj.cnName = curItem.country;
        obj.name = nameMap.getCName(curItem.country);
        // console.log(obj.cnName,obj.name);
        if (!obj.name) continue;
        obj.value = curItem.total_vaccinations;
        obj.perhb = curItem.total_vaccinations_per_hundred;
        const vaccine = obj.value;
        //

        const itemStyle = {
          areaColor: setColors.getColor(vaccine),
          // borderWidth: 1,
          // borderColor: "rgba(248,248,248,1)",
          label: {
            show: false,
            textStyle: {
              color: "green",
              fontSize: 10,
            },
          },
        };

        obj.itemStyle = itemStyle;
        obj.select = {
          label: {
            show: false,
          },
          itemStyle: {
            areaColor: "#68D8FF",
            // borderWidth: 1,
            // borderColor: "rgba(248,248,248,1)",
          },
        };
        obj.label = {
          textStyle: {
            color: "#000000",
          },
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          },
        };
        this.geoData.push(obj);
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.worldMapDiv {
  position: relative;
}
#worldMainBox {
  margin: 0 20px;
  width: calc(100%-40);
  height: 275px;
  border: 1px solid #e6e6e6;
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
.legend {
    position: absolute;
    width: 77.067vw;
    height: 4.4vw;
    left: 7.867vw;
    bottom: 2.267vw;
    background: url('../../assets/maplege.png') no-repeat 50%;
    background-size: 100% 100%;
    content: "viewport-units-buggyfill; width: 77.067vw; height: 4.4vw; left: 7.867vw; bottom: 2.267vw";
}
</style>