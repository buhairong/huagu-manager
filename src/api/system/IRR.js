import instance from "@/api"

// 查询IRR利率
export function selectLastIRRRecord() {
    return instance({
        url: '/manager/carIrrConfigManage/carIss/selectLastRecord',
        method: 'GET',
    })
}

// 更新IRR利率
export function updateIRR(data) {
    return instance({
        url: '/manager/carIrrConfigManage/carIss/addIssConfig',
        method: 'POST',
        data
    })
}

// IRR利率历史查询
export function selectIRRHistory(params) {
    return instance({
        url: '/manager/carIrrConfigManage/carIss/selectListRecord',
        method: 'GET',
        params
    })
}