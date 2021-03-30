<template>
  <div class="details_box">
    <div>
      <img class="header_img" :src="imgSrc" alt="" />
    </div>
    <div class="info_box">
      <div class="content">
        <div v-for="(item, index) in content" :key="index">
          <h3>{{ item.question }}</h3>
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </div>
    <div class="tel_box">
      <button class="tel_btn" @click="callPhone">拨打咨询电话</button>
    </div>
  </div>
</template>

<script>
import data from "../../../static/data0318";

export default {
  name: "Details",
  data() {
    return {
      params: this.$route.params.id,
      imgSrc: "",
      content: "",
      imgDatas: {
        ass: [
          require("../../assets/images/assistancebg/bg_Assistance01.jpg"),
          require("../../assets/images/assistancebg/bg_Assistance02.jpg"),
          require("../../assets/images/assistancebg/bg_Assistance03.jpg"),
          require("../../assets/images/assistancebg/bg_Assistance04.jpg"),
          require("../../assets/images/assistancebg/bg_Assistance05.jpg"),
          require("../../assets/images/assistancebg/bg_Assistance06.jpg"),
          require("../../assets/images/assistancebg/bg_Assistance07.jpg"),
          require("../../assets/images/assistancebg/bg_Assistance08.jpg"),
          require("../../assets/images/assistancebg/bg_Assistance09.jpg"),
        ],
        concierge: [
          require("../../assets/images/conciergebg/bg_Concierge01.jpg"),
          require("../../assets/images/conciergebg/bg_Concierge02.jpg"),
        ],
        consult: [
          require("../../assets/images/consultingbg/bg_Consulting01.jpg"),
          require("../../assets/images/consultingbg/bg_Consulting02.jpg"),
          require("../../assets/images/consultingbg/bg_Consulting03.jpg"),
          require("../../assets/images/consultingbg/bg_Consulting04.jpg"),
          require("../../assets/images/consultingbg/bg_Consulting05.jpg"),
          require("../../assets/images/consultingbg/bg_Consulting06.jpg"),
          require("../../assets/images/consultingbg/bg_Consulting07.jpg"),
        ],
        med: [
          require("../../assets/images/medicalbg/bg_Medical01.jpg"),
          require("../../assets/images/medicalbg/bg_Medical02.jpg"),
          require("../../assets/images/medicalbg/bg_Medical03.jpg"),
          require("../../assets/images/medicalbg/bg_Medical04.jpg"),
        ],
      },
    };
  },
  methods: {
    callPhone() {
      const _a = document.createElement("a");
      _a.href = "tel:0512-62853087";
      _a.click();
    },
  },
  created() {
    const index = this.params.slice(-1) - 1;
    const type = this.params.slice(0, -1);
    this.imgSrc = this.imgDatas[type][index];
    this.content = data[type][index].content;
  },
};
</script>

<style scoped>
.details_box {
  min-height: 100vh;
}
.header_img {
  width: 100%;
}
.info_box {
  padding-bottom: 80px;
}
.content {
  font-size: 16px;
  color: #4d4d4d;
  text-align: justify;
  line-height: 30px;
  padding: 0 24px;
  white-space: pre-line;
}
.content h3 {
  /* font-family: PingFangSC-Semibold; */
  font-size: 16px;
  color: #016f7e;
  /* letter-spacing: 1px; */
  text-align: justify;
  line-height: 30px;
  font-weight: 600;
  margin-block-end: 0;
  margin-top: 2em;
}
.content p {
  font-weight: 400;
  /* font-family: PingFangSC-Regular; */
  font-size: 14px;
  color: #4d4d4d;
  letter-spacing: 0;
  line-height: 20px;
  margin-block-start: 0.5em;
}
.tel_box {
  background: #ffffff;
  box-shadow: 0 0 11px 0 rgba(0, 0, 0, 0.17);
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tel_btn {
  background: #016f7e;
  border-radius: 25.5px;
  font-size: 20px;
  color: #ffffff;
  letter-spacing: 1.25px;
  text-align: center;
  width: 80%;
  height: 50px;
  border-color: transparent;
}
.tel_btn:focus {
  outline: none;
}
</style>
