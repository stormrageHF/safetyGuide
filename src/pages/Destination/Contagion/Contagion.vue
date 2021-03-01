<template>
  <div>
    <div class="contagion_body">
      <!-- 数据层 -->
      <div class="layout_box">
        <!-- 更新时间点 -->
        <div class="s_container">
          <p class="update_time">更新至 {{ contagionDatas.LastTime }}</p>
        </div>
        <!-- 具体疫情数据 -->
        <div class="contagion_data_box">
          <div class="data_item">
            <div class="data_label">现有确诊</div>
            <div class="data_content data_red">
              {{ contagionCityDatas.nowConfirm }}
            </div>
          </div>
          <div class="data_item">
            <div class="data_label">新增确诊</div>
            <div class="data_content data_red">
              {{ contagionCityDatas.Todayconfirm }}
            </div>
          </div>
          <div class="data_item">
            <div class="data_label">累计确诊</div>
            <div class="data_content">{{ contagionCityDatas.confirm }}</div>
          </div>
          <div class="data_item">
            <div class="data_label">累计治愈</div>
            <div class="data_content">{{ contagionCityDatas.heal }}</div>
          </div>
          <div class="data_item">
            <div class="data_label">累计死亡</div>
            <div class="data_content">{{ contagionCityDatas.dead }}</div>
          </div>
        </div>
        <!-- 地图 -->

        <!-- 高德 -->
        <div class="amap_wrapper" id="mapContainer" v-show="this.$ProConfig.TURNONGAODE"></div>

        <!-- echarts -->
        <EchartsMap ref="EchartsMap" v-show="!this.$ProConfig.TURNONGAODE"></EchartsMap>
        
        <!-- <Test></Test> -->

        <div class="oversea_box">
          <img src="../../../assets/pic_diagram.svg" alt="" />
          <div class="path_box">
            <img src="../../../assets/path.svg" alt="" />
            <span class="overseaNum">境外输入 {{ OverseasNum }}</span>
          </div>
        </div>
        <!-- 风险地区 -->
        <div class="risk_box" v-if="showRiskArea">
          <div class="high_risk_box" v-if="highRiskData.length > 0">
            <div class="risk_header">
              <p class="high_risk_title">高风险区</p>
            </div>
            <div class="high_risk_body">
              <div
                class="risk_item"
                v-for="(_hr, index) in highRiskData"
                :key="index"
              >
                <div>
                  <p>
                    {{ _hr.AreaName }}
                  </p>
                </div>
                <div>
                  <div v-for="(_cr, n) in _hr.Communitys" :key="n">
                    <p>{{ n + 1 + "." + _cr }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="middle_risk_box" v-if="middleRiskData.length > 0">
            <div class="risk_header">
              <p class="middle_risk_title">中风险区</p>
            </div>
            <div class="middle_risk_body">
              <div
                class="risk_item"
                v-for="(_hr, index) in middleRiskData"
                :key="index"
              >
                <div>
                  <p>
                    {{ _hr.AreaName }}
                  </p>
                </div>
                <div>
                  <div v-for="(_cr, n) in _hr.Communitys" :key="n">
                    <p>{{ n + 1 + "." + _cr }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 二维码 -->
      <div class="QRCode_box">
        <div>
          <img :src="contagionDatas.HealthImg" alt="" />
        </div>
        <div>
          <p>
            长按并识别二维码<br />关注本地防疫公众号或小程序<br />使用健康码出行
          </p>
        </div>
      </div>
      <!-- 隔离政策二维码 -->
      <div class="QRCode_box">
        <div>
          <img :src="qrcodeImg" alt="" />
        </div>
        <div>
          <p>长按并识别二维码<br />查询春运防疫政策</p>
        </div>
      </div>
      <!-- 防护小贴士 -->
      <div class="layout_box s_container">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="tips_label">以下措施可降低感染冠状病毒的风险:</span>
          </div>
          <div v-for="(o, index) in protectTips" :key="index">
            <div class="tips_item">
              <div>
                <img class="tips_img" :src="tipsImgs[index]" alt="" />
              </div>
              <div class="tips_content">
                <span>{{ o }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <!-- 医院 -->
      <div class="layout_box s_container" style="padding-top: 10px">
        <el-tabs
          class="hospital_tabs"
          v-model="hospitalActiveName"
          @tab-click="hospitalHandleClick"
          stretch
        >
          <el-tab-pane label="核酸检测机构" name="hesuan"> </el-tab-pane>
          <el-tab-pane label="定点收治医院" name="dingdian"> </el-tab-pane>
        </el-tabs>
        <!-- 区 -->
        <div>
          <el-tag
            class="district_tag"
            v-for="(district, index) in districtList"
            :key="district"
            :class="index === 0 ? 'district_tag_active' : ''"
            @click="tagClick(district, $event)"
          >
            {{ district }}
          </el-tag>
        </div>
        <!-- 医院列表 -->
        <div class="hospital_list_box">
          <div
            class="hospital"
            v-for="hospital in hospitals"
            :key="hospital.name"
          >
            <h2 class="hospitalName">{{ hospital.Name }}</h2>
            <p class="hospitalAddress">{{ hospital.Address }}</p>
            <p class="hospitalPhone">{{ hospital.Phone }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GetCovidByProvince,
  GetDetectionHospital,
  GetCovidHospital,
  GetCountys,
} from "../../../api/index";
import AMap from "AMap";
// import Loca from "Loca";
import EchartsMap from "@/components/EchartsMap/EchartsMap";
// import Test from '@/components/Test/Test'

export default {
  name: "Contagion",
  props: ["bs"],
  data() {
    return {
      cityName: "",
      county: "", // 区名
      // 医院列表
      hospitals: [],
      hospitalActiveName: "hesuan",
      // 小贴士
      protectTips: [
        "提早到达机场/火车站，尽量自带笔、颈枕、小毯子。尽量选择靠窗座位，少来回走动，不乱摸公共物品，少进食，戴好口罩。随身携带含有酒精的小型免洗洗手液，消毒湿巾或棉片。",
        "司机与乘客全程戴口罩，加强通风，空调采用外循环。尽量后排落座。",
        "预约进场减少聚集，语音导游设备清洁消毒，减少触摸公共设施和物品。",
        "扫码下单及移动支付减少直接接触。保持距离，减少停留时间，勤通风。",
        "提前预约，必须自备毛巾。尽量和其他人保持1米以上距离，不扎堆锻炼，不闲聊，遵守防疫管理要求。存衣柜用前消毒。",
        "优先使用电子菜单点餐，移送支付结账。使用公筷，分餐饮食，避免进食生的食物，特别是未熟透的肉类。",
        "提前预约购票，分散浏览，避免人群聚集。避免接触可能传播疾病的野生动物。",
        "提前列出购物清单，减少停留时间。尽量自助结账和移动支付。",
        "提前购票，入场戴口罩，保持距离，不饮食。3D眼镜用前消毒。",
        "就近选择医院，提前预约挂号，减少停留时间。减少触摸公共设施和物品。全程佩戴口罩。",
        "用香皂和水洗手，持续至少20秒。当你使用完口罩后，把它扔掉，然后洗手，不要长时间重复使用同一个口罩。满足保暖条件下保持与室外通风。座机电话用前擦拭。",
        "适量锻炼，平衡膳食，规律作息。认真清洗食材，生熟菜板分开。尽量无接触接收快递派送与外卖送餐。对快递包裹先消毒再打开。",
      ],
      // amapManager, // amap 管理
      amap: null, // 高德
      maplayer: null, // 高德 layer
      contagionDatas: {}, // 疫情数据
      contagionCityDatas: {}, // 市区疫情数据
      // 区列表
      districtList: [],
      // 当前是否选中机构
      isDetection: true,
      disProvince: null, // 市图层
      disCountry: null, // 中国图层
      LabelsData: [], // 城市名称数据
      labelsLayer: null, // 城市名称层
      preY: null,
      nowY: null,
      OverseasNum: 0,
      polygons: null,
      tipsImgs: [
        require("../../../assets/contagionTips/icon_tips01.svg"),
        require("../../../assets/contagionTips/icon_tips02.svg"),
        require("../../../assets/contagionTips/icon_tips03.svg"),
        require("../../../assets/contagionTips/icon_tips04.svg"),
        require("../../../assets/contagionTips/icon_tips05.svg"),
        require("../../../assets/contagionTips/icon_tips06.svg"),
        require("../../../assets/contagionTips/icon_tips07.svg"),
        require("../../../assets/contagionTips/icon_tips08.svg"),
        require("../../../assets/contagionTips/icon_tips09.svg"),
        require("../../../assets/contagionTips/icon_tips10.svg"),
        require("../../../assets/contagionTips/icon_tips11.svg"),
        require("../../../assets/contagionTips/icon_tips12.svg"),
      ],
      RiskAreaInfo: null, // 高风险地区
      RiskAreaData: null, // 高风险地区具体数据
      showRiskArea: false,
      highRiskData: [], // 高风险
      middleRiskData: [], // 中风险
      selectRegion: null, // 选中的行政区
      qrcodeImg: require("../../../assets/fangyi.jpg"), // 各地隔离政策链接
    };
  },
  methods: {
    // 获取区县
    async GetCountysAsync() {
      const that = this;
      const r = await GetCountys({
        city: that.cityName,
      });
      if (r.code === 1) {
        that.districtList = [].concat(r.data.Countys);
        that.county = that.districtList[0];
        // console.log(that.districtList);
        // 获取医院列表
        that.GetDetectionHospitalAsync();
      }
    },
    // 获取疫情
    async GetCovidAsync() {
      const that = this;
      const r = await GetCovidByProvince({
        city: that.cityName,
      });
      if (r.code === 1) {
        // console.log(r.data);
        that.contagionDatas = r.data;
        // 获取城市数据
        if (r.data.IsZXS) {
          // 直辖市
          that.contagionCityDatas.adcode = r.data.adcode;
          that.contagionCityDatas.Todayconfirm = r.data.Todayconfirm;
          that.contagionCityDatas.confirm = r.data.confirm;
          that.contagionCityDatas.dead = r.data.dead;
          that.contagionCityDatas.heal = r.data.heal;
          that.contagionCityDatas.nowConfirm = r.data.nowConfirm;
        } else {
          // 非直辖市
          that.contagionCityDatas = r.data.Details.filter((ele) =>
            that.cityName.includes(ele.name)
          )[0];
        }
        // 获取境外输入
        const dedata = that.contagionDatas.Details.find(
          (item) => item.name === "境外输入"
        );
        if (dedata) {
          that.OverseasNum = dedata.nowConfirm;
        }
        // 高风险
        that.RiskAreaInfo = r.data.RiskAreaInfo;
        if (that.RiskAreaInfo.Data.length > 0) {
          that.showRiskArea = true;
          that.highRiskData = [];
          that.middleRiskData = [];
          that.RiskAreaInfo.Data.forEach((area) => {
            if (area.CovidLevel === 2) {
              // 高
              that.highRiskData.push(area);
            } else {
              // 中
              that.middleRiskData.push(area);
            }
          });
        } else {
          that.showRiskArea = false;
          that.RiskAreaInfo = null;
          that.highRiskData = [];
          that.middleRiskData = [];
        }
        // that.drawBoundsByPolygons();

        // // 绘制对应区 暂时先不用
        if (that.$ProConfig.TURNONGAODE) {
          that.drawAllBounds(that.contagionDatas.adcode);
          that.translateDatas();
          that.drawCityLabels();
        }

        that.$refs.EchartsMap.createMap(
          that.contagionDatas.adcode,
          that.contagionDatas.Name.replace(/[省市]/, ""),
          that.contagionDatas.Details
        );

        // 设置城市
        that.setCity();
      }
    },
    // 获取检测结构
    async GetDetectionHospitalAsync() {
      const that = this;
      const r = await GetDetectionHospital({
        city: that.cityName,
        county: that.county,
        // pageIndex: 1,
      });
      if (r.code === 1) {
        // console.log(r.data);
        // that.hospitals = r.data.DataList;
        that.hospitals = r.data;
      }
    },
    // 获取定点医院
    async GetCovidHospitalAsync() {
      const that = this;
      const r = await GetCovidHospital({
        city: that.cityName,
        county: that.county,
        // pageIndex: 1,
      });
      if (r.code === 1) {
        // console.log(r.data);
        // that.hospitals = r.data.DataList;
        that.hospitals = r.data;
      }
    },
    // 检测结构和定点医院
    hospitalHandleClick(tab) {
      if (tab.name === "hesuan") {
        this.isDetection = true;
        this.GetDetectionHospitalAsync();
      } else {
        this.isDetection = false;
        this.GetCovidHospitalAsync();
      }
    },
    // 选择区
    tagClick(district, $event) {
      const districtTags = document.getElementsByClassName("district_tag");
      Array.from(districtTags).map((item) =>
        item.classList.remove("district_tag_active")
      );
      $event.target.classList.add("district_tag_active");
      this.county = district;
      // console.log(this.county);
      if (this.isDetection) {
        this.GetDetectionHospitalAsync();
      } else {
        this.GetCovidHospitalAsync();
      }
    },
    drawAllBounds(adcode) {
      this.drawBounds(adcode);
      // this.maplayer.goto(adcode);
    },
    // 地图绘制区
    drawBounds(adcode) {
      const that = this;
      // 清除图层
      that.disProvince && that.disProvince.setMap(null);

      // 创建省份图层
      // 创建简易行政区函数
      function initPro(code, dep) {
        // 获取内存中已经存在的行政区对象
        const map = that.amap;

        that.disProvince = new AMap.DistrictLayer.Province({
          zIndex: 12,
          adcode: [code],
          depth: dep,
          styles: {
            fill: function (properties) {
              const adcode = properties.adcode;
              return that.getColorByAdcode(adcode);
            },
            "province-stroke": "white",
            "city-stroke": "white", // 中国地级市边界
            "county-stroke": "white", // 中国区县边界
          },
        });

        that.disProvince.setMap(map);
      }

      // details
      if (!that.contagionDatas.IsZXS) {
        initPro(adcode, 1);
      } else {
        initPro(adcode, 2);
      }
      // 绑定touch 事件,只绑定一次
      that.bindClickOnce();
    },
    // 颜色辅助方法
    getColorByAdcode(adcode) {
      const that = this;
      const colors = {};

      if (!colors[adcode]) {
        const ele = that.contagionDatas.Details.find(
          (ele) => ele.adcode == adcode
        );
        if (ele) {
          const color = that.getFillColor(ele.nowConfirm);
          colors[adcode] = color;
        }
      }
      return colors[adcode];
    },
    // 绑定地图点击事件，通过点击事件的坐标获取区的adcode，通过adcode 获取区的确诊人数
    bindClickOnce() {
      const that = this;
      if (that.amap.isBinded) {
        return;
      }

      // 点击事件函数
      function showInfoClick(e) {
        console.log("click 事件 ~~");
        const x = e.lnglat.getLng();
        const y = e.lnglat.getLat();
        // console.log(x,y);
        var lnglatXY = [x, y]; // 地图上所标点的坐标
        // 城市 adcode 和 区数组
        // const adcode = that.contagionDatas.adcode;
        const details = that.contagionDatas.Details;
        // 逆地址编码对象
        const geoCoder = new AMap.Geocoder({
          city: "", // 城市，默认：“全国”
        });
        // 通过坐标获取地址，区adcode
        geoCoder.getAddress(lnglatXY, function (status, result) {
          console.log(status, result);
          if (result.info === "OK") {
            // const _adcode = result.regeocode.addressComponent.adcode;
            const _city = result.regeocode.addressComponent.city;
            const _district = result.regeocode.addressComponent.district;
            // details
            let _address, _n, infoObj;
            // 是否直辖市 同时记录选中的 region
            if (that.contagionDatas.IsZXS) {
              infoObj = details.find((ele) => _district.includes(ele.name));
              that.selectRegion = _district;
            } else {
              infoObj = details.find((ele) => _city.includes(ele.name));
              that.selectRegion = _city;
            }
            // console.log('现在确诊人数：' + n.nowConfirm, "区是:" + n.name);
            if (infoObj) {
              _address = infoObj.name;
              _n = infoObj.nowConfirm;
            }
            if (_address !== undefined && _n !== undefined) {
              // that.$message({
              //   duration: 3000,
              //   message: _address + "现在确诊人数是" + _n,
              // });
              that.$toast(_address + "现在确诊人数是" + _n);
            }
          }
          //
        });
        // 修改选中样式
        const px = e.pixel;
        const select_props = that.disProvince.getDistrictByContainerPos(px);
        // console.log(select_props);
        if (select_props) {
          // 重置行政区样式
          that.disProvince.setStyles({
            "city-stroke": function (props) {
              return props.adcode == select_props.adcode ? "black" : "white";
            },
            "county-stroke": function (props) {
              return props.adcode == select_props.adcode ? "black" : "white";
            },
            fill: function (props) {
              // return props.adcode == select_props.adcode
              //   ? "yellow"
              //   : that.getColorByAdcode(props.adcode);
              return that.getColorByAdcode(props.adcode);
            },
          });
        }
        // 过滤选中的行政区 显示 risk area
        // that.showRiskAreas();
      }
      that.amap.on("click", showInfoClick);
      that.amap.isBinded = true;
    },
    // 获取中国白色图层
    getWhiteCHLayer() {
      this.disCountry = new AMap.DistrictLayer.World({
        zIndex: 10,
        depth: 1,
        styles: {
          "nation-stroke": "#ffffff",
          "coastline-stroke": "#ffffff",
          "province-stroke": "#ffffff",
          fill: function () {
            return "#ffffff";
          },
        },
      });
    },
    // 根据人数获取颜色
    getFillColor(num) {
      num = parseInt(num);
      let color = "#e4e7f3";
      if (num >= 1 && num <= 9) {
        color = "#ffe7b8";
      } else if (num >= 10 && num <= 49) {
        color = "#ffdab3";
      } else if (num >= 10 && num <= 49) {
        color = "#ffdab3";
      } else if (num >= 50 && num <= 99) {
        color = "#ffc89e";
      } else if (num >= 100 && num <= 499) {
        color = "#ffaa80";
      } else if (num >= 500 && num <= 999) {
        color = "#ff7050";
      } else if (num >= 1000 && num <= 9999) {
        color = "#f04141";
      } else if (num >= 10000) {
        color = "#cc1e1e";
      }
      return color;
    },
    getDatas() {
      const that = this;
      // 获取区县
      that.GetCountysAsync();
      // 获取疫情
      that.GetCovidAsync();
    },
    setCity() {
      const that = this;
      if (this.amap) {
        // this.amap.setCity(this.contagionDatas.adcode);
        // // 获取地图显示范围
        // const bounds = this.amap.getBounds();
        // // 限制地图显示范围
        // this.amap.setLimitBounds(bounds);
        // 自适应尺寸
        setTimeout(function () {
          that.amap.setFitView();
        }, 500);
        //
      }
    },
    // polygons
    drawBoundsByPolygons() {
      const that = this;
      let district = null;
      // 加载行政区划插件
      if (!district) {
        // 实例化DistrictSearch
        const opts = {
          subdistrict: 0, // 获取边界不需要返回下级行政区
          extensions: "all", // 返回行政区边界坐标组等具体信息
          level: "district", // 查询行政级别为市
        };
        district = new AMap.DistrictSearch(opts);
      }
      // 行政区查询
      district.setLevel("province");
      district.search(that.contagionDatas.adcode, function (status, result) {
        if (that.polygons) {
          that.amap.remove(that.polygons);
        } // 清除上次结果
        that.polygons = [];
        const bounds = result.districtList[0].boundaries;
        if (bounds) {
          for (let i = 0, l = bounds.length; i < l; i++) {
            // 生成行政区划polygon
            const polygon = new AMap.Polygon({
              strokeWeight: 1,
              path: bounds[i],
              fillOpacity: 0.4,
              fillColor: "#80d8ff",
              strokeColor: "#0091ea",
            });
            that.polygons.push(polygon);
          }
        }
        that.amap.add(that.polygons);
        that.amap.setFitView(that.polygons); // 视口自适应
      });
    },
    // 地理数据转换
    translateDatas() {
      const directions = {
        门头沟区: "left",
        海淀区: "top",
        东城区: "top",
        通州区: "right",
        朝阳区: "right",
        怀柔区: "top",
        北辰区: "top",
        河东区: "right",
        河西区: "bottom",
        河北区: "top",
        红桥区: "left",
        南开区: "left",
        东丽区: "right",
        晋中市: "bottom",
        太原市: "top",
      };

      const that = this;
      that.LabelsData = [];
      // const districts = beijing.districts[0].districts;
      const districts = that.contagionDatas.Details;
      for (let i = 0; i < districts.length; i++) {
        const config = {
          name: "",
          position: [116.12, 39.11],
          zooms: [4, 13],
          zIndex: 1,
          opacity: 1,
          text: {
            content: "",
            direction: "center",
            offset: [0, 0],
            zooms: [3, 20],
            style: {
              fontSize: 8,
              fontWeight: "400",
              fillColor: "black",
            },
          },
        };
        const district = districts[i];
        const name = district.name;
        if (district.adcode === "") {
          continue;
        }
        config.text.content = name;
        config.position = district.Center.split(",");
        // config.position = district.center.split(",");
        if (directions[name]) {
          config.text.direction = directions[name];
        }
        that.LabelsData.push(config);
      }
    },
    // 绘制城市名称
    drawCityLabels() {
      const that = this;
      if (that.labelsLayer) {
        that.amap.remove(that.labelsLayer);
      }
      that.labelsLayer = new AMap.LabelsLayer({
        // 开启标注避让，默认为开启，v1.4.15 新增属性
        collision: false,
        // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
        animation: true,
      });
      for (let i = 0; i < that.LabelsData.length; i++) {
        const labelsMarker = new AMap.LabelMarker(that.LabelsData[i]);
        that.labelsLayer.add(labelsMarker);
        // console.log(that.LabelsData[i].text.content);
      }
      that.amap.add(that.labelsLayer);
    },
    // 刷新 bs
    refreshBS() {
      if (this.bs.refresh) {
        this.bs.refresh();
      }
    },
    // 绘制dislayer
    DrawDistrictLayers() {
      // const that = this;
      // // 绘制 layer
      // that.maplayer = new Loca.DistrictLayer({
      //   fitView: true,
      //   eventSupport: true,
      //   drillDown: false, // 开启鼠标单击下钻功能，前提要求开启 eventSupport 配置来支持鼠标事件
      //   map: that.amap,
      // });
      // that.maplayer.setData({});
      // that.maplayer.setOptions({
      //   mode: "count",
      //   // 是否显示无数据区域，v1.1.1 开始支持
      //   displayBlank: true,
      //   style: {
      //     color: function (data) {
      //       console.log(data);
      //     },
      //     // 无数据区域的颜色填充
      //     blankFill: "#ffffff",
      //     borderColor: "#e6e6e6",
      //     borderWidth: 1,
      //   },
      //   selectStyle: true,
      // });
      // that.maplayer.render();
    },
    // 显示 risk area
    showRiskAreas() {
      this.RiskAreaData = this.RiskAreaInfo.Data.filter((area) =>
        area.AreaName.includes(this.selectRegion)
      );
      // console.log(this.RiskAreaData);
    },
  },
  created() {
    console.log("created ~~");
  },
  mounted() {
    console.log("mounted ~~~");
    // console.log(AMap.DistrictLayer);
    const that = this;
    // 中国白色图层
    // that.getWhiteCHLayer();
    // 获取高德地图
    that.amap = new AMap.Map("mapContainer", {
      doubleClickZoom: false,
      dragEnable: true,
      zoomEnable: true,
      touchZoom: true,
      features: ["bg"],
      viewMode: "3D",
      // zoom: 7,
      resizeEnable: true,
      // layers: [that.disCountry],
    });
    // // map 完成回调
    that.amap.on("complete", function () {
      console.log("地图创建完成");
    });

    // that.DrawDistrictLayers();

    // 获取所在城市
    that.amap.getCity(function (info) {
      console.log(info);
      that.cityName = info.city === "" ? info.province : info.city;
      if (sessionStorage.cityName) {
        // 如果本地有城市名称
        // alert('本地记录城市 - ' + sessionStorage.cityName)
        that.cityName = sessionStorage.cityName;
      }
      that.$emit("get-city", that.cityName);
      // 根据城市获取对应数据
      that.getDatas();
    });

    // const districtTags = document.getElementsByClassName("district_tag");
    // console.log(districtTags);
  },
  updated() {
    console.log("contagion -- updated ~~~");
    this.refreshBS();
  },
  components: {
    EchartsMap,
    // Test,
  },
};
</script>

<style scoped>
.contagion_body {
  background-color: #f7f7f7;
}
.s_container {
  padding: 0 20px;
}
.layout_box {
  margin-bottom: 20px;
  background-color: #ffffff;
}
.update_time {
  font-size: 14px;
  color: #4d4d4d;
  letter-spacing: 0.88px;
  text-align: justify;
}
.contagion_data_box {
  border-top: 1px solid #979797;
  /* border-bottom: 1px solid #979797; */
  color: #4d4d4d;
  text-align: center;
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
}
.data_item {
  margin-top: 20px;
  margin-bottom: 20px;
}
.data_label {
  font-size: 12px;
}
.data_content {
  font-size: 16px;
  letter-spacing: 1px;
  padding-top: 5px;
}
.data_red {
  color: red;
}
.amap_wrapper {
  width: 100%;
  height: calc(100vw);
  margin: 0 auto;
}

.tips_label {
  font-size: 20px;
  color: #4d4d4d;
  text-align: justify;
}
.tips_text {
  font-size: 14px;
  color: #4d4d4d;
  padding-left: 24px;
  position: relative;
}
.tips_text::before {
  position: absolute;
  content: "";
  width: 12px;
  height: 12px;
  background-color: #016f7e;
  top: 4px;
  left: 0px;
  border-radius: 50%;
}
.hospitalName {
  font-size: 16px;
  color: #4d4d4d;
  text-align: justify;
  margin-block-start: 0;
  margin-block-end: 0;
  font-weight: 400;
}
.hospitalAddress,
.hospitalPhone {
  font-size: 14px;
  color: #4d4d4d;
  text-align: justify;
  line-height: 24px;
  margin-block-start: 0;
  margin-block-end: 0;
}
.hospitalPhone {
  line-height: 18px;
}
.hospital {
  /* border-bottom: 1px solid #4d4d4d; */
  /* border-bottom: 1px solid #e6e6e6; */
  padding: 8px 0;
}
.hospital_list_box {
  padding-top: 10px;
}
.tips_item {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 15px 0;
}
.tips_content {
  padding-left: 20px;
  font-size: 14px;
  color: #4d4d4d;
  text-align: left;
}
.QRCode_box {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  margin-bottom: 20px;
}
.QRCode_box img {
  height: 80px;
  width: 80px;
}
.QRCode_box p {
  /* margin-left: 15px; */
  white-space: nowrap;
  color: #4d4d4d;
  min-width: 210px;
}
.risk_box {
  font-size: 12px;
  letter-spacing: 0.69px;
  color: #4d4d4d;
  padding: 20px;
  background-color: #ffffff;
}
.high_risk_box {
  min-height: 70px;
  background-color: #ffe7ea;
  padding: 8px;
}
.high_risk_title {
  color: #ff2a45;
}
.middle_risk_title {
  color: #ffaf34;
}
.middle_risk_box {
  min-height: 70px;
  background-color: #fff7ea;
  padding: 8px;
}
</style>
<style>
.amap-logo,
.amap-copyright {
  display: none !important;
  visibility: hidden !important;
}
.el-card,
.el-card__header,
.el-card__body {
  border-color: transparent;
  padding: 0px;
}
.el-card {
  padding-top: 20px;
}
</style>

<style>
.el-tag {
  background: #f3f3f3;
  font-size: 16px;
  color: #4d4d4d;
  letter-spacing: 0.3px;
  line-height: 31.5px;
  border-color: white;
  border-radius: 0px;
}
.district_tag_active {
  background-color: #016f7e;
  color: white;
}
.hospital_tabs {
  padding: 0;
}
.hospital_tabs > .el-tabs__header {
  padding: 0px;
}
.oversea_box {
  text-align: right;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.path_box {
  align-items: center;
  display: flex;
}
.oversea_box img {
  height: 16px;
}
.overseaNum {
  font-size: 12px;
  color: #4d4d4d;
  letter-spacing: 0.75px;
  line-height: 17px;
  padding-left: 8px;
}
</style>
