import instance from "@/api"

// 竞拍列表
export function getAuctionList(data) {
    return instance({
        url: '/manager/secondAuction/listByPage',
        method: 'POST',
        data
    })
}

// 竞拍详情
export function getAuctionDetail(params) {
    return instance({
        url: '/manager/secondAuction/detail',
        method: 'GET',
        params
    })
}

// 删除竞拍
export function delAuction(params) {
    return instance({
        url: '/manager/secondAuction/delete',
        method: 'GET',
        params
    })
}

// 修改竞拍状态
export function updateAuctionStatus(params) {
    return instance({
        url: '/manager/secondAuction/updateStatus',
        method: 'GET',
        params
    })
}

// 纠纷列表
export function getDisputesList(data) {
    return instance({
        url: '/manager/biddingDisputes/listByPage',
        method: 'POST',
        data
    })
}

// 竞拍详情
export function getDisputesDetail(params) {
    return instance({
        url: '/manager/biddingDisputes/detail',
        method: 'GET',
        params
    })
}

// 纠纷审核
export function updateDisputesStatus(data) {
    return instance({
        url: '/manager/biddingDisputes/update',
        method: 'POST',
        data
    })
}

// 提现列表
export function selectAuctionCashList(data) {
    return instance({
        url: '/manager/turnoverRecord/listByPage',
        method: 'POST',
        data
    })
}

// 提现审核
export function updateStatusOfAuction(data) {
    return instance({
        url: '/manager/turnoverRecord/update',
        method: 'POST',
        data
    })
}
