import instance from "@/api"

// 客户列表
export function getCommunicationRecord(data) {
    return instance({
        url: '/manager/userManager',
        method: 'POST',
        data
    })
}

// 用户意向查询
export function getUserCarIntentionList(params) {
    return instance({
        url: '/manager/partnerActivityTask/userCarIntention/list',
        method: 'GET',
        params
    })
}

// 新增用户线索记录
export function addCommunicationRecord(data) {
    return instance({
        url: '/manager/communicationRecord/add',
        method: 'POST',
        data
    })
}

// 用户线索历史修改记录
export function getCommunicationRecordList(params) {
    return instance({
        url: '/manager/communicationRecord/detailList',
        method: 'GET',
        params
    })
}
