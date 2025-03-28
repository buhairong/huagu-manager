import instance from "@/api"

// 获取限牌城市提交材料信息
export function getPlateCertification(params) {
  return instance({
    url: '/merchant/companyPlateCertificationConfig/getList',
    method: 'GET',
    params
  })
}

// 获取限牌城市车牌价格信息
export function getCarPlatePrice(params) {
  return instance({
    url: '/merchant/carPlatePrice/selectCarPlatePriceByCompanyId',
    method: 'GET',
    params
  })
}

// 保存限牌城市提交材料信息
export function savePlateCertification(data) {
  return instance({
    url: '/merchant/companyPlateCertificationConfig/update',
    method: 'PUT',
    data
  })
}

// 保存限牌城市车牌价格信息
export function saveCarPlatePrice(data) {
  return instance({
    url: '/merchant/carPlatePrice/insertCarPlatePrice',
    method: 'POST',
    data
  })
}