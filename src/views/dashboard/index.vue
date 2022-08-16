<template>
  <div class="content px-5">
    <div class="mt-5 flex content-between justify-between">
      <n-card style="margin-right: 20px;">
          <n-statistic label="用户数" >
            <span class="text-green-700">742</span>
          </n-statistic>
      </n-card>
      <n-card style="margin-right: 20px;">
        <n-statistic label="商品数" >
          <span class="text-red-700">294</span>
        </n-statistic>
      </n-card>
      <n-card>
        <n-statistic label="订单数" >
          <span class="text-blue-900" d>316</span>
        </n-statistic>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref,onMounted } from 'vue'
import { useLoadingBar } from 'naive-ui'

import { index } from '@/api/index'

const indexStore = index()
console.log(indexStore)
const usersCount = ref([])
const loadingBar = useLoadingBar()

onMounted(()=>{
  getIndex({})
})

const getIndex = (params) =>{
  loadingBar.start()
  index(params).then(index =>{
    goodsCount = index.goods_count;
    console.log(index);

    loadingBar.finish()
  }).catch(err=>{
    loadingBar.error()
  })
}
</script>

<style scoped lang="less">
.n-card {
  //max-width: 310px;

}
</style>