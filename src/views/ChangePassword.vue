<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import axios from 'axios'

const formRef = ref(null)
const form = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const handleSubmit = async () => {
  if (form.value.newPassword !== form.value.confirmPassword) {
    message.error('新密码前后不一致')
    return
  }

  try {
    const response = await axios.put('http://127.0.0.1:5000/api/change_password', {
      old_password: form.value.currentPassword,
      new_password: form.value.newPassword
    },{withCredentials: true})

    if (response.status === 200) {
      message.success('密码更新成功！')
      formRef.value.resetFields()
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      message.error(error.response.data.error)
    } else {
      message.error('原始密码有误！')
    }
  }
}
</script>

<template>
  <a-form ref="formRef" :model="form" @finish="handleSubmit" layout="vertical">
    <a-form-item label="当前密码" name="currentPassword" rules="[ { required: true, message: '请输入当前密码!' } ]">
      <a-input-password v-model:value="form.currentPassword" />
    </a-form-item>
    <a-form-item label="新密码" name="newPassword" rules="[ { required: true, message: '请输入新密码!' } ]">
      <a-input-password v-model:value="form.newPassword" />
    </a-form-item>
    <a-form-item label="确认新密码" name="confirmPassword" rules="[ { required: true, message: '请确认新密码!' } ]">
      <a-input-password v-model:value="form.confirmPassword" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">更改密码 ></a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped>
a-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
:deep(.ant-form-item-label > label) {
  font-size: 16px; /* 根据需要调整字号 */
  font-weight: bold;
}
</style>
