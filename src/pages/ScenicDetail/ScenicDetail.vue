<template>
  <div>
    <van-nav-bar
      :title="ScenicName"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="mapBox">
      <div id="mapScenic"></div>
    </div>
    <div class="tabs_box">
      <van-tabs
        v-model="active"
        @click="tabClick"
        color="#016f7e"
        line-width="82"
        line-height="4"
        title-active-color="#4d4d4d"
        title-inactive-color="#808080"
        sticky
      >
        <van-tab>
          <template #title>
            <span class="tabTitle">景区信息</span>
          </template>
          <ScenicInfo
            ref="ScenicInfoRef"
            @get-bus-page="GetBusWithPage"
            @get-park-page="GetParkWithPage"
            @get-Subway-page="GetSubwayWithPage"
            @select-bus="selectBus"
            @select-park="selectPark"
            @select-subway="selectSubway"
          ></ScenicInfo>
        </van-tab>
        <van-tab>
          <template #title>
            <span class="tabTitle">周边情况</span>
          </template>
          <ScenicAround
            ref="ScenicAroundRef"
            @select-medical="selectMedical"
          ></ScenicAround>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import ScenicInfo from './ScenicInfo/ScenicInfo'
import ScenicAround from './ScenicAround/ScenicAround'
import {
  GetScenicDetail,
  GetBusDataByPage,
  GetParkDataByPage,
  GetSubwayDataByPage,
  GetMedicalData
} from '../../api/index'
import Vue from 'vue'
import { Toast } from 'vant'

import AMap from 'AMap'

Vue.use(Toast) // 引入高德地图

