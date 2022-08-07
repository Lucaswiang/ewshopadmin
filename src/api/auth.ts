import request from '@/utils/request';

/**
 * 用户登录
 */
export function login(data:Object) {
    return request(
        {
            url: '/api/auth/login',
            method: 'POST',
            data,
        }
    );
}
/**
 * 用户信息
 */
export function user(){
    return request(
        {
            url: '/api/admin/user',
            method: 'GET',
        }
    );
}
/**
 * 用户退出
 */
export function logout() {
    return request(
        {
            url: '/api/auth/logout',
            method: 'POST',
        }
    );
}