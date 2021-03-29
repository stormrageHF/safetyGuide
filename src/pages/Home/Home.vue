<template>
  <div class="body_box">
    <div class="menu_box">
      <!-- 目的地 -->
      <div class="home_menu_btn" @click="destinationClick">
        <img
          class="btn_img"
          src="../../assets/images/home/home_menu01.png"
          alt=""
        />
      </div>
      <!-- 救援 -->
      <div class="home_menu_btn" @click="assistanceClick">
        <img
          class="btn_img"
          src="../../assets/images/home/home_menu02.png"
          alt=""
        />
      </div>
      <!-- 医疗 -->
      <div class="home_menu_btn" @click="medClick">
        <img
          class="btn_img"
          src="../../assets/images/home/home_menu03.png"
          alt=""
        />
      </div>
      <!-- 咨询 -->
      <div class="home_menu_btn" @click="consultClick">
        <img
          class="btn_img"
          src="../../assets/images/home/home_menu04.png"
          alt=""
        />
      </div>
      <!-- 礼宾 -->
      <div class="home_menu_btn" @click="conciergeClick">
        <img
          class="btn_img"
          src="../../assets/images/home/home_menu05.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    destinationClick() {
      this.$router.push({ path: "/des" });
    },
    assistanceClick() {
      this.$router.push({ path: "/ass" });
    },
    medClick() {
      this.$router.push({ path: "/med" });
    },
    consultClick() {
      this.$router.push({ path: "/consult" });
    },
    conciergeClick() {
      this.$router.push({ path: "/concierge" });
    },
  },
};
</script>

<style scoped>
.body_box {
  background-image: url("../../assets/images/home/home_bg.jpeg");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center top;
  width: 100%;
  min-height: 100vh;
  /* height: 100vh; */
  padding: 0;
  margin: 0;
  /* border: 1px solid transparent; */
  /* background-color: blue; */
  padding-top: 270px;
  box-sizing: border-box;
  background-color: #016f7e;
}
.menu_box {
  /* margin-top: 320px; */
  padding: 20px 0;
}
.home_menu_btn {
  width: 100%;
  /* height: 80px; */
  margin-bottom: 20px;
  text-align: center;
}
.home_menu_btn:focus {
  opacity: 0.8;
}
.btn_img {
  width: 78%;
}
</style>
