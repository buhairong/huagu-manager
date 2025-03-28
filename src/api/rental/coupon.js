import instance from "@/api";

// 白名单列表
export function getAdminWhiteList() {
  return instance({
    url: `/manager/userAdminWhiteList/list`,
    method: "GET",
  });
}

// 添加白名单
export function addAdminWhiteList(data) {
  return instance({
    url: `/manager/userAdminWhiteList/add`,
    method: "POST",
    data,
  });
}

// 删除白名单
export function delAdminWhiteList(params) {
  return instance({
    url: `/manager/userAdminWhiteList/delete`,
    method: "GET",
    params,
  });
}

// 兑换详情
export function exchangeDetail(params) {
  return instance({
    url: `/manager/userAdminWhiteList/detail`,
    method: "GET",
    params,
  });
}
