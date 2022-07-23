import {h} from "vue";
import {NIcon} from "naive-ui";
import {Component} from "@vue/runtime-core";

export const renderIcon =  (icon:Component) : Component =>{
    return () => h(NIcon, null, { default: () => h(icon) })
}

/**
 * 递归组装菜单格式
 */
export function generatorMenu(routerMap: Array<any>) {
    // routerMap 按照 sort 排序
    routerMap.sort((a, b) => a.meta.sort - b.meta.sort);
    let result = routerMap.map((item) => {
        // 判断 item.name 是否在 permissions 中 如果不存在跳过
        let menu = {
            label: item?.meta?.title,
            key: item?.name,
            icon: item.meta?.icon,
        }
        if (item.children && item.children.length > 1){
            menu.children = generatorMenu(item.children)
        }else if (item.children && item.children.length === 1){
            menu.key = item?.children[0].name
        }
        return menu
    })
    // 去除result null
    return result
}
/**
 * 判断根路由 Router
 * */
export function isRootRouter(item):Boolean {
    return  item.children?.length === 1;
}
