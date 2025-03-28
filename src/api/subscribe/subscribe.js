import instance from "@/api"

// 列表查询
export function selectList(data) {
    return instance({
        url: '/merchant/carSubscribe/selectCarSubscribeByPage',
        method: 'POST',
        data
    })
}

// 修改订阅方案名称
export function updateCarSubscribeName(data) {
    return instance({
        url: '/merchant/carSubscribe/updateCarSubscribeName',
        method: 'POST',
        data
    })
}

// 新车订阅配置详情
export function selectNewCarSubscribeDetail(params) {
    return instance({
        url: '/merchant/carSubscribe/selectNewCarSubscribeDetail',
        method: 'GET',
        params
    })
}

// 二手车订阅配置详情
export function selectCarSubscribeDetail(params) {
    return instance({
        url: '/merchant/carSubscribe/selectCarSubscribeDetail',
        method: 'GET',
        params
    })
}

// 新车订阅查询相符合的金融方案
export function selectFinancialScheme(data) {
    return instance({
        url: '/merchant/carSubscribe/selectFinancialScheme',
        method: 'POST',
        data
    })
}

// 计算购置税
export function calculatePurchaseTaxRatio(params) {
    return instance({
        url: '/merchant/carSubscribe/calculatePurchaseTaxRatio',
        method: 'GET',
        params
    })
}

// 获取所有开放城市
export function getAllCity() {
    return instance({
        url: '/merchant/carSubscribe/city/getAll',
        method: 'GET',
    })
}

// 计算订阅费用
export function selectDepositAndMonthPayOfApportionRate(data) {
    return instance({
        url: '/merchant/carSubscribe/selectDepositAndMonthPayOfApportionRate',
        method: 'POST',
        data
    })
}

// 计算订阅费用（手动设置租金）
export function selectDepositAndMonthPayOfApportionRatePlanTwo(data) {
    return instance({
        url: '/merchant/carSubscribe/selectDepositAndMonthPayOfApportionRatePlanTwo',
        method: 'POST',
        data
    })
}

// 订阅方案删除专属城市
export function deleteCityCarSubscribe(params) {
    return instance({
        url: '/merchant/carSubscribe/deleteCarSubscribeOfCompanyAndCity',
        method: 'GET',
        params
    })
}

// 删除单个订阅方案
export function deleteCarSubscribe(params) {
    return instance({
        url: '/merchant/carSubscribe/deleteCarSubscribe',
        method: 'GET',
        params
    })
}

// 删除订阅方案
export function deleteCarSubscribeByCity(params) {
    return instance({
        url: '/merchant/carSubscribe/deleteCarSubscribeByCity',
        method: 'GET',
        params
    })
}

// 新增修改订阅方案
export function insertCarSubscribe(data) {
    return instance({
        url: '/merchant/carSubscribe/insertCarSubscribe',
        method: 'POST',
        data
    })
}

// 二手车方案查询二手车集合
export function selectSecondHandCarsByMerchant(data) {
    return instance({
        url: '/merchant/carSubscribe/selectSecondHandCarsByMerchant',
        method: 'POST',
        data
    })
}

// 订阅产品定价测算
export function calculate(data) {
    return instance({
        url: '/merchant/carSubscribe/SubscribeCalculate',
        method: 'POST',
        data
    })
}

// 增加订阅排序产品
export function addBusinessSort(data) {
    return instance({
        url: '/merchant/businessSort/add',
        method: 'POST',
        data
    })
}

// 更新订阅排序产品
export function updateBusinessSort(data) {
    return instance({
        url: '/merchant/businessSort/update',
        method: 'POST',
        data
    })
}

// 删除订阅排序产品
export function deleteBusinessSort(params) {
    return instance({
        url: '/merchant/businessSort/delete',
        method: 'GET',
        params
    })
}

// 排序订阅产品
export function sortSubscribe(data) {
    return instance({
        url: '/merchant/businessSort/updateSort',
        method: 'POST',
        data
    })
}

// 新增合伙人订阅推荐产品
export function addSubscribeIsRecommend(params) {
    return instance({
        url: '/merchant/carSubscribe/addSubscribeIsRecommend',
        method: 'GET',
        params
    })
}

// 修改合伙人订阅推荐产品
export function updateSubscribeIsRecommend(params) {
    return instance({
        url: '/merchant/carSubscribe/updateSubscribeIsRecommend',
        method: 'GET',
        params
    })
}

// 删除合伙人订阅推荐产品
export function deleteSubscribeIsRecommend(params) {
    return instance({
        url: '/merchant/carSubscribe/deleteSubscribeIsRecommend',
        method: 'GET',
        params
    })
}
