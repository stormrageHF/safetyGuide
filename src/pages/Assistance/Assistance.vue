<template>
  <div class="body_box">
    <div class="menu_box">
      <div
        class="home_menu_btn"
        v-for="t in 9"
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
  name: 'Assistance',
  data () {
    return {
      imgArr: [
        require('../../assets/images/assistance/button_Assistance01.png'),
        require('../../assets/images/assistance/button_Assistance02.png'),
        require('../../assets/images/assistance/button_Assistance03.png'),
        require('../../assets/images/assistance/button_Assistance04.png'),
        require('../../assets/images/assistance/button_Assistance05.png'),
        require('../../assets/images/assistance/button_Assistance06.png'),
        require('../../assets/images/assistance/button_Assistance07.png'),
        require('../../assets/images/assistance/button_Assistance08.png'),
        require('../../assets/images/assistance/button_Assistance09.png')
      ]
    }
  },
  methods: {
    itemClick (t) {
      this.$router.push({
        name: 'aadetails',
        params: {
          id: 'ass' + t
        }
      })
    }
  }
}
</script>

<style scoped>
.body_box {
  background-image: url("../../assets/images/assistance/bg_Assistance.jpg");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center top;
  width: 100%;
  min-height: 100vh;
  /* height: 100vh; */
  padding: 0;
  margin: 0;
  /* border: 1px solid transparent; */
  padding-top: 270px;
  box-sizing: border-box;
    background-color: #016F7E;

}
.menu_box {
  /* margin-top: 320px; */
  padding: 20px 0;
}
.home_menu_btn {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}
.home_menu_btn:focus {
  opacity: 0.8;
}
.btn_img {
  width: 78%;
  /* height: 100%; */
}
</style>
