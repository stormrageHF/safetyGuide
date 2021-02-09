<template>
  <div id="wrapper">
    <div class="des_all">
      <div
      class="des_header"
      :style="{ backgroundImage: 'url(' + cityLink + ')' }"
    >
      <div class="city_name_box" @click="switchCity">
        <div style="display: flex; align-items: center">
          <h2 class="city_name">
            {{ cityName }}
          </h2>
          <div class="switch_city">切换城市</div>
          <!-- <img src="../../assets/button_change.svg" alt=""> -->
        </div>
        <div style="display: flex; align-items: center">
          <div class="weather_real">{{ weather.real }}℃</div>
          <div style="padding-right: 20px">
            <!-- <img :src="weather.weatherimg | formatWeatherImg" alt=""> -->
            <img style="height: 35px" :src="weather.weatherimg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="des_body">
      <div class="des_tabs">
        <div class="des_tabs_content">
          <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
            <el-tab-pane label="疫情" name="first">
              <Contagion :bs="bs" ref="contagionMap" @get-city="getCity"></Contagion>
            </el-tab-pane>
            <el-tab-pane label="天气" name="second">
              <Weather :bs="bs" ref="WeatherMap"></Weather>
            </el-tab-pane>
            <el-tab-pane label="景点" name="third">
              <Scenic ref="ScenicMap"></Scenic>
            </el-tab-pane>
            <el-tab-pane label="饮食" name="fourth">
              <Diet ref="DietMap"></Diet>
            </el-tab-pane>
            <el-tab-pane label="健康" name="fifth">
              <Healthy ref="HealthyMap"></Healthy>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="des_tab_content"></div>
    </div>
    </div>

    <van-popup v-model="show" round position="top" :style="{ height: '50%' }">
      <van-area
        title="选择城市"
        :area-list="areaList"
        :columns-num="2"
        @confirm="confirmCity"
        @cancel="cancelCity"
      />
    </van-popup>
  </div>
</template>

<script>
import Contagion from "./Contagion/Contagion";
import {
  GetCityFileLink,
  GetWeather,
  GetProvinceAndCity,
  GetScenicInfo,
  GetDietInfo,
  GetDisease,
  GetClimate,
} from "../../api/index";
// import { lazyAMapApiLoaderInstance } from "vue-amap";
import { provinceAndCityData, CodeToText } from "element-china-area-data";
import AMap from "AMap"; // 引入高德地图
// import areaList from "../../../static/area";
import Weather from "./Weather/Weather";
import Scenic from "./Scenic/Scenic";
import BScroll from "@better-scroll/core";
import Diet from './Diet/Diet';
import Healthy from './Healthy/Healthy';

