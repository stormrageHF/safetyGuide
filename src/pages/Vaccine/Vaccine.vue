<template>
  <div>
    <van-tabs @click="tabClick">
      <van-tab title="实时数据"></van-tab>
      <van-tab title="疫苗预约"></van-tab>
      <van-tab title="各国研发对比"></van-tab>
    </van-tabs>

    <router-view />
  </div>
</template>

<script>

export default {
  name: "Vaccine",
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    tabClick(name) {
      if (name === this.active) {
        return;
      }
      this.active = name;
      if (name === 0) {
        this.$router.push({ path: "/Vaccine/livedata" });
      } else if (name === 1) {
        this.$router.push({ path: "/Vaccine/appointment" });
      } else {
        this.$router.push({ path: "/Vaccine/research" });
      }
    },
   
  },

};
</script>

<style scoped>
.van-tabs >>> .van-tab {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #808080;
  text-align: justify;
  font-weight: 400;
}
.van-tabs >>> .van-tab--active {
  font-family: PingFangSC-Semibold;
  color: #4d4d4d;
  font-weight: 600;
}
.van-tabs >>> .van-tabs__line {
  background-color: #016f7e;
  width: 26%;
}
</style>