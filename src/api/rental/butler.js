import instance from "@/api";

// 管家新增或修改
export function addOrUpdateButler(data) {
  return instance({
    url: "/manager/memberButler/addOrUpdate",
    method: "POST",
    data,
  });
}

// 管家列表
export function getButlerList(data) {
  return instance({
    url: "/manager/memberButler/listByPage",
    method: "POST",
    data,
  });
}

// 管家详情
export function getButlerDetail(params) {
  return instance({
    url: `/manager/memberButler/detail`,
    method: "GET",
    params,
  });
}

// 管家删除
export function removeButler(params) {
  return instance({
    url: `/manager/memberButler/delete`,
    method: "GET",
    params,
  });
}
