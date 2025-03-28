import instance from "@/api";

// 查询已经启用的行业
export function listEnable(data) {
    return instance({
        url: '/security/company/type/listEnable',
        method: 'POST',
        data
    })
}

// 查询分页数据
export function listByPage(data) {
    return instance({
        url: '/security/company/listByPage',
        method: 'POST',
        data
    })
}