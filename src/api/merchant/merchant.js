import instance from "@/api"

// 查询所有城市
export function getAllCity() {
    return instance({
        url: '/manager/company/allCity',
        method: 'GET',
    })
}

// 列表查询
export function selectList(data) {
    return instance({
        url: '/manager/company/company/selectByPage',
        method: 'POST',
        data
    })
}


// 汽车经销商、金融服务商详情
export function getCompanyDetail(params) {
    return instance({
        url: '/manager/company/companyDetail',
        method: 'GET',
        params
    })
}


// OCR识别 营业执照
export function ocrBusinessLicense(data) {
    return instance({
        url: '/manager/company/ocrBusinessLicense',
        method: 'POST',
        data
    })
}

export function ocrBusinessLicenseDetail(data) {
    return instance({
        url: 'app/app/audit/ocrBusinessLicense',
        method: 'POST',
        data
    })
}

// 汽车经销商新增或者修改
export function addCarDealer(data) {
    return instance({
        url: '/manager/company/addCarDealer',
        method: 'POST',
        data
    })
}

// 金融服务商新增或修改
export function addFinancialService(data) {
    return instance({
        url: '/manager/company/company/addFinancialService',
        method: 'POST',
        data
    })
}

// 删除商户
export function deleteMerchant(data) {
    return instance({
        url: '/manager/company/company/delete',
        method: 'POST',
        data
    })
}

// 打开或关闭 展示所有车型
export function updateCompanyFinancial(params) {
    return instance({
        url: '/manager/company/company/updateCompanyFinancial',
        method: 'GET',
        params
    })
}

// 删除装潢
export function deleteDecorate(data) {
    return instance({
        url: '/manager/company/deleteDecorate',
        method: 'POST',
        data
    })
}

// 修改签约方式
export function updateSignWay(data) {
    return instance({
        url: '/manager/company/updateSignWay',
        method: 'POST',
        data
    })
}

// 查询角色
export function selectRole(params) {
    return instance({
        url: '/manager/company/selectRole',
        method: 'GET',
        params
    })
}

// 新增员工
export function addCompanyMember(data) {
    return instance({
        url: '/manager/company/addCompanyMember',
        method: 'POST',
        data
    })
}

// 编辑员工
export function updateCompanyMember(data) {
    return instance({
        url: '/manager/company/updateCompanyMember',
        method: 'POST',
        data
    })
}

// 删除员工
export function deleteCompanyMember(data) {
    return instance({
        url: '/manager/company/deleteCompanyMember',
        method: 'POST',
        data
    })
}