export default {
  name: "Destination",
  data() {
    return {
      activeName: 'first',
      cityName: "",
      cityInfo: {},
      options: provinceAndCityData,
      CodeToText,
      selectedOptions: [],
      cityLink: "",
      show: false, // 控制城市列表弹出,
      areaList: {
        province_list: {},
        city_list: {},
      },
      weather: {},
      bs: {}, // 滚动实例
      scenicList: [], // 景点信息 
      dietInfo: null, // 饮食信息
    };
  },
  methods: {
    // 获取省市
    async GetProvinceAndCityAsync() {
      const that = this;
      const r = await GetProvinceAndCity();
      if (r.code === 1) {
        const areaDatas = r.data;
        // 处理省
        areaDatas.provinces.forEach((province) => {
          that.areaList.province_list[province.adcode] = province.Name;
        });
        // 处理市
        areaDatas.citys.forEach((city) => {
          that.areaList.city_list[city.adcode] = city.Name;
        });
        // console.log(that.areaList);
      }
    },
    // 获取饮食
    async GetDietInfoAsync(){
      const that = this;
      const r = await GetDietInfo({
       city: that.cityName,
      })
      if(r.code === 1){
        that.dietInfo = r.data;
        that.$refs.DietMap.setData(that.dietInfo);
      }
    },
    // 获取景点信息
    async GetScenicInfoAsync(){
      const that = this;
      const r = await GetScenicInfo({
       city: that.cityName,
      })
      if(r.code === 1){
        that.scenicList = r.data;
        that.$refs.ScenicMap.scenicList = that.scenicList;
      }
    },
    // 获取天气
    async GetWeatherAsync() {
      const that = this;
      const r = await GetWeather({
        city: that.cityName,
      });
      if (r.code === 1) {
        that.weather = r.data.wether;
        // console.log(r.data);
        that.$refs.WeatherMap.weather = that.weather;
        that.$refs.WeatherMap.airQuality = r.data.airQuality;
        that.$refs.WeatherMap.IsAirQuality = r.data.IsAirQuality;
      }
    },
    // 获取传染病
    async GetDiseaseAsync(){
      const that = this;
      const r = await GetDisease({
        city: that.cityName,
      });
      if (r.code === 1) {
        that.$refs.HealthyMap.setData(r.data)
      }
    },
    // 获取气候
    async GetClimateAsync(){
      const that = this;
      const r = await GetClimate({
        city: that.cityName,
      });
      if (r.code === 1) {
        that.$refs.HealthyMap.setClimate(r.data)
      }
    },
    // 得到所在城市
    getCity(cityName) {
      // this.cityInfo = info;
      // this.cityName = info.city === "" ? info.province : info.city;
      this.cityName = cityName;
      // 获取城市链接
      this.GetCityFileLinkAsync();
      // 获取天气
      this.GetWeatherAsync();
      // 获取景点
      this.GetScenicInfoAsync();
      // 获取饮食
      this.GetDietInfoAsync()
      // 获取传染病
      this.GetDiseaseAsync();
      // 获取气候
      this.GetClimateAsync();
    },
    // 获取城市链接
    async GetCityFileLinkAsync() {
      const that = this;
      const r = await GetCityFileLink({
        city: that.cityName,
      });
      if (r.code === 1) {
        // console.log(r.data);
        that.cityLink = r.data.Link;
      }
    },
    handleClick(tab) {
      console.log(tab);
      this.activeName = tab.name;
      sessionStorage.activeName = this.activeName; // 更换tab，记录激活 tab 状态
      // this.refreshBs();
    },
    //获取用户所在城市信息
    showCityInfo() {
      const that = this;
      //实例化城市查询类
      const citysearch = new AMap.CitySearch();
      //自动获取用户IP，返回当前城市
      citysearch.getLocalCity(function (status, result) {
        if (status === "complete" && result.info === "OK") {
          if (result && result.city && result.bounds) {
            that.cityName = result.city;
            // that.cityInfo = result;
            // console.log(result);
            // that.$refs.contagionMap.cityInfo = result;
            // console.log(that.$refs.contagionMap.cityInfo);
            // 获取城市链接
            that.GetCityFileLinkAsync();
          }
        } else {
          console.log(result.info);
        }
      });
    },
    handleChange(value) {
      console.log(value);
      console.log(this.selectedOptions);
      // this.ruleForm.Provice = this.CodeToText[value[0]];
      // this.ruleForm.City = this.CodeToText[value[1]];
      // this.ruleForm.Region = this.CodeToText[value[2]];
    },
    switchCity() {
      this.show = true;
    },
    confirmCity(city) {
      console.log(city);
      this.show = false;
      this.cityName = city[1].name;
      // 村本地
      sessionStorage.cityName = this.cityName;
      // 获取城市链接
      this.GetCityFileLinkAsync();
      // 获取天气
      this.GetWeatherAsync();
      // 改变地图
      this.$refs.contagionMap.cityName = this.cityName;
      this.$refs.contagionMap.county = "";
      this.$refs.contagionMap.getDatas();
      // 景点
      this.GetScenicInfoAsync();
      // 饮食
      this.GetDietInfoAsync();
      // 获取传染病
      this.GetDiseaseAsync();
      // 获取气候
      this.GetClimateAsync();
    },
    cancelCity(){
      this.show = false;
    },
    setBetterScroll() {
      const that = this;
      let wrapper = document.querySelector("#wrapper");
      if (wrapper) {
        that.bs = new BScroll(wrapper, {
          // specifiedIndexAsContent: 1,
          scrollY: true,
          click: true,
        });
      }
    },
    refreshBs(){
      // 重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
      if(this.bs.refresh){
        this.bs.refresh()
      }
    }
  },
  components: {
    Contagion,
    Weather,
    Scenic,
    Diet,
    Healthy,
  },
  created() {
    // 获取省市
    this.GetProvinceAndCityAsync();
    console.log("destination ~~~~");
  },
  filters: {
    // 天气icon
    formatWeatherImg(value) {
      if (!value) {
        return "";
      }
      let img = "";
      switch (value) {
        case "qing.png":
          img = require("../../assets/cusWeather/icon_weather_fine.svg");
          break;
        case "bingbao.png":
          img = require("../../assets/cusWeather/icon_weather_hail.svg");
          break;
        case "lei.png":
          img = require("../../assets/cusWeather/icon_weather_thunder.svg");
          break;
        case "shachen.png":
          img = require("../../assets/cusWeather/icon_weather_sand.svg");
          break;
        case "wu.png":
          img = require("../../assets/cusWeather/icon_weather_fog.svg");
          break;
        case "xue.png":
          img = require("../../assets/cusWeather/icon_weather_snow.svg");
          break;
        case "yin.png":
          img = require("../../assets/cusWeather/icon_weather_overcast.svg");
          break;
        case "yu.png":
          img = require("../../assets/cusWeather/icon_weather_rain.svg");
          break;
        case "yun.png":
          img = require("../../assets/cusWeather/icon_weather_cloudy.svg");
          break;
        default:
          break;
      }
      return img;
    },
  },
  mounted() {
    // this.setBetterScroll();
    this.activeName = sessionStorage.activeName || 'first';
  },
  updated(){
    console.log('detination -- updated ~~');
    this.refreshBs()
  }
};
</script>

