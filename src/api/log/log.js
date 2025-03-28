import instance from "@/api"

// 查询任务日志条件
export function selectTaskLogCriteria(params) {
    return instance({
        url: '/manager/partnerActivityTask/selectTaskLogCriteria',
        method: 'GET',
        params
    })
}

// 查询任务日志
export function selectLogList(params) {
    return instance({
        url: '/manager/partnerActivityTask/selectTaskLog',
        method: 'GET',
        params
    })
}

// 新增任务日志
export function addLogList(data) {
    return instance({
        url: '/manager/partnerActivityTask/insertTaskLog',
        method: 'POST',
        data
    })
}
