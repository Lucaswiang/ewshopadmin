<template>
  <div class="content px-5">
    <div class="mt-5 flex content-between justify-between">
      <n-card title="用户数">
        <span class="text-lg font-semibold text-green-700">742</span>
      </n-card>
      <n-card title="商品数">
        <span class="text-lg font-semibold text-red-700">294</span>
      </n-card>
      <n-card title="订单数">
        <span class="text-lg font-semibold text-blue-900">316</span>
      </n-card>
    </div>
  </div>
</template>

<script>
import { index } from '@/api/index'

const indexStore = index()
console.log(indexStore)


</script>

<style scoped lang="less">
.n-card {
  max-width: 310px;

}
</style>