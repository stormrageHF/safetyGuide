<template>
  <div class="risk_detail">
    <van-nav-bar
      :title="this.$route.params.name"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="header_box">
      <div>
        <div
          class="riskImg"
          :style="{
            backgroundImage: `url(${riskData.ImgLink})`,
          }"
        ></div>
        <!-- <div class="header_name">{{ riskData.Name }}</div> -->
      </div>
    </div>
    <div class="body_box">
      <div class="symptom_box">
        <div class="risk_title">规避</div>
        <div class="risk_content">{{ riskData.Descript }}</div>
      </div>
      <div class="symptom_box">
        <div class="risk_title">急救</div>
        <div class="risk_content">{{ riskData.Treat }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetScenicRiskDetail } from "@/api/index";

export default {
  name: "RiskDetail",
  data() {
    return {
      riskid: localStorage.riskId || "",
      riskData: {
        ImgLink: "",
        Descript: "",
        Id: "",
        Name: "",
        Treat: "",
      },
    };
  },
  methods: {
    // 详情接口
    async GetScenicRiskDetailAsync() {
      const that = this;
      const r = await GetScenicRiskDetail({
        Id: that.riskid,
      });
      if (r.code === 1) {
        console.log(r.data);
        that.riskData = r.data;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  mounted() {
    const that = this;
    that.GetScenicRiskDetailAsync();
  },
};
</script>

<style scoped>
.risk_detail {
  font-size: 14px;
  color: #4d4d4d;
  text-align: justify;
  background-color: #f5f5f5;
  min-height: 100vh;
}
.risk_title {
  font-weight: 550;
  font-size: 16px;
}
.header_box {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  text-align: center;
  font-size: 16px;
}
.riskImg {
  /* border-radius: 50%; */
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 0 auto;
}
.header_name {
  padding-top: 10px;
}
.symptom_box,
.prevention_box {
  margin-top: 20px;
  background-color: white;
  padding: 20px;
}
.risk_content {
  margin-top: 20px;
  white-space: pre-line;
  /* text-indent: 2em; */
}
</style>