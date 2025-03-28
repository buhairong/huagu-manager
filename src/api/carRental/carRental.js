import instance from "@/api"

// 租车产品列表查询
export function selectCarRentalList(data) {
    return instance({
        url: '/manager/carRental/list',
        method: 'POST',
        data
    })
}

// 创建或修改租车产品
export function setCarRental(data) {
    return instance({
        url: '/manager/carRental/addOrUpdate',
        method: 'POST',
        data
    })
}

// 删除租车产品
export function deleteCarRental(params) {
    return instance({
        url: '/manager/carRental/delete',
        method: 'GET',
        params
    })
}

// 租车产品详情
export function getCarRentalDetail(params) {
    return instance({
        url: '/manager/carRental/detail',
        method: 'GET',
        params
    })
}

// 更新租车产品排序
export function sortCarRental(data) {
    return instance({
        url: '/manager/carRental/updateSort',
        method: 'POST',
        data
    })
}
