import instance from "@/api"

// 新增自定义订单
export function addIndividuationOrder(data) {
    return instance({
        url: '/manager/individuationOrder/add',
        method: 'POST',
        data
    })
}

// 修改自定义订单
export function updateIndividuationOrder(data) {
    return instance({
        url: '/manager/individuationOrder/update',
        method: 'POST',
        data
    })
}

// 查询自定义订单
export function selectIndividuationOrder(data) {
    return instance({
        url: '/manager/individuationOrder/listByPage',
        method: 'POST',
        data
    })
}

// 自定义订单详情
export function individuationOrderDetail(params) {
    return instance({
        url: '/manager/individuationOrder/detail',
        method: 'GET',
        params
    })
}

// 删除自定义订单
export function delIndividuationOrder(data) {
    return instance({
        url: '/manager/individuationOrder/delete',
        method: 'POST',
        data
    })
}

// 新增融资租赁订单
export function setCustomerOrder(data) {
    return instance({
        url: '/manager/mananger/userCarFinanceLeaseSubscribe/insertOrUpdate',
        method: 'POST',
        data
    })
}

// 融资租赁订单创建人员列表
export function getRenterOrderCreateUserList() {
    return instance({
        url: '/manager/mananger/userCarFinanceLeaseSubscribe/selectCreatedBy',
        method: 'GET',
    })
}

// 融资租赁订单列表
export function getCustomerOrderList(data) {
    return instance({
        url: '/manager/mananger/userCarFinanceLeaseSubscribe/listByPage',
        method: 'POST',
        data
    })
}

// 删除融资租赁订单
export function delRenterOrder(params) {
    return instance({
        url: '/manager/mananger/userCarFinanceLeaseSubscribe/delete',
        method: 'GET',
        params
    })
}

// 融资租赁订单详情
export function getRenterOrderDetail(params) {
    return instance({
        url: '/manager/mananger/userCarFinanceLeaseSubscribe/detail',
        method: 'GET',
        params
    })
}
