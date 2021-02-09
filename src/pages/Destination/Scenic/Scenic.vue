<template>
  <div class="scenic_box">
    <div v-if="scenicList.length !== 0">
      <div
        v-for="item in scenicList"
        :key="item.Name"
        class="scenic_item"
        @click="scenicClick(item)"
      >
        <div>
          <img class="scenicImg" :src="item.PicLink" alt="" />
        </div>
        <div class="scenicDesBox">
          <div class="scenicName">{{ item.Name }}</div>
          <div class="scenicDesc">{{ item.Instrodution }}</div>
        </div>
      </div>
    </div>
    <van-empty v-else description="暂无景区数据" />
  </div>
</template>

<script>

export default {
  name: "Scenic",
  data() {
    return {
      scenicList: [],
    };
  },
  methods: {
    scenicClick(item) {
      this.$router.push({ name: "ScenicDetail", params: { name: item.Name } });
      localStorage.scenicId = item.Id; // 景点id
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.scenic_box {
  padding: 0 20px;
  margin-top: -10px;
  border: 1px solid transparent;
}
.scenic_item {
  border-bottom: 1px solid #e6e6e6;
  padding: 15px 0;
  display: flex;
  align-items: center;
}
.scenicImg {
  width: 140px;
  height: 100px;
}
.scenicDesBox {
  padding-left: 15px;
  display: block;
  height: 100px;
}
.scenicName {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #4d4d4d;
  text-align: justify;
}
.scenicDesc {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #4d4d4d;
  text-align: justify;
  margin-top: 5px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;  
  -webkit-box-orient: vertical;  
  overflow: hidden; 
}
</style>