import instance from "@/api"

// 车辆新增或修改
export function addOrUpdateCar(data) {
  return instance({
      url: '/manager/memberCarRental/addOrUpdate',
      method: 'POST',
      data
  })
}

// 车辆列表
export function getCarList(data) {
  return instance({
      url: '/manager/memberCarRental/list',
      method: 'POST',
      data
  })
}

// 车辆详情
export function getCarDetail(params) {
  return instance({
      url: `/manager/memberCarRental/detail`,
      method: 'GET',
      params
  })
}

// 车辆删除
export function removeCar(params) {
  return instance({
      url: `/manager/memberCarRental/delete`,
      method: 'GET',
      params
  })
}