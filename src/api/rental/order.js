import instance from "@/api";

// 订单列表
export function getOrderList(data) {
  return instance({
    url: "/manager/memberUserRentalOrder/listByPage",
    method: "POST",
    data,
  });
}

// 审核先租后付
export function examine(params) {
  return instance({
    url: `/manager/memberUserRentalOrder/examine`,
    method: "GET",
    params,
  });
}

// 结束订单
export function endOrder(data) {
  return instance({
    url: "/manager/memberUserRentalOrder/endOrder",
    method: "POST",
    data,
  });
}
