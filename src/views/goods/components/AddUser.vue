<template>
  <n-modal
      v-model:show="props.showModal"
      @update:show="$emit('checkShowModal',false)"
      :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="添加商品"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
        <span @click="$emit('checkShowModal',false)">X</span>
      </template>
      <n-form  ref="formRef" :model="model" :rules="rules" label-placement="left" label-width="auto"
               require-mark-placement="right-hanging">
        <n-form-item :span="12" label="分类" path="category_id">
          <n-select
              v-model:value="model.category_id"
              placeholder="请选择分类"
              :options="generalOptions"
          />
        </n-form-item>
        <n-form-item label="商品名称" path="title">
          <n-input v-model:value="model.title" placeholder="请输入商品名称" />
        </n-form-item>
        <n-form-item :span="12" label="描述" path="description">
          <n-input
              v-model:value="model.description"
              placeholder="请输入描述"
              type="textarea"
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
        <n-form-item label="图片上传" path="cover">
          <Upload @backKey="backKey"></Upload>
        </n-form-item>

        <Editor @backContent="backContent"></Editor>
        <n-row :gutter="[0, 24]" >
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end;margin-top:10px">
              <n-button
                  round
                  type="primary"
                  @click="userSubmit"
              >
                添加
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </n-card>
  </n-modal>
</template>

<script setup>
import { h, ref,defineProps,defineEmits } from 'vue'
import Editor from '@/components/Editor/index.vue'
const props =  defineProps({
  showModal: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['checkShowModal','shuaxin'])


const model = ref({
  category_id:null,
  title: null,
  description: null,
  price: null,
  stock: null,
  cover: null,
  details: null,

})

const rules = {
  category_id: [
    {
      required: true,
      message: '请输入商品名称'
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
      message: '请输入商品名称'
    }
  ],
  price: [
    {
      required: true,
      message: '请输入商品名称'
    }
  ],
  stock: [
    {
      required: true,
      message: '请输入商品名称'
    }
  ],
  cover: [
    {
      required: true,
      message: '请输入商品名称'
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
const userSubmit = (e)=>{
  console.log(model.value)
}
const backContent = (htmlstring)=>{
  model.value.details = htmlstring
}

const backKey = (key)=>{
  model.value.cover = key
  console.log(key);
}
</script>

<style scoped>

</style>