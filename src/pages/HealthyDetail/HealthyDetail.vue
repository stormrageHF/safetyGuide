<template>
  <div class="healthy_detail">
    <van-nav-bar
      :title="HealthyDetail.Name"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="header_box">
      <div>
        <img :src="HealthyDetail.Img" alt="" />
        <!-- <div class="healder_name">{{ HealthyDetail.Name }}</div> -->
      </div>
    </div>

    <div class="body_box">
      <van-tabs
        v-model="active"
        color="#016f7e"
        line-width="82"
        line-height="4"
        title-active-color="#4d4d4d"
        title-inactive-color="#808080"
        sticky
        swipeable
      >
        <van-tab>
          <template #title>
            <van-icon class="c-van-icon" name="description" />
            <span class="tabTitle">症状描述</span>
          </template>
          <div class="symptom_box">
            <div class="healthy_title">症状</div>
            <div class="healthy_content">{{ HealthyDetail.Descript }}</div>
          </div>
        </van-tab>
        <van-tab>
          <template #title>
            <van-icon class="c-van-icon" name="sign" />
            <span class="tabTitle">预防治疗</span>
          </template>
          <div class="prevention_box">
            <div class="healthy_title">预防和治疗</div>
            <div class="healthy_content">{{ HealthyDetail.Treat }}</div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <!-- <div class="body_box">
      <div class="symptom_box">
        <div class="healthy_title">症状</div>
        <div class="healthy_content">{{ HealthyDetail.Descript }}</div>
      </div>
      <div class="prevention_box">
        <div class="healthy_title">预防和治疗</div>
        <div class="healthy_content">{{ HealthyDetail.Treat }}</div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "HealthyDetail",
  data() {
    return {
      active: 0,
      HealthyDetail: {
        Img: "",
        Name: "",
        Treat: "",
        Descript: "",
      },
    };
  },
  mounted() {
    const str = sessionStorage.getItem("HealthyDetail") || "";
    const data = JSON.parse(str);
    this.HealthyDetail.Img = data.Img;
    this.HealthyDetail.Treat = data.Treat;
    this.HealthyDetail.Descript = data.Descript;
    this.HealthyDetail.Name = data.Name || data.Problem;
  },
  filters: {
    Format(value) {
      return value.replaceAll("。", "。<br/>");
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.healthy_detail {
  font-size: 14px;
  color: #4d4d4d;
  text-align: justify;
  background-color: #f5f5f5;
  min-height: 100vh;
}
.healthy_title {
  font-weight: 550;
  font-size: 16px;
  display: none;
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
.healder_name {
  padding-top: 10px;
}
.symptom_box,
.prevention_box {
  /* margin-top: 20px; */
  background-color: white;
  padding: 20px;
  padding-top: 1px;
}
.healthy_content {
  margin-top: 20px;
  white-space: pre-line;
  line-height: 2;
  min-height: calc(100vh - 134px - 46px - 44px);
}
</style>
<style>
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: #0e6f7d;
}
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: #0e6f7d;
}
.tabTitle {
  /* font-family: PingFangSC-Semibold; */
  font-size: 16px;
  text-align: justify;
  padding-left: 15px;
}
.c-van-icon {
  font-size: 16px;
}
.c-van-icon::before {
  position: absolute;
  top: -14px;
  left: -1px;
}
</style>