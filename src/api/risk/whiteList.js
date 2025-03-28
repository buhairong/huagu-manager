import instance from "@/api"

// 风控白名单列表
export function selectRiskWhiteList(data) {
    return instance({
        url: '/manager/riskWhiteList/listByPage',
        method: 'POST',
        data
    })
}

// 添加白名单用户
export function addWhiteUser(data) {
    return instance({
        url: '/manager/riskWhiteList/add',
        method: 'POST',
        data
    })
}

// 修改白名单用户
export function updateWhiteUser(data) {
    return instance({
        url: '/manager/riskWhiteList/update',
        method: 'PUT',
        data
    })
}

// 风控白名单操作历史列表
export function selectHistoryList(params) {
    return instance({
        url: '/manager/riskWhiteList/selectLog',
        method: 'GET',
        params
    })
}
