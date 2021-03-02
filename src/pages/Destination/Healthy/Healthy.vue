<template>
  <div class="healthy_box">
    <div class="climate_box">
      <div class="climate_title">当地气候可能引起的不适</div>
      <div class="img_box">
        <img :src="Img" alt="" />
      </div>
      <div class="desc_box">
        <span>{{ Descript }}</span>
      </div>
      <div class="climate_response">
        <div
          class="climate_response_item"
          v-for="item in Content"
          :key="item.Img"
          @click="climateClick(item)"
        >
          <img :src="item.Img" alt="" />
          <div>{{ item.Problem }}</div>
        </div>
      </div>
    </div>

    <div class="Infectious_box">
      <div class="Infectious_title">当地常见传染性疾病</div>
      <div class="Infectious_des">
        来自当地卫生健康委员会公布的法定传染病历史统计情况，按发病数量从高到低排列。
      </div>
      <div class="Infectious_list">
        <div
          class="Infectious_item"
          v-for="item in InfectiousData"
          :key="item.Id"
          @click="InfectiousClick(item)"
        >
        <div>
          <img class="InfectiousImg" :src="item.Img" alt="" />
        </div>
        <div class="InfectiousDescBox">
          <div class="InfectiousName">{{ item.Name }}</div>
          <div class="InfectiousDesc">{{ item.Descript }}</div>
        </div>
        </div>
      </div>
    </div>

    <div class="Food_structure">
      <div class="FoodList">
        <div
          class="food_struc_item"
          v-for="item in FoodStructrue"
          :key="item.name"
        >
          <div class="food_struc_name">
            {{ item.name }}
          </div>
          <div class="food_struc_text">
            {{ item.text }}
          </div>
          <div class="food_struc_img" v-if="item.DietTypeImg">
            <img :src="item.DietTypeImg" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="JKZX_box">
      <div>
        {{ JKZXName }}
      </div>
      <div>
        {{ JKZXPhone }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Healthy",
  data() {
    return {
      InfectiousData: [],
      Img: "",
      Descript: "",
      Content: [],
      FoodStructrue: [
        {
          name: "当地膳食结构特点",
          text: "",
        },
        {
          name: "膳食结构缺陷",
          text: "",
          DietTypeImg: "",
        },
        {
          name: "营养建议",
          text: "",
        },
      ],
      JKZXName: "",
      JKZXPhone: "",
    };
  },
  methods: {
    setData(data) {
      this.InfectiousData = data.DiseaseDtos;
      this.JKZXName = data.JKZXName;
      this.JKZXPhone = data.JKZXPhone;
      // DietJGTD  DietJGQX  DietYYJY
      this.FoodStructrue[0].text = data.DietJGTD;
      this.FoodStructrue[1].text = data.DietJGQX;
      this.FoodStructrue[2].text = data.DietYYJY;
      this.FoodStructrue[1].DietTypeImg = data.DietTypeImg;
    },
    setClimate(data) {
      this.climateData = data;
      this.Img = this.climateData.Img;
      this.Descript = this.climateData.Descript;
      this.Content = this.climateData.Content;
    },
    climateClick(row) {
      // console.log(row);
      const str = JSON.stringify(row);
      sessionStorage.setItem("HealthyDetail", str);
      this.$router.push("HealthyDetail");
    },
    InfectiousClick(row) {
      // console.log(row);
      const str = JSON.stringify(row);
      sessionStorage.setItem("HealthyDetail", str);
      this.$router.push("HealthyDetail");
    },
  },
};
</script>

<style scoped>
.healthy_box {
  background-color: #f5f5f5;
}
.healthy_item {
  padding: 0 20px;
}
p {
  white-space: pre-line;
}
.climate_box {
  padding: 0 20px;
  background-color: #ffffff;
  margin-bottom: 20px;
}
.climate_title {
  font-size: 16px;
  color: #4d4d4d;
  text-align: justify;
  font-weight: 550;
}
.img_box {
  margin-top: 10px;
  margin-bottom: 20px;
}
.img_box img {
  width: 100%;
}
.desc_box span {
  font-size: 14px;
  color: #4d4d4d;
  letter-spacing: 0.88px;
}
.climate_response {
  padding-top: 20px;
}
.climate_response_item {
  display: inline-block;
  width: 33%;
  text-align: center;
  margin-bottom: 20px;
}
.climate_response_item img {
  display: block;
  margin: 0 auto;
}
.climate_response_item div {
  font-size: 14px;
  color: #4d4d4d;
  letter-spacing: 0.88px;
  padding-top: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.Infectious_box {
  margin-top: 20px;
  padding: 20px;
  background-color: white;
}
.Infectious_title {
  font-size: 16px;
  color: #4d4d4d;
  text-align: justify;
  font-weight: 550;
}
.Infectious_des {
  font-size: 14px;
  margin-top: 10px;
  line-height: 180%;
  color: #4d4d4d;
  text-align: justify;
}
.Infectious_list {
  margin-top: 2px;
}
.Food_structure {
  padding: 20px;
  margin-top: 20px;
  background-color: white;
}
.food_struc_item {
  font-size: 16px;
  color: #4d4d4d;
  text-align: justify;
  margin-bottom: 20px;
}
.food_struc_name {
  font-weight: 550;
  line-height: 200%;
}
.food_struc_text {
  font-size: 14px;
  line-height: 180%;
}
.JKZX_box {
  font-size: 14px;
  color: #4d4d4d;
  letter-spacing: 0.8px;
  padding: 20px;
  text-align: center;
  line-height: 180%;
}

.Infectious_item {
  border-bottom: 1px solid #e6e6e6;
  padding-top: 15px;
  display: flex;
  /* align-items: center; */
  justify-content: flex-start;
}
.InfectiousImg {
  width: 70px;
  height: 70px;
  padding-top: 3px;
}
.InfectiousDescBox {
  padding-left: 15px;
  display: block;
  min-height: 90px;
}
.InfectiousName {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #4d4d4d;
  text-align: justify;
}
.InfectiousDesc {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #4d4d4d;
  text-align: justify;
  margin-top: 5px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.food_struc_img img {
  width: 100%;
}
</style>
