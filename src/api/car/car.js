import instance from "@/api"

// 车辆列表
export function carListByPage(data) {
    return instance({
        url: '/manager/carManager/carListByPage',
        method: 'POST',
        data
    })
}

// 车辆列表 查询颜色列表
export function carColorList(params) {
    return instance({
        url: '/manager/carManager/carColorList',
        method: 'GET',
        params
    })
}

// 品牌列表
export function getCarBrand() {
    return instance({
        url: '/manager/carManager/getCarBrand',
        method: 'GET',
    })
}

// 车型系列列表
export function getCarType(data) {
    return instance({
        url: '/manager/carManager/getCarType',
        method: 'POST',
        data
    })
}

// 车型系列年份列表
export function getCarTypeYear(data) {
    return instance({
        url: '/manager/carManager/getCarTypeYear',
        method: 'POST',
        data
    })
}

// 车型配置型号列表
export function listByCarTypeYearId(data) {
    return instance({
        url: '/manager/carManager/listByCarTypeYearId',
        method: 'POST',
        data
    })
}

// 颜色及汽车增配项
export function selectByCarTypeId(params) {
    return instance({
        url: '/manager/carManager/selectByCarTypeId',
        method: 'GET',
        params
    })
}

// 车辆删除
export function deleteCar(data) {
    return instance({
        url: '/manager/carManager/deleteCar',
        method: 'POST',
        data
    })
}

// 获取驾始证信息
export function OCRDrivingLicense(data) {
    return instance({
        url: '/manager/carManager/OCRDrivingLicense',
        method: 'POST',
        data
    })
}

// 保险公司列表
export function listInsuranceCompany() {
    return instance({
        url: '/manager/carManager/listInsuranceCompany',
        method: 'POST',
    })
}

// 车辆新增及修改
export function addOrUpdateCarFinal(data) {
    return instance({
        url: '/manager/carManager/addOrUpdateCarFinal',
        method: 'POST',
        data
    })
}

// 车辆详情
export function selectCarDetailInfo(data) {
    return instance({
        url: '/manager/carManager/selectCarDetailInfo',
        method: 'POST',
        data
    })
}

// 新增或修改过事故记录
export function addAccidentRecord(data) {
    return instance({
        url: '/manager/carAccident/addAccidentRecord',
        method: 'POST',
        data
    })
}

// 事故记录详情
export function selectAccidentRecordDetail(params) {
    return instance({
        url: '/manager/carAccident/selectAccidentRecordDetail',
        method: 'GET',
        params
    })
}

// 删除事故记录详情
export function deleteAccidentRecord(params) {
    return instance({
        url: '/manager/carAccident/deleteAccidentRecord',
        method: 'GET',
        params
    })
}

// 事故记录集合
export function selectAccidentRecordList(params) {
    return instance({
        url: '/manager/carAccident/selectAccidentRecordList',
        method: 'GET',
        params
    })
}

