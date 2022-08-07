import request from "@/utils/request";


/**
 * @description: 用户列表
 * @param params
 */
export function users(params: any) {
    return request(
        {
            url: '/api/admin/users',
            method: 'GET',
            params,
        }
    );
}
/**
 * 新增用户
 */
export  function addUser(data) {
    return request(
        {
            url: '/api/admin/users',
            method: 'POST',
            data,
        }
    );
}
/**
 * 用户详情
 */
export  function getUserInfo(userid) {
    return request(
        {
            url: `/api/admin/users/${userid}`,
            method: 'GET',
        }
    );
}
/**
 * 更新用户信息
 */
export  function updateUser(userid, data) {
    return request(
        {
            url: `/api/admin/users/${userid}`,
            method: 'PUT',
            data
        }
    );
}
/**
 * 禁用和启动
 */
export  function lockUser(userid) {
    return request(
        {
            url: `/api/admin/users/${userid}/lock`,
            method: 'PATCH',
        }
    );
}