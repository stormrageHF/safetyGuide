<template>
  <div class="info_box">
    <!-- 开放时间 -->
    <div class="info_item">
      <div class="info_title">{{ sourceData.Name }} 开放时间</div>
      <div class="info_content">
        {{ sourceData.OpenTime }}
      </div>
    </div>
    <!-- 景区拥挤度 -->
    <div class="info_item">
      <div class="info_title">景区拥挤度</div>
      <div class="echartsBox">
        <div id="crowding"></div>
      </div>
    </div>
    <!-- 交通便捷度 -->
    <div class="info_item">
      <div class="info_title">交通便捷度</div>
      <div class="info_rate" v-if="sourceData.TrafficScore">
        <van-rate v-model="sourceData.TrafficScore" color="#016F7E" />
      </div>
      <div class="traffic_box">
        <div class="traffic_item">
          <div class="traffic_title">
            <img src="@/assets/scenic/icon_bus.svg" alt="" />
            <span>公交车</span>
          </div>
          <ScenicBus
            ref="ScenicBus"
            @page-change="getBusByPage"
            @click-bus="selectBus"
          ></ScenicBus>
        </div>
        <div class="traffic_item">
          <div class="traffic_title">
            <img src="@/assets/scenic/icon_parking.svg" alt="" />
            <span>停车场</span>
          </div>
          <ScenicPark
            ref="ScenicPark"
            @page-change="getParkByPage"
            @click-park="selectPark"
          ></ScenicPark>
        </div>
        <div class="traffic_item">
          <div class="traffic_title">
            <img src="@/assets/scenic/icon_metro.svg" alt="" />
            <span>地铁</span>
          </div>
          <ScenicSubway
            ref="ScenicSubway"
            @page-change="getSubwayByPage"
            @click-subway="selectSubway"
          ></ScenicSubway>
        </div>
      </div>
    </div>
    <!-- 适宜人群 -->
    <div class="info_item fit_box">
      <div class="info_title">适宜人群</div>
      <div class="fit_box">
        <img :src="unsuitImg" alt="" />
      </div>
    </div>
    <!-- 风险提示 -->
    <div class="info_item">
      <div class="info_title">风险提示</div>
      <div class="warningBox">
        <div v-for="r in Risk" :key="r">
          <img class="warningImg" :src="r" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import ScenicBus from "./ScenicBus/ScenicBus";
import ScenicPark from "./ScenicPark/ScenicPark";
import ScenicSubway from "./ScenicSubway/ScenicSubway";

