
import ajaxReq from './ajaxReq'

// 获取疫情
export const GetCovid = (data) => {
  return ajaxReq('/Manager/GetCovid', data, 'GET')
}
// 获取省疫情
export const GetCovidByProvince = data => {
  return ajaxReq('/Manager/GetCovidByProvince', data, 'GET')
}
// 获取检测机构
export const GetDetectionHospital = data => {
  return ajaxReq('/Manager/GetDetectionHospital', data, 'POST')
}
// 获取定点医院
export const GetCovidHospital = data => {
  return ajaxReq('/Manager/GetCovidHospital', data, 'POST')
}
// 获取城市图片
export const GetCityFileLink = data => {
  return ajaxReq('/Manager/GetCityFileLink', data, 'GET')
}
// 获取区县
export const GetCountys = data => {
  return ajaxReq('/Manager/GetCountys', data, 'GET')
}
// 获取天气
export const GetWeather = data => {
  return ajaxReq('/Manager/GetWeather', data, 'GET')
}

// 获取省市区
export const GetProvinceAndCity = () => {
  return ajaxReq('/Manager/GetProvinceAndCity', 'GET')
}

// 获取景点列表
export const GetScenicInfo = data => {
  return ajaxReq('/Manager/GetScenicInfo', data, 'GET')
}

// 景点详情
export const GetScenicDetail = data => {
  return ajaxReq('/Manager/GetScenicDetail', data, 'GET')
}

// 分页获取公交车
export const GetBusDataByPage = data => {
  return ajaxReq('/Manager/GetBusDataByPage', data, 'POST')
}

// 分页获取停车场
export const GetParkDataByPage = data => {
  return ajaxReq('/Manager/GetParkDataByPage', data, 'POST')
}

// 分页获取地铁
export const GetSubwayDataByPage = data => {
  return ajaxReq('/Manager/GetSubwayDataByPage', data, 'POST')
}

// 获取周边
export const GetMedicalData = data => {
  return ajaxReq('/Manager/GetMedicalData', data, 'GET')
}

// 获取饮食
export const GetDietInfo = data => {
  return ajaxReq('/Manager/GetDietInfo', data, 'GET')
}

// 获取传染病
export const GetDisease = data => {
  return ajaxReq('/Manager/GetDisease', data, 'GET')
}

// 气候
export const GetClimate = data => {
  return ajaxReq('/Manager/GetClimate', data, 'GET')
}

// 获取risk详情
export const GetScenicRiskDetail = data => {
  return ajaxReq('/Manager/GetScenicRiskDetail', data, 'GET')
}
