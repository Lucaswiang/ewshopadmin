import request from "@/utils/request";

/**
 * @description: 首页统计
 * @param params
 */
export function index(params: any) {
    return request(
        {
            url: '/api/admin/index',
            method: 'GET',
            params,
        }
    );
}