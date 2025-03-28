import instance from "@/api";

// 查询一级菜单
export function findFirstMenus(data) {
    return instance({
        url: '/security/authorise/findFirstMenus',
        method: 'POST',
        data
    })
}

// 查询二级/三级菜单
export function findSecondMenus(data) {
    return instance({
        url: '/security/authorise/findSecondMenus',
        method: 'POST',
        data
    })
}

// // 退出登录接口
// export function quitlogingFn(data) {
//     return instance({
//         url: '/security/authorise/queryUserInfoAndCompanyList',
//         method: 'POST',
//         data
//     })
// }