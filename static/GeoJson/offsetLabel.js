import offsetData from "./offsetData.js";
export default class OffestLabel {
  constructor(provName) {
    // console.log("offset:",offsetData);
    const data = offsetData.offset[provName];

    this.reset = item => {
      if (!data) return;
      // console.log(item);
      if (data[item.name] && item.cp) {
        item.cp[0] += data[item.name][0];
        item.cp[1] += data[item.name][1];
      }
      //latitude: 23.7743
      //longitude: 121.381
      if (data[item.name] && item.longitude) {
        // console.log(item);
        item.latitude += data[item.name][0];
        item.longitude += data[item.name][1];
      }
    };
  }
}
