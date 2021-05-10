<template>
  <div class="researchBox">
    <div class="research_title">国际疫苗研发进度</div>
    <div class="vaccineTitleBox">
      <div class="vaccineTitleItem">
        <span class="square red"></span>
        <span class="vaccineText">灭活疫苗</span>
      </div>
      <div class="vaccineTitleItem">
        <span class="square green"></span>
        <span class="vaccineText">腺病毒载体疫苗</span>
      </div>
      <div class="vaccineTitleItem">
        <span class="square yellow"></span>
        <span class="vaccineText">核酸疫苗</span>
      </div>
      <div class="vaccineTitleItem">
        <span class="square black"></span>
        <span class="vaccineText">重组蛋白疫苗</span>
      </div>
    </div>
    <div class="researchTable">
      <div class="tableHeader">
        <div class="th thh">研发厂商/疫苗名</div>
        <div class="th thhd">{{ th2 }}</div>
        <div class="th thhd">{{ th3 }}</div>
        <div class="th thhd">{{ th4 }}</div>
        <div class="th thhd">上市</div>
      </div>
      <div class="tableBody">
        <div
          class="tableItem"
          v-for="(item, index) in developDatas"
          :key="item.Name"
          :class="index % 2 === 0 ? 'evenBackground' : ''"
        >
          <div class="companyName">
            <div class="company">{{ item.Name }}</div>
            <div class="drug">{{ item.VaccineName }}</div>
          </div>
          <div class="researchProcess">
            <div
              class="processBar"
              :style="{ width: getWidth(item), backgroundColor: getBarColor(item) }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetVaccineDevelop } from "@/api";

export default {
  name: "Research",
  data() {
    return {
      th2: `临床\nII期`,
      th3: `临床\nII/III期`,
      th4: `临床\nIII期`,
      developDatas: [],
    };
  },
  methods: {
    // 获取研发数据
    async GetVaccineDevelopAsync() {
      const that = this;
      const r = await GetVaccineDevelop({});
      if (r.code === 1) {
        this.developDatas = r.data;
        // console.log(this.developDatas);
      }
    },
    getBarColor(item) {
      const type = item.type
      if (type === 1) {
        return "#FF2A45";
      } else if (type === 2) {
        return "#016F7E";
      } else if (type === 3) {
        return "#FFCA78";
      } else {
        return "#4D4D4D";
      }
    },
    getWidth(item) {
      return item.progress * 25 + '%'
    }
  },
  mounted() {
    this.GetVaccineDevelopAsync();
  },
};
</script>

<style scoped>
.researchBox {
  margin: 5px 20px;
}
.research_title {
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #4d4d4d;
  text-align: justify;
  font-weight: 600;
}
.vaccineTitleBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}
.vaccineTitleItem {
  display: flex;
  align-items: center;
}
.square {
  width: 12px;
  height: 12px;
  display: inline-block;
  margin-right: 2px;
}
.red {
  background-color: #ff2a45;
}
.green {
  background-color: #016f7e;
}
.yellow {
  background-color: #ffca78;
}
.black {
  background-color: #4d4d4d;
}

.vaccineText {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #4d4d4d;
  text-align: justify;
  font-weight: 400;
  display: inline-block;
}
.tableHeader {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tableHeader .th {
  background-color: rgba(1, 111, 126, 0.1);
  font-family: PingFangSC-Semibold;
  font-size: 12px;
  color: #016f7e;
  text-align: center;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  white-space: pre-line;
}
.tableHeader .thh {
  width: 35%;
  height: 40px;
}
.tableHeader .thhd {
  width: 16%;
  height: 40px;
}
.tableBody {
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
.tableBody .companyName {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 35%;
  min-height: 63px;
  padding: 8px;
  box-sizing: border-box;
}
.tableBody .researchProcess {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 64%;
  /* height: 73px; */
}
.companyName .company {
  font-family: PingFangSC-Semibold;
  font-size: 12px;
  color: #4d4d4d;
  text-align: justify;
  font-weight: 600;
}
.companyName .drug {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #7f7f7f;
  text-align: justify;
  font-weight: 400;
}
.tableItem {
  width: 100%;
  /* height: 63px; */
  display: flex;
  justify-content: center;
}
.evenBackground {
  background: #f4fbfd;
}
.processBar {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  /* width: 100%; */
  height: 10px;
  /* background-color: red; */
}
</style>