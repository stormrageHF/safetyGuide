<template>
  <div class="body_box">
    <div class="menu_box">
      <div class="home_menu_btn" v-for="t in 2" :key="t" @click="itemClick(t)">
        <img class="btn_img" :src="imgArr[t - 1]" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Concierge',
  data () {
    return {
      imgArr: [
        require('../../assets/images/concierge/button_Concierge01.png'),
        require('../../assets/images/concierge/button_Concierge02.png')
      ]
    }
  },
  methods: {
    itemClick (t) {
      this.$router.push({
        name: 'aadetails',
        params: {
          id: 'concierge' + t
        }
      })
    }
  }
}
</script>

<style scoped>
.body_box {
  background-image: url("../../assets/images/concierge/bg_Concierge.jpg");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center top;
  width: 100%;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  /* border: 1px solid transparent; */
  padding-top: 270px;
  box-sizing: border-box;
}
.menu_box {
  /* margin-top: 320px; */
  padding: 20px;
}
.home_menu_btn {
  width: 100%;
  /* height: 80px; */
  margin-bottom: 20px;
}
.home_menu_btn:focus {
  opacity: 0.8;
}
.btn_img {
  width: 100%;
  /* height: 100%; */
}
</style>
