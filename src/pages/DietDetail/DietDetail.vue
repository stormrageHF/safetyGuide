<template>
  <div class="Diet_detail">
    <van-nav-bar
      :title="DietDetail.Name"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="header_box">
      <div>
        <div
          class="dietImg"
          :style="{
            backgroundImage: `url(${DietDetail.Img})`,
          }"
        ></div>
        <div class="header_name">{{ DietDetail.Name }}</div>
      </div>
    </div>
    <div class="body_box">
      <div class="symptom_box">
        <div class="Diet_title">简介</div>
        <div class="Diet_content">{{ DietDetail.Describe }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DietDetail',
  data () {
    return {
      DietDetail: {
        Img: '',
        Name: '',
        Describe: ''
      }
    }
  },
  mounted () {
    const str = sessionStorage.getItem('DietDetail') || ''
    const data = JSON.parse(str)
    this.DietDetail.Img = data.Img
    this.DietDetail.Describe = data.Describe
    this.DietDetail.Name = data.Name
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.Diet_detail {
  font-size: 14px;
  color: #4d4d4d;
  text-align: justify;
  background-color: #f5f5f5;
  min-height: 100vh;
}
.Diet_title {
  font-weight: 550;
  font-size: 16px;
}
.header_box {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  text-align: center;
  font-size: 16px;
}
.dietImg {
  border-radius: 50%;
  width: 120px;
  height: 120px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 0 auto;
}
.header_name {
  padding-top: 10px;
}
.symptom_box,
.prevention_box {
  margin-top: 20px;
  background-color: white;
  padding: 20px;
}
.Diet_content {
  margin-top: 20px;
  white-space: pre-line;
}
</style>
<style>
.van-nav-bar__text, .van-nav-bar .van-icon {
  color: #0e6f7d
}
 </style>
