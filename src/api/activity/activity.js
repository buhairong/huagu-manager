import instance from "@/api"

// 查询任务
export function selectActivityTask(params) {
    return instance({
        url: '/manager/activityTask/list',
        method: 'GET',
        params
    })
}

// 更新任务
export function updateActivityTask(data) {
    return instance({
        url: '/manager/activityTask/update',
        method: 'POST',
        data
    })
}
