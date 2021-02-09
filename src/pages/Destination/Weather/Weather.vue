<template>
  <div class="weather_box">
    <div class="common_box white_bg">
      <div class="common_item">
        <el-row>
          <!-- 降雨概率 -->
          <el-col :span="12">
            <div class="com_img">
              <div>
                <img
                  src="../../../assets/weather/icon_weather_rainprobability.svg"
                  alt=""
                />
              </div>
              <div>
                <div class="weather_tit">降雨概率</div>
                <span>{{ weather.pop }}</span>
              </div>
            </div>
          </el-col>
          <!-- 温度 -->
          <el-col :span="12">
            <div class="com_img">
              <div>
                <img
                  src="../../../assets/weather/icon_weather_temperaturerange.svg"
                  alt=""
                />
              </div>
              <div>
                <div class="weather_tit">温度范围</div>
                <span>{{ weather.lowest }}℃ ~ {{ weather.highest }}℃</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="common_item">
        <el-row>
          <!-- 风速 -->
          <el-col :span="12">
            <div class="com_img">
              <div>
                <img
                  src="../../../assets/weather/icon_weather_wind_ES.svg"
                  alt=""
                />
              </div>
              <div>
                <div class="weather_tit">风向风力</div>
                <span>{{ weather.wind }}{{ weather.windsc }}</span>
              </div>
            </div>
          </el-col>
           <!-- 大气压 -->
          <el-col :span="12">
            <div class="com_img">
              <div>
                <img
                  src="../../../assets/weather/icon_weather_pressure.svg"
                  alt=""
                />
              </div>
              <div>
                <div class="weather_tit">大气压</div>
                <span>{{ weather.airpress }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="common_item bottom_border">
        <el-row>
          <!-- 紫外线强度 -->
          <el-col :span="12">
            <div class="com_img">
              <div>
                <img src="../../../assets/weather/icon_weather_UV.svg" alt="" />
              </div>
              <div>
                <div class="weather_tit">紫外线强度</div>
                <span>{{ weather.uv_index }}</span>
              </div>
            </div>
          </el-col>
          <!-- 湿度 -->
          <el-col :span="12">
            <div class="com_img">
              <div>
                <img
                  src="../../../assets/weather/icon_weather_humidity.svg"
                  alt=""
                />
              </div>
              <div>
                <div class="weather_tit">空气湿度</div>
                <span>{{ weather.humidity }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      
      <!-- 衣服 -->
      <div class="clothes_box">
        <!-- 紫外线 -->
        <div class="clothes_item" v-if="weather.uv_index > 3">
          <el-row class="row_box">
            <el-col class="col_box" :span="8">
              <div class="col_item">
                <img
                  src="../../../assets/liveTips/icon_UVprotection.svg"
                  alt=""
                />
              </div>
            </el-col>
            <el-col class="col_box" :span="15">
              <div class="col_item">
                <p class="clothes_p">注意防晒</p>
              </div>
            </el-col>
            <el-col class="col_box" :span="1"></el-col>
          </el-row>
        </div>
         <!-- 雪天开车 -->
        <div class="clothes_item" v-if="weather.weather && weather.weather.includes('雪')">
          <el-row class="row_box">
            <el-col class="col_box" :span="8">
              <div class="col_item">
                <img
                  src="../../../assets/liveTips/icon_frozenroad.svg"
                  alt=""
                />
              </div>
            </el-col>
            <el-col class="col_box" :span="15">
              <div class="col_item">
                <p class="clothes_p clothes_stand">路面结冰减速通行</p>
              </div>
            </el-col>
            <el-col class="col_box" :span="1"></el-col>
          </el-row>
        </div>
        <!-- 雨伞 -->
        <div class="clothes_item" v-if="weather.pop > 30">
          <el-row class="row_box">
            <el-col class="col_box" :span="8">
              <div class="col_item">
                <img src="../../../assets/liveTips/icon_umbrella.svg" alt="" />
              </div>
            </el-col>
            <el-col class="col_box" :span="15">
              <div class="col_item">
                <p class="clothes_p">带上雨伞</p>
              </div>
            </el-col>
            <el-col class="col_box" :span="1"></el-col>
          </el-row>
        </div>
        <!-- 大风 -->
        <div class="clothes_item" v-if="weather.windsc && weather.windsc.slice(0,-1) >= windLevel">
          <el-row class="row_box">
            <el-col class="col_box" :span="8">
              <div class="col_item">
                <img src="../../../assets/liveTips/icon_windamage.svg" alt="" />
              </div>
            </el-col>
            <el-col class="col_box" :span="15">
              <div class="col_item">
                <p class="clothes_p">大风天小心高空坠物</p>
              </div>
            </el-col>
            <el-col class="col_box" :span="1"></el-col>
          </el-row>
        </div>
        <!-- 外套 -->
        <div class="clothes_item">
          <el-row class="row_box">
            <el-col class="col_box" :span="8">
              <div class="col_item">
                <img :src="weather.real | weatherClothImg" alt="" />
              </div>
            </el-col>
            <el-col class="col_box" :span="15">
              <div class="col_item">
                <p class="clothes_p">
                  需要穿{{ weather.real | weatherClothes }}
                </p>
              </div>
            </el-col>
            <el-col class="col_box" :span="1"></el-col>
          </el-row>
        </div>
        <!-- 增减衣库 -->
        <div class="clothes_item" style="border-color: transparent">
          <!-- man -->
          <el-row class="row_box">
            <el-col class="col_box" :span="8">
              <div class="col_item">
                <img
                  src="../../../assets/liveTips/icon_man.svg"
                  alt=""
                />
              </div>
            </el-col>
            <el-col class="col_box" :span="15">
              <div class="col_item">
                <p class="clothes_p clothes_stand">男士按照穿衣建议</p>
              </div>
            </el-col>
            <el-col class="col_box" :span="1"></el-col>
          </el-row>
          <!-- woman -->
           <el-row class="row_box">
            <el-col class="col_box" :span="8">
              <div class="col_item">
                <img
                  src="../../../assets/liveTips/icon_womandchild.svg"
                  alt=""
                />
              </div>
            </el-col>
            <el-col class="col_box" :span="15">
              <div class="col_item">
                <p class="clothes_p clothes_stand">女士与儿童适当添加衣物</p>
              </div>
            </el-col>
            <el-col class="col_box" :span="1"></el-col>
          </el-row>
          <!-- old -->
           <el-row class="row_box">
            <el-col class="col_box" :span="8">
              <div class="col_item">
                <img
                  src="../../../assets/liveTips/icon_old.svg"
                  alt=""
                />
              </div>
            </el-col>
            <el-col class="col_box" :span="15">
              <div class="col_item">
                <p class="clothes_p clothes_stand">老年人群注意防风</p>
              </div>
            </el-col>
            <el-col class="col_box" :span="1"></el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 空气污染 -->
    <div class="air_pollution_box white_bg" v-if="IsAirQuality">
      <div class="air_title_box">
        <div class="AQI_NUM" :class="{ red_color: airQuality.aqi > 100 }">
          {{ airQuality.aqi }}
        </div>
        <span>AQI</span>
        <div class="AQI_TEXT">{{ airQuality.quality }}</div>
      </div>
      <div class="">
        <el-row :gutter="20">
          <!-- SO2 -->
          <el-col :span="12">
            <div
              class="Chemistry_box"
              :class="{ red_color: airQuality.so2 > so2_standard }"
            >
              <span class="Chemistry_text"
                >
                <!-- SO<span class="Chemistry_two">2</span> -->
                <span>二氧化硫</span>
                </span
              >
              <span class="Chemistry_value">{{ airQuality.so2 }}</span>
            </div>
          </el-col>
          <!-- NO2 -->
          <el-col :span="12">
            <div
              class="Chemistry_box"
              :class="{ red_color: airQuality.no2 > no2_standard }"
            >
              <span class="Chemistry_text"
                >
                <!-- NO<span class="Chemistry_two">2</span> -->
                <span>二氧化氮</span>
                </span
              >
              <span class="Chemistry_value">{{ airQuality.no2 }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- O3 -->
          <el-col :span="12">
            <div
              class="Chemistry_box"
              :class="{ red_color: airQuality.o3 > o3_standard }"
            >
              <span class="Chemistry_text"
                >
                <!-- O<span class="Chemistry_two">3</span> -->
                <span>臭氧</span>
                </span
              >
              <span class="Chemistry_value">{{ airQuality.o3 }}</span>
            </div>
          </el-col>
          <!-- CO -->
          <el-col :span="12">
            <div
              class="Chemistry_box"
              :class="{ red_color: airQuality.co > co_standard }"
            >
              <span class="Chemistry_text">
                <!-- CO<span class="Chemistry_two"> -->
                <span>一氧化碳</span>
              </span>
              <span class="Chemistry_value">{{ airQuality.co }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- PM2.5 -->
          <el-col :span="12">
            <div
              class="Chemistry_box"
              :class="{ red_color: airQuality.pm2_5 > pm25_standard }"
            >
              <span class="Chemistry_text"
                >PM2.5颗粒物<span class="Chemistry_two"></span
              ></span>
              <span class="Chemistry_value">{{ airQuality.pm2_5 }}</span>
            </div>
          </el-col>
          <!-- PM10 -->
          <el-col :span="12">
            <div
              class="Chemistry_box"
              :class="{ red_color: airQuality.pm10 > pm10_standard }"
            >
              <span class="Chemistry_text"
                >PM10颗粒物<span class="Chemistry_two"></span
              ></span>
              <span class="Chemistry_value">{{ airQuality.pm10 }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
      <!-- 空气污染提示 -->
      <div class="air_Excessive_box">
        <!-- pm2.5 超标 -->
        <div class="air_Excessive_item" v-if="airQuality.pm2_5 > 75">
          <el-row class="row_box">
            <el-col class="col_box" :span="8">
              <div class="col_item">
                <img
                  src="../../../assets/liveTips/icon_mask.svg"
                  alt=""
                />
              </div>
            </el-col>
            <el-col class="col_box" :span="15">
              <div class="col_item">
                <p class="clothes_p">需要带上N95口罩</p>
              </div>
            </el-col>
            <el-col class="col_box" :span="1"></el-col>
          </el-row>
        </div>
       <!-- AQI < 100 -->
        <div class="air_Excessive_item" v-if="airQuality.aqi < 100">
          <el-row class="row_box">
            <el-col class="col_box" :span="8">
              <div class="col_item">
                <img
                  src="../../../assets/liveTips/icon_outdoor.svg"
                  alt=""
                />
              </div>
            </el-col>
            <el-col class="col_box" :span="15">
              <div class="col_item">
                <p class="clothes_p clothes_stand">适合户外运动锻炼</p>
              </div>
            </el-col>
            <el-col class="col_box" :span="1"></el-col>
          </el-row>
        </div>
         <!-- AQI >= 100 -->
        <div class="air_Excessive_item" v-if="airQuality.aqi >= 100">
          <el-row class="row_box">
            <el-col class="col_box" :span="8">
              <div class="col_item">
                <img
                  src="../../../assets/liveTips/icon_dontoutdoor.svg"
                  alt=""
                />
              </div>
            </el-col>
            <el-col class="col_box" :span="15">
              <div class="col_item">
                <p class="clothes_p clothes_stand">不适合长时间户外运动</p>
              </div>
            </el-col>
            <el-col class="col_box" :span="1"></el-col>
          </el-row>
        </div>
        <!-- AQI > 300 -->
        <div class="air_Excessive_item" style="border-color: transparent" v-if="airQuality.aqi > 300">
          <el-row class="row_box">
            <el-col class="col_box" :span="8">
              <div class="col_item">
                <img
                  src="../../../assets/liveTips/icon_indoor.svg"
                  alt=""
                />
              </div>
            </el-col>
            <el-col class="col_box" :span="15">
              <div class="col_item">
                <p class="clothes_p clothes_stand">建议尽量呆在室内</p>
              </div>
            </el-col>
            <el-col class="col_box" :span="1"></el-col>
          </el-row>
        </div>
      </div>
      </div>
    </div>
    <!-- 日出日落 -->
    <div class="day_night_box white_bg">
      <div>
        <img
          class="sunMoonImg"
          src="../../../assets/weather/icon_Sunandmoon.svg"
          alt=""
        />
      </div>
      <div>
        <el-row>
          <el-col class="time_box" :span="4">
            <span>{{ weather.sunrise }}</span>
          </el-col>
          <el-col class="time_box" :span="6">
            <span>{{ weather.moonrise }}</span>
          </el-col>
          <el-col class="time_box" :span="4">
            <span></span>
          </el-col>
          <el-col class="time_box" :span="6">
            <span>{{ weather.moondown }}</span>
          </el-col>
          <el-col class="time_box" :span="4">
            <span>{{ weather.sunset }}</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// import { GetWeather } from '../../../api/index';

export default {
  name: "Weahter",
  props: ["bs"],
  data() {
    return {
      weather: {},
      airQuality: {},
      IsAirQuality: true,
      pm25_standard: 55, // pm2.5 超标值
      so2_standard: 530, // so2 超标
      no2_standard: 740, // no2 超标
      co_standard: 15500, // co 超标
      pm10_standard: 255, // pm10 超标
      o3_standard: 350, // o3 超标
      windLevel: 7, // 大风级别
    };
  },
  methods: {
    // 获取天气
    // async GetWeatherAsync(){
    //   const that = this;
    //   const r = await GetWeather({
    //     city: that.cityName
    //   })
    //   if(r.code === 1){
    //     console.log(r.data);
    //     console.log(that.city);
    //   }
    // },
  },
  mounted() {
    // this.GetWeatherAsync();
    // console.log('-------' + this.city);
    console.log("weather -- mounted ~~");
    // if (this.bs.refresh) {
    //   this.bs.refresh();
    // }
  },
  updated() {
    console.log("weather -- updated ~~");
    // if (this.bs.refresh) {
    //   this.bs.refresh();
    // }
  },
  filters: {
    weatherClothes(value) {
      // console.log(value);
      if (value) {
        // value = value.slice(0, -1);
        if (value <= 15) {
          return "羽绒服";
        } else if (value > 15 && value < 25) {
          return "外套";
        } else {
          return "短袖";
        }
      }
    },
    weatherClothImg(value) {
      // console.log(value);
      if (value) {
        // const t = value.slice(0, -1);
        const t = value;
        if (t <= 15) {
          return require("../../../assets/liveTips/icon_downcoat.svg");
        } else if (t > 15 && t < 25) {
          return require("../../../assets/liveTips/icon_coat.svg");
        } else {
          return require("../../../assets/liveTips/icon_Tshirt.svg");
        }
      }
    },
  },
};
</script>

<style scoped>
.weather_box {
  padding: 0px;
  background-color: #f7f7f7;
}
.weather_tit {
  font-size: 12px;
color: #4D4D4D;
letter-spacing: 0.75px;
text-align: justify;
}
.white_bg {
  background-color: #ffffff;
}
.common_box {
  padding: 0 20px;
}
.common_item {
  margin-top: 25px;
}
.com_img {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.com_img>:nth-child(2){
  text-align: left;
  margin-left: 10px;
}

.bottom_border {
  border-bottom: 1px solid #979797;
  padding-bottom: 30px;
}
.clothes_box, .air_Excessive_box {
  font-size: 12px;
  color: #4a76c0;
  min-height: 100px;
  text-align: center;
  /* padding: 10px 0; */
}
.air_Excessive_box {
  min-height: 0;
}
.clothes_item, .air_Excessive_item {
  min-height: 90px;
  border-bottom: 1px solid #979797;
}
.clothes_stand {
  font-size: 12px;
  letter-spacing: 0.75px;
}
.row_box {
  height: 90px;
}
.col_box {
  height: 100%;
}
.col_item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.clothes_p {
  text-align: left;
  font-size: 16px;
  color: #4d4d4d;
  letter-spacing: 1px;
}
.air_pollution_box {
  margin-top: 20px;
  min-height: 100px;
  border: 1px solid transparent;
  padding: 20px;
}
.air_title_box {
  text-align: center;
  margin-bottom: 20px;
}
.AQI_NUM {
  font-size: 40px;
  color: #016f7e;
  letter-spacing: 2.5px;
  text-align: center;
}
.AQI_TEXT {
  margin-top: 8px;
}
.Chemistry_box {
  border-bottom: 1px solid #4d4d4d;
  text-align: justify;
  vertical-align: baseline;
  height: 26px;
  line-height: 26px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 15px;
  padding-bottom: 3px;
}
.red_color {
  color: #ff2a45;
  border-color: #ff2a45;
}
.Chemistry_text {
  font-size: 16px;
  letter-spacing: 1px;
  text-align: center;
  line-height: 22px;
}
.Chemistry_two {
  font-size: 8px;
  letter-spacing: 1px;
  text-align: center;
  line-height: 22px;
}
.Chemistry_value {
  font-size: 24px;
  letter-spacing: 1.5px;
}

.day_night_box {
  margin-top: 20px;
  padding: 20px;
}
.sunMoonImg {
  width: 100%;
}
.time_box {
  text-align: center;
  height: 20px;
}
</style>