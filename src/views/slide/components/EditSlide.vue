<template>
  <n-modal
      v-model:show="props.showModal"
      @update:show="$emit('checkShowModal',false)"
      :mask-closable="true"
  >
    <n-card
        style="width: 600px"
        title="编辑轮播图"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <template #header-extra>
        <span @click="$emit('checkShowModal',false)">X</span>
      </template>
      <n-form v-if="showForm" ref="formRef" :model="model" :rules="rules">
        <n-form-item path="title" label="标题">
          <n-input v-model:value="model.title" placeholder="请输入标题" />
        </n-form-item>
        <n-form-item path="url" label="跳转URL"  >
          <n-input
              v-model:value="model.url"
              type="url"
              placeholder="请输入跳转URL"
          />
        </n-form-item>
        <n-form-item path="seq" label="排序"  >
          <n-input
              v-model:value="model.seq"
              type="number"
              placeholder="请输入排序"
          />
        </n-form-item>
        <n-form-item label="是否启用" path="status">
          <n-radio-group v-model:value="model.status" name="status">
            <n-space>
              <n-radio :value="0">
                否
              </n-radio>
              <n-radio :value="1">
                是
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="图片上传" path="img">
           <Upload @backKey="backKey"></Upload>
        </n-form-item>
        <n-image
            width="100"
            :src="img_url"
        />
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button
                  round
                  type="primary"
                  @click="slideSubmit"
              >
                提交
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
      <n-skeleton v-else text :repeat="5" />
    </n-card>
  </n-modal>
</template>

<script setup>
import { ref,defineProps,defineEmits,onMounted } from 'vue'
import { getSlideInfo,updateSlide } from "@/api/slide";
import Upload from '@/components/Upload/index.vue';

const props =  defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  slide_id:{
    type: Number,
    default: ''
  }
})

const model = ref({
  title: null,
  img: null,
  url: null,
  seq: null,
  status: null
})
const showForm = ref(false)
const emit = defineEmits(['checkShowModal','shuaxin'])
onMounted(()=>{
  console.log(123123)
  if(props.slide_id){
    getSlideInfo(props.slide_id).then(res=>{
      model.value.title = res.title
      model.value.url = res.url
      model.value.img = res.img
      model.value.seq = res.seq
      model.value.status = res.status
      showForm.value = true
    })
  }
})
const rules = {
  title: [
    {
      required: true,
      message: '请输入标题'
    }
  ],
  img: [
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
  seq: [
    {
      required: true,
      message: '请输入排序'
    }
  ],
  status: [
    {
      required: true,
      message: '请选择状态'
    }
  ],
}
const formRef = ref()
const slideSubmit = (e)=>{
  e.preventDefault()
  formRef.value.validate(errors=>{
    if(errors){
      console.log(errors)
    }else{
      // 请求API 添加数据
      updateSlide(props.slide_id,model.value).then(res=>{
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
  console.log(key);
}
</script>

<style scoped>

</style>

