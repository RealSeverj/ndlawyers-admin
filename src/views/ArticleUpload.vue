<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { message } from 'ant-design-vue'
import moment from 'moment'
import { InboxOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue'

// 表单数据
const form = ref({
  sort: [],
  title: '',
  description: '',
  views: 0,
  File: null,       // 文档文件
  imageFile: null,  // 头图文件
})

const isSubmitting = ref(false)
const uploadedArticleId = ref(null) // State to store the uploaded article ID

// 分别为文件和头图上传设置独立的文件列表
const fileList = ref([])           // 文档上传列表
const imageFileList = ref([])      // 头图上传列表

// 头图预览相关
const imageUrl = ref('')
const loading = ref(false)

function handleDrop(e) {
  console.log(e)
}

// 文件上传处理：从 fileList 中取出第一个文件的原始对象
const handleFileChange = (info) => {
  console.log('文件上传信息：', info);
  if (info.fileList && info.fileList.length > 0) {
    const file = info.fileList[0].originFileObj;
    console.log('上传前文件大小：', file.size);
    form.value.File = file;
  } else {
    form.value.File = null;
  }
};

// 头图上传处理：取出上传列表中第一个文件的原始对象，并生成预览链接
const handleImageFileChange = (info) => {
  console.log('头图上传信息：', info)
  if (info.fileList && info.fileList.length > 0) {
    // 取最新选择的文件
    const newFileItem = info.fileList[info.fileList.length - 1]
    const newFile = newFileItem.originFileObj

    // 如果已有预览链接，先释放旧的对象 URL
    if (imageUrl.value) {
      URL.revokeObjectURL(imageUrl.value)
    }

    form.value.imageFile = newFile
    imageUrl.value = URL.createObjectURL(newFile)

    // 为确保组件检测到更新，重置 imageFileList（只保留最新文件）
    imageFileList.value = [newFileItem]
  } else {
    form.value.imageFile = null
    if (imageUrl.value) {
      URL.revokeObjectURL(imageUrl.value)
    }
    imageUrl.value = ''
    imageFileList.value = []
  }
}

// 提交表单，将所有数据与上传的文件统一提交
const handleSubmit = async (event) => {
  event.preventDefault()
  isSubmitting.value = true
  const formData = new FormData()
  formData.append('sort', form.value.sort.join('|'))
  formData.append('time', moment().format('YYYY-MM-DD HH:mm:ss'))
  formData.append('title', form.value.title)
  formData.append('description', form.value.description)
  formData.append('views', form.value.views)
  formData.append('file', form.value.File)
  formData.append('image', form.value.imageFile)

  try {
    const response = await axios.post('http://127.0.0.1:5000/api/articles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    message.success(response.data.message)
    uploadedArticleId.value = response.data.articleId // Update the state with the uploaded article ID
  } catch (error) {
    message.error('上传文章失败')
  } finally {
    isSubmitting.value = false
  }
}

const categories = [
  {
    value: '2',
    label: '关于协会',
    children: [
      { value: '2-1', label: '协会简介' },
      { value: '2-2', label: '协会章程' },
      { value: '2-3', label: '组织机构' },
      { value: '2-4', label: '协会设置' },
      { value: '2-5', label: '理事会' },
      { value: '2-6', label: '常务理事会' },
      { value: '2-7', label: '监事会' },
      { value: '2-8', label: '规则制度' },
    ],
  },
  {
    value: '3',
    label: '行业党建',
    children: [
      { value: '3-1', label: '党委介绍' },
      { value: '3-2', label: '党员律师风采' },
      { value: '3-3', label: '学习教育' },
      { value: '3-4', label: '工作动态' },
    ],
  },
  {
    value: '4',
    label: '业务研究',
    children: [
      { value: '4-1', label: '专业论文' },
      { value: '4-2', label: '业务指引' },
    ],
  },
  {
    value: '5',
    label: '资讯中心',
    children: [
      { value: '5-1', label: '公告通知' },
      { value: '5-2', label: '工作动态' },
    ],
  },
  {
    value: '6',
    label: '会员服务',
    children: [
      { value: '6-2', label: '实习人员办事指南' },
      { value: '6-3', label: '下载中心' },
      { value: '6-4', label: '律所招聘' },
    ],
  },
  {
    value: '7',
    label: '会员风采',
    children: [
      { value: '7-1', label: '律师社会责任报告' },
      { value: '7-2', label: '律所风采' },
      { value: '7-3', label: '律师风采' },
    ],
  },
]
</script>

<template>
  <a-form @submit="handleSubmit">
    <a-form-item label="分类" class="fixed-list">
      <a-cascader v-model:value="form.sort" :options="categories" />
    </a-form-item>
    <a-form-item label="标题" class="fixed-list">
      <a-input v-model:value="form.title" />
    </a-form-item>
    <a-form-item label="文章简介" class="fixed-list">
      <a-textarea :rows="4" v-model:value="form.description" />
    </a-form-item>

    <!-- 头图上传 -->
    <a-form-item label="头图" class="fixed-list">
      <a-upload
          v-model:file-list="imageFileList"
          name="image"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :before-upload="() => false"
          @change="handleImageFileChange"
      >
        <!-- 在这里设置预览图片的尺寸 -->
        <img v-if="imageUrl"
             :src="imageUrl"
             alt="image"
             style="width: 200px; height: 150px; object-fit: cover; border-radius: 5px" />
        <div v-else>
          <loading-outlined v-if="loading" />
          <plus-outlined v-else />
          <div class="ant-upload-text">上传头图</div>
        </div>
      </a-upload>
    </a-form-item>

    <!-- 文件上传 -->
    <a-form-item label="文件" class="fixed-list">
      <a-upload-dragger
          v-model:file-list="fileList"
          :before-upload="() => false"
          name="file"
          :multiple="false"
          @drop="handleDrop"
          @change="handleFileChange"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined />
        </p>
        <p class="ant-upload-text">拖拽文件至此以上传</p>
        <p class="ant-upload-hint">
          仅支持10MB以下的.doc/docx文件上传
        </p>
      </a-upload-dragger>
    </a-form-item>

    <div style="display: flex; align-items: center; justify-content: center">
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="isSubmitting">上传文章</a-button>
      </a-form-item>
    </div>

  </a-form>
</template>

<style scoped>
/* 固定 a-form-item 的宽度 */
:deep(.fixed-list) {
  width: 900px;
  margin: 16px auto;
}

/* 修改头图上传框的大小 */
:deep(.avatar-uploader .ant-upload-select-picture-card) {
  width: 200px !important;
  height: 150px !important;
  line-height: 50px !important; /* 使内容垂直居中 */
}
</style>