export default {
  name: 'ScenicDetail',
  data () {
    return {
      scenicid: localStorage.scenicId || '',
      scenicData: null,
      sMap: null, // 高德
      active: 0,
      PlaceSearch: null,
      medicalMaker: null, // 医疗机构maker
      scenicMarker: null, // 景区 marker
      buses: [],
      parks: [],
      metros: [],
      busMakers: [],
      parkMakers: [],
      metroMakers: [],
      MedicalDatas: [], // 周边医疗机构
      selectScenicMarker: null, // 点击景区信息显示marker
      ScenicName: this.$route.params.name || ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    tabClick (name) {
      // console.log(name);
      // 周边
      const that = this
      if (name === 1) {
        setTimeout(() => {
          that.$refs.ScenicAroundRef.MedicalDatas = that.MedicalDatas
          that.$refs.ScenicAroundRef.setUnSelected()
        }, 300)
      } else {
        setTimeout(() => {
          that.$refs.ScenicInfoRef.sourceData = that.scenicData
          // 回到景点中心
          that.sMap.setCenter(that.scenicMarker.getPosition())
        }, 300)
      }
    },
    // 详情接口
    async GetScenicDetailAsync () {
      const that = this
      const r = await GetScenicDetail({
        scenicid: that.scenicid
      })
      if (r.code === 1) {
        console.log(r.data)
        that.scenicData = r.data
        that.$refs.ScenicInfoRef.setScenicInfo(that.scenicData)
        that.createMaker()
      }
    },
    // 创建 maker
    createMaker () {
      const that = this
      // 数据
      const centers = that.scenicData.Center.split(',')
      that.sMap.setCenter(centers)
      // console.log(centers);
      var content =
        '<img class="imgMaker" src=' + that.scenicData.PicLink + '>'
      // 将 Icon 实例添加到 marker 上:
      var marker = new AMap.Marker({
        position: new AMap.LngLat(centers[0], centers[1]),
        offset: new AMap.Pixel(-40, -40),
        // icon: icon, // 添加 Icon 实例
        content: content,
        title: that.scenicData.Name,
        zoom: 13
      })
      that.sMap.add(marker)
      that.scenicMarker = marker
      //
    },
    // 删除 maker
    removeMaker () {},
    // 创建 icon maker
    createIconMaker (data, type) {
      // const that = this;
      const centers = data.Center.split(',')
      let picUrl = require('../../assets/scenic/icon_bus.svg')
      // picUrl = 'http://101.200.177.46:8073/imgs/linshi/icon_bus.svg';
      if (type === 'park') {
        picUrl = require('../../assets/scenic/icon_parking.svg')
      } else if (type === 'metro') {
        picUrl = require('../../assets/scenic/icon_metro.svg')
      }
      // console.log(picUrl);

      // // 创建 AMap.Icon 实例：
      // var icon = new AMap.Icon({
      //   size: new AMap.Size(20, 25), // 图标尺寸
      //   image: picUrl, // Icon的图像
      //   // imageOffset: new AMap.Pixel(0, 0), // 图像相对展示区域的偏移量，适于雪碧图等
      //   imageSize: new AMap.Size(20, 25), // 根据所设置的大小拉伸或压缩图片
      // });

      var marker = new AMap.Marker({
        position: new AMap.LngLat(centers[0], centers[1]),
        offset: new AMap.Pixel(-22, -22),
        icon: picUrl, // 添加 Icon 实例
        // content: content,
        // title: that.scenicData.Name,
        zoom: 10
      })

      marker.on('click', () => {
        marker.setLabel({
          content: data.Name,
          direction: 'top',
          offset: new AMap.Pixel(0, -20)
        })
        setTimeout(() => {
          marker.setLabel({
            content: ''
          })
        }, 1000)
      })

      // that.sMap.add(marker);
      return marker
    },
    // 创建 公交车 maker
    createBusMakers (buses) {
      // console.log(buses);
      const that = this
      if (that.busMakers.length) {
        that.sMap.remove(that.busMakers)
      }
      that.busMakers = []
      buses.forEach((bus) => {
        const marker = that.createIconMaker(bus, 'bus')
        that.busMakers.push(marker)
      })
      that.sMap.add(that.busMakers)
    },
    // 停车场 maker
    createParkMakers (parks) {
      const that = this
      if (that.parkMakers.length) {
        that.sMap.remove(that.parkMakers)
      }
      that.parkMakers = []
      parks.forEach((park) => {
        const marker = that.createIconMaker(park, 'park')
        that.parkMakers.push(marker)
      })
      that.sMap.add(that.parkMakers)
    },
    // 地铁 maker
    createMetroMakers (metros) {
      const that = this
      if (that.metroMakers.length) {
        that.sMap.remove(that.metroMakers)
      }
      that.metroMakers = []
      metros.forEach((metro) => {
        const marker = that.createIconMaker(metro, 'metro')
        that.metroMakers.push(marker)
      })
      that.sMap.add(that.metroMakers)
    },
    // 选医疗机构
    selectMedical (medicalInfo) {
      const medical = medicalInfo.medical
      const _index = medicalInfo.index
      const centers = medical.Center.split(',')
      this.createScenicMarker('M' + _index, centers, medical.Name)

      // const that = this;
      // // 根绝医疗名称查地址
      // this.PlaceSearch.search(_name, function (status, result) {
      //   if (result.info === "OK") {
      //     result.poiList.pois.forEach(function (item) {
      //       const location = item.location;
      //       const lat = location.lat;
      //       const lng = location.lng;
      //       that.createMedicalMaker(lat, lng);
      //     });
      //   } else {
      //     Toast.fail("未查到相关记录");
      //   }
      // });
    },
    createMedicalMaker (lat, lng) {
      const that = this
      const position = [lat, lng]
      that.addMarker(position)
    },
    addMarker (position) {
      if (this.medicalMaker) {
        this.medicalMaker.setMap(null)
        this.medicalMaker = null
      }
      this.medicalMaker = new AMap.Marker({
        // icon: require('../../assets/scenic/icon_hospital.svg'),
        // icon: "../../assets/scenic/icon_hospital.svg",
        // icon: "http://101.200.177.46:8073/imgs/linshi/icon_bus.svg",
        position: position
        // offset: new AMap.Pixel(-13, -30),
      })
      // this.medicalMaker.setMap(this.sMap);
      this.sMap.add(this.medicalMaker)
    },
    // 分页获取公交车
    async GetBusDataByPageAsync (_PageIndex) {
      const that = this
      const r = await GetBusDataByPage({
        scenicid: that.scenicid,
        PageIndex: _PageIndex
      })
      if (r.code === 1) {
        that.$refs.ScenicInfoRef.setBusData(r.data)
        that.buses = r.data.DataList
        // that.createBusMakers(that.buses);
      }
    },
    // 分页获取公交车
    GetBusWithPage (page) {
      this.GetBusDataByPageAsync(page)
    },
    // 分页获停车场
    async GetParkDataByPageAsync (_PageIndex) {
      const that = this
      const r = await GetParkDataByPage({
        scenicid: that.scenicid,
        PageIndex: _PageIndex
      })
      if (r.code === 1) {
        that.$refs.ScenicInfoRef.setParkData(r.data)
        that.parks = r.data.DataList
        // that.createParkMakers(that.parks);
      }
    },
    // 分页获取停车场
    GetParkWithPage (page) {
      this.GetParkDataByPageAsync(page)
    },
    // 分页获取地铁
    async GetSubwayDataByPageAsync (_PageIndex) {
      const that = this
      const r = await GetSubwayDataByPage({
        scenicid: that.scenicid,
        PageIndex: _PageIndex
      })
      if (r.code === 1) {
        that.$refs.ScenicInfoRef.setSubwayData(r.data)
        that.metros = r.data.DataList
        // that.createMetroMakers(that.metros);
      }
    },
    // 分页获取地铁
    GetSubwayWithPage (page) {
      this.GetSubwayDataByPageAsync(page)
    },
    // 获取周边医疗机构
    async GetMedicalDataAsync () {
      const that = this
      const r = await GetMedicalData({
        scenicid: that.scenicid
      })
      if (r.code === 1) {
        //  console.log(r.data);
        that.MedicalDatas = r.data
      }
    },
    // 创建select marker
    createScenicMarker (text, centers, name) {
      // 删除已经有的
      this.selectScenicMarker && this.sMap.remove(this.selectScenicMarker)
      // 点标记显示内容，HTML要素字符串
      // let _src = require("../../assets/scenic/icon_place.svg");
      const _text = text
      var markerContent =
        '' +
        '<div class="custom-content-marker">' +
        '   <div class="marker-text">' + _text + '</div>' +
        '</div>'

      this.selectScenicMarker = new AMap.Marker({
        position: new AMap.LngLat(centers[0], centers[1]),
        offset: new AMap.Pixel(-22, -22),
        content: markerContent,
        title: name,
        zoom: 10
      })
      this.sMap.add(this.selectScenicMarker)
      this.sMap.setCenter(centers)
      // 点击事件
      this.selectScenicMarker.on('click', () => {
        console.log('marker click')
        this.selectScenicMarker.setLabel({
          content: name,
          direction: 'top',
          offset: new AMap.Pixel(0, -20)
        })
        setTimeout(() => {
          this.selectScenicMarker.setLabel({
            content: ''
          })
        }, 2000)
      })
    },
    // 点击公交车
    selectBus (busInfo) {
      // console.log(busInfo);
      const bus = busInfo.bus
      const _index = busInfo.index
      const centers = bus.Center.split(',')
      this.createScenicMarker('B' + _index, centers, bus.Name)
    },
    // 点击停车场
    selectPark (parkInfo) {
      // console.log(parkInfo);
      const park = parkInfo.park
      const _index = parkInfo.index
      const centers = park.Center.split(',')
      this.createScenicMarker('P' + _index, centers, park.Name)
    },
    // 点击停车场
    selectSubway (subwayInfo) {
      // console.log(subwayInfo);
      const subWay = subwayInfo.subWay
      const _index = subwayInfo.index
      const centers = subWay.Center.split(',')
      this.createScenicMarker('S' + _index, centers, subWay.Name)
    }
  },
  mounted () {
    const that = this
    that.GetScenicDetailAsync()
    // 获取第一页的公交车信息
    that.GetBusWithPage(1)
    // 获取第一页停车场信息
    that.GetParkWithPage(1)
    // 获取第一页地铁信息
    that.GetSubwayWithPage(1)
    // 获取周边医疗
    that.GetMedicalDataAsync()
    // 获取高德地图
    that.sMap = new AMap.Map('mapScenic', {
      zoom: 14,
      resizeEnable: true,
      viewMode: '3D'
    })
    // placesearch
    AMap.plugin('AMap.PlaceSearch', function () {
      var autoOptions = {
        city: sessionStorage.cityName,
        citylimit: true,
        map: that.sMap
      }
      that.PlaceSearch = new AMap.PlaceSearch(autoOptions)
    })
  },
  components: {
    ScenicInfo,
    ScenicAround
  }
}
</script>

<style scoped>
#mapScenic {
  width: 100%;
  /* height: calc(100vw * 4 / 3); */
  height: 222px;
  margin: 0 auto;
}
.tabTitle {
  /* font-family: PingFangSC-Semibold; */
  font-size: 20px;
  text-align: justify;
}
.tabs_box {
  /* margin-top: 10px; */
}
</style>
<style>
.imgMaker {
  border-radius: 50%;
  width: 45px;
  height: 45px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  background-color: white;
  padding: 8px;
}
.van-pagination__item--active {
  background-color: #016f7e;
}
.van-pagination__item {
  color: #016f7e;
}
.van-pagination__item--active {
  color: #ffffff;
}
.van-pagination__item:active {
  background-color: #016f7e;
}
.van-tabs__content {
  height: calc(100vh - 222px - 44px - 46px);
  overflow-y: scroll;
}
</style>
<style>
.custom-content-marker {
  position: relative;
  width: 25px;
  height: 34px;
  background-image: url('../../assets/scenic/icon_place.svg');
  background-repeat: no-repeat;
  background-size: 25px 34px;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.marker-text {
  font-size: 12px;
  color: white;
  text-align: center;
  line-height: 15px;
  background-color: transparent;
  margin-bottom: 3px;
}

.van-nav-bar__text, .van-nav-bar .van-icon {
  color: #0e6f7d
}

.van-pagination {
  font-size: 12px;
}
.van-pagination__item {
  height: 30px;
  min-width: 32px;
}
</style>
