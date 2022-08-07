import request from "@/utils/request";


/**
 * @description: 轮播图列表
 * @param params
 */
export function slides(params: any) {
    return request(
        {
            url: '/api/admin/slides',
            method: 'GET',
            params,
        }
    );
}
/**
 * 添加轮播图
 */
export function addSlides(data: any) {
    return request(
        {
            url: '/api/admin/slides',
            method: 'POST',
            data,
        }
    );
}
/**
 * 轮播图详情
 */
export  function getSlideInfo(slideid) {
    return request(
        {
            url: `/api/admin/slides/${slideid}`,
            method: 'GET',
        }
    );
}
/**
 * 修改轮播图
 */
export  function updateSlide(slideid, data) {
    return request(
        {
            url: `/api/admin/slides/${slideid}`,
            method: 'PUT',
            data
        }
    );
}
/**
 * 轮播图排序
 */
export function seqSlide(slideid) {
    return request(
        {
            url: `/api/admin/slides/${slideid}/seq`,
            method: 'PATCH'
        }
    )
}