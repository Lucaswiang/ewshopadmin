import request from "@/utils/request";


/**
 * @description: 订单列表
 * @param params
 */
export function orders(params: any) {
    return request(
        {
            url: '/api/admin/orders',
            method: 'GET',
            params,
        }
    );
}
