import instance from "@/api";

// 活动新增或修改
export function addOrUpdateBusiness(data) {
  return instance({
    url: "/manager/memberBusinessActivity/addOrUpdate",
    method: "POST",
    data,
  });
}

// 活动列表
export function getBusinessList(data) {
  return instance({
    url: "/manager/memberBusinessActivity/listByPage",
    method: "POST",
    data,
  });
}

// 活动详情
export function getBusinessDetail(params) {
  return instance({
    url: `/manager/memberBusinessActivity/detail`,
    method: "GET",
    params,
  });
}

// 活动删除
export function removeBusiness(params) {
  return instance({
    url: `/manager/memberBusinessActivity/delete`,
    method: "GET",
    params,
  });
}

// 活动订单新增或修改
export function addOrUpdateBusinessOrder(data) {
  return instance({
    url: "/manager/memberBusinessActivityOrder/add",
    method: "POST",
    data,
  });
}

// 活动订单详情
export function getBusinessOrderDetail(params) {
  return instance({
    url: `/manager/memberBusinessActivityOrderEntity/detail`,
    method: "GET",
    params,
  });
}

// 活动订单列表
export function getBusinessOrderList(data) {
  return instance({
    url: "/manager/memberBusinessActivityOrderEntity/listByPage",
    method: "POST",
    data,
  });
}

// 取消活动订单
export function removeBusinessOrder(params) {
  return instance({
    url: `/manager/memberBusinessActivityOrder/delete`,
    method: "GET",
    params,
  });
}
