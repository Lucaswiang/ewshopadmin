import request from "@/utils/request";


/**
 * @description: 分类列表
 * @param params
 */
export function category(params: any) {
    return request(
        {
            url: '/api/admin/category',
            method: 'GET',
            params,
        }
    );
}
/**
 * 添加分类
 */
export  function addCategory(data) {
    return request(
        {
            url: '/api/admin/category',
            method: 'POST',
            data,
        }
    );
}
/**
 * 分类详情
 */
export  function getCategoryInfo(categoryid) {
    return request(
        {
            url: `/api/admin/users/${categoryid}`,
            method: 'GET',
        }
    );
}
/**
 * 更新分类
 */
export  function updateCategory(categoryid, data) {
    return request(
        {
            url: `/api/admin/category/${categoryid}`,
            method: 'PUT',
            data
        }
    );
}