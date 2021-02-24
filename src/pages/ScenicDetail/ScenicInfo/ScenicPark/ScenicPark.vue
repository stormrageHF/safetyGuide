<template>
  <div>
    <!-- 停车场信息 -->
    <div class="content_box">
      <div
        class="traffic_content"
        v-for="(park,index) in ParkDatas"
        :key="park.Id"
      >
        <div class="content_item"
        @click="clickPark(park,(index+1))"
        :class="{ actived: park.isSelected }">
         <div>
            <span>{{ (index+1) + '.' + park.Name }}</span>
          <span>{{ park.Data }}</span>
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
  name: 'ScenicPark',
  data () {
    return {
      CurrentPage: 1,
      ParkDatas: [],
      totalNum: 100,
      pageSize: 5,
      TotalPage: 1
    }
  },
  methods: {
    setPark (data) {
      if (!data) {
        return
      }
      this.ParkDatas = data.DataList
      this.CurrentPage = data.CurrentPage
      this.totalNum = data.totalNum
      this.TotalPage = data.TotalPage
    },
    pageChange (page) {
      this.$emit('page-change', page)
    },
    clickPark (park, index) {
      this.$emit('click-park', { park, index })
      // this.setUnSelected();
      park.isSelected = true
      this.$forceUpdate()
    },
    // 设置全部未选中
    setUnSelected () {
      if (this.ParkDatas) {
        this.ParkDatas.forEach((item) => {
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
