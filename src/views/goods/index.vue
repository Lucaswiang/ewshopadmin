<template>
  <div>
     <div class="h-24 w-full bg-white p-3 mb-6">
        <div>
            <span class="text-slate-400 pr-1">首页</span> / <span class="pl-1">商品管理</span>
            <div class="pt-3 text-xl text-black font-medium">
              商品管理
            </div>
        </div>
     </div>
    <div class="content px-4">
        <div class="bg-white pt-4 pr-6">
          <n-form
              ref="formRef"
              inline
              :label-width="80"
              :model="formSearch"
              label-placement="left"
          >
            <n-form-item label="商品名称" path="name">
              <n-input v-model:value="formSearch.title" placeholder="输入商品名称" />
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
            <span>商品列表</span>
            <span class="ml-auto"><NButton type="info" @click="showModal = true" >+ 新建</NButton></span>
          </div>
          <div class="px-4">

            <n-data-table
                :columns="columns"
                :data="data"
                :pagination="pagination"
                :bordered="false"
            />
            <div class="p-4 flex justify-end pr-10">
              <n-pagination v-model:page="page" @update:page="updatePage" :page-count="totalPages" />
            </div>
          </div>
        </div>
        <AddUser :showModal="showModal" @checkShowModal="checkShowModal" @reloadTable="reload"></AddUser>
        <EditUser v-if="showEditModal"  :goods_id="goods_id" :showModal="showEditModal" @checkShowModal="checkEditModal" @reloadTable="reload"></EditUser>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h,ref,onMounted } from 'vue'
import { NButton, useMessage,NImage,NSwitch,useLoadingBar } from 'naive-ui'
import AddUser from './components/AddGoods.vue'
import EditUser from './components/EditGoods.vue'
import { goods } from '@/api/goods'
const page = ref(1)
const message = useMessage()
const data = ref([])
const totalPages = ref(0)
const columns = [
  {
    title: '封面图',
    key: 'cover_url',
    render (row) {
      return h(NImage,{round:false,src:row.cover_url,class:'h-12'})
    }
  },
  {
    title: '商品名称',
    key: 'title'
  },
  {
    title: '价格',
    key: 'price'
  },
  {
    title: '库存',
    key: 'stock'
  },
  {
    title: '销售',
    key: 'sales'
  },
  {
    title: '是否上架',
    key: 'is_on',
    render(row){
      return h(NSwitch,{
        size:'medium',
        color:'#1890ff',
        activeColor:'#52c41a',
        inactiveColor:'#d9d9d9',
        activeValue:1,
        inactiveValue:0,
        value:row.is_locked == 1 ? false : true,
      })
    }
  },
  {
    title: '是否推荐',
    key: 'is_recommend',
    render(row){
      return h(NSwitch,{
        size:'medium',
        color:'#1890ff',
        activeColor:'#52c41a',
        inactiveColor:'#d9d9d9',
        activeValue:1,
        inactiveValue:0,
        value:row.is_locked == 1 ? false : true,
      })
    }
  },
  {
    title: '创建时间',
    key: 'created_at',
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
          goods_id.value = row.id
            showEditModal.value = true
        }
      },'编辑')
    }}
]
const pagination = ref(false as const)
const formSearch = ref({
  title:''
})
// 添加模态框显示状态
const showModal = ref(false)
// 编辑模态框
const showEditModal = ref(false)

const goods_id = ref('')

const checkEditModal = (show:boolean) => {
  showEditModal.value = show
}
const loadingBar = useLoadingBar()

onMounted(()=>{
  getUserList({})
})
const updatePage = (pageNum) => {
  getUserList({
    current:pageNum,
    title:formSearch.value.title
  })
}
const searchSubmit = (e) =>{
  e.preventDefault()
  getUserList({
    title:formSearch.value.title,
    current:1
  })
}
const searchReload = ()=>{
  getUserList({})
  formSearch.value = {
    title:''
  }
}
const getUserList = (params) =>{
  loadingBar.start()
  goods(params).then(goods =>{
    data.value = goods.data
    totalPages.value = goods.meta.pagination.total_pages
    page.value = goods.meta.pagination.current_page
    loadingBar.finish()
  }).catch(err=>{
    loadingBar.error()
  })
}
const checkShowModal = (status)=>{
  showModal.value = status
}
const reload = ()=>{
  getUserList({
    current:page.value,
    title:formSearch.value.title
  })
}
</script>

<style scoped>

</style>