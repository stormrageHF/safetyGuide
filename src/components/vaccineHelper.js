export const addDate = (dd, dadd) => {
  let a = new Date(dd);
  a = a.valueOf();
  a = a + dadd * 24 * 60 * 60 * 1000;
  a = new Date(a);
  return a;
};

export const getDateStrList = (day, hasToday) => {
  let now = new Date();
  if (!hasToday) {
    now.setTime(now.getTime() - 24 * 60 * 60 * 1000);
  }
  const dataTitle = []; //保存获取到的日期
  for (let i = 0; i < day; i++) {
    const month = now.getMonth() + 1;
    let monthStr = `${month}`;
    if (month < 10) {
      monthStr = `0${month}`;
    }
    const day = now.getDate();
    let dayStr = `${day}`;
    if (day < 10) {
      dayStr = `0${day}`;
    }
    dataTitle[i] = `${now.getFullYear()}.${monthStr}.${dayStr}`;
    now = addDate(`${month}/${now.getDate()}/${now.getFullYear()}`, -1);
  }
  const result = dataTitle.reverse();
  return result;
};
export const fileUpNodata = day => { };

export const fixed = (num, count) => {
  let r = 1;
  for (let i = 0; i < count; i++) {
    r = r * 10;
  }
  return Math.round(num * r) / r;
};

export const dataCount = num => {
  if (num < 0 || typeof num === "undefined") {
    return "-";
  } else if (num < 10000) {
    return num;
  } else if (num < 100000000) {
    return fixed(num / 10000, 1);
  } else {
    return fixed(num / 100000000, 1);
  }
};
export const dataUnit = num => {
  if (num < 0 || typeof num === "undefined") {
    return "";
  } else if (num < 10000) {
    return `剂`;
  } else if (num < 100000000) {
    return `万剂`;
  } else {
    return `亿剂`;
  }
};
//获取绘制数据
export const getDrawArray = (countrys, countrysData, day, valueKey) => {
  const timeList = getDateStrList(day, false);
  // console.log("-----timeList", timeList);
  //国家名key+时间key
  const timeKeyCtyObj = {};
  for (const key in countrysData) {
    const oneCountryList = countrysData[key];
    const _tiemKeyObj = {};
    oneCountryList.map(d => {
      // if (d.date > "02.24" || (d.y && Number(d.y) >= 2021)) {
      _tiemKeyObj[`${d.y}.${d.date}`] = d;
      // }
    });
    timeKeyCtyObj[key] = _tiemKeyObj;
  }
  // console.log("timeKeyCtyObj", timeKeyCtyObj);
  const arr = [];
  //循环时间--key：时间
  for (let i = 0; i < timeList.length; i++) {
    //一个时间对应的item
    const time = timeList[i];
    //key:国家，value：数值
    const drawItem = {};
    drawItem.date = time.substring(time.indexOf(".") + 1);
    //循环国家名
    countrys.map(oneCountry => {
      // console.log(oneCountry, timeKeyCtyObj[oneCountry.name], time);
      let value;
      if (timeKeyCtyObj[oneCountry.name][time]) {
        if (!timeKeyCtyObj[oneCountry.name][time][valueKey]) {
          value = -1;
        } else {
          value = timeKeyCtyObj[oneCountry.name][time][valueKey];
        }
      } else {
        value = -1;
      }
      //没有数据，填充前一天
      if (value == -1) {
        //第一天直接是-1；
        if (i == 0) {
          value = 0;
        } else {
          //取前一天
          const day = i - 1;
          const preDayValue = arr[day][oneCountry.name];
          value = preDayValue;
        }
      }
      drawItem[oneCountry.name] = value;
    });
    arr.push(drawItem);
  }
  return arr;
};

export default {
  getDateStrList,
  dataCount,
  dataUnit,
  getDrawArray,
  fixed,
};
