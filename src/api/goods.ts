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
/**
 * 添加商品
 */
export  function addGoods(data) {
    return request(
        {
            url: '/api/admin/goods',
            method: 'POST',
            data,
        }
    );
}
/**
 * 商品详情
 */
export  function getGoodsInfo(goodsid) {
    return request(
        {
            url: `/api/admin/goods/${goodsid}`,
            method: 'GET',
        }
    );
}
/**
 * 修改商品
 */
export  function updateGoods(good, data) {
    return request(
        {
            url: `/api/admin/goods/${good}`,
            method: 'PUT',
            data
        }
    );
}