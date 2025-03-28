import instance from "@/api";

// 登录
export function accountLoginNotify(data) {
    return instance({
        //url: '/security/authoriseManager/login/accountLoginNotify',
        url: '/security/authorise/manager/login/accountLoginNotify',
        method: 'POST',
        data
    })
}