<template>
  <div class="appointment_box">
    <div>
      <el-tag
        class="district_tag"
        v-for="(district, index) in districtList"
        :key="district"
        :class="index === 0 ? 'district_tag_active' : ''"
        @click="tagClick(district, $event)"
      >
        {{ district }}
      </el-tag>
    </div>
    <div class="dataList" v-if="datas.length">
      <div class="vaccineItem" v-for="item in datas" :key="item.Id">
        <div class="vaccineName">{{ item.Name }}</div>
        <div class="vaccineAddress">{{ item.Address }}</div>
        <div class="vaccinePhone">联系方式：{{ item.Phone }}</div>
      </div>
    </div>
    <div class="empty" v-else>
      <van-empty description="暂无数据" />
    </div>
  </div>
</template>

<script>
import { GetVaccineArea, GetVaccineData } from "@/api";
import { mapGetters } from "vuex";

export default {
  name: "Appointment",
  data() {
    return {
      cityName: this.$store.state.currentCity,
      Area: "",
      districtList: [],
      datas: [],
    };
  },
  methods: {
    // 获取区县
    async GetVaccineAreaAsync() {
      const that = this;
      const r = await GetVaccineArea({
        city: that.cityName,
      });
      if (r.code === 1) {
        this.districtList = [].concat(r.data.Areas);
        this.Area = this.districtList[0]
        this.GetVaccineDataAsync()
      }
    },
    // 获取数据
    async GetVaccineDataAsync() {
      const that = this;
      const r = await GetVaccineData({
        City: that.cityName,
        Area: that.Area,
      });
      if (r.code === 1) {
        this.datas = r.data
      }
    },
    tagClick(district, $event) {
      const districtTags = document.getElementsByClassName("district_tag");
      Array.from(districtTags).map((item) =>
        item.classList.remove("district_tag_active")
      );
      $event.target.classList.add("district_tag_active");
      // console.log(district, $event);
      this.Area = district;
      this.GetVaccineDataAsync();
    },
  },
  computed: {
    ...mapGetters(["getCityName"]),
  },
  watch: {
    getCityName: function (newValue, oldValue) {
      console.log("state 值变化了");
      this.cityName = newValue;
      this.GetVaccineAreaAsync();
    },
  },
  mounted() {
    if (this.cityName !== "") {
      this.GetVaccineAreaAsync();
    }
  },
};
</script>

<style scoped>
.appointment_box {
  margin: 20px;
}
.district_tag_active {
  background-color: #016f7e;
  color: white;
}
.vaccineName {
  font-size: 16px;
  color: #4d4d4d;
  text-align: justify;
  margin-block-start: 0;
  margin-block-end: 0;
  font-weight: 400;
}
.vaccineAddress,
.vaccinePhone {
  font-size: 14px;
  color: #4d4d4d;
  text-align: justify;
  line-height: 24px;
  margin-block-start: 0;
  margin-block-end: 0;
}
.vaccinePhone {
  line-height: 18px;
}
.vaccineItem {
  /* border-bottom: 1px solid #4d4d4d; */
  /* border-bottom: 1px solid #e6e6e6; */
  padding: 8px 0;
}
.dataList {
  margin-top: 10px;
}
</style>