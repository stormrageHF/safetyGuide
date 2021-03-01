<template>
  <div></div>
</template>

<script>
import OffestLabel from "../../../static/GeoJson/offsetLabel";
const _fontSize = 6;

export default {
  name: "EchartsMap",
  data() {
    return {};
  },
  methods: {
    matchNams(geoJson, provName) {
      const ary = geoJson.features;
      let str;
      let matchStr;
      let curItem;
      const offset = new OffestLabel(provName);

      for (let i = 0; i < ary.length; i++) {
        curItem = ary[i].properties;
        str = ary[i].properties.name;
        // str=str.replace('市',"");
        // str=str.replace('地区',"");
        // str=str.replace('自治州',"");
        if (str == "三沙") {
          ary.splice(i, 1);
          // console.log('展示海南三沙市小地图');
          // special();
          continue;
        }

        offset.reset(curItem);
        // curItem.name=short.correct(provName,curItem.name);
      }
      // console.log(geoJson);
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>