<style scoped>
#wrapper {
  height: 100vh;
}
.des_header {
  width: 100%;
  height: 224px;
  /* background-color: thistle; */
  border: 1px solid transparent;
  /* background: url('../../assets/bg_shanghai1.jpg') no-repeat; */
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
}
.city_name_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.city_name {
  font-size: 24px;
  color: #ffffff;
  letter-spacing: 1.5px;
  text-align: justify;
  margin-left: 30px;
  margin-top: 20px;
}
.weather_real {
  font-size: 24px;
  color: #ffffff;
  letter-spacing: 1.5px;
  text-align: justify;
  padding-right: 5px;
}
.des_body {
  margin-top: -44px;
}
.des_tabs {
  min-height: 44px;
  width: 100%;
  background-color: white;
  border-radius: 20px 20px 0 0;
}
.des_tabs_content {
  padding: 5px 0px 0px;
}
.switch_city {
  background-color: #ffffff;
  border-radius: 15.5px;
  font-size: 14px;
  color: #5986c7;
  padding: 4px 5px;
  width: 80px;
  /* height: 24px; */
  text-align: center;
  margin-left: 10px;
}
</style>
<style>
.el-tabs__header {
  padding: 0 15px;
}
/* 自定义el-tabs样式 */
.el-tabs__item {
  font-size: 20px;
  letter-spacing: 1.25px;
  /* text-align: justify; */
  color: #9fbeaf;
}
.is-active {
  color: #016f7e !important;
}
.el-tabs__active-bar {
  background-color: #016f7e;
  height: 4px;
}
.el-tabs__nav-wrap::after {
  background-color: transparent;
}
</style>