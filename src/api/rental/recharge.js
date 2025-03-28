import instance from "@/api";

// 充值列表
export function getRechargeOrderList(data) {
  return instance({
    url: "/manager/memberUserRechargeOrder/listByPage",
    method: "POST",
    data,
  });
}