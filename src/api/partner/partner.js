import instance from "@/api"

// 合伙人列表查询
export function getPartnerList(data) {
    return instance({
        url: '/manager/partner/listByPage',
        method: 'POST',
        data
    })
}

// 合伙人列表查询
export function getCompanyPartnerList(data) {
    return instance({
        url: '/manager/partnerCompany/listByPage',
        method: 'POST',
        data
    })
}

// 冻结与解冻
export function freezeOrUnfreeze(params) {
    return instance({
        url: '/manager/partner/freezeOrUnfreeze',
        method: 'GET',
        params
    })
}

// 企业冻结与解冻
export function freezeOrUnfreezeForCompany(params) {
    return instance({
        url: '/manager/freezeOrUnfreeze',
        method: 'GET',
        params
    })
}

// 合伙人申请列表查询
export function getPartnerApplyList(data) {
    return instance({
        url: '/manager/partnerApply/listByPage',
        method: 'POST',
        data
    })
}

// 合伙人申请
export function partnerApply(params) {
    return instance({
        url: '/manager/partnerApply/approve',
        method: 'GET',
        params
    })
}

// 创建企业合伙人
export function createCompanyPartner(data) {
    return instance({
        url: '/manager/partnerCompany/add',
        method: 'POST',
        data
    })
}

// 编辑企业合伙人
export function updateCompanyPartner(data) {
    return instance({
        url: '/manager/partnerCompany/update',
        method: 'POST',
        data
    })
}

// 编辑个人合伙人
export function updatePersonPartner(data) {
    return instance({
        url: '/manager/partnerApply/update',
        method: 'PUT',
        data
    })
}

// 编辑合伙人会员权限
export function updateAuthority(data) {
    return instance({
        url: '/manager/partner/updateAuthority',
        method: 'POST',
        data
    })
}

// 个人合伙人详情
export function partnerDetail(params) {
    return instance({
        url: '/manager/partner/detail',
        method: 'GET',
        params
    })
}

// 修改合伙人姓名
export function updatePartnerUserName(params) {
    return instance({
        url: 'manager/updateUserName',
        method: 'GET',
        params
    })
}

// 企业合伙人员工列表
export function getPartnerCompanyUserList(data) {
    return instance({
        url: '/manager/partnerCompanyUser/listByPage',
        method: 'POST',
        data
    })
}

// 新增企业合伙人员工
export function addPartnerCompanyUser(data) {
    return instance({
        url: '/manager/partnerCompanyUser/add',
        method: 'POST',
        data
    })
}

// 更新企业合伙人员工
export function updatePartnerCompanyUser(data) {
    return instance({
        url: '/manager/partnerCompanyUser/update',
        method: 'POST',
        data
    })
}

// 删除企业合伙人员工
export function deletePartnerCompanyUser(data) {
    return instance({
        url: '/manager/partnerCompanyUser/delete',
        method: 'POST',
        data
    })
}

// 公司合伙人邀请员工
export function invitePartnerCompanyUser(params) {
    return instance({
        url: 'app/partner/updateCompanyUser',
        method: 'GET',
        params
    })
}
