import instance from "@/api";

// 开票列表
export function getInvoiceList(data) {
  return instance({
    url: "/manager/userTax/list",
    method: "POST",
    data,
  });
}
