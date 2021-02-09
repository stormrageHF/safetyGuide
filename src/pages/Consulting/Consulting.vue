<template>
  <div class="body_box">
    <div class="menu_box">
      <div class="home_menu_btn" v-for="t in 7" :key="t" @click="itemClick(t)">
        <img class="btn_img" :src="imgArr[t - 1]" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Consulting",
  data() {
    return {
      imgArr: [
        require("../../assets/images/consulting/button_Consulting01.jpg"),
        require("../../assets/images/consulting/button_Consulting02.jpg"),
        require("../../assets/images/consulting/button_Consulting03.jpg"),
        require("../../assets/images/consulting/button_Consulting04.jpg"),
        require("../../assets/images/consulting/button_Consulting05.jpg"),
        require("../../assets/images/consulting/button_Consulting06.jpg"),
        require("../../assets/images/consulting/button_Consulting07.jpg"),
      ],
    };
  },
  methods: {
    itemClick(t) {
      this.$router.push({
        name: "details",
        params: {
          id: "consult" + t,
        },
      });
    },
  },
};
</script>

<style scoped>
.body_box {
  background-image: url("../../assets/images/consulting/bg_Consulting.jpg");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center top;
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  border: 1px solid transparent;
}
.menu_box {
  margin-top: 320px;
  padding: 20px;
}
.home_menu_btn {
  width: 100%;
  height: 80px;
  margin-bottom: 20px;
}
.home_menu_btn:focus {
  opacity: 0.8;
}
.btn_img {
  width: 100%;
  height: 100%;
}
</style>