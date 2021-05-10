<template>
  <div>
    <div class="first_table">
      <van-grid :border="false" :column-num="2" :gutter="5">
        <!-- 全球累计接种 -->
        <van-grid-item class="table_type1">
          <div class="table_title">全球累计接种</div>
          <div>
            <span class="table_text">{{
              VaccineData["全球"].total_vaccinations | formatter1
            }}</span
            ><span class="table_text_end">亿剂</span>
          </div>
        </van-grid-item>
        <!-- 全球较上日新增 -->
        <van-grid-item class="table_type1">
          <div class="table_title">全球较上日新增</div>
          <div>
            <span class="table_text">{{
              VaccineData["全球"].new_vaccinations | formatter2
            }}</span
            ><span class="table_text_end">万剂</span>
          </div>
        </van-grid-item>
        <!-- 中国累计接种 -->
        <van-grid-item class="table_type2">
          <div class="table_title">中国累计接种</div>
          <div>
            <span class="table_text">{{
              VaccineData["中国"].total_vaccinations | formatter1
            }}</span
            ><span class="table_text_end">亿剂</span>
          </div>
        </van-grid-item>
        <!-- 中国较上日新增 -->
        <van-grid-item class="table_type2">
          <div class="table_title">中国较上日新增</div>
          <div>
            <span class="table_text">{{
              VaccineData["中国"].new_vaccinations | formatter2
            }}</span
            ><span class="table_text_end">万剂</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 世界地图 -->
    <div class="worldMap">
      <WorldMap ref="worldMap" />
    </div>
    <!-- 各国每百人接种趋势 -->
    <div class="VaccineTrend">
      <div class="section_title">各国每百人接种趋势</div>
      <VaccineTrend />
    </div>
    <!-- 全球各国新冠肺炎疫苗接种情况 -->
    <div class="worldVaccinationStatus">
      <div class="section_title">全球各国新冠肺炎疫苗接种情况</div>

      <el-table
        :data="worldTableData"
        size="mini"
        :stripe="true"
        style="width: 100%"
        header-cell-class-name="cus-table-header-cell"
        cell-class-name="cus-table-cell"
      >
        <el-table-column prop="country" label="国家/地区" min-width="22%">
        </el-table-column>
        <el-table-column prop="total_vaccinations" label="累计" min-width="20%">
          <template slot-scope="{ row }">
            <span>{{ row.total_vaccinations | formatter4 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="total_vaccinations_per_hundred"
          label="每百人"
          min-width="18%"
        >
          <template slot-scope="{ row }">
            <span>{{ row.total_vaccinations_per_hundred | formatter4 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="vaccinations"
          label="疫苗研制单位"
          min-width="24%"
        >
        </el-table-column>
        <el-table-column prop="date" label="时间" min-width="16%">
          <template slot-scope="scope">
            <span>{{ scope.row.date | formatter3 }}</span>
          </template>
        </el-table-column>
      </el-table>

      <div>
        <van-pagination
          v-model="currentPage"
          :total-items="totalNum"
          :items-per-page="pageNums"
          @change="pageChange"
          force-ellipses
        >
          <template #prev-text>
            <van-icon name="arrow-left" />
          </template>
          <template #next-text>
            <van-icon name="arrow" />
          </template>
        </van-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import WorldMap from "@/components/WorldMap/WorldMap";
import VaccineTrend from "@/components/VaccineTrend/VaccineTrend";

import { VaccineTopData, VaccineSituationData } from "@/api/index";

export default {
  name: "LiveData",
  data() {
    return {
      VaccineData: {
        中国: {
          total_vaccinations: 0,
          new_vaccinations: 0,
        },
        全球: {
          total_vaccinations: 0,
          new_vaccinations: 0,
        },
      },
      SituationData: [],
      worldTableData: [],
      currentPage: 1,
      totalNum: 50,
      pageSize: 5,
      pageNums: 10,
    };
  },
  methods: {
    async VaccineTopDataAsync() {
      const that = this;
      const r = await VaccineTopData();
      if (r.code === 1) {
        that.VaccineData = r.data.data.VaccineTopData;
      }
    },
    async VaccineSituationDataAsync() {
      const r = await VaccineSituationData();
      if (r.code === 1) {
        this.SituationData = r.data.data.VaccineSituationData;
        const worldmap = this.$refs.worldMap;
        worldmap.createMap(this.SituationData);
        // 设置分页
        this.totalNum = this.SituationData.length;
        this.pageSize = Math.ceil(this.totalNum / this.pageNums); // 向上取整
        this.worldTableData = this.getWorldTableDatas(this.SituationData);
      }
    },
    getWorldTableDatas(arrays) {
      const arr = [];
      let _num = this.pageNums;
      let _start = this.pageNums * (this.currentPage - 1);
      while (_num && arrays[_start]) {
        // console.log(_start);
        arr.push(arrays[_start]);
        _num--;
        _start++;
      }
      return arr;
    },
    pageChange(current) {
      this.currentPage = current;
      this.worldTableData = this.getWorldTableDatas(this.SituationData);
    },
  },
  created() {
    this.VaccineTopDataAsync();
    this.VaccineSituationDataAsync();
  },
  components: {
    WorldMap,
    VaccineTrend,
  },
  filters: {
    formatter1: function (value) {
      if (value === 0) return "";
      const v = (value / 100000000).toFixed(1);
      return v;
    },
    formatter4: function (value) {
      if (value === 0) return "-";
      let v = 0;
      if (value > 100000000) {
        v = (value / 100000000).toFixed(1) + "亿剂";
      } else if (value >= 10000 && value < 100000000) {
        v = (value / 10000).toFixed(1) + "万剂";
      } else if (value > 0 && value < 10000) {
        v = value + "剂";
      }
      return v;
    },
    formatter2: function (value) {
      if (value === 0) return "";
      const v = (value / 10000).toFixed(1);
      return v;
    },
    formatter3: function (value) {
      if (!value) return "";
      const v = value.substring(5);
      return v;
    },
  },
};
</script>

<style scoped>
.first_table {
  padding: 20px;
}
.table_type1 >>> .van-grid-item__content {
  background-color: rgba(1, 111, 126, 0.05);
}
.table_type2 >>> .van-grid-item__content {
  background-color: rgba(175, 94, 62, 0.09);
}
.first_table .table_title {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
  text-align: justify;
  font-weight: 400;
}
.first_table .table_text {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #016f7e;
  text-align: justify;
  line-height: 33px;
  font-weight: 400;
}
.first_table .table_text_end {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #016f7e;
  text-align: justify;
  line-height: 33px;
  font-weight: 400;
}
.table_type2 .table_text {
  color: #7e0101;
}
.table_type2 .table_text_end {
  color: #7e0101;
}
.worldVaccinationStatus {
  margin: 20px;
}
.section_title {
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #4d4d4d;
  text-align: justify;
  font-weight: 600;
  margin-bottom: 5px;
}
.el-table >>> .cus-table-header-cell {
  text-align: center;
}
.el-table >>> .cus-table-header-cell > .cell {
  padding: 0;
  width: auto;
}
.el-table >>> .cus-table-cell {
  text-align: center;
}
.el-table >>> .cus-table-cell > .cell {
  padding: 0;
}
.VaccineTrend {
  margin: 10px 20px;
}
.van-pagination {
  margin-top: 10px;
}
.van-pagination >>> .van-pagination__item {
  height: 30px;
  width: 30px;
  font-size: 12px;
}
</style>