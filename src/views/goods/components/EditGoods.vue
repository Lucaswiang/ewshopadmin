<template>
  <n-modal
      v-model:show="props.showModal"
      @update:show="$emit('checkShowModal',false)"
      :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="编辑商品"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
        <span @click="$emit('checkShowModal',false)">X</span>
      </template>
      <n-form v-if="showForm" ref="formRef" :model="model" :rules="rules">
        <n-form-item :span="12" label="分类" path="category_id">
          <n-select
              v-model:value="model.category_id"
              placeholder="请选择分类"
              :options="generalOptions"
          />
        </n-form-item>
        <n-form-item path="title" label="商品名称">
          <n-input v-model:value="model.title" placeholder="请输入商品名称" />
        </n-form-item>
        <n-form-item path="description" label="描述"  >
          <n-input
              v-model:value="model.description"
              type="textarea"
              placeholder="请输入描述"
              :autosize="{
                minRows: 2,
                maxRows: 5
              }"
          />
        </n-form-item>
        <n-form-item path="price" label="价格"  >
          <n-input v-model:value="model.price" type="number" placeholder="请输入价格" />
        </n-form-item>
        <n-form-item path="stock" label="库存"  >
          <n-input v-model:value="model.stock" type="number" placeholder="请输入库存" />
        </n-form-item>
        <n-form-item label="图片上传" path="img">
          <Upload @backKey="backKey"></Upload>
        </n-form-item>
        <Editor @backContent="backContent"></Editor>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button
                  round
                  type="primary"
                  @click="goodsSubmit"
              >
                提交
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </n-card>
  </n-modal>
</template>

<script setup>
import { ref,defineProps,defineEmits,onMounted } from 'vue'
import {addGoods,getGoodsInfo,updateGoods} from "@/api/goods";
import Upload from '@/components/Upload/index.vue';

import {getUserInfo} from "@/api/users";

const props =  defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  goods_id:{
    type: Number,
    default: ''
  }
})

const model = ref({
  category_id: null,
  title: null,
  description: null,
  price: null,
  stock: null,
  cover: null,
  details: null
})
const showForm = ref(false)
const emit = defineEmits(['checkShowModal','shuaxin'])
onMounted(()=>{
  console.log(123123)
  if(props.goods_id){
    getGoodsInfo(props.goods_id).then(res=>{
      model.value.category_id = res.category_id
      model.value.title = res.title
      model.value.description = res.description
      model.value.price = res.price
      model.value.stock = res.stock
      model.value.cover = res.cover
      model.value.details = res.details
      showForm.value = true
    })
  }
})
const rules = {
  category_id: [
    {
      required: true,
      message: '请选择分类'
    }
  ],
  title: [
    {
      required: true,
      message: '请输入商品名称'
    }
  ],
  description: [
    {
      required: true,
      message: '请输入描述'
    }
  ],
  price: [
    {
      required: true,
      message: '请输入价格'
    }
  ],
  stock: [
    {
      required: true,
      message: '请输入库存'
    }
  ],
  cover: [
    {
      required: true,
      message: '请上传图片'
    }
  ],
  url: [
    {
      required: true,
      message: '请输入跳转链接'
    }
  ],
  details: [
    {
      required: true,
      message: '请输入详情'
    }
  ],

}
const formRef = ref()
const goodsSubmit = (e)=>{
  e.preventDefault()
  formRef.value.validate(errors=>{
    if(errors){
      console.log(errors)
    }else{
      // 请求API 添加数据
      updateGoods(props.goods_id,model.value).then(res=>{
        console.log(res)
        window.$message.success('修改成功')
        emit('checkShowModal',false)
        emit('reloadTable')
      })
    }
  })
}
const backKey = (key)=>{
  model.value.img = key
}
</script>

<style scoped>

</style>