export default {
  name: "ScenicInfo",
  data() {
    return {
      sourceData: {},
      Risk: [],
      unsuitImg: require("../../../assets/fitpeople/icon_age_all.svg"),
      myChart: null,
      PageIndex: 1,
      BusDatas: [],
      peakValue: "历史平均峰值",
    };
  },
  filters: {
    openTimeHandler(value) {
      if (value && typeof value === "string") {
        return value.replaceAll("；", "；");
      } else {
        return "";
      }
    },
  },
  methods: {
    setScenicInfo(data) {
      if (data) {
        this.sourceData = data;
        this.setEcharts(data.FlowData, data.AvgFlowData);
        this.setFits(data.UnsuitPeople);
        this.setRisks(data.Risk);
      }
    },
    // 创建拥挤度
    createEcharts() {
      this.myChart = echarts.init(document.getElementById("crowding"));

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: "",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "0时",
            "1时",
            "2时",
            "3时",
            "4时",
            "5时",
            "6时",
            "7时",
            "8时",
            "9时",
            "10时",
            "11时",
            "12时",
            "13时",
            "14时",
            "15时",
            "16时",
            "17时",
            "18时",
            "19时",
            "20时",
            "21时",
            "22时",
            "23时",
            "24时",
          ],
        },
        yAxis: {
          type: "value",
          // boundaryGap: [0, "50%"],
          show: false,
          max: 100, // 'dataMax'
        },
        series: [
          {
            name: "拥挤度",
            type: "line",
            symbol: "none",
            data: [],
            smooth: true,
            // markLine: {
            //   symbol: ["none", "none"],
            //   lineStyle: {
            //     color: "#e6e6e6",
            //     width: 0,
            //     type: "solid",
            //   },
            //   label: { show: false },
            //   data: [{ yAxis: 20 }],
            // },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "red", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "blue", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            lineStyle: {
              opacity: 0,
            },
          },
        ],
        graphic: {
          elements: [
            {
              type: "text",
              z: 100,
              right: "10%",
              top: "0%",
              style: {
                fill: "#333", // #333
                text: ["绿色曲线:历史平均峰值"].join("\n"),
                font: "10px Microsoft YaHei",
              },
            },
          ],
        },
      };

      option && this.myChart.setOption(option);
    },
    setEcharts(data, AvgFlowData) {
      if (Array.isArray(data)) {
        data.unshift(0, 0, 0, 0, 0, 0);
        data.push(0, 0, 0);
      }
      if (Array.isArray(AvgFlowData)) {
        AvgFlowData.unshift(0, 0, 0, 0, 0, 0);
        AvgFlowData.push(0, 0, 0);
      }
      const option = {
        series: [
          {
            data: data,
          },
          {
            name: "历史峰值",
            type: "line",
            lineStyle: {
              color: "green",
              width: 1,
            },
            smooth: true,
            symbol: "none",
            data: AvgFlowData,
          },
        ],
      };
      option && this.myChart.setOption(option);
    },
    replaceSign(str) {
      const s = str.replaceAll("；", "；\r\n");
      return s;
    },
    // 设置公交数据
    setBusData(data) {
      this.$refs.ScenicBus.setBus(data);
    },
    // 设置停车场数据
    setParkData(data) {
      this.$refs.ScenicPark.setPark(data);
    },
    // 设置地铁数据
    setSubwayData(data) {
      this.$refs.ScenicSubway.setSubway(data);
    },
    //  点击分页获取bus
    getBusByPage(page) {
      this.$emit("get-bus-page", page);
    },
    // 点击分页获取park
    getParkByPage(page) {
      this.$emit("get-park-page", page);
    },
    // 点击分页获取地铁
    getSubwayByPage(page) {
      this.$emit("get-Subway-page", page);
    },
    // 适宜人群
    setFits(Unsuit) {
      if (Unsuit === "老") {
        this.unsuitImg = require("../../../assets/fitpeople/icon_age_noold.svg");
      }
    },
    // 风险提示
    setRisks(risks) {
      this.Risk = risks;
    },
    // 选择公交站
    selectBus(busInfo) {
      this.setAllDatasUnselected();
      this.$emit("select-bus", busInfo);
    },
    // 选择停车站
    selectPark(parkInfo) {
      this.setAllDatasUnselected();
      this.$emit("select-park", parkInfo);
    },
    // 选择地铁
    selectSubway(subwayInfo) {
      this.setAllDatasUnselected();
      this.$emit("select-subway", subwayInfo);
    },
    // 使所有数据不selected
    setAllDatasUnselected() {
      this.$refs.ScenicBus.setUnSelected();
      this.$refs.ScenicPark.setUnSelected();
      this.$refs.ScenicSubway.setUnSelected();
      // 强制刷新
      this.$refs.ScenicBus.$forceUpdate();
      this.$refs.ScenicPark.$forceUpdate();
      this.$refs.ScenicSubway.$forceUpdate();
    },
  },
  mounted() {
    this.createEcharts();
  },
  components: {
    ScenicBus,
    ScenicPark,
    ScenicSubway,
  },
};
</script>

<style scoped>
.info_box {
  background-color: #f7f7f7;
}
.info_item {
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
  position: relative;
}
.info_rate {
  position: absolute;
  top: 20px;
  right: 20px;
}
.open_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left_box {
  font-size: 16px;
  color: #4d4d4d;
  letter-spacing: 1px;
  text-align: justify;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  overflow: hidden;
  max-width: 30%;
  font-weight: 450;
}
.right_box {
  font-size: 12px;
  color: #4d4d4d;
  letter-spacing: 0.75px;
  text-align: justify;
}
.info_title {
  font-size: 16px;
  color: #4d4d4d;
  text-align: justify;
  font-weight: 450;
}
.info_content {
  margin-top: 10px;
  font-size: 12px;
  color: #4d4d4d;
  letter-spacing: 0.75px;
  text-align: justify;
  white-space: pre-line;
}
.traffic_item {
  margin-top: 10px;
}
.traffic_title {
  padding: 10px 0;
  display: flex;
  align-items: center;
}
.traffic_title span {
  padding-left: 10px;
}

.warningBox {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
}
.warningImg {
  width: 80px;
  height: 80px;
  display: block;
}
#crowding {
  width: 100%;
  min-height: 80px;
}
.echartsBox {
  margin-top: 10px;
}
.fit_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
