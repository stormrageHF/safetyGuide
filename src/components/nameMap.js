import Data from "./country_map";

const cloneObj = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default class NameMap {
  getCName;
  constructor() {
    const data = cloneObj(Data.countryMap);
    for (const key in data) {
      const value = data[key];
      data[value] = key;
      delete data[key];
    }
    // console.log(data);
    this.getCName = function name(ns) {
      // console.log('nameMap=====',ns,data[ns],data)
      return data[ns];
    };
  }
}