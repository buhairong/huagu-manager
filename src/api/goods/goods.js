import instance from "@/api";

// 品牌列表
export function getBrandList(data) {
    return instance({
        url: '/manager/carConfigManage/selectBrandList',
        method: 'POST',
        data
    })
}

// 上传品牌logo
export function updateBrandLogo(data) {
    return instance({
        url: '/manager/carConfigManage/updateBrandLogo',
        method: 'POST',
        data
    })
}

// 车系列表
export function getCarTypeList(params) {
    return instance({
        url: '/manager/carConfigManage/selectCarTypeList',
        method: 'GET',
        params
    })
}

// 上传车辆图片
export function uploadAndUpdateCarImage(data) {
    return instance({
        url: '/manager/carConfigManage/updateCarTypePics',
        method: 'POST',
        data
    })
}

// 设置车系类型
export function setCarSeriesType(data) {
    return instance({
        url: '/manager/carConfigManage/setCarSeriesType',
        method: 'POST',
        data
    })
}

// 开发或关闭车系
export function openOrCloseCarType(data) {
    return instance({
        url: '/manager/carConfigManage/openOrCloseCarType',
        method: 'POST',
        data
    })
}

// 车系列表
export function selectCarTypeYearProductList(params) {
    return instance({
        url: '/manager/carConfigManage/selectCarTypeYearProductList',
        method: 'GET',
        params
    })
}

// 车型详情
export function selectCarTypeYearProduct(params) {
    return instance({
        url: '/manager/carConfigManage/selectCarTypeYearProduct',
        method: 'GET',
        params
    })
}

// 修改车型配置
export function updateCarTypeYearProduct(data) {
    return instance({
        url: '/manager/carConfigManage/updateCarTypeYearProduct',
        method: 'POST',
        data
    })
}

// 获取车型配置选项
export function getCarTypeCondition() {
    return instance({
        url: '/manager/carConfigManage/getCarTypeCondition',
        method: 'POST'
    })
}

// 同步车型
export function syncCarType(data) {
    return instance({
        url: '/manager/carConfigManage/spiderCarInfoToExterior',
        method: 'POST',
        data
    })
}

// 同步车型轮询接口
export function judgeSpiderCarInfoCompleted(params) {
    return instance({
        url: '/manager/carConfigManage/judgeSpiderCarInfoCompleted',
        method: 'GET',
        params
    })
}

// 开发或关闭车型
export function openCarTypeYearAndProduct(data) {
    return instance({
        url: '/manager/carConfigManage/openCarTypeYearAndProduct',
        method: 'POST',
        data
    })
}

// 查询品牌交车点
export function selectCarDeliveryAddressDetail(params) {
    return instance({
        url: '/manager/carConfigManage/selectCarDeliveryAddressDetail',
        method: 'GET',
        params
    })
}

// 交车点新增及修改
export function insertOrUpdateCarDeliveryAddressDetail(data) {
    return instance({
        url: '/manager/carConfigManage/insertOrUpdateCarDeliveryAddressDetail',
        method: 'POST',
        data
    })
}

// 交车点启用或删除
export function deleteCarDeliveryAddressDetail(data) {
    return instance({
        url: '/manager/carConfigManage/deleteCarDeliveryAddressDetail',
        method: 'POST',
        data
    })
}

// 删除交车点人员
export function deleteCarDeliveryUserInfo(params) {
    return instance({
        url: '/manager/carConfigManage/deleteCarDeliveryUserInfo',
        method: 'GET',
        params
    })
}

// 增加交车点人员
export function addCarDeliveryUserInfo(data) {
    return instance({
        url: '/manager/carConfigManage/addCarDeliveryUserInfo',
        method: 'POST',
        data
    })
}

// 更新交车点人员信息
export function updateCarDeliveryUserInfo(data) {
    return instance({
        url: '/manager/carConfigManage/updateCarDeliveryUserInfo',
        method: 'POST',
        data
    })
}

// 单个交车点详情查询
export function selectSingleCarDeliveryAddressDetail(params) {
    return instance({
        url: '/manager/carConfigManage/selectSingleCarDeliveryAddressDetail',
        method: 'GET',
        params
    })
}