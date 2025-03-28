import instance from "@/api"

// 查询筛选条件
export function selectSubscribeFinancialScheme(data) {
    return instance({
        url: '/manager/financialManager/listBySubscribeFinancialScheme',
        method: 'POST',
        data
    })
}

// 删除方案
export function deleteSubscribeFinancialScheme(data) {
    return instance({
        url: '/manager/financialManager/deleteSubscribeFinancialScheme',
        method: 'POST',
        data
    })
}

// 创建金融方案
export function createSubscribeFinancialScheme(data) {
    return instance({
        url: '/manager/financialManager/createSubscribeFinancialScheme',
        method: 'POST',
        data
    })
}

// 修改金融方案
export function updateSubscribeFinancialScheme(data) {
    return instance({
        url: '/manager/financialManager/updateSubscribeFinancialScheme',
        method: 'POST',
        data
    })
}

// 金融方案详情
export function detailSubscribeFinancialScheme(params) {
    return instance({
        url: '/manager/financialManager/detailSubscribeFinancialScheme',
        method: 'GET',
        params
    })
}

// 获取开放品牌
export function getCarBrand() {
    return instance({
        url: '/manager/financialManager/getCarBrand',
        method: 'POST',
    })
}

// 获取开放城市
export function getCity() {
    return instance({
        url: '/manager/financialManager/city/getAll',
        method: 'GET',
    })
}
