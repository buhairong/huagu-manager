import instance from "@/api"

// 角色查询
export function getRoleList() {
  return instance({
      url: '/security/authorise/manager/role/listByPage',
      method: 'GET',
  })
}

// 用户分页查询
export function getUserList(data) {
    return instance({
        url: '/security/authorise/manager/user/listByPage',
        method: 'POST',
        data
    })
}

// 用户新增
export function addUser(data) {
  return instance({
      url: '/security/authorise/manager/user/add',
      method: 'POST',
      data
  })
}

// 用户更新
export function editUser(data) {
  return instance({
    url: '/security/authorise/manager/user/update',
    method: 'PUT',
    data
  })
}

// 转让超级管理员
export function transferMananger(data) {
  return instance({
      url: '/security/authorise/manager/role/transfer',
      method: 'POST',
      data
  })
}

// 用户更新
export function updatePassword(data) {
  return instance({
    url: '/security/authorise/manager/user/updatePassword',
    method: 'PUT',
    data
  })
}

// 用户删除
export function deleteUser(data) {
  return instance({
      url: '/security/authorise/manager/user/delete',
      method: 'POST',
      data
  })
}
