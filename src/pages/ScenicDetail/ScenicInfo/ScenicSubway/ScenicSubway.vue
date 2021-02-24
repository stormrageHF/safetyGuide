<template>
  <div>
    <!-- 地铁信息 -->
    <div class="content_box">
      <div
        class="traffic_content"
        v-for="(subWay, index) in SubWayDatas"
        :key="subWay.Id"
      >
        <div class="content_item"
        @click="clickSubway(subWay, index + 1)"
        :class="{ actived: subWay.isSelected }">
          <div>
            <span>{{ index + 1 + "." + subWay.Name }}</span>
          <span>{{ subWay.Data }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <van-pagination
      v-if="TotalPage > 1"
      v-model="CurrentPage"
      :total-items="totalNum"
      :show-page-size="pageSize"
      force-ellipses
      @change="pageChange"
    >
      <template #prev-text>
        <van-icon name="arrow-left" />
      </template>
      <template #next-text>
        <van-icon name="arrow" />
      </template>
    </van-pagination>
  </div>
</template>

<script>
export default {
  name: 'ScenicSubway',
  data () {
    return {
      CurrentPage: 1,
      SubWayDatas: [],
      totalNum: 100,
      pageSize: 5,
      TotalPage: 1
    }
  },
  methods: {
    setSubway (data) {
      if (!data) {
        return
      }
      this.SubWayDatas = data.DataList
      this.CurrentPage = data.CurrentPage
      this.totalNum = data.totalNum
      this.TotalPage = data.TotalPage
    },
    pageChange (page) {
      this.$emit('page-change', page)
    },
    clickSubway (subWay, index) {
      this.$emit('click-subway', { subWay, index })
      // this.setUnSelected();
      subWay.isSelected = true
      this.$forceUpdate()
    },
    // 设置全部未选中
    setUnSelected () {
      if (this.SubWayDatas) {
        this.SubWayDatas.forEach((item) => {
          item.isSelected = false
        })
      }
    }
  }
}
</script>

<style scoped>
.traffic_content {
  margin-top: 10px;
}
.traffic_content > div:nth-child(1) {
  /* padding-top: 5px; */
  font-size: 12px;
  color: #4d4d4d;
  letter-spacing: 0.75px;
}
.content_box {
  margin-bottom: 20px;
}
.content_item {
  min-height: 20px;
  display: flex;
  align-items: center;
}
.actived {
  color: rgb(1,111,126)!important;
}
</style>
