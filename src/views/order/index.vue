<template>
  <div>
    <div class="h-24 w-full bg-white p-3 mb-6">
      <div>
        <span class="text-slate-400 pr-1">首页</span> / <span class="pl-1">订单列表</span>
        <div class="pt-3 text-xl text-black font-medium">
          订单管理
        </div>
      </div>
    </div>
    <div class="content px-4">
      <div class="bg-white pt-6 pr-6">
        <n-form
            ref="formRef"
            inline
            :label-width="80"
            :model="formSearch"
            label-placement="left"
        >
          <n-form-item label="单号" path="order_no">
            <n-input v-model:value="formSearch.order_no" placeholder="输入单号" />
          </n-form-item>
          <n-form-item label="支付单号" path="trade_no">
            <n-input v-model:value="formSearch.trade_no" placeholder="请输入支付单号" />
          </n-form-item>

          <n-form-item class="ml-auto">
            <n-button class="mr-4" attr-type="button" @click="searchReload">
              重置
            </n-button>
            <n-button type="info" attr-type="button" @click="searchSubmit">
              搜索
            </n-button>
          </n-form-item>
        </n-form>
      </div>
      <div class="mt-4 bg-white">
        <div class="text-xl px-6 py-4 flex ">
          <span>订单列表</span>
          <span class="ml-auto"><NButton attr-type="button" @click="searchReload">刷新</NButton></span>
        </div>
        <div class="px-4">

          <n-data-table
              :columns="columns"
              :data="data"
              :pagination="pagination"
              :bordered="false"
              row-class-name="rowclass"
          />
          <div class="p-4 flex justify-end pr-10">
            <n-pagination v-model:page="page" @update:page="updatePage" :page-count="totalPages" />
          </div>
        </div>
      </div>
      <Details v-if="showEditModal"  :order_id="order_id" :showModal="showEditModal" @checkShowModal="checkEditModal" @reloadTable="reload"></Details>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h,ref,onMounted } from 'vue'
import { NButton, useMessage,NAvatar,NSwitch,useLoadingBar } from 'naive-ui'
import Details from './components/Details.vue'
import { orders } from '@/api/order'
const page = ref(1)
const message = useMessage()
const data = ref([])
const totalPages = ref(0)
const columns = [
  {
    title: '单号',
    key: 'order_no'
  },
  {
    title: '用户',
    key: 'user_id'
  },
  {
    title: '金额',
    key: 'amount'
  },
  {
    title: '状态',
    key: 'status',
    render(row){
      return h(NSwitch,{
        size:'medium',
        color:'#1890ff',
        activeColor:'#52c41a',
        inactiveColor:'#d9d9d9',
        activeValue:1,
        inactiveValue:0,
        value:row.status == 1 ? false : true,
      })
    }
  },
  {
    title: 'pay_time',
    key: '支付时间'
  },
  {
    title: 'pay_type',
    key: '支付类型'
  },
  {
    title: 'trade_no',
    key: '支付单号'
  },
  {
    title: '操作',
    key: 'created_at',
    render(row){
      return h(NButton,{
        size:'small',
        color:'#1890ff',
        strong:true,
        onClick:()=>{
          order_id.value = row.id
          showEditModal.value = true
        }
      },'详情')
    }}
]
const pagination = ref(false as const)
const formSearch = ref({
  order_no:'',
  trade_no:''

})

const showEditModal = ref(false)

const order_id = ref('')

const checkEditModal = (show:boolean) => {
  showEditModal.value = show
}

const loadingBar = useLoadingBar()

onMounted(()=>{
  getOrderList({})
})
const updatePage = (pageNum) => {
  getOrderList({
    current:pageNum,
    order_no:formSearch.value.order_no,
    trade_no:formSearch.value.trade_no
  })
}
const searchSubmit = (e) =>{
  e.preventDefault()
  getOrderList({
    order_no:formSearch.value.order_no,
    trade_no:formSearch.value.trade_no,
    current:1
  })
}
const searchReload = ()=>{
  getOrderList({})
  formSearch.value = {
    order_no:'',
    trade_no:''
  }
}
const getOrderList = (params) =>{
  loadingBar.start()
  orders(params).then(orders =>{
    data.value = orders.data
    totalPages.value = orders.meta.pagination.total_pages
    page.value = orders.meta.pagination.current_page
    loadingBar.finish()
  }).catch(err=>{
    loadingBar.error()
  })
}

const reload = ()=>{
  getOrderList({
    current:page.value,
    order_no:formSearch.value.order_no,
    trade_no:formSearch.value.trade_no
  })
}
</script>

<style scoped>

</style>