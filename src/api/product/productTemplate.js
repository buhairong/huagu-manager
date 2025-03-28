import instance from "@/api";

// 查询分页数据
export function listByPage(data) {
    return instance({
        url: '/manager/carSubscribeTemplate/listByPage',
        method: 'POST',
        data
    })
}

// 启用、停用模板
export function carSubscribeTemplateEnable(data) {
    return instance({
        url: '/manager/carSubscribeTemplate/enable',
        method: 'PUT',
        data
    })
}

// 删除产品模板
export function carSubscribeTemplateDelete(data) {
    return instance({
        url: '/manager/carSubscribeTemplate/delete',
        method: 'POST',
        data
    })
}