<template>
  <div>
     <div class="h-24 w-full bg-white p-3 mb-6">
        <div>
            <span class="text-slate-400 pr-1">首页</span> / <span class="pl-1">分类列表</span>
            <div class="pt-3 text-xl text-black font-medium">
              分类管理
            </div>
        </div>
     </div>
    <div class="content px-4">
        <div class="mt-4 bg-white">
          <div class="text-xl px-6 py-4 flex ">
            <span>分类列表</span>
            <span class="ml-auto"><NButton type="info" @click="showModal = true" >+ 新建</NButton></span>
          </div>
          <div class="px-6">
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
        <AddSlide :showModal="showModal" @checkShowModal="checkShowModal" @reloadTable="reload"></AddSlide>
        <EditSlide v-if="showEditModal"  :slide_id="slide_id" :showModal="showEditModal" @checkShowModal="checkEditModal" @reloadTable="reload"></EditSlide>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h,ref,onMounted } from 'vue'
import { NButton, useMessage,NImage,NSwitch,useLoadingBar } from 'naive-ui'
import AddSlide from './components/AddSlide.vue'
import EditSlide from './components/EditSlide.vue'
import { slides } from '@/api/slide'
const page = ref(1)
const message = useMessage()
const data = ref([])
const totalPages = ref(0)
const columns = [
  {
    title: '轮播图片',
    key: 'img_url',
    render (row) {
      return h(NImage,{round:false,src:row.img_url,class:'h-12'})
    }
  },
  {
    title: '标题',
    key: 'title'
  },
  {
    title: '跳转链接',
    key: 'url'
  },
  {
    title: '是否禁用',
    key: 'status',
    render(row){
      return h(NSwitch,{
        size:'small',
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
    title: '排序',
    key: 'seq',
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
          slide_id.value = row.id
            showEditModal.value = true
        }
      },'编辑')
    }}
]
const pagination = ref(false as const)

// 添加模态框显示状态
const showModal = ref(false)
// 编辑模态框
const showEditModal = ref(false)

const slide_id = ref('')

const checkEditModal = (show:boolean) => {
  showEditModal.value = show
}
const loadingBar = useLoadingBar()

onMounted(()=>{
  getSlidesList({})
})
const updatePage = (pageNum) => {
  getSlidesList({
    current:pageNum
  })
}


const getSlidesList = (params) =>{
  loadingBar.start()
  slides(params).then(slides =>{
    data.value = slides.data
    totalPages.value = slides.meta.pagination.total_pages
    page.value = slides.meta.pagination.current_page
    loadingBar.finish()
  }).catch(err=>{
    loadingBar.error()
  })
}
const checkShowModal = (status)=>{
  showModal.value = status
}
const reload = ()=>{
  getSlidesList({
    current:page.value
  })
}
</script>

<style scoped>

</style>