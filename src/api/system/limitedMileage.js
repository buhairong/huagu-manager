import instance from "@/api"

// 查询限制里程
export function selectLimitMileageRecord() {
    return instance({
        url: '/manager/carSubscribeLimitMileageRecord/selectLimitMileageRecord',
        method: 'POST',
    })
}

// 更新限制里程
export function updateLimitMileageRecord(data) {
    return instance({
        url: '/manager/carSubscribeLimitMileageRecord/updateLimitMileageRecord',
        method: 'POST',
        data
    })
}