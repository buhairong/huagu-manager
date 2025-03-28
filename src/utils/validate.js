// 验证正整数
export function validIntegerNum(num) {
  return /^[0-9]*$/.test(num);
}

// 验证手机号码
export function validPhoneNum(num) {
  return /^1[3-9]\d{9}$/.test(num);
}

// 手机号码
export const phoneReg = /^1[3-9]\d{9}$/;
