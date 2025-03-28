import instance from "@/api"


// 企业列表
export function getEnterpriseList(data) {
  return instance({
      url: '/manager/userCompany/listByPage',
      method: 'POST',
      data
  })
}

// 企业详情
export function getEnterpriseDetail(params) {
  return instance({
      url: `/manager/userCompany/detail`,
      method: 'GET',
      params
  })
}

