import instance from "@/api";

// 新增产品模板
export function carSubscribeTemplateAdd(data) {
    return instance({
        url: '/manager/carSubscribeTemplate/add',
        method: 'POST',
        data
    })
}

// 修改产品模板
export function carSubscribeTemplateUpdate(data) {
    return instance({
        url: '/manager/carSubscribeTemplate/update',
        method: 'PUT',
        data
    })
}

// 查询指定类型的金融方案
export function selectFinancialSchemeByType(params) {
    return instance({
        url: '/manager/carSubscribeTemplate/selectFinancialSchemeByType',
        method: 'GET',
        params
    })
}