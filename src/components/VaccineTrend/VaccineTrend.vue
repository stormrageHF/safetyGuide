<template>
  <div>
    <div id="VaccineTrend"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import vaccineHelper from "@/components/vaccineHelper";
import { VaccineTrendData } from "@/api/index.js";

export default {
  name: "VaccineTrend",
  data() {
    return {
      trendChart: null,
      sourceData: [],
      TrendData: [],
      xdatas: [],
      countrys: [],
    };
  },
  methods: {
    getXDatas() {
      this.xdatas = [];
      const arrays = this.TrendData[0].PerHundredTrends;
      return arrays.map((obj) => obj.date);
    },
    getCountrys() {
      this.countrys = this.TrendData.map((country) => country.Name);
    },
    createTrend() {
      // 获取横坐标值
      this.xdatas = this.getXDatas();
      // 获取国家名字
      this.countrys = this.getCountrys();

      const dom = document.getElementById("VaccineTrend");
      if (this.trendChart) {
        this.trendChart.dispose();
        this.trendChart = null;
      }

      this.trendChart = echarts.init(dom);

      const grid = {
        left: "1%",
        right: "1%",
        bottom: "5%",
        top: "25%",
        containLabel: true,
      };

      //过滤点击节点显示
      const tooltipFormatter = (res) => {
        let str = "";
        let html;
        html = `${res[0].name}<br>`;
        const ns = [];
        let has = false;
        for (let i = 0; i < res.length; i++) {
          str = "";
          has = false;
          for (let j = 0; j < ns.length; j++) {
            if (
              ns[j].seriesName == res[i].seriesName &&
              ns[j].value == res[i].value
            ) {
              res[i] = {};
            }
          }
          ns.push(res[i]);
          if (
            res[i].value == undefined ||
            res[i].value == "undefined" ||
            res[i].value == "-"
          )
            continue;
          html +=
            '<span style="display:inline-block;margin-right:5px;border-radius:2px;width:15px;height:15px;background-color:' +
            res[i].color +
            ';"></span>';
          str = `${res[i].seriesName}:`;
          const jiliang = `${vaccineHelper.dataCount(
            res[i].value
          )}${vaccineHelper.dataUnit(res[i].value)}`;
          html += `${str + jiliang}<br>`;
        }
        return html;
      };

      const option = {
        grid: grid,
        tooltip: {
          axisPointer: {
            type: "cross",
            snap: true,
            axis: "auto",
          },
          textStyle: {
            color: "#fff",
            fontWeight: "normal",
            fontSize: 10,
            lineHeight: 10,
            fontFamily: "Arial",
          },
          position: function (pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            var obj = { top: 60 };
            obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            return obj;
          },
          borderRadius: 10,
          backgroundColor: "rgba(0,0,0,0.75)",
          // backgroundRadio: 20,
          padding: [6, 12, 6, 12],
          trigger: "axis",
          // formatter: tooltipFormatter,
          triggerOn: "click",
        },
        legend: {
          data: this.countrys,
        },
        xAxis: {
          // axisPointer: {
          //   type: "line",
          //   label: {
          //     show: false,
          //   },
          //   z: -1,
          // },
          type: "category",
          // boundaryGap: false,
          // axisLabel: {
          //   interval: "auto",
          //   showMaxLabel: true,
          //   fontSize: 16,
          //   margin: 20,
          //   rotate: 45,
          //   color: "#999999",
          // },
          // boundaryGap: ["30%", "30%"],
          // axisTick: { show: false },
          data: this.xdatas,
          // splitNumber: 5,
        },
        yAxis: {
          type: "value",
          boundaryGap: true,
          axisLabel: {
            formatter: function (value) {
              if (value < 10000) {
                return value;
              } else if (value < 100000000) {
                return `${vaccineHelper.fixed(value / 10000, 2)}万`;
              } else {
                return `${vaccineHelper.fixed(value / 100000000, 2)}亿`;
              }
            },
            fontSize: 10,
            color: "#595757",
          },
          axisPointer: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          minInterval: 1, //会出现负数刻度
          min: 0,
        },
        series: [],
      };

      const setSerires = () => {
        option.series = [];
        for (let i = 0; i < this.TrendData.length; i++) {
          const countryItem = this.TrendData[i];
          const countryName = countryItem.Name;
          const obj = {
            name: countryName,
            type: "line",
            // symbol: "circle",
            // symbolSize: 10,
            // 展示曲线上的点
            showSymbol: true,
            // 让曲线更加圆滑
            smooth: true,
            // symbolSize: 8,
            // lineStyle: {
            //   width: 4,
            // },
            // itemStyle: { color: countryItem.color },
            // areaStyle: areaColorStyle,
            data: countryItem.PerHundredTrends.map(
              (per) => per.total_vaccinations_per_hundred
            ),
          };
          option.series.push(obj);
        }
      };

      setSerires();

      // this.trendChart.dispatchAction({
      //   type: "restore",
      // });
      this.trendChart.setOption(option);
    },
    async VaccineTrendDataAsync() {
      const r = await VaccineTrendData();
      if (r.code === 1) {
        // 获取服务器数据
        this.sourceData = r.data;
        // 将60个数据处理为12个
        this.TrendData = this.sourceData.map((d) => {
          const Name = d.Name;
          const PerHundredTrends = d.PerHundredTrends.filter((item, index) => {
            return index % 5 === 0;
          });
          const obj = {
            Name,
            PerHundredTrends,
          };
          return obj;
        });
        // 创建趋势图
        this.createTrend();
      }
    },
  },
  mounted() {
    this.VaccineTrendDataAsync();
  },
};
</script>

<style scoped>
#VaccineTrend {
  width: 100%;
  height: 375px;
  border: 1px solid #e6e6e6;
}
</style>