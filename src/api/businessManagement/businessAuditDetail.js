import instance from "@/api";

// 审核通过
export function companyAudit(data) {
    return instance({
        url: '/security/company/audit',
        method: 'PUT',
        data
    })
}

// 审核未通过
export function companyReject(data) {
    return instance({
        url: '/security/company/reject',
        method: 'PUT',
        data
    })
}