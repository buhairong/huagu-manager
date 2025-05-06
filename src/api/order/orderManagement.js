import instance from "@/api";

// 查询分页数据-商户
export function listByPage(data) {
  return instance({
    url: "/manager/userCarSubscribe/listByPage",
    method: "POST",
    data,
  });
}

// 查询分页数据-金融方
export function listByPageAboutFinancial(data) {
  return instance({
    url: "/manager/userCarSubscribe/listByPage",
    method: "POST",
    data,
  });
}

// 查询分页数据-金融方
export function listBySubscribeFinancialScheme(data) {
  return instance({
    url: "/manager/financialScheme/listBySubscribeFinancialScheme",
    method: "POST",
    data,
  });
}

// 金融方——拒绝订单
export function rejectOrderByFinancial(data) {
  return instance({
    url: "/manager/userCarSubscribe/rejectOrderByFinancial",
    method: "GET",
    params: data,
  });
}

// 金融方——合同签约
export function signingContractByFinancial(data) {
  return instance({
    url: "/manager/userCarSubscribe/signingContractByFinancial",
    method: "GET",
    params: data,
  });
}

// 金融方——确认支付押金
export function confirmDepositPaymentByFinancial(data) {
  return instance({
    url: "/manager/userCarSubscribe/confirmDepositPaymentByFinancial",
    method: "GET",
    params: data,
  });
}

// 获取品牌列表
export function getBrand(data) {
  return instance({
    url: "/merchant/carSubscribe/getCarBrand",
    method: "GET",
    params: data,
  });
}

// 获取车系
export function getCarSeries(data) {
  return instance({
    url: "/merchant/carSubscribe/getCarType",
    method: "POST",
    data,
  });
}

// 获取年款
export function getCarYear(data) {
  return instance({
    url: "/merchant/carSubscribe/getCarTypeYear",
    method: "POST",
    data,
  });
}

// 获取型号
export function getCarModel(data) {
  return instance({
    url: "/merchant/carSubscribe/listByCarTypeYearId",
    method: "POST",
    data,
  });
}

// 订单列表
export function selectListByPage(data) {
  return instance({
    url: "/manager/userCarSubscribe/selectListByPage",
    method: "POST",
    data,
  });
}

// 查询订单可选的交车点集合
export function selectCarDeliveryListOfOrder(params) {
  return instance({
    url: "/manager/userCarSubscribe/selectCarDeliveryListOfOrder",
    method: "GET",
    params,
  });
}

// 订单绑定交车点
export function bindCarDeliveryToOrder(params) {
  return instance({
    url: "/manager/userCarSubscribe/bindCarDeliveryToOrder",
    method: "GET",
    params,
  });
}

// 查询未绑定的车辆集合
export function noBindCarList(params) {
  return instance({
    url: "/manager/carManager/noBindCarList",
    method: "GET",
    params,
  });
}

// 订单绑定选择车辆
export function bindCarToOrder(params) {
  return instance({
    url: "/manager/userCarSubscribe/bindCarToOrder",
    method: "GET",
    params,
  });
}

// 创建车辆并绑定订单
export function createCarAndBindOrder(data) {
  return instance({
    url: "/manager/userCarSubscribe/createCarAndBindOrder",
    method: "POST",
    data,
  });
}

// 设置交车时间
export function updateCarDeliveryTime(data) {
  return instance({
    url: "/manager/userCarSubscribe/updateCarDeliveryTime",
    method: "POST",
    data,
  });
}

// 订单详情
export function selectCarDetailInfo(params) {
  return instance({
    url: "/manager/userCarSubscribe/selectCarDetailInfo",
    method: "GET",
    params,
  });
}

// 创建或更新合同信息
export function createOrUpdateContract(data) {
  return instance({
    url: "/manager/userCarSubscribe/createOrUpdateContract",
    method: "POST",
    data,
  });
}

// 删除合同信息
export function deleteContract(params) {
  return instance({
    url: "/manager/userCarSubscribe/deleteContract",
    method: "GET",
    params,
  });
}

// 修改增配项
export function saveOtherConfig(data) {
  return instance({
    url: "/manager/userCarSubscribe/saveOtherConfig",
    method: "POST",
    data,
  });
}

// OCR解析身份证
export function ocrIdcard(data) {
  return instance({
    url: "/app/app/audit/user/ocrIdcard",
    method: "POST",
    data,
  });
}

// OCR解析驾驶证
export function ocrDrivingLicense(data) {
  return instance({
    url: "/app/app/audit/user/ocrDrivingLicense",
    method: "POST",
    data,
  });
}

// 根据手机号查询是否注册过用户及公司信息
export function selectUserAndCompany(params) {
  return instance({
    url: "/manager/userCarSubscribe/selectUserAndCompany",
    method: "GET",
    params,
  });
}

// 查询限牌城市与价格
export function selectFinanceCityAndPlateMoney(params) {
  return instance({
    url: "/manager/userCarSubscribe/selectFinanceCityAndPlateMoney",
    method: "GET",
    params,
  });
}

// 银行卡支付
export function createBankAccount(data) {
  return instance({
    url: "/app/combinationPayment/createBankAccount",
    method: "POST",
    data,
  });
}

// 添加银行卡支付流水
export function createBankBill(data) {
  return instance({
    url: "/app/combinationPayment/createBankBill",
    method: "POST",
    data,
  });
}

// 创建或修改代下订单
export function insertOrUpdateUserOrder(data) {
  return instance({
    url: "/manager/userCarSubscribe/insertOrUpdateUserOrder",
    method: "POST",
    data,
  });
}

// 查询代下订单详情
export function selectOrderDetail(params) {
  return instance({
    url: "/manager/userCarSubscribe/selectOrderDetail",
    method: "GET",
    params,
  });
}

// 租车订单列表
export function selectRentalOrderList(data) {
  return instance({
    url: "/manager/selectListByPage",
    method: "POST",
    data,
  });
}

// 绑定租车订单车辆
export function bindRentalOrderCar(params) {
  return instance({
    url: "/manager/bindCar",
    method: "GET",
    params,
  });
}

// 设置交车取车人员
export function setPickCarPerson(params) {
  return instance({
    url: "/manager/setCarPerson",
    method: "GET",
    params,
  });
}

// 车损报告详情
export function getVehicleDamageReport(params) {
  return instance({
    url: "/manager/vehicleDamageDetail",
    method: "GET",
    params,
  });
}

// 车损保存
export function insertVehicleDamage(data) {
  return instance({
    url: "/manager/insertVehicleDamage",
    method: "POST",
    data,
  });
}

// 租车订单详情
export function selectRentalOrderDetail(params) {
  return instance({
    url: "/manager/userCarRental/selectDetail",
    method: "GET",
    params,
  });
}

// 创建或更新租车合同信息
export function createOrUpdateRentalContract(data) {
  return instance({
    url: "/manager/createOrUpdateContract",
    method: "POST",
    data,
  });
}

// 删除租车合同信息
export function deleteRentalContract(params) {
  return instance({
    url: "/manager/deleteContract",
    method: "GET",
    params,
  });
}

// 删除新车订阅订单
export function deleteMewCarOrder(params) {
  return instance({
    url: "/manager//userCarSubscribe/deleteCarOrder",
    method: "GET",
    params,
  });
}

// 删除长租订单
export function deleteLongRentalCarOrder(params) {
  return instance({
    url: "/manager/userCarRental/deleteCarOrder",
    method: "GET",
    params,
  });
}
