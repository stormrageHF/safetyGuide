<template>
  <div class="body_box">
    <div class="menu_box">
      <div
        class="home_menu_btn"
        v-for="t in 4"
        :key="t"
        @click="itemClick(t)"
      >
        <img class="btn_img"
        :src="imgArr[t-1]"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Medical',
  data () {
    return {
      imgArr: [
        require('../../assets/images/medical/button_Medical01.png'),
        require('../../assets/images/medical/button_Medical02.png'),
        require('../../assets/images/medical/button_Medical03.png'),
        require('../../assets/images/medical/button_Medical04.png')
      ]
    }
  },
  methods: {
    itemClick (t) {
      this.$router.push({
        name: 'aadetails',
        params: {
          id: 'med' + t
        }
      })
    }
  }
}
</script>

<style scoped>
.body_box {
  background-image: url("../../assets/images/medical/bg_Medical.jpg");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center top;
  width: 100%;
  min-height: 100vh;
  /* height: 100vh; */
  padding: 0;
  margin: 0;
  /* border: 1px solid transparent; */
  padding-top: 240px;
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
