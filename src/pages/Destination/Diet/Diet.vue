<template>
  <div class="diet_box">
    <div class="flavor_box">
      <div class="flavor_desc_box">
        <div>
          <span class="flavor_title">当地饮食口味</span>
        </div>
        <div>
          <p class="flavor_desc">
            {{ Describe }}
          </p>
        </div>
      </div>
      <div class="radar_box">
        <!-- 酸甜油辣咸鲜麻 -->
        <div id="radarChart"></div>
      </div>
    </div>
    <div class="snake_box">
      <div>
        <p class="snake_title">特色风味小吃</p>
      </div>
      <div class="snake_content">
        <div class="snake_row" v-for="(r, i) in localSnacks" :key="i" @click="DietClick(r)">
          <div>
            <!-- <img :src="r.Img" alt=""> -->
            <div class="snake_img" :style="{
              'backgroundImage': `url(${r.Img})`
            }"></div>
          </div>
          <div class="snake_name">
            {{ r.Name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Diet",
  data() {
    return {
      dietInfo: null,
      myChart: null,
      localSnacks: [],
      flavorValue: [],
      Describe: "",
      imgSrc: 'http://101.200.177.46:8073/imgs/dietimages/icon_food_default.svg',
    };
  },
  methods: {
    setData(data) {
      console.log('设置表格');
      this.dietInfo = data;
      this.Describe = data.Describe;
      this.localSnacks = data.LocalSnacks;
      // 口味
      this.flavorValue = [];
      this.flavorValue.push(this.dietInfo.Suan);
      this.flavorValue.push(this.dietInfo.Tian);
      this.flavorValue.push(this.dietInfo.You);
      this.flavorValue.push(this.dietInfo.La);
      this.flavorValue.push(this.dietInfo.Xian);
      this.flavorValue.push(this.dietInfo.Xian1);
      this.flavorValue.push(this.dietInfo.Ma);
      // 设置口味
      this.setRadarCharts();
    },
    createRadarCharts() {
      console.log("charts");
      const chartDom = document.getElementById("radarChart");
      this.myChart = echarts.init(chartDom);
      var option;
      //
      option = {
        title: {
          // text: "基础雷达图",
        },
        tooltip: {},
        legend: {
          // data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"],
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "black",
              fontSize: 12,
            },
          },
          indicator: [
            { name: "酸", max: 3 },
            { name: "甜", max: 3 },
            { name: "油", max: 3 },
            { name: "辣", max: 3 },
            { name: "咸", max: 3 },
            { name: "鲜", max: 3 },
            { name: "麻", max: 3 },
          ],
          splitNumber: 3,
          nameGap: 6,
          radius: "75%",
          silent: true,
        },
        series: [
          {
            // name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            areaStyle: {
              color: ["#a1d8b4"],
              opacity: 0.5,
            },
            data: [
              {
                value: [],
                // name: "预算分配（Allocated Budget）",
              },
            ],
          },
        ],
      };

      option && this.myChart.setOption(option);
    },
    setRadarCharts() {
      let option;
      option = {
        series: [
          {
            data: [
              {
                value: this.flavorValue,
              },
            ],
          },
        ],
      };
      option && this.myChart.setOption(option);
    },
    DietClick(row) {
      const str = JSON.stringify(row)
      sessionStorage.setItem('DietDetail', str)
      this.$router.push('DietDetail')
    }
  },
  mounted() {
    this.createRadarCharts();
  },
};
</script>

<style scoped>
.diet_box {
  padding: 0;
  background-color: #f5f5f5;
}
.flavor_box {
  margin-bottom: 20px;
  background-color: white;
  padding: 10px 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.snake_box {
  min-height: 350px;
  background-color: white;
  padding: 20px;
}
.snake_img {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 0 auto;
}
.flavor_title,
.snake_title {
  font-size: 16px;
  color: #4d4d4d;
  text-align: justify;
  font-weight: 550;
}
.flavor_desc {
  font-size: 12px;
  color: #4d4d4d;
  letter-spacing: 0.69px;
  padding-right: 30px;
}
#radarChart {
  width: 150px;
  height: 150px;
}
.snake_content {
}
.snake_row {
  width: 33%;
  min-height: 40px;
  display: inline-block;
  /* align-items: center; */
  /* justify-content: center; */
  text-align: center;
  margin-bottom: 10px;
}
.snake_row img {
  width: 80px;
  height: 80px;
}
.snake_name {
  margin-top: 10px;
}
</style>