import request from "@/utils/request";


/**
 * @description: 轮播图
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
 * @description: 轮播图
 * @param params
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

export  function getSlideInfo(slideid) {
    return request(
        {
            url: `/api/admin/slides/${slideid}`,
            method: 'GET',
        }
    );
}
export  function updateSlide(slideid, data) {
    return request(
        {
            url: `/api/admin/slides/${slideid}`,
            method: 'PUT',
            data
        }
    );
}

export function seqSlide() {
    return request(
        {
            url: `/api/admin/slides/{slide}/seq`,
            method: 'PATCH'
        }
    )
}