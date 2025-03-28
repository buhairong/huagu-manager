import instance from "@/api";

// 订单查看详情
export function listByPage(data) {
    return instance({
        url: '/merchant/userCarSubscribe/getOrderInfoByOrderId',
        method: 'POST',
        data
    })
}