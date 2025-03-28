import instance from "@/api";

// 查询分页数据
export function listByPage(data) {
    return instance({
        url: '/merchant/testDrive/listByPage',
        method: 'POST',
        data
    })
}