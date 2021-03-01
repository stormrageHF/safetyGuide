<template>
  <div class="around_box">
    <div class="around_item">
      <div class="around_title">周边医疗机构</div>
      <div class="MedicalList">
        <div
          class="medical_item"
          v-for="medical in MedicalDatas"
          :key="medical.type"
        >
          <div class="first_content">
            <div class="med_header">
              <img :src="getIconByType(medical.type)" alt="">
              <span>
                {{ medical.type }}
              </span>
            </div>
            <div class="med_content">
              <div class="med_content_list">
                <div
                  class="med_content_item"
                  :class="{ actived: med.selected }"
                  v-for="(med, index) in medical.datas"
                  :key="med.Id"
                  @click="medicalClick(med, index+1)"
                >
                  <div class="medical_name">
                    {{ (index+1) + '.' + med.Name }}
                  </div>
                  <div class="medical_address">
                    {{ med.Address }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScenicAround',
  data () {
    return {
      MedicalDatas: {}
    }
  },
  methods: {
    // 点击医疗机构
    medicalClick (medical, index) {
      this.setUnSelected()
      medical.selected = true
      this.$forceUpdate()
      this.$emit('select-medical', { medical, index })
    },
    // 设置全部未选中
    setUnSelected () {
      if (this.MedicalDatas) {
        this.MedicalDatas.forEach((medical) => {
          medical.datas.forEach(med => {
            med.selected = false
          })
        })
      }
    },
    // 通过名字获取icon
    getIconByType(type){
      const name = type
      let icon = require('@/assets/scenic/icon_hospital.svg')
      switch (name) {
        case '药房':
          icon = require('@/assets/scenic/icon_drugstore.svg')
          break;
        case '诊所':
          icon = require('@/assets/scenic/icon_clinic.svg')
          break;
        default:
          break;
      }
      return icon
    }
  },
  mounted () {}
}
</script>

<style scoped>
.around_box {
  padding: 20px;
}
.around_title {
  font-size: 16px;
  color: #4d4d4d;
  text-align: justify;
  font-weight: 450;
  margin: 10px 0;
}
.MedicalList {
  font-size: 16px;
  color: #4d4d4d;
  text-align: justify;
  letter-spacing: 0.7;
}
.medical_item {
  padding: 10px 0;
}
.actived {
  color: rgb(1,111,126)!important;
}
.med_header {
  font-size: 16px;
  color: #4d4d4d;
  text-align: justify;
  font-weight: 450;
  margin: 10px 0;
  display: flex;
  align-items: center;
}
.med_header span {
  margin-left: 10px;
}
.med_content_item {
  color: #4d4d4d;
  font-size: 12px;
  margin-top: 10px;
  letter-spacing: 0.75;
}
</style>
