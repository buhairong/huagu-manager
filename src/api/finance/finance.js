import instance from "@/api"

// 查询筛选条件
export function financialSelector(params) {
    return instance({
        url: '/manager/financialManager/financialSelector',
        method: 'GET',
        params
    })
}

// 押金列表查询
export function selectOrderListOfDeposit(data) {
    return instance({
        url: '/manager/financialManager/selectOrderListOfDeposit',
        method: 'POST',
        data
    })
}

// 押金详情
export function selectDepositDetail(params) {
    return instance({
        url: '/manager/financialManager/selectDepositDetail',
        method: 'GET',
        params
    })
}

// 订阅费用列表查询
export function selectOrderListOfSubscribeFee(data) {
    return instance({
        url: '/manager/financialManager/selectOrderListOfSubscribeFee',
        method: 'POST',
        data
    })
}

// 订阅费用详情
export function selectSubscribeFeeDetail(params) {
    return instance({
        url: '/manager/financialManager/selectSubscribeFeeDetail',
        method: 'GET',
        params
    })
}

// 订阅费用及押金流水确认
export function confirmSubscribeAccountDetailOfBank(data) {
    return instance({
        url: '/manager/financialManager/confirmSubscribeAccountDetailOfBank',
        method: 'POST',
        data
    })
}

// 个人返佣列表查询
export function selectBrokerageList(data) {
    return instance({
        url: '/manager/userBrokerageRecord/selectBrokerageListByPage',
        method: 'POST',
        data
    })
}

// 商户返佣列表查询
export function selectBrokerageListOfCompany(data) {
    return instance({
        url: '/manager/userBrokerageRecord/selectBrokerageListOfCompanyByPage',
        method: 'POST',
        data
    })
}

// 更新佣金记录状态
export function updateStatusOfBrokerage(data) {
    return instance({
        url: '/manager/userBrokerageRecord/updateStatusOfBrokerage',
        method: 'POST',
        data
    })
}

// 合伙人返佣列表查询
export function selectPartnerBrokerageList(data) {
    return instance({
        url: '/partner/partner/order/orderSubscribePage',
        method: 'POST',
        data
    })
}

// 合伙人返佣-操作
export function operateSubscribePage(data) {
    return instance({
        url: '/partner/partner/order/operateSubscribePage',
        method: 'POST',
        data
    })
}

// 租车业务租金列表查询
export function selectRentalRentList(data) {
    return instance({
        url: '/manager/financialManager/selectCarRentalOrderListOfSubscribeFee',
        method: 'POST',
        data
    })
}

// 租车业务押金列表查询
export function selectRentalDepositList(data) {
    return instance({
        url: '/manager/financialManager/selectCarRentalOrderListOfDeposit',
        method: 'POST',
        data
    })
}

// 租车业务租金详情
export function selectRentalRentDetail(params) {
    return instance({
        url: '/manager/financialManager/selectSubscribeFeeDetail',
        method: 'GET',
        params
    })
}

// 租车业务押金详情
export function selectRentalDepositDetail(params) {
    return instance({
        url: '/manager/financialManager/selectSubscribeFeeDetail',
        method: 'GET',
        params
    })
}

// 竞拍业务押金列表查询
export function selectAuctionDepositList(data) {
    return instance({
        url: '/manager/selectSecondAuctionOrderListOfSubscribeFee',
        method: 'POST',
        data
    })
}

// 竞拍业务押金详情
export function selectAuctionDepositDetail(params) {
    return instance({
        url: '/manager/selectSecondAuctionOrderDetailOfSubscribeFee',
        method: 'GET',
        params
    })
}

// 竞拍业务充值列表查询
export function selectPageOfAccount(data) {
    return instance({
        url: '/manager/selectPageOfAccount',
        method: 'POST',
        data
    })
}

// 竞拍业务充值详情
export function selectPageOfAccountDetail(params) {
    return instance({
        url: '/manager/selectPageOfAccountDetail',
        method: 'GET',
        params
    })
}