import instance from "@/api"

// 订制方案列表
export function getCustomOrderList(data) {
    return instance({
        url: '/manager/userRequirementRecord/selectUserRequirementRecordList',
        method: 'POST',
        data
    })
}

// 查询订阅周期列表
export function selectPeriodList() {
    return instance({
        url: '/manager/userRequirementRecord/selectPeriodList',
        method: 'GET',
    })
}

// 查询品牌列表
export function selectBrandList() {
    return instance({
        url: '/manager/userRequirementRecord/selectBrandList',
        method: 'GET',
    })
}

// 查询跟进记录
export function selectUserRequirementLogList(params) {
    return instance({
        url: '/manager/userRequirementRecord/selectUserRequirementLogList',
        method: 'GET',
        params
    })
}

// 提交跟进记录
export function addUserRequirementLog(data) {
    return instance({
        url: '/manager/userRequirementRecord/insertUserRequirementLog',
        method: 'POST',
        data
    })
}

// 融资租赁订制方案列表
export function getCustomRentalOrderList(data) {
    return instance({
        url: '/manager/manager/carFinanceLease/listByPage',
        method: 'POST',
        data
    })
}

// 融资租赁订制方案详情
export function getCustomRentalOrderDetail(params) {
    return instance({
        url: '/manager/manager/carFinanceLease/detail',
        method: 'GET',
        params
    })
}

// 提交融资租赁跟进记录
export function addCustomRentalOrderLog(data) {
    return instance({
        url: '/manager/manager/carFinanceLease/addLog',
        method: 'POST',
        data
    })
}