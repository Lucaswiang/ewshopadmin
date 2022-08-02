import request from "@/utils/request";


/**
 * @description: 商品列表
 * @param params
 */
export function goods(params: any) {
    return request(
        {
            url: '/api/admin/goods',
            method: 'GET',
            params,
        }
    );
}

export  function addGoods(data) {
    return request(
        {
            url: '/api/admin/goods',
            method: 'POST',
            data,
        }
    );
}

export  function getGoodsInfo(userid) {
    return request(
        {
            url: `/api/admin/goods/${userid}`,
            method: 'GET',
        }
    );
}
export  function updateGoods(good, data) {
    return request(
        {
            url: `/api/admin/goods/${good}`,
            method: 'PUT',
            data
        }
    );
